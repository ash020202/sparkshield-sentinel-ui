
import { motion } from "framer-motion";
import { 
  FileSearch, 
  Globe, 
  HomeIcon, 
  LinkIcon, 
  PanelLeft,
  ScreenShareOff, 
  Server, 
  Shield, 
  Zap 
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { 
      name: "Dashboard", 
      icon: <HomeIcon size={20} />, 
      path: "/" 
    },
    { 
      name: "File Scanner", 
      icon: <FileSearch size={20} />, 
      path: "/file-scanner" 
    },
    { 
      name: "URL Scanner", 
      icon: <LinkIcon size={20} />, 
      path: "/url-scanner" 
    },
    { 
      name: "Domain Scanner", 
      icon: <Globe size={20} />, 
      path: "/domain-scanner" 
    },
    { 
      name: "IP Scanner", 
      icon: <Server size={20} />, 
      path: "/ip-scanner" 
    },
    { 
      name: "Phishing Detector", 
      icon: <ScreenShareOff size={20} />, 
      path: "/phishing-detector" 
    },
    { 
      name: "Code Repair", 
      icon: <Zap size={20} />, 
      path: "/code-repair" 
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out h-screen glass-panel fixed md:relative z-20`}
    >
      <div className="h-full flex flex-col py-6">
        <div className="px-4 mb-6 flex items-center">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mr-2"
            >
              <div className="flex items-center gap-2">
                <Shield size={24} className="text-spark-blue" />
                <span className="font-bold text-lg text-gradient-blue">SparkShield</span>
              </div>
            </motion.div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <Shield size={24} className="text-spark-blue" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 text-spark-gray-300 hover:text-white transition-colors"
          >
            <PanelLeft size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none px-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-spark-blue/10 text-white"
                      : "text-spark-gray-300 hover:bg-spark-dark-500/70 hover:text-white"
                  } ${collapsed ? "justify-center" : "justify-start"}`}
                >
                  <span 
                    className={`${
                      isActive(item.path) ? "text-spark-blue" : ""
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className={`text-sm ${isActive(item.path) ? "font-medium" : ""}`}>
                      {item.name}
                    </span>
                  )}
                  {isActive(item.path) && !collapsed && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute right-2 w-1.5 h-1.5 rounded-full bg-spark-blue"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto px-4">
          <div className={`glass-card p-3 rounded-lg ${collapsed ? "text-center" : ""}`}>
            {!collapsed ? (
              <div>
                <div className="flex items-center text-xs mb-2 font-medium text-spark-gray-200">
                  <Shield size={14} className="mr-1.5 text-spark-green" />
                  Shield Status: Active
                </div>
                <div className="text-xs text-spark-gray-300">Real-time protection enabled</div>
              </div>
            ) : (
              <div className="flex justify-center">
                <Shield size={18} className="text-spark-green" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
