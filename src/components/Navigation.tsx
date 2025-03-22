
import { useLocation } from "react-router-dom";
import { 
  FileSearch, 
  Globe, 
  Home, 
  LinkIcon, 
  PanelLeft,
  ScreenShareOff, 
  Server, 
  Shield, 
  Zap 
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { 
      name: "Dashboard", 
      icon: <Home size={20} />, 
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
    <SidebarProvider defaultOpen={true}>
      <Sidebar className="bg-spark-dark-700/80 border-spark-dark-500/50 shadow-lg">
        <SidebarHeader className="px-4 py-5">
          <div className="flex items-center gap-2">
            <Shield size={24} className="text-spark-blue" />
            <span className="font-bold text-lg text-gradient-blue">SparkShield</span>
          </div>
          <SidebarTrigger className="absolute right-2 top-5 text-spark-gray-300 hover:text-white" />
        </SidebarHeader>
        
        <SidebarContent className="px-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.name}
                  isActive={isActive(item.path)}
                  className={`${
                    isActive(item.path) 
                      ? "bg-spark-blue/10 text-white" 
                      : "text-spark-gray-300 hover:bg-spark-dark-500/70 hover:text-white"
                  }`}
                >
                  <Link to={item.path} className="flex items-center gap-3">
                    <span className={`${isActive(item.path) ? "text-spark-blue" : ""}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="mt-auto px-4 pb-6">
          <div className="glass-card p-3 rounded-lg">
            <div className="flex items-center text-xs mb-2 font-medium text-spark-gray-200">
              <Shield size={14} className="mr-1.5 text-spark-green" />
              Shield Status: Active
            </div>
            <div className="text-xs text-spark-gray-300">Real-time protection enabled</div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};
