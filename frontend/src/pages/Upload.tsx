import React, { useState, useCallback } from 'react';
import { Upload as UploadIcon, X, FileImage, AlertCircle, CheckCircle2, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Alert, AlertDescription } from '../components/ui/alert';

// API Endpoint Configuration
const API_BASE_URL = 'https://unconditionally-pseudoelectoral-patti.ngrok-free.dev';

interface FileObject {
  file: File;
  id: string;
  preview: string | null;
}

interface ReconstructionResult {
  status: string;
  views: {
    front: string;
    left: string;
    right: string;
    back: string;
  };
   model_3d: string;  
  model_format: string; 
  message: string;
}

const Upload: React.FC = () => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete' | 'error'>('idle');
  const [reconstructedImages, setReconstructedImages] = useState<ReconstructionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [viewMode, setViewMode] = useState<'views' | 'model'>('views');

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
      file.type.startsWith('image/')
    );

    if (validFiles.length === 0) {
      setErrorMessage('Please upload image files only');
      return;
    }

    setFiles(validFiles.slice(0, 1).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file)
    })));
    setErrorMessage('');
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 1);
      setFiles(selectedFiles.map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        preview: URL.createObjectURL(file)
      })));
      setErrorMessage('');
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploadStatus('uploading');
    setUploadProgress(0);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', files[0].file);

      setUploadProgress(10);
      setUploadStatus('processing');

      // Send to Colab API
      const response = await fetch(`${API_BASE_URL}/api/reconstruct`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result: ReconstructionResult = await response.json();
      
      setUploadProgress(100);
      setReconstructedImages(result);
      setUploadStatus('complete');

    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during reconstruction');
      console.error('Upload error:', error);
    }
  };

  const resetUpload = () => {
    setFiles([]);
    setUploadProgress(0);
    setUploadStatus('idle');
    setReconstructedImages(null);
    setErrorMessage('');
  };

  const downloadImage = (base64: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64}`;
    link.download = filename;
    link.click();
  };

  const imageToUrl = (base64: string) => `data:image/png;base64,${base64}`;

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
            Share a historical site image for AI-powered 3D reconstruction with multi-angle views
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <Alert className="border-2 border-red-500/50 bg-red-500/10 mb-6">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <AlertDescription className="text-red-500">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

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

              <h3 className="text-xl font-bold text-white mb-2">Drop your image here</h3>
              <p className="text-[#888888] mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
                or click to browse from your computer
              </p>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
              />
              <label htmlFor="file-upload">
                <Button
                  asChild
                  className="bg-[#D4AF37] hover:bg-[#E5C04A] text-[#1C1C1E] font-semibold"
                >
                  <span>Choose Image</span>
                </Button>
              </label>

              <p className="text-xs text-[#888888] mt-4">
                Supported formats: JPG, PNG, WebP (Max 20MB)
              </p>
            </div>
          </Card>
        )}

        {/* File List */}
        {files.length > 0 && uploadStatus === 'idle' && (
          <Card className="mt-6 p-6 bg-[#1A1A1A] backdrop-blur-sm border-2 border-white/10 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Selected Image</h3>
              <Button variant="ghost" size="sm" onClick={() => setFiles([])} className="text-[#888888] hover:text-[#D4AF37]">
                Clear
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              {files.map((fileObj) => (
                <div
                  key={fileObj.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-[#222222] border border-white/10"
                >
                  {fileObj.preview && (
                    <img
                      src={fileObj.preview}
                      alt={fileObj.file.name}
                      className="w-16 h-16 object-cover rounded"
                    />
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
                {uploadStatus === 'uploading' ? 'Uploading Image...' : 'Generating 3D Views...'}
              </h3>
              <p className="text-[#888888]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                {uploadStatus === 'uploading'
                  ? 'Processing your uploaded image'
                  : 'AI is reconstructing all angles (front, left, right, back) - This takes 3-5 minutes'}
              </p>
            </div>

            <Progress value={uploadProgress} className="h-3 mb-2" />
            <p className="text-center text-sm text-[#888888]">{uploadProgress}% complete</p>
          </Card>
        )}

        {/* Error State */}
        {uploadStatus === 'error' && (
          <Card className="p-8 bg-[#1A1A1A] backdrop-blur-sm border-2 border-red-500/50 rounded-2xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Reconstruction Failed</h3>
              <p className="text-[#888888] mb-6">{errorMessage}</p>
              <Button
                onClick={resetUpload}
                className="bg-[#D4AF37] hover:bg-[#E5C04A] text-[#1C1C1E] font-semibold"
              >
                Try Again
              </Button>
            </div>
          </Card>
        )}

        {/* Upload Complete - Multi-View Display */}
        {uploadStatus === 'complete' && reconstructedImages && (
          <div className="space-y-6">
            <Alert className="border-2 border-[#D4AF37] bg-[#D4AF37]/10">
              <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" />
              <AlertDescription className="text-[#D4AF37] font-semibold">
                Reconstruction complete! Your monument has been reconstructed from 4 angles.
              </AlertDescription>
            </Alert>

            {/* 3D Views Grid */}
            <Card className="p-8 bg-[#1A1A1A] backdrop-blur-sm border-2 border-white/10 rounded-2xl">
              {/* View Mode Toggle */}
              <div className="flex justify-center gap-2 mb-8">
                <Button
                  onClick={() => setViewMode('views')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'views'
                      ? 'bg-[#D4AF37] text-[#1C1C1E]'
                      : 'bg-[#222222] text-[#888888] hover:text-white'
                  }`}
                >
                  <Layers className="h-4 w-4 mr-2" />
                  4 Views
                </Button>
                <Button
                  onClick={() => setViewMode('model')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'model'
                      ? 'bg-[#D4AF37] text-[#1C1C1E]'
                      : 'bg-[#222222] text-[#888888] hover:text-white'
                  }`}
                >
                  <FileImage className="h-4 w-4 mr-2" />
                  3D Model
                </Button>
              </div>

              {/* Conditional Content */}
              {viewMode === 'views' ? (
                <>
                  <h3 className="text-2xl font-bold text-white mb-8 text-center">AI-Generated Views</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {(['front', 'left', 'right', 'back'] as const).map((view) => (
                      <div key={view} className="space-y-3">
                        <div className="relative w-full aspect-square bg-[#222222] rounded-lg overflow-hidden border border-white/10">
                          <img
                            src={imageToUrl(reconstructedImages.views[view])}
                            alt={`${view} view`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-white font-medium capitalize">{view} View</p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadImage(reconstructedImages.views[view], `monument_${view}.png`)}
                            className="border-white/10 text-[#888888] hover:text-white"
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-8 text-center">3D Model Viewer</h3>
                  
                  {/* 3D Model Iframe */}
                  <div className="w-full aspect-video bg-[#222222] rounded-lg overflow-hidden border border-white/10 mb-8">
                    <iframe
                      src="https://huggingface.co/spaces/microsoft/TRELLIS.2/"
                      className="w-full h-full"
                      title="3D Model Viewer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-[#888888] mb-4">
                      Upload your 4 reconstructed views to TRELLIS for 3D model generation
                    </p>
                    <Button
                      asChild
                      className="bg-[#D4AF37] hover:bg-[#E5C04A] text-[#1C1C1E] font-semibold"
                    >
                      <a href="https://huggingface.co/spaces/microsoft/TRELLIS.2/" target="_blank" rel="noopener noreferrer">
                        Open in New Tab
                      </a>
                    </Button>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-8 border-t border-white/10">
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
                description: "Upload clear, well-lit photos for best reconstruction results"
              },
              {
                title: "Multi-Angle Generation",
                description: "Get front, left, right, and back views automatically"
              },
              {
                title: "AI Reconstruction",
                description: "Advanced AI restores missing details and reconstructs entire monuments"
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