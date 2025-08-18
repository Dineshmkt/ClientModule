import  { useState } from "react";
import { User, Users, Shield, Key } from "lucide-react";
import ClientPage from "./ClientPage";
import FunctionalPage from "./FunctionalPage";
import RolePage from "./RolePage";
import PermissionPage from "./PermissionPage";

const Admin = () => {
  const [currentPage, setCurrentPage] = useState("client");
  const [storedData, setStoredData] = useState({
    clients: [],
    functionalAreas: [],
    roles: [],
    permissions: []
  });

  const sidebarItems = [
    { id: "client", label: "Client", icon: User },
    { id: "functional", label: "Functional", icon: Users },
    { id: "role", label: "Role", icon: Shield },
    { id: "permission", label: "Permission", icon: Key }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "client":
        return <ClientPage storedData={storedData} setStoredData={setStoredData} />;
      case "functional":
        return <FunctionalPage storedData={storedData} setStoredData={setStoredData} />;
      case "role":
        return <RolePage storedData={storedData} setStoredData={setStoredData}/>;
      case "permission":
        return <PermissionPage storedData={storedData} setStoredData={setStoredData} />;
      default:
        return <ClientPage storedData={storedData} setStoredData={setStoredData} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-500">Management Dashboard</p>
        </div>

        <nav className="mt-6 flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default Admin;

