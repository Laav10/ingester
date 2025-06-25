import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Database, Server, CheckCircle, Rocket, Satellite, Zap, Globe } from "lucide-react";
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

  // Add animated stars effect
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.getElementById('stars-container');
      if (!starsContainer) return;
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'absolute bg-blue-200/20 rounded-full animate-pulse';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
      }
    };
    
    createStars();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/30">
      {/* Animated background elements */}
      <div id="stars-container" className="absolute inset-0 z-0"></div>
      
      {/* Nebula effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-6 mb-16">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30">
                <Rocket className="w-8 h-8 text-cyan-300" />
              </div>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
              <div className="p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 backdrop-blur-sm border border-cyan-400/30">
                <Satellite className="w-8 h-8 text-blue-300" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 bg-clip-text text-transparent leading-tight">
              Physical Research Laboratory
            </h1>
            <p className="text-2xl text-cyan-300/90 font-light">Cosmic Data Ingestion System</p>
            
            {/* Animated divider */}
            <div className="flex justify-center items-center gap-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-400/60"></div>
              <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-blue-400/60 via-cyan-400/60 to-blue-400/60"></div>
              <Globe className="w-4 h-4 text-cyan-400 animate-spin" style={{animationDuration: '8s'}} />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-400/60"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Metadata Fields Card */}
            <Card className="bg-slate-900/40 backdrop-blur-xl border border-blue-400/30 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-slate-800/60 via-blue-900/30 to-slate-800/60 border-b border-blue-400/30 backdrop-blur-sm">
                <CardTitle className="text-cyan-200 flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/40">
                    <Database className="w-5 h-5 text-blue-300" />
                  </div>
                  Observation Metadata
                </CardTitle>
                <CardDescription className="text-blue-200/80">
                  Configure observation parameters and metadata for cosmic data processing
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="space-y-2">
                    <Label htmlFor="basename" className="text-cyan-300 font-medium">Basename</Label>
                    <Input
                      id="basename"
                      value={formData.basename}
                      onChange={(e) => handleInputChange('basename', e.target.value)}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="day_obs" className="text-cyan-300 font-medium">Day OBS</Label>
                    <Input
                      id="day_obs"
                      value={formData.DAY_OBS}
                      onChange={(e) => handleInputChange('DAY_OBS', e.target.value)}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_obs" className="text-cyan-300 font-medium">Date OBS</Label>
                    <Input
                      id="date_obs"
                      type="datetime-local"
                      value={formData.DATE_OBS}
                      onChange={(e) => handleInputChange('DATE_OBS', e.target.value)}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propid" className="text-cyan-300 font-medium">Proposal ID</Label>
                    <Input
                      id="propid"
                      value={formData.PROPID}
                      onChange={(e) => handleInputChange('PROPID', e.target.value)}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instrume" className="text-cyan-300 font-medium">Instrument</Label>
                    <Input
                      id="instrume"
                      value={formData.INSTRUME}
                      onChange={(e) => handleInputChange('INSTRUME', e.target.value)}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="object" className="text-cyan-300 font-medium">Object</Label>
                    <Input
                      id="object"
                      value={formData.OBJECT}
                      onChange={(e) => handleInputChange('OBJECT', e.target.value)}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteid" className="text-cyan-300 font-medium">Site ID</Label>
                    <Input
                      id="siteid"
                      value={formData.SITEID}
                      onChange={(e) => handleInputChange('SITEID', e.target.value)}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telid" className="text-cyan-300 font-medium">Telescope ID</Label>
                    <Input
                      id="telid"
                      value={formData.TELID}
                      onChange={(e) => handleInputChange('TELID', e.target.value)}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exptime" className="text-cyan-300 font-medium">Exposure Time</Label>
                    <Input
                      id="exptime"
                      type="number"
                      step="0.1"
                      value={formData.EXPTIME}
                      onChange={(e) => handleInputChange('EXPTIME', parseFloat(e.target.value))}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filter" className="text-cyan-300 font-medium">Filter</Label>
                    <Input
                      id="filter"
                      value={formData.FILTER}
                      onChange={(e) => handleInputChange('FILTER', e.target.value)}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="obstype" className="text-cyan-300 font-medium">Observation Type</Label>
                    <Input
                      id="obstype"
                      value={formData.OBSTYPE}
                      onChange={(e) => handleInputChange('OBSTYPE', e.target.value)}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rlevel" className="text-cyan-300 font-medium">R Level</Label>
                    <Input
                      id="rlevel"
                      type="number"
                      value={formData.RLEVEL}
                      onChange={(e) => handleInputChange('RLEVEL', parseInt(e.target.value))}
                      className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Header Data Card */}
            <Card className="bg-slate-900/40 backdrop-blur-xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-slate-800/60 via-cyan-900/30 to-slate-800/60 border-b border-cyan-400/30 backdrop-blur-sm">
                <CardTitle className="text-blue-200 flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40">
                    <Server className="w-5 h-5 text-cyan-300" />
                  </div>
                  FITS Header Data
                </CardTitle>
                <CardDescription className="text-cyan-200/80">
                  Additional header information for astronomical data processing
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="space-y-2">
                    <Label htmlFor="telescop" className="text-blue-300 font-medium">Telescope</Label>
                    <Input
                      id="telescop"
                      value={headerData.TELESCOP}
                      onChange={(e) => handleHeaderChange('TELESCOP', e.target.value)}
                      className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ra" className="text-blue-300 font-medium">RA</Label>
                    <Input
                      id="ra"
                      type="number"
                      step="0.01"
                      value={headerData.RA}
                      onChange={(e) => handleHeaderChange('RA', parseFloat(e.target.value))}
                      className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dec" className="text-blue-300 font-medium">DEC</Label>
                    <Input
                      id="dec"
                      type="number"
                      step="0.01"
                      value={headerData.DEC}
                      onChange={(e) => handleHeaderChange('DEC', parseFloat(e.target.value))}
                      className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="airmass" className="text-blue-300 font-medium">Airmass</Label>
                    <Input
                      id="airmass"
                      type="number"
                      step="0.01"
                      value={headerData.AIRMASS}
                      onChange={(e) => handleHeaderChange('AIRMASS', parseFloat(e.target.value))}
                      className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="naxis1" className="text-blue-300 font-medium">NAXIS1</Label>
                    <Input
                      id="naxis1"
                      type="number"
                      value={headerData.NAXIS1}
                      onChange={(e) => handleHeaderChange('NAXIS1', parseInt(e.target.value))}
                      className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="naxis2" className="text-blue-300 font-medium">NAXIS2</Label>
                    <Input
                      id="naxis2"
                      type="number"
                      value={headerData.NAXIS2}
                      onChange={(e) => handleHeaderChange('NAXIS2', parseInt(e.target.value))}
                      className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* File Upload and Processing Card */}
          <Card className="bg-slate-900/40 backdrop-blur-xl border border-indigo-400/30 shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500">
            <CardHeader className="bg-gradient-to-r from-slate-800/60 via-indigo-900/30 to-slate-800/60 border-b border-indigo-400/30 backdrop-blur-sm">
              <CardTitle className="text-indigo-200 flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-400/40">
                  <Upload className="w-5 h-5 text-indigo-300" />
                </div>
                Cosmic File Upload & Processing
              </CardTitle>
              <CardDescription className="text-indigo-200/80">
                Upload your astronomical data and update headers for deep space analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="text-indigo-300 font-medium">Select Astronomical Data File</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                    className="bg-slate-800/60 border-indigo-400/40 text-indigo-100 file:bg-gradient-to-r file:from-indigo-600/40 file:to-blue-600/40 file:text-indigo-200 file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 hover:file:from-indigo-600/60 hover:file:to-blue-600/60 backdrop-blur-sm transition-all"
                    accept=".fits,.fit,.fts"
                  />
                </div>

                {selectedFile && (
                  <div className="bg-gradient-to-r from-slate-800/40 to-indigo-900/40 border border-indigo-400/40 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="text-indigo-200 font-medium">Selected: {selectedFile.name}</span>
                      </div>
                      <Badge variant="secondary" className="bg-gradient-to-r from-indigo-600/30 to-blue-600/30 text-indigo-200 border-indigo-400/40 px-3 py-1">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </Badge>
                    </div>
                  </div>
                )}

                {isUploading && uploadProgress > 0 && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-indigo-300 font-medium">Cosmic Data Processing</span>
                      <span className="text-blue-400 font-bold">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="bg-slate-800/60 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-cyan-500 h-3 rounded-full" />
                  </div>
                )}

                <Separator className="bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent h-px" />

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleUpdateData}
                    disabled={!selectedFile || isUploading}
                    className="flex-1 bg-gradient-to-r from-blue-600/40 to-cyan-600/40 hover:from-blue-600/60 hover:to-cyan-600/60 text-white border border-blue-400/40 backdrop-blur-sm transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 text-lg py-6"
                  >
                    {isUploading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        Processing Cosmic Data...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Rocket className="w-5 h-5" />
                        Launch Data Update
                      </div>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-gradient-to-br from-slate-800/40 to-blue-900/40 border border-blue-400/40 rounded-xl p-4 backdrop-blur-sm hover:from-slate-800/60 hover:to-blue-900/60 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Server className="w-5 h-5 text-blue-400" />
                      <span className="font-semibold text-blue-300">MinIO Storage</span>
                    </div>
                    <p className="text-sm text-blue-200/80">Port 9000 • Cosmic Object Storage</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/40 to-cyan-900/40 border border-cyan-400/40 rounded-xl p-4 backdrop-blur-sm hover:from-slate-800/60 hover:to-cyan-900/60 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="w-5 h-5 text-cyan-400" />
                      <span className="font-semibold text-cyan-300">Science Archive</span>
                    </div>
                    <p className="text-sm text-cyan-200/80">Astronomical Metadata Repository</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Footer */}
          <div className="text-center text-blue-200/60 text-sm py-8">
            <div className="flex justify-center items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-400/50 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-indigo-400/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            <p className="font-light">Physical Research Laboratory - Cosmic Data Ingestion System v2.0</p>
            <p className="text-xs text-blue-300/40 mt-1">Exploring the Universe, One Dataset at a Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
