
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, ArrowLeft, Shield, InfoIcon, FileText, AlertCircle } from "lucide-react";
import { slideUpFade } from "@/lib/animations";

interface ScanResultProps {
  result: "clean" | "suspicious" | "malicious";
  scanType: "file" | "url" | "domain" | "ip";
  itemName: string;
  onNewScan: () => void;
}

export const ScanResult = ({ result, scanType, itemName, onNewScan }: ScanResultProps) => {
  const getResultUI = () => {
    switch (result) {
      case "clean":
        return {
          icon: <CheckCircle size={28} />,
          title: "No Threats Detected",
          description: `This ${scanType} appears to be safe and no security risks were found.`,
          color: "text-spark-green",
          bgColor: "bg-spark-green/10",
          borderColor: "border-spark-green/20"
        };
      case "suspicious":
        return {
          icon: <AlertTriangle size={28} />,
          title: "Potentially Suspicious",
          description: `This ${scanType} contains some suspicious elements that may pose a security risk.`,
          color: "text-spark-yellow",
          bgColor: "bg-spark-yellow/10",
          borderColor: "border-spark-yellow/20"
        };
      case "malicious":
        return {
          icon: <XCircle size={28} />,
          title: "Threat Detected",
          description: `This ${scanType} contains malicious content and poses a security risk.`,
          color: "text-spark-red",
          bgColor: "bg-spark-red/10",
          borderColor: "border-spark-red/20"
        };
    }
  };

  const resultUI = getResultUI();

  const getRandomDetectionDetails = () => {
    if (result === "clean") {
      return [
        { name: "Virus", status: "Not detected" },
        { name: "Malware", status: "Not detected" },
        { name: "Phishing", status: "Not detected" },
        { name: "Suspicious URLs", status: "Not detected" }
      ];
    } else if (result === "suspicious") {
      return [
        { name: "Virus", status: "Not detected" },
        { name: "Malware", status: "Not detected" },
        { name: "Suspicious behavior", status: "Detected", threat: true },
        { name: "Unusual patterns", status: "Detected", threat: true }
      ];
    } else {
      return [
        { name: "Virus", status: "Detected", threat: true },
        { name: "Malware", status: "Detected", threat: true },
        { name: "Phishing", status: "Detected", threat: true },
        { name: "Suspicious URLs", status: "Detected", threat: true }
      ];
    }
  };

  const detectionDetails = getRandomDetectionDetails();

  // Get remediation advice based on result and scan type
  const getRemediationAdvice = () => {
    if (result === "clean") {
      return "No action needed. This item is safe to use.";
    } else if (result === "suspicious") {
      switch (scanType) {
        case "file":
          return "Exercise caution with this file. Consider scanning with another tool or avoid opening if uncertain.";
        case "url":
          return "Be cautious when visiting this URL. It may contain questionable content or use deceptive practices.";
        case "domain":
          return "Use caution when interacting with this domain. It shows some patterns consistent with suspicious activity.";
        case "ip":
          return "This IP address shows suspicious behavior. Monitor any connections to this address.";
      }
    } else {
      switch (scanType) {
        case "file":
          return "Delete this file immediately. It contains malicious code that can harm your system.";
        case "url":
          return "Do not visit this URL. It contains malicious content that can compromise your security.";
        case "domain":
          return "Avoid any interaction with this domain. It is associated with malicious activities.";
        case "ip":
          return "Block this IP address. It is known to host malicious content or engage in attacks.";
      }
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <motion.div
        variants={slideUpFade}
        initial="hidden"
        animate="visible"
        className="glass-card p-6 rounded-xl mb-8"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className={`w-20 h-20 rounded-full ${resultUI.bgColor} ${resultUI.color} flex items-center justify-center mb-4 border ${resultUI.borderColor}`}
          >
            {resultUI.icon}
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">{resultUI.title}</h2>
          <p className="text-spark-gray-300 max-w-md">{resultUI.description}</p>
        </div>

        <div className="glass-panel rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            <FileText size={18} className="text-spark-gray-300 mr-2" />
            <h3 className="text-lg font-medium">Scan Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex justify-between py-2 border-b border-spark-dark-500">
                <span className="text-spark-gray-300">Item Type</span>
                <span className="font-medium">
                  {scanType.charAt(0).toUpperCase() + scanType.slice(1)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-spark-dark-500">
                <span className="text-spark-gray-300">Item Name</span>
                <span className="font-medium font-mono truncate max-w-[200px]">{itemName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-spark-dark-500">
                <span className="text-spark-gray-300">Scan Time</span>
                <span className="font-medium">Just now</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between py-2 border-b border-spark-dark-500">
                <span className="text-spark-gray-300">Risk Level</span>
                <span className={
                  result === "clean" 
                    ? "text-spark-green font-medium" 
                    : result === "suspicious" 
                      ? "text-spark-yellow font-medium" 
                      : "text-spark-red font-medium"
                }>
                  {result === "clean" ? "Safe" : result === "suspicious" ? "Medium" : "High"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-spark-dark-500">
                <span className="text-spark-gray-300">Detection Engine</span>
                <span className="font-medium">SparkShield v1.0</span>
              </div>
              <div className="flex justify-between py-2 border-b border-spark-dark-500">
                <span className="text-spark-gray-300">Status</span>
                <span className="font-medium">Completed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            <Shield size={18} className="text-spark-gray-300 mr-2" />
            <h3 className="text-lg font-medium">Detection Results</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {detectionDetails.map((detail, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-spark-dark-500">
                <span className="text-spark-gray-300">{detail.name}</span>
                <span className={
                  detail.threat 
                    ? "text-spark-red font-medium" 
                    : "text-spark-green font-medium"
                }>
                  {detail.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {(result === "suspicious" || result === "malicious") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-lg p-4 mb-6 ${
              result === "suspicious" 
                ? "bg-spark-yellow/10 border border-spark-yellow/20" 
                : "bg-spark-red/10 border border-spark-red/20"
            }`}
          >
            <div className="flex items-start">
              {result === "suspicious" ? (
                <AlertTriangle size={18} className="text-spark-yellow mt-0.5 mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle size={18} className="text-spark-red mt-0.5 mr-2 flex-shrink-0" />
              )}
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {result === "suspicious" ? "Recommendation" : "Warning"}
                </h3>
                <p className="text-sm">{getRemediationAdvice()}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="glass-panel rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            <InfoIcon size={18} className="text-spark-gray-300 mr-2" />
            <h3 className="text-lg font-medium">AI Analysis</h3>
          </div>
          <p className="text-sm text-spark-gray-300 mb-4">
            {result === "clean" 
              ? `Our AI analysis confirms this ${scanType} is safe. No unusual patterns or behaviors were detected during the scan.` 
              : result === "suspicious" 
                ? `Our AI has detected some unusual patterns in this ${scanType}. While not definitively malicious, these patterns are consistent with potentially unsafe content.` 
                : `Our AI analysis confirms this ${scanType} contains malicious code designed to compromise security. Immediate action is recommended.`
            }
          </p>
          {(result === "suspicious" || result === "malicious") && (
            <div className="bg-spark-dark-700/80 rounded-lg p-3 text-xs font-mono">
              <div className="text-spark-gray-200 mb-1">// AI Detection Log</div>
              <div className="text-spark-gray-300">
                {result === "suspicious" 
                  ? `Detected behavioral anomaly at sequence [0x4F8A2C]. Pattern matching shows 78% similarity to known suspicious activities.` 
                  : `Malicious code signature identified. Hash match: 97% similarity to known threat "TrojanSpy.Win32.Agent". Entry point: 0x8F4B2D1C`
                }
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onNewScan}
            className="flex items-center gap-2 px-6 py-3 bg-spark-blue/10 hover:bg-spark-blue/20 text-spark-blue rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            New Scan
          </button>
        </div>
      </motion.div>
    </div>
  );
};
