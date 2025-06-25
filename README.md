# Astronomical Data Ingester

A comprehensive web application for processing FITS files, updating headers with complete metadata, and uploading to both Science Archive (port 9501) and MinIO storage (port 9000).

## Features

- **Dynamic Metadata Management**: All metadata fields are editable through the frontend interface
- **Observer Field**: Includes Observer field in both metadata and header data
- **Complete Header Updates**: All metadata is synchronized between header and metadata fields
- **Dual Storage**: Uploads to both MinIO storage and Science Archive
- **Real-time Synchronization**: Changes in metadata fields automatically update header fields and vice versa

## Architecture

- **Frontend**: React + TypeScript with modern UI components
- **Backend**: Node.js/Express API server
- **Python Script**: Handles FITS file processing and storage uploads
- **Storage**: MinIO (port 9000) and Science Archive (port 9501)

## Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- MinIO server running on localhost:9000
- Science Archive server running on localhost:9501

## Installation

1. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure MinIO**:
   - Ensure MinIO is running on `localhost:9000`
   - Credentials: `Laav10user` / `Laav10pass`
   - Bucket: `astronomical-data` (will be created automatically)

4. **Configure Science Archive**:
   - Ensure Science Archive is running on `localhost:9501`
   - API Token: `8163ccc7eaef258e863040659a40332158485280`

## Usage

### Starting the Application

1. **Start the backend server**:
   ```bash
   npm run server
   ```
   This starts the Express API server on port 3001.

2. **Start the frontend development server**:
   ```bash
   npm run dev
   ```
   This starts the React development server on port 5173.

3. **Open your browser** and navigate to `http://localhost:5173`

### Using the Application

1. **Fill in the metadata fields** in the "Observation Metadata" card:
   - All fields are editable and will be used in the ingestion process
   - The Observer field is included for tracking who performed the observation

2. **Configure header data** in the "FITS Header Data" card:
   - All header fields are editable
   - Changes automatically synchronize with metadata fields

3. **Select a FITS file** using the file upload interface

4. **Click "Launch Data Update"** to process the file:
   - The file header will be updated with all metadata
   - The file will be uploaded to MinIO storage
   - Metadata will be sent to the Science Archive

### Command Line Usage

You can also use the Python script directly:

```bash
# With metadata file
python ingester.py <fits_file_path> <metadata_json_file>

# Example
python ingester.py sample_image.fits metadata.json

# Without metadata file (uses defaults)
python ingester.py sample_image.fits
```

## Metadata Fields

### Observation Metadata
- `basename`: Base filename
- `DAY_OBS`: Observation day (YYYYMMDD)
- `DATE_OBS`: Observation date and time (ISO format)
- `PROPID`: Proposal ID
- `INSTRUME`: Instrument name
- `OBJECT`: Target object name
- `RLEVEL`: Reduction level
- `SITEID`: Site ID
- `TELID`: Telescope ID
- `EXPTIME`: Exposure time
- `FILTER`: Filter used
- `L1PUBDAT`: Level 1 publication date
- `OBSTYPE`: Observation type
- `BLKUID`: Block UID
- `REQNUM`: Request number
- `OBSERVER`: Observer name

### Header Data
- `SIMPLE`: FITS standard flag
- `BITPIX`: Bits per pixel
- `NAXIS`: Number of axes
- `NAXIS1`: First axis size
- `NAXIS2`: Second axis size
- `TELESCOP`: Telescope name
- `RA`: Right ascension
- `DEC`: Declination
- `AIRMASS`: Air mass
- Plus all metadata fields above

## API Endpoints

### POST /api/ingest
Uploads and processes FITS files with metadata.

**Request**:
- `fits_file`: FITS file to process
- `metadata_file`: JSON file containing metadata and header data

**Response**:
```json
{
  "success": true,
  "message": "File processed successfully",
  "output": "Python script output"
}
```

### GET /api/health
Health check endpoint.

**Response**:
```json
{
  "status": "OK",
  "timestamp": "2025-01-27T10:30:00.000Z"
}
```

## File Structure

```
ingester/
├── src/                    # React frontend source
│   ├── components/         # UI components
│   ├── pages/             # Page components
│   └── ...
├── ingester.py            # Python ingestion script
├── server.js              # Express backend server
├── requirements.txt       # Python dependencies
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## Configuration

### MinIO Configuration
- **Endpoint**: `localhost:9000`
- **Access Key**: `Laav10user`
- **Secret Key**: `Laav10pass`
- **Bucket**: `astronomical-data`

### Science Archive Configuration
- **URL**: `http://localhost:9501/frames/`
- **Token**: `8163ccc7eaef258e863040659a40332158485280`

## Troubleshooting

### Common Issues

1. **Python script not found**:
   - Ensure Python 3 is installed and accessible as `python3`
   - Check that all dependencies are installed: `pip install -r requirements.txt`

2. **MinIO connection failed**:
   - Verify MinIO is running on port 9000
   - Check credentials in the Python script

3. **Science Archive connection failed**:
   - Verify Science Archive is running on port 9501
   - Check API token validity

4. **Frontend can't connect to backend**:
   - Ensure backend server is running on port 3001
   - Check CORS configuration

### Logs

- **Backend logs**: Check console output when running `npm run server`
- **Python script logs**: Output is captured and returned in API responses
- **Frontend logs**: Check browser developer console

## Development

### Adding New Fields

1. Update the TypeScript interfaces in the frontend components
2. Add the fields to the Python script's metadata handling
3. Update the header synchronization logic

### Modifying Storage Configuration

Edit the configuration in `ingester.py`:
- MinIO settings in the `__init__` method
- Science Archive settings in the `__init__` method

## License

This project is designed for astronomical data processing and follows best practices for FITS file handling and metadata management.
