import React, { useState } from 'react';
import { toast } from "sonner";
import SpaceBackground from '@/components/SpaceBackground';
import SpaceHeader from '@/components/SpaceHeader';
import MetadataCard from '@/components/MetadataCard';
import HeaderDataCard from '@/components/HeaderDataCard';
import FileUploadCard from '@/components/FileUploadCard';
import SpaceFooter from '@/components/SpaceFooter';

const Index = () => {
  const [formData, setFormData] = useState({
    basename: "sample_image_20250616_145810",
    DAY_OBS: "20250616",
    DATE_OBS: "2025-06-16T14:58:10",
    PROPID: "test-proposal",
    INSTRUME: "test-instrument",
    OBJECT: "Sample Target",
    RLEVEL: 0,
    SITEID: "TST",
    TELID: "T01",
    EXPTIME: 60.0,
    FILTER: "V",
    L1PUBDAT: "2025-07-01T00:00:00",
    OBSTYPE: "EXPOSE",
    MODE: "NORMAL",
    BLKUID: 1,
    REQNUM: 1,
    OBSERVER: "Your Name"
  });

  const [headerData, setHeaderData] = useState({
    SIMPLE: true,
    BITPIX: -32,
    NAXIS: 2,
    NAXIS1: 1024,
    NAXIS2: 1024,
    OBJECT: "Sample Target",
    TELESCOP: "Sample Telescope",
    INSTRUME: "test-instrument",
    FILTER: "V",
    EXPTIME: 60.0,
    "DATE-OBS": "2025-06-16T14:58:10",
    RA: 123.45,
    DEC: 67.89,
    AIRMASS: 1.23,
    PROPID: "test-proposal",
    SITEID: "TST",
    TELID: "T01",
    OBSTYPE: "EXPOSE",
    MODE: "NORMAL",
    REQNUM: 1,
    BLKUID: 1,
    RLEVEL: 0,
    OBSERVER: "Dr. Astronomer",
    DAY_OBS: "20250616",
    L1PUBDAT: "2025-07-01T00:00:00"
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Synchronize with header data for common fields
    if (['OBJECT', 'INSTRUME', 'FILTER', 'EXPTIME', 'PROPID', 'SITEID', 'TELID', 'OBSTYPE', 'MODE', 'REQNUM', 'BLKUID', 'RLEVEL', 'OBSERVER', 'DAY_OBS', 'L1PUBDAT'].includes(field)) {
      setHeaderData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Handle DATE_OBS to DATE-OBS mapping
    if (field === 'DATE_OBS') {
      setHeaderData(prev => ({
        ...prev,
        'DATE-OBS': value
      }));
    }
  };

  const handleHeaderChange = (field: string, value: any) => {
    setHeaderData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Synchronize with form data for common fields
    if (['OBJECT', 'INSTRUME', 'FILTER', 'EXPTIME', 'PROPID', 'SITEID', 'TELID', 'OBSTYPE', 'MODE', 'REQNUM', 'BLKUID', 'RLEVEL', 'OBSERVER', 'DAY_OBS', 'L1PUBDAT'].includes(field)) {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Handle DATE-OBS to DATE_OBS mapping
    if (field === 'DATE-OBS') {
      setFormData(prev => ({
        ...prev,
        'DATE_OBS': value
      }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success(`File "${file.name}" selected for upload`);
    }
  };

  const handleUpdateData = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create metadata JSON file with current form data
      const metadataPayload = {
        metadata: formData,
        header_data: headerData
      };

      // Create a temporary file to store the metadata
      const metadataBlob = new Blob([JSON.stringify(metadataPayload, null, 2)], {
        type: 'application/json'
      });
      const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });

      // Create FormData to send both files
      const formDataToSend = new FormData();
      formDataToSend.append('fits_file', selectedFile);
      formDataToSend.append('metadata_file', metadataFile);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Call backend API to process the files
      const response = await fetch('http://localhost:3001/api/ingest', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setUploadProgress(100);
      
      if (result.success) {
        toast.success("File processed and uploaded successfully!", {
          description: `${selectedFile.name} uploaded to MinIO and Science Archive`
        });
      } else {
        throw new Error(result.error || 'Upload failed');
      }

    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Upload failed", {
        description: error instanceof Error ? error.message : "Please try again or contact support"
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 to-[#5409DA]">
      <SpaceBackground />

      {/* Main content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <SpaceHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MetadataCard formData={formData} onInputChange={handleInputChange} />
            <HeaderDataCard headerData={headerData} onHeaderChange={handleHeaderChange} />
          </div>

          <FileUploadCard
            selectedFile={selectedFile}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
            onFileUpload={handleFileUpload}
            onUpdateData={handleUpdateData}
          />

          <SpaceFooter />
        </div>
      </div>
    </div>
  );
};

export default Index;
