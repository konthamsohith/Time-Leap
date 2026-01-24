import React, { useState, useCallback } from 'react';
import { Upload as UploadIcon, X, FileImage, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Alert, AlertDescription } from '../components/ui/alert';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, processing, complete

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
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

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }))]);
  };

  const removeFile = (id) => {
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
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] bg-clip-text text-transparent">
              Upload Your Discovery
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share historical site images or 3D models for AI-powered reconstruction
          </p>
        </div>

        {/* Upload Area */}
        {uploadStatus === 'idle' && (
          <Card
            className={`relative p-12 bg-card/50 backdrop-blur-sm border-2 transition-all ${
              isDragging
                ? 'border-[#D4AF37] bg-[#D4AF37]/5 scale-[1.02]'
                : 'border-dashed border-border hover:border-[#D4AF37]/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#D4AF37]/20 to-[#00BFA6]/20 rounded-full mb-6">
                <UploadIcon className="h-10 w-10 text-[#D4AF37]" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">Drop your files here</h3>
              <p className="text-muted-foreground mb-6">
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
                  className="bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] hover:from-[#E5C04A] hover:to-[#00D4C0] text-[#1C1C1E] font-semibold"
                >
                  <span>Choose Files</span>
                </Button>
              </label>
              
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: JPG, PNG, OBJ, FBX (Max 100MB per file)
              </p>
            </div>
          </Card>
        )}

        {/* File List */}
        {files.length > 0 && uploadStatus === 'idle' && (
          <Card className="mt-6 p-6 bg-card/50 backdrop-blur-sm border-2 border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Selected Files ({files.length})</h3>
              <Button variant="ghost" size="sm" onClick={() => setFiles([])} className="text-muted-foreground hover:text-destructive">
                Clear All
              </Button>
            </div>
            
            <div className="space-y-3 mb-6">
              {files.map((fileObj) => (
                <div
                  key={fileObj.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-background/50 border border-border"
                >
                  {fileObj.preview ? (
                    <img
                      src={fileObj.preview}
                      alt={fileObj.file.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#00BFA6]/20 rounded flex items-center justify-center">
                      <FileImage className="h-8 w-8 text-[#D4AF37]" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{fileObj.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(fileObj.id)}
                    className="hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button
              onClick={handleUpload}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] hover:from-[#E5C04A] hover:to-[#00D4C0] text-[#1C1C1E] font-semibold py-6"
            >
              Start AI Reconstruction
            </Button>
          </Card>
        )}

        {/* Upload Progress */}
        {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-border">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#00BFA6]/20 rounded-full mb-4 animate-pulse">
                {uploadStatus === 'uploading' ? (
                  <UploadIcon className="h-8 w-8 text-[#D4AF37]" />
                ) : (
                  <Layers className="h-8 w-8 text-[#00BFA6]" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {uploadStatus === 'uploading' ? 'Uploading Files...' : 'Processing Reconstruction...'}
              </h3>
              <p className="text-muted-foreground">
                {uploadStatus === 'uploading' 
                  ? 'Please wait while we upload your files' 
                  : 'AI is analyzing and reconstructing your site'}
              </p>
            </div>
            
            <Progress value={uploadProgress} className="h-3 mb-2" />
            <p className="text-center text-sm text-muted-foreground">{uploadProgress}% complete</p>
          </Card>
        )}

        {/* Upload Complete */}
        {uploadStatus === 'complete' && (
          <div className="space-y-6">
            <Alert className="border-2 border-[#00BFA6] bg-[#00BFA6]/5">
              <CheckCircle2 className="h-5 w-5 text-[#00BFA6]" />
              <AlertDescription className="text-[#00BFA6] font-semibold">
                Reconstruction complete! Your site has been successfully processed.
              </AlertDescription>
            </Alert>
            
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-border text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#00BFA6]/20 to-[#D4AF37]/20 rounded-full mb-6">
                <CheckCircle2 className="h-10 w-10 text-[#00BFA6]" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Success!</h3>
              <p className="text-muted-foreground mb-8">
                Your reconstruction is ready to view in 3D
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] hover:from-[#E5C04A] hover:to-[#00D4C0] text-[#1C1C1E] font-semibold"
                >
                  View Reconstruction
                </Button>
                <Button
                  variant="outline"
                  onClick={resetUpload}
                  className="border-[#D4AF37] hover:bg-[#D4AF37]/10"
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
              <Card key={index} className="p-6 bg-card/30 backdrop-blur-sm border border-border hover:border-[#D4AF37]/50 transition-all">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#00BFA6] mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-2">{info.title}</h4>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
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