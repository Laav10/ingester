
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Database, Server, CheckCircle, Rocket } from "lucide-react";

interface FileUploadCardProps {
  selectedFile: File | null;
  uploadProgress: number;
  isUploading: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateData: () => void;
}

const FileUploadCard = ({
  selectedFile,
  uploadProgress,
  isUploading,
  onFileUpload,
  onUpdateData
}: FileUploadCardProps) => {
  return (
    <Card className="backdrop-blur-xl border shadow-2xl transition-all duration-500"
          style={{
            backgroundColor: 'rgba(20, 20, 30, 0.4)',
            borderColor: 'rgba(84, 9, 218, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(84, 9, 218, 0.1)'
          }}>
      <CardHeader className="border-b backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(to right, rgba(20, 20, 30, 0.6), rgba(84, 9, 218, 0.3), rgba(20, 20, 30, 0.6))',
                    borderColor: 'rgba(84, 9, 218, 0.3)'
                  }}>
        <CardTitle className="flex items-center gap-3 text-xl" style={{color: '#BBFBFF'}}>
          <div className="p-2 rounded-lg border" 
               style={{backgroundColor: 'rgba(84, 9, 218, 0.2)', borderColor: 'rgba(84, 9, 218, 0.4)'}}>
            <Upload className="w-5 h-5" style={{color: '#5409DA'}} />
          </div>
          Cosmic File Upload & Processing
        </CardTitle>
        <CardDescription style={{color: 'rgba(187, 251, 255, 0.8)'}}>
          Upload your astronomical data and update headers for deep space analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload" className="font-medium" style={{color: '#5409DA'}}>Select Astronomical Data File</Label>
            <Input
              id="file-upload"
              type="file"
              onChange={onFileUpload}
              className="backdrop-blur-sm transition-all file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4"
              style={{
                backgroundColor: 'rgba(20, 20, 30, 0.6)',
                borderColor: 'rgba(84, 9, 218, 0.4)',
                color: '#5409DA'
              }}
              accept=".fits,.fit,.fts"
            />
          </div>

          {selectedFile && (
            <div className="border rounded-xl p-4 backdrop-blur-sm"
                 style={{
                   background: 'linear-gradient(to right, rgba(20, 20, 30, 0.4), rgba(84, 9, 218, 0.4))',
                   borderColor: 'rgba(84, 9, 218, 0.4)'
                 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{color: '#8DD8FF'}} />
                  <span className="font-medium" style={{color: '#BBFBFF'}}>Selected: {selectedFile.name}</span>
                </div>
                <Badge variant="secondary" className="px-3 py-1"
                       style={{
                         background: 'linear-gradient(to right, rgba(84, 9, 218, 0.3), rgba(78, 113, 255, 0.3))',
                         color: '#BBFBFF',
                         borderColor: 'rgba(84, 9, 218, 0.4)'
                       }}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Badge>
              </div>
            </div>
          )}

          {isUploading && uploadProgress > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium" style={{color: '#5409DA'}}>Cosmic Data Processing</span>
                <span className="font-bold" style={{color: '#4E71FF'}}>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-3 rounded-full"
                       style={{backgroundColor: 'rgba(20, 20, 30, 0.6)'}} />
            </div>
          )}

          <Separator className="h-px"
                    style={{background: 'linear-gradient(to right, transparent, rgba(84, 9, 218, 0.4), transparent)'}} />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onUpdateData}
              disabled={!selectedFile || isUploading}
              className="flex-1 border backdrop-blur-sm transition-all duration-300 shadow-lg text-lg py-6"
              style={{
                background: 'linear-gradient(to right, rgba(78, 113, 255, 0.4), rgba(141, 216, 255, 0.4))',
                borderColor: 'rgba(78, 113, 255, 0.4)',
                color: 'white'
              }}
            >
              {isUploading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" 
                       style={{borderColor: '#8DD8FF'}} />
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
            <div className="border rounded-xl p-4 backdrop-blur-sm transition-all duration-300"
                 style={{
                   background: 'linear-gradient(to br, rgba(20, 20, 30, 0.4), rgba(78, 113, 255, 0.4))',
                   borderColor: 'rgba(78, 113, 255, 0.4)'
                 }}>
              <div className="flex items-center gap-3 mb-2">
                <Server className="w-5 h-5" style={{color: '#4E71FF'}} />
                <span className="font-semibold" style={{color: '#4E71FF'}}>MinIO Storage</span>
              </div>
              <p className="text-sm" style={{color: 'rgba(78, 113, 255, 0.8)'}}>Port 9000 • Cosmic Object Storage</p>
            </div>
            <div className="border rounded-xl p-4 backdrop-blur-sm transition-all duration-300"
                 style={{
                   background: 'linear-gradient(to br, rgba(20, 20, 30, 0.4), rgba(141, 216, 255, 0.4))',
                   borderColor: 'rgba(141, 216, 255, 0.4)'
                 }}>
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5" style={{color: '#8DD8FF'}} />
                <span className="font-semibold" style={{color: '#8DD8FF'}}>Science Archive</span>
              </div>
              <p className="text-sm" style={{color: 'rgba(141, 216, 255, 0.8)'}}>Astronomical Metadata Repository</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadCard;
