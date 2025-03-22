
import { Scanner } from "@/components/Scanner";
import { Layout } from "@/components/Layout";
import { ScreenShareOff } from "lucide-react";

const PhishingDetector = () => {
  return (
    <Layout>
      <Scanner
        title="Phishing Detector"
        description="Detect and analyze potential phishing websites by entering a URL. Our AI will scan for suspicious patterns and security risks."
        icon={<ScreenShareOff size={32} />}
        placeholder="Enter website URL to check for phishing (e.g., https://example.com)"
        scanType="phishing"
      />
    </Layout>
  );
};

export default PhishingDetector;
