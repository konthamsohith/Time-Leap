import React, { useState, useCallback } from 'react';
import { Upload as UploadIcon, X, FileImage, AlertCircle, CheckCircle2, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Alert, AlertDescription } from '../components/ui/alert';

interface FileObject {
  file: File;
  id: string;
  preview: string | null;
}

const Upload: React.FC = () => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle'); // idle, uploading, processing, complete

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file =>
      file.type.startsWith('image/') || file.name.endsWith('.obj') || file.name.endsWith('.fbx')
    );

    setFiles(prev => [...prev, ...validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }))]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles.map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }))]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    setUploadStatus('uploading');
    setUploadProgress(0);

    // Mock upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('processing');
          setTimeout(() => {
            setUploadStatus('complete');
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetUpload = () => {
    setFiles([]);
    setUploadProgress(0);
    setUploadStatus('idle');
  };

  return (
    <div className="min-h-screen bg-[#111111] pt-32 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#222222] border border-white/10 rounded-2xl px-4 py-2 mb-6">
            <span className="text-sm font-medium text-[#BBBBBB]">Upload Site</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Upload Your Discovery
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Share historical site images or 3D models for AI-powered reconstruction
          </p>
        </div>

        {/* Upload Area */}
        {uploadStatus === 'idle' && (
          <Card
            className={`relative p-12 bg-[#1A1A1A] backdrop-blur-sm border-2 transition-all rounded-2xl ${isDragging
              ? 'border-[#D4AF37] bg-[#D4AF37]/5 scale-[1.02]'
              : 'border-dashed border-white/10 hover:border-[#D4AF37]/50'
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D4AF37]/10 rounded-full mb-6">
                <UploadIcon className="h-10 w-10 text-[#D4AF37]" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Drop your files here</h3>
              <p className="text-[#888888] mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
                or click to browse from your computer
              </p>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                accept="image/*,.obj,.fbx"
                onChange={handleFileInput}
              />
              <label htmlFor="file-upload">
                <Button
                  asChild
                  className="bg-[#D4AF37] hover:bg-[#E5C04A] text-[#1C1C1E] font-semibold"
                >
                  <span>Choose Files</span>
                </Button>
              </label>

              <p className="text-xs text-[#888888] mt-4">
                Supported formats: JPG, PNG, OBJ, FBX (Max 100MB per file)
              </p>
            </div>
          </Card>
        )}

        {/* File List */}
        {files.length > 0 && uploadStatus === 'idle' && (
          <Card className="mt-6 p-6 bg-[#1A1A1A] backdrop-blur-sm border-2 border-white/10 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Selected Files ({files.length})</h3>
              <Button variant="ghost" size="sm" onClick={() => setFiles([])} className="text-[#888888] hover:text-[#D4AF37]">
                Clear All
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              {files.map((fileObj) => (
                <div
                  key={fileObj.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-[#222222] border border-white/10"
                >
                  {fileObj.preview ? (
                    <img
                      src={fileObj.preview}
                      alt={fileObj.file.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-[#D4AF37]/10 rounded flex items-center justify-center">
                      <FileImage className="h-8 w-8 text-[#D4AF37]" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{fileObj.file.name}</p>
                    <p className="text-xs text-[#888888]">
                      {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(fileObj.id)}
                    className="hover:text-[#D4AF37]"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={handleUpload}
              className="w-full bg-[#D4AF37] hover:bg-[#E5C04A] text-[#1C1C1E] font-semibold py-6"
            >
              Start AI Reconstruction
            </Button>
          </Card>
        )}

        {/* Upload Progress */}
        {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
          <Card className="p-8 bg-[#1A1A1A] backdrop-blur-sm border-2 border-white/10 rounded-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37]/10 rounded-full mb-4 animate-pulse">
                {uploadStatus === 'uploading' ? (
                  <UploadIcon className="h-8 w-8 text-[#D4AF37]" />
                ) : (
                  <Layers className="h-8 w-8 text-[#D4AF37]" />
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {uploadStatus === 'uploading' ? 'Uploading Files...' : 'Processing Reconstruction...'}
              </h3>
              <p className="text-[#888888]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                {uploadStatus === 'uploading'
                  ? 'Please wait while we upload your files'
                  : 'AI is analyzing and reconstructing your site'}
              </p>
            </div>

            <Progress value={uploadProgress} className="h-3 mb-2" />
            <p className="text-center text-sm text-[#888888]">{uploadProgress}% complete</p>
          </Card>
        )}

        {/* Upload Complete */}
        {uploadStatus === 'complete' && (
          <div className="space-y-6">
            <Alert className="border-2 border-[#D4AF37] bg-[#D4AF37]/10">
              <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" />
              <AlertDescription className="text-[#D4AF37] font-semibold">
                Reconstruction complete! Your site has been successfully processed.
              </AlertDescription>
            </Alert>

            <Card className="p-8 bg-[#1A1A1A] backdrop-blur-sm border-2 border-white/10 rounded-2xl text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D4AF37]/10 rounded-full mb-6">
                <CheckCircle2 className="h-10 w-10 text-[#D4AF37]" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
              <p className="text-[#888888] mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Your reconstruction is ready to view in 3D
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-[#D4AF37] hover:bg-[#E5C04A] text-[#1C1C1E] font-semibold"
                >
                  View Reconstruction
                </Button>
                <Button
                  variant="outline"
                  onClick={resetUpload}
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  Upload Another
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Info Cards */}
        {uploadStatus === 'idle' && files.length === 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "High Quality Images",
                description: "Upload clear photos from multiple angles for best results"
              },
              {
                title: "3D Models",
                description: "Support for OBJ and FBX format 3D models"
              },
              {
                title: "AI Processing",
                description: "Advanced AI reconstructs historical accuracy automatically"
              }
            ].map((info, index) => (
              <Card key={index} className="p-6 bg-[#1A1A1A] backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/50 transition-all rounded-2xl">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{info.title}</h4>
                    <p className="text-sm text-[#888888]" style={{ fontFamily: "'Manrope', sans-serif" }}>{info.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;