
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Database, Rocket, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form data state
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
    REQNUM: 1,
    // Headers data
    SIMPLE: true,
    BITPIX: -32,
    NAXIS: 2,
    NAXIS1: 1024,
    NAXIS2: 1024,
    TELESCOP: "Sample Telescope",
    RA: 123.45,
    DEC: 67.89,
    AIRMASS: 1.23
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} is ready for processing`,
      });
    }
  };

  const handleUpdateData = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to process",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate header modification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create the metadata structure
      const metadata = {
        basename: formData.basename,
        DAY_OBS: formData.DAY_OBS,
        DATE_OBS: formData.DATE_OBS,
        PROPID: formData.PROPID,
        INSTRUME: formData.INSTRUME,
        OBJECT: formData.OBJECT,
        RLEVEL: formData.RLEVEL,
        SITEID: formData.SITEID,
        TELID: formData.TELID,
        EXPTIME: formData.EXPTIME,
        FILTER: formData.FILTER,
        L1PUBDAT: formData.L1PUBDAT,
        OBSTYPE: formData.OBSTYPE,
        BLKUID: formData.BLKUID,
        REQNUM: formData.REQNUM,
        area: {
          type: "Polygon",
          coordinates: [[
            [123.40, 67.84],
            [123.50, 67.84],
            [123.50, 67.94],
            [123.40, 67.94],
            [123.40, 67.84]
          ]]
        },
        headers: {
          SIMPLE: formData.SIMPLE,
          BITPIX: formData.BITPIX,
          NAXIS: formData.NAXIS,
          NAXIS1: formData.NAXIS1,
          NAXIS2: formData.NAXIS2,
          OBJECT: formData.OBJECT,
          TELESCOP: formData.TELESCOP,
          INSTRUME: formData.INSTRUME,
          FILTER: formData.FILTER,
          EXPTIME: formData.EXPTIME,
          "DATE-OBS": formData.DATE_OBS,
          RA: formData.RA,
          DEC: formData.DEC,
          AIRMASS: formData.AIRMASS,
          PROPID: formData.PROPID,
          SITEID: formData.SITEID,
          TELID: formData.TELID,
          OBSTYPE: formData.OBSTYPE,
          REQNUM: formData.REQNUM,
          BLKUID: formData.BLKUID,
          RLEVEL: formData.RLEVEL
        }
      };

      console.log('Processing file with metadata:', metadata);
      
      // Simulate MinIO upload (port 9000)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate science archive upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Data Processing Complete",
        description: "File headers updated and uploaded to MinIO and Science Archive successfully",
      });
      
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "There was an error processing your data",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Physical Research Laboratory</h1>
                <p className="text-sm text-gray-500">Data Ingestion System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Database className="w-4 h-4" />
              <span>Science Archive Integration</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* File Upload Section */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>File Upload</span>
                </CardTitle>
                <CardDescription>
                  Select the file to process and update headers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".fits,.fit,.fts"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to select file</p>
                    <p className="text-xs text-gray-400 mt-1">FITS files supported</p>
                  </label>
                </div>
                
                {selectedFile && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800">File Selected:</p>
                    <p className="text-sm text-green-600">{selectedFile.name}</p>
                    <p className="text-xs text-green-500">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}

                <Button 
                  onClick={handleUpdateData}
                  disabled={!selectedFile || isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isProcessing ? "Processing..." : "Update Data"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Metadata Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Observation Metadata</CardTitle>
                <CardDescription>
                  Configure the metadata that will be written to the file headers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                    
                    <div>
                      <Label htmlFor="basename">Basename</Label>
                      <Input
                        id="basename"
                        value={formData.basename}
                        onChange={(e) => handleInputChange('basename', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="day_obs">Day of Observation</Label>
                      <Input
                        id="day_obs"
                        value={formData.DAY_OBS}
                        onChange={(e) => handleInputChange('DAY_OBS', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="date_obs">Date of Observation</Label>
                      <Input
                        id="date_obs"
                        type="datetime-local"
                        value={formData.DATE_OBS}
                        onChange={(e) => handleInputChange('DATE_OBS', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="propid">Proposal ID</Label>
                      <Input
                        id="propid"
                        value={formData.PROPID}
                        onChange={(e) => handleInputChange('PROPID', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="instrume">Instrument</Label>
                      <Input
                        id="instrume"
                        value={formData.INSTRUME}
                        onChange={(e) => handleInputChange('INSTRUME', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="object">Object</Label>
                      <Input
                        id="object"
                        value={formData.OBJECT}
                        onChange={(e) => handleInputChange('OBJECT', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Technical Parameters */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Technical Parameters</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rlevel">R Level</Label>
                        <Input
                          id="rlevel"
                          type="number"
                          value={formData.RLEVEL}
                          onChange={(e) => handleInputChange('RLEVEL', parseInt(e.target.value))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="siteid">Site ID</Label>
                        <Input
                          id="siteid"
                          value={formData.SITEID}
                          onChange={(e) => handleInputChange('SITEID', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="telid">Telescope ID</Label>
                        <Input
                          id="telid"
                          value={formData.TELID}
                          onChange={(e) => handleInputChange('TELID', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="exptime">Exposure Time</Label>
                        <Input
                          id="exptime"
                          type="number"
                          step="0.1"
                          value={formData.EXPTIME}
                          onChange={(e) => handleInputChange('EXPTIME', parseFloat(e.target.value))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="filter">Filter</Label>
                      <Select value={formData.FILTER} onValueChange={(value) => handleInputChange('FILTER', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="V">V (Visual)</SelectItem>
                          <SelectItem value="B">B (Blue)</SelectItem>
                          <SelectItem value="R">R (Red)</SelectItem>
                          <SelectItem value="I">I (Infrared)</SelectItem>
                          <SelectItem value="U">U (Ultraviolet)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="l1pubdat">L1 Publication Date</Label>
                      <Input
                        id="l1pubdat"
                        type="datetime-local"
                        value={formData.L1PUBDAT}
                        onChange={(e) => handleInputChange('L1PUBDAT', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="obstype">Observation Type</Label>
                      <Select value={formData.OBSTYPE} onValueChange={(value) => handleInputChange('OBSTYPE', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EXPOSE">Exposure</SelectItem>
                          <SelectItem value="BIAS">Bias</SelectItem>
                          <SelectItem value="DARK">Dark</SelectItem>
                          <SelectItem value="FLAT">Flat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="blkuid">Block UID</Label>
                        <Input
                          id="blkuid"
                          type="number"
                          value={formData.BLKUID}
                          onChange={(e) => handleInputChange('BLKUID', parseInt(e.target.value))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="reqnum">Request Number</Label>
                        <Input
                          id="reqnum"
                          type="number"
                          value={formData.REQNUM}
                          onChange={(e) => handleInputChange('REQNUM', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Headers Section */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Header Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="telescop">Telescope</Label>
                      <Input
                        id="telescop"
                        value={formData.TELESCOP}
                        onChange={(e) => handleInputChange('TELESCOP', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="ra">Right Ascension</Label>
                      <Input
                        id="ra"
                        type="number"
                        step="0.00001"
                        value={formData.RA}
                        onChange={(e) => handleInputChange('RA', parseFloat(e.target.value))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="dec">Declination</Label>
                      <Input
                        id="dec"
                        type="number"
                        step="0.00001"
                        value={formData.DEC}
                        onChange={(e) => handleInputChange('DEC', parseFloat(e.target.value))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="airmass">Airmass</Label>
                      <Input
                        id="airmass"
                        type="number"
                        step="0.01"
                        value={formData.AIRMASS}
                        onChange={(e) => handleInputChange('AIRMASS', parseFloat(e.target.value))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="naxis1">NAXIS1</Label>
                      <Input
                        id="naxis1"
                        type="number"
                        value={formData.NAXIS1}
                        onChange={(e) => handleInputChange('NAXIS1', parseInt(e.target.value))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="naxis2">NAXIS2</Label>
                      <Input
                        id="naxis2"
                        type="number"
                        value={formData.NAXIS2}
                        onChange={(e) => handleInputChange('NAXIS2', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Section */}
        {isProcessing && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <div>
                  <p className="font-medium text-gray-900">Processing Data...</p>
                  <p className="text-sm text-gray-600">Updating headers and uploading to MinIO (port 9000) and Science Archive</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
