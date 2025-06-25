
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
    BLKUID: 1,
    REQNUM: 1
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
    REQNUM: 1,
    BLKUID: 1,
    RLEVEL: 0
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHeaderChange = (field: string, value: any) => {
    setHeaderData(prev => ({
      ...prev,
      [field]: value
    }));
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
      // Simulate header modification
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate MinIO upload (port 9000)
      console.log("Uploading to MinIO on port 9000...", {
        file: selectedFile.name,
        metadata: formData,
        headers: headerData
      });

      // Simulate Science Archive upload
      console.log("Uploading to Science Archive...", {
        file: selectedFile.name,
        updatedHeaders: headerData
      });

      setUploadProgress(100);
      
      toast.success("File header updated and uploaded successfully!", {
        description: `${selectedFile.name} uploaded to MinIO and Science Archive`
      });

    } catch (error) {
      toast.error("Upload failed", {
        description: "Please try again or contact support"
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/30">
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
