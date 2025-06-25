import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Create __dirname equivalent for ES modules
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// API endpoint to handle file ingestion
app.post('/api/ingest', upload.fields([
  { name: 'fits_file', maxCount: 1 },
  { name: 'metadata_file', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files['fits_file'] || !req.files['metadata_file']) {
      return res.status(400).json({
        success: false,
        error: 'Both FITS file and metadata file are required'
      });
    }

    const fitsFile = req.files['fits_file'][0];
    const metadataFile = req.files['metadata_file'][0];

    console.log('Processing files:', {
      fits: fitsFile.originalname,
      metadata: metadataFile.originalname
    });

    // Call the Python ingester script
    const pythonProcess = spawn(path.join(__dirname, 'venv/bin/python'), [
      path.join(__dirname, 'ingester.py'),
      fitsFile.path,
      metadataFile.path
    ]);

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
      console.log('Python stdout:', data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error('Python stderr:', data.toString());
    });

    pythonProcess.on('close', (code) => {
      console.log('Python process exited with code:', code);

      // Clean up uploaded files
      try {
        fs.unlinkSync(fitsFile.path);
        fs.unlinkSync(metadataFile.path);
      } catch (err) {
        console.error('Error cleaning up files:', err);
      }

      if (code === 0) {
        res.json({
          success: true,
          message: 'File processed successfully',
          output: stdout
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Python script failed',
          stderr: stderr,
          stdout: stdout
        });
      }
    });

    pythonProcess.on('error', (err) => {
      console.error('Failed to start Python process:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to start Python process',
        details: err.message
      });
    });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Astronomical Ingester API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📤 Upload endpoint: http://localhost:${PORT}/api/ingest`);
}); 