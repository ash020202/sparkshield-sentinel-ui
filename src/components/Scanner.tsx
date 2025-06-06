import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Upload, Github, Image } from "lucide-react";
import { ScanResult } from "./ScanResult";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface ScannerProps {
  title: string;
  description: string;
  icon: ReactNode;
  placeholder: string;
  scanType: "file" | "url" | "domain" | "ip" | "code" | "phishing";
}

export const Scanner = ({ title, description, icon, placeholder, scanType }: ScannerProps) => {
  const [input, setInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scanResult, setScanResult] = useState<"clean" | "suspicious" | "malicious">("clean");

  const handleScan = () => {
    if (!input) return;
    
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      
      // Randomly determine a scan result for demo purposes
      const results = ["clean", "suspicious", "malicious"] as const;
      const randomResult = results[Math.floor(Math.random() * results.length)];
      
      setScanResult(randomResult);
      setShowResults(true);
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (scanType === "file" && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setInput(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setInput(e.target.files[0].name);
    }
  };

  const resetScan = () => {
    setInput("");
    setShowResults(false);
  };

  const renderInputSection = () => {
    if (scanType === "phishing") {
      return (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging
              ? "border-spark-blue bg-spark-blue/5"
              : "border-spark-dark-500 hover:border-spark-blue/50"
          }`}
        >
          <Image className="mx-auto h-12 w-12 text-spark-gray-300 mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Upload a screenshot of the suspicious website
          </h3>
          <p className="text-spark-gray-300 text-sm mb-4">
            Our AI will analyze the screenshot for phishing indicators
          </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-spark-blue/10 hover:bg-spark-blue/20 text-spark-blue border border-spark-blue/20 rounded-lg cursor-pointer transition-colors"
          >
            Browse Screenshots
          </label>
          {input && (
            <div className="mt-4 text-sm text-spark-gray-200">
              Selected: <span className="font-medium">{input}</span>
            </div>
          )}
        </div>
      );
    } else if (scanType === "code") {
      return (
        <div>
          <label className="block text-sm font-medium text-spark-gray-200 mb-2">
            Enter GitHub repository URL to scan
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-spark-gray-400">
                <Github size={16} />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-spark-dark-700 border border-spark-dark-500 focus:border-spark-blue/50 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-spark-gray-400 outline-none transition-colors"
              />
            </div>
            <button
              onClick={handleScan}
              disabled={!input || isScanning}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                !input || isScanning
                  ? "bg-spark-dark-500 text-spark-gray-300 cursor-not-allowed"
                  : "bg-spark-blue text-white hover:bg-spark-blue-dark"
              }`}
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  Scanning...
                </>
              ) : (
                <>
                  Scan
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-spark-gray-300 flex items-center">
            <AlertCircle size={12} className="mr-1 text-spark-gray-400" />
            Repository must be public for scanning
          </p>
        </div>
      );
    } else if (scanType === "file") {
      return (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging
              ? "border-spark-blue bg-spark-blue/5"
              : "border-spark-dark-500 hover:border-spark-blue/50"
          }`}
        >
          <Upload className="mx-auto h-12 w-12 text-spark-gray-300 mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Drag and drop your file here
          </h3>
          <p className="text-spark-gray-300 text-sm mb-4">
            or click to browse from your computer
          </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-spark-blue/10 hover:bg-spark-blue/20 text-spark-blue border border-spark-blue/20 rounded-lg cursor-pointer transition-colors"
          >
            Browse Files
          </label>
          {input && (
            <div className="mt-4 text-sm text-spark-gray-200">
              Selected: <span className="font-medium">{input}</span>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <label className="block text-sm font-medium text-spark-gray-200 mb-2">
            Enter {scanType === "url" ? "URL" : scanType === "domain" ? "domain name" : "IP address"} to scan
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-spark-dark-700 border border-spark-dark-500 focus:border-spark-blue/50 rounded-lg px-4 py-2.5 text-white placeholder-spark-gray-400 outline-none transition-colors"
            />
            <button
              onClick={handleScan}
              disabled={!input || isScanning}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                !input || isScanning
                  ? "bg-spark-dark-500 text-spark-gray-300 cursor-not-allowed"
                  : "bg-spark-blue text-white hover:bg-spark-blue-dark"
              }`}
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  Scanning...
                </>
              ) : (
                <>
                  Scan
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
          {scanType === "url" && (
            <p className="mt-2 text-xs text-spark-gray-300 flex items-center">
              <AlertCircle size={12} className="mr-1 text-spark-gray-400" />
              Use complete URLs including http:// or https://
            </p>
          )}
        </div>
      );
    }
  };

  if (showResults) {
    return <ScanResult result={scanResult} scanType={scanType} itemName={input} onNewScan={resetScan} />;
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-spark-blue/10 mb-4">
          <div className="text-spark-blue">{icon}</div>
        </div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-spark-gray-300 max-w-xl mx-auto">
          {description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-6 rounded-xl mb-8"
      >
        {renderInputSection()}
      </motion.div>

      {scanType === "phishing" && input && (
        <div className="flex justify-center">
          <button
            onClick={handleScan}
            disabled={isScanning}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isScanning
                ? "bg-spark-dark-500 text-spark-gray-300 cursor-not-allowed"
                : "bg-spark-blue text-white hover:bg-spark-blue-dark"
            }`}
          >
            {isScanning ? (
              <>
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                Scanning...
              </>
            ) : (
              <>
                Analyze Screenshot
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      )}

      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <div className="glass-card inline-block px-6 py-3 rounded-full">
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-t-transparent border-spark-blue rounded-full animate-spin mr-3"></div>
              <span className="text-sm">
                {scanType === "phishing" 
                  ? "Analyzing screenshot for phishing indicators..." 
                  : scanType === "code" 
                    ? "Scanning repository for security vulnerabilities..." 
                    : "Scanning for threats..."}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
