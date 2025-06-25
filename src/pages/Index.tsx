
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Database, Server, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

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
    <div className="min-h-screen bg-slate-800/50 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-white">Physical Research Laboratory</h1>
          <p className="text-xl text-blue-200">Data Ingestion System</p>
          <div className="w-24 h-1 bg-blue-500/30 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Metadata Fields */}
          <Card className="bg-slate-900/50 border-blue-500/30 border">
            <CardHeader className="bg-slate-700/50 border-b border-blue-500/30">
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-400" />
                Observation Metadata
              </CardTitle>
              <CardDescription className="text-blue-200">
                Configure observation parameters and metadata
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basename" className="text-blue-300">Basename</Label>
                  <Input
                    id="basename"
                    value={formData.basename}
                    onChange={(e) => handleInputChange('basename', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="day_obs" className="text-blue-300">Day OBS</Label>
                  <Input
                    id="day_obs"
                    value={formData.DAY_OBS}
                    onChange={(e) => handleInputChange('DAY_OBS', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_obs" className="text-blue-300">Date OBS</Label>
                  <Input
                    id="date_obs"
                    type="datetime-local"
                    value={formData.DATE_OBS}
                    onChange={(e) => handleInputChange('DATE_OBS', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propid" className="text-blue-300">Proposal ID</Label>
                  <Input
                    id="propid"
                    value={formData.PROPID}
                    onChange={(e) => handleInputChange('PROPID', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instrume" className="text-blue-300">Instrument</Label>
                  <Input
                    id="instrume"
                    value={formData.INSTRUME}
                    onChange={(e) => handleInputChange('INSTRUME', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="object" className="text-blue-300">Object</Label>
                  <Input
                    id="object"
                    value={formData.OBJECT}
                    onChange={(e) => handleInputChange('OBJECT', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteid" className="text-blue-300">Site ID</Label>
                  <Input
                    id="siteid"
                    value={formData.SITEID}
                    onChange={(e) => handleInputChange('SITEID', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telid" className="text-blue-300">Telescope ID</Label>
                  <Input
                    id="telid"
                    value={formData.TELID}
                    onChange={(e) => handleInputChange('TELID', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exptime" className="text-blue-300">Exposure Time</Label>
                  <Input
                    id="exptime"
                    type="number"
                    step="0.1"
                    value={formData.EXPTIME}
                    onChange={(e) => handleInputChange('EXPTIME', parseFloat(e.target.value))}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filter" className="text-blue-300">Filter</Label>
                  <Input
                    id="filter"
                    value={formData.FILTER}
                    onChange={(e) => handleInputChange('FILTER', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obstype" className="text-blue-300">Observation Type</Label>
                  <Input
                    id="obstype"
                    value={formData.OBSTYPE}
                    onChange={(e) => handleInputChange('OBSTYPE', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rlevel" className="text-blue-300">R Level</Label>
                  <Input
                    id="rlevel"
                    type="number"
                    value={formData.RLEVEL}
                    onChange={(e) => handleInputChange('RLEVEL', parseInt(e.target.value))}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Header Data */}
          <Card className="bg-slate-900/50 border-blue-500/30 border">
            <CardHeader className="bg-slate-700/50 border-b border-blue-500/30">
              <CardTitle className="text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-400" />
                FITS Header Data
              </CardTitle>
              <CardDescription className="text-blue-200">
                Additional header information for the FITS file
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telescop" className="text-blue-300">Telescope</Label>
                  <Input
                    id="telescop"
                    value={headerData.TELESCOP}
                    onChange={(e) => handleHeaderChange('TELESCOP', e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ra" className="text-blue-300">RA</Label>
                  <Input
                    id="ra"
                    type="number"
                    step="0.01"
                    value={headerData.RA}
                    onChange={(e) => handleHeaderChange('RA', parseFloat(e.target.value))}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dec" className="text-blue-300">DEC</Label>
                  <Input
                    id="dec"
                    type="number"
                    step="0.01"
                    value={headerData.DEC}
                    onChange={(e) => handleHeaderChange('DEC', parseFloat(e.target.value))}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="airmass" className="text-blue-300">Airmass</Label>
                  <Input
                    id="airmass"
                    type="number"
                    step="0.01"
                    value={headerData.AIRMASS}
                    onChange={(e) => handleHeaderChange('AIRMASS', parseFloat(e.target.value))}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="naxis1" className="text-blue-300">NAXIS1</Label>
                  <Input
                    id="naxis1"
                    type="number"
                    value={headerData.NAXIS1}
                    onChange={(e) => handleHeaderChange('NAXIS1', parseInt(e.target.value))}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="naxis2" className="text-blue-300">NAXIS2</Label>
                  <Input
                    id="naxis2"
                    type="number"
                    value={headerData.NAXIS2}
                    onChange={(e) => handleHeaderChange('NAXIS2', parseInt(e.target.value))}
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-200/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Upload and Actions */}
        <Card className="bg-slate-900/50 border-blue-500/30 border">
          <CardHeader className="bg-slate-700/50 border-b border-blue-500/30">
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-400" />
              File Upload & Processing
            </CardTitle>
            <CardDescription className="text-blue-200">
              Upload your data file and update headers
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload" className="text-blue-300">Select File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  className="bg-slate-800/50 border-blue-500/30 text-white file:bg-blue-600/30 file:text-blue-200 file:border-0 file:rounded file:px-4 file:py-2 file:mr-4 hover:file:bg-blue-600/50"
                  accept=".fits,.fit,.fts"
                />
              </div>

              {selectedFile && (
                <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-blue-200">Selected: {selectedFile.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-600/30 text-blue-200 border-blue-500/30">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </Badge>
                  </div>
                </div>
              )}

              {isUploading && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-300">Upload Progress</span>
                    <span className="text-blue-400">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="bg-slate-800/50 [&>div]:bg-blue-500" />
                </div>
              )}

              <Separator className="bg-blue-500/30" />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleUpdateData}
                  disabled={!selectedFile || isUploading}
                  className="flex-1 bg-blue-600/30 hover:bg-blue-600/50 text-white border border-blue-500/30 transition-colors"
                >
                  {isUploading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Update Data
                    </div>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-blue-300">MinIO Storage</span>
                  </div>
                  <p className="text-sm text-blue-200">Port 9000 • Object Storage</p>
                </div>
                <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-blue-300">Science Archive</span>
                  </div>
                  <p className="text-sm text-blue-200">Metadata Repository</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Footer */}
        <div className="text-center text-blue-200/70 text-sm">
          <p>Physical Research Laboratory - Data Ingestion System v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
