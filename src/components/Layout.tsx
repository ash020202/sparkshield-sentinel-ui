
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "./Loader";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show loader for dashboard page (root path)
    if (location.pathname === "/") {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-spark-dark relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20 z-0"></div>
      <div className="relative z-10 flex min-h-screen">
        <Navigation />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};
