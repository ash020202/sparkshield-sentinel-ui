
import { Scanner } from "@/components/Scanner";
import { Layout } from "@/components/Layout";
import { Zap } from "lucide-react";

const CodeRepair = () => {
  return (
    <Layout>
      <Scanner
        title="Code Repair"
        description="Upload or paste your code to scan for security vulnerabilities, malware injections, and get AI-powered suggestions for repairs."
        icon={<Zap size={32} />}
        placeholder="Paste your code or upload a file"
        scanType="code"
      />
    </Layout>
  );
};

export default CodeRepair;
