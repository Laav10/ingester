
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
              onChange={onFileUpload}
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
              onClick={onUpdateData}
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
  );
};

export default FileUploadCard;
