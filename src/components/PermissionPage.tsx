// const PermissionPage = () => {
//   return (
//     <div>
//       <h1>permission page</h1>
//     </div>
//   )
// }

// export default PermissionPage


import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

type ErrorFields = {
  permissionName?: string;
  definition?: string;
  status?: string;
  client?: string;
};

const PermissionPage = ({ storedData, setStoredData }) => {
  const [formData, setFormData] = useState({
    permissionName: "",
    definition: "",
    status: "",
    client: "",
    permissionGroups: [],
    roles: []
  });
  const [errors, setErrors] = useState({});
  const [clients, setClients] = useState([]);
  const [permissionGroups, setPermissionGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showPermissionGroupDropdown, setShowPermissionGroupDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.permissionName.trim()) {
      newErrors.permissionName = "Please enter the Permission Name.";
    }
    if (!formData.definition.trim()) {
      newErrors.definition = "Please enter a Definition.";
    }
    if (!formData.status) {
      newErrors.status = "Please select a Status.";
    }
    if (!formData.client) {
      newErrors.client = "Please select a Client.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const newPermission = {
      id: Date.now(),
      permission: {
        permissionName: formData.permissionName,
        definition: formData.definition,
        status: formData.status,
        client: formData.client,
        permissionGroups: formData.permissionGroups,
        roles: formData.roles
      }
    };

    try {
      const res = await fetch(
        "https://689c201f58a27b18087cfaa5.mockapi.io/api/v1/permissions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPermission),
        }
      );

      if (!res.ok) throw new Error("Failed to save to MockAPI");

      const savedData = await res.json();

      setStoredData((prev) => ({
        ...prev,
        permissions: [...(prev.permissions || []), savedData],
      }));

      alert("Permission saved to MockAPI!");

      setFormData({
        permissionName: "",
        definition: "",
        status: "",
        client: "",
        permissionGroups: [],
        roles: []
      });
      setSelectedClient(null);

    } catch (error) {
      console.error("Error saving to MockAPI:", error);
      alert("Failed to save. Please try again.");
    }
  };

  // Multi-select handlers
  const handlePermissionGroupSelect = (group) => {
    const isSelected = formData.permissionGroups.some(pg => pg.id === group.id);
    if (isSelected) {
      setFormData(prev => ({
        ...prev,
        permissionGroups: prev.permissionGroups.filter(pg => pg.id !== group.id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissionGroups: [...prev.permissionGroups, group]
      }));
    }
  };

  const handleRoleSelect = (role) => {
    const isSelected = formData.roles.some(r => r.id === role.id);
    if (isSelected) {
      setFormData(prev => ({
        ...prev,
        roles: prev.roles.filter(r => r.id !== role.id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        roles: [...prev.roles, role]
      }));
    }
  };

  const removePermissionGroup = (groupId) => {
    setFormData(prev => ({
      ...prev,
      permissionGroups: prev.permissionGroups.filter(pg => pg.id !== groupId)
    }));
  };

  const removeRole = (roleId) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter(r => r.id !== roleId)
    }));
  };

  // Fetch data on component mount
  useEffect(() => {
    // Fetch Clients
    fetch("https://689c201f58a27b18087cfaa5.mockapi.io/api/v1/users")
      .then((res) => res.json())
      .then((data) => {
        const normalizedClients = data
          .filter((item) => "client" in item)
          .map((item) => ({
            id: item.id,
            name: item.client?.functionalAreaName || item.Name,
            status: item.client?.status || item.status,
          }));
        setClients(normalizedClients);
      })
      .catch((err) => console.error("Error fetching clients:", err));

    // Fetch Permission Groups from same API structure
    fetch("https://689c201f58a27b18087cfaa5.mockapi.io/api/v1/users")
      .then((res) => res.json())
      .then((data) => {
        const normalizedPermissionGroups = data
          .filter((item) => "permissionGroup" in item)
          .map((item) => ({
            id: item.id,
            name: item.permissionGroup?.groupName || item.Name,
            status: item.permissionGroup?.status || item.status,
          }))
          .filter(group => group.status && group.status.toLowerCase() === "active");
        setPermissionGroups(normalizedPermissionGroups);
      })
      .catch((err) => console.error("Error fetching permission groups:", err));

    // Fetch Roles from same API structure  
    fetch("https://689c201f58a27b18087cfaa5.mockapi.io/api/v1/users")
      .then((res) => res.json())
      .then((data) => {
        const normalizedRoles = data
          .filter((item) => "role" in item)
          .map((item) => ({
            id: item.id,
            name: item.role?.roleName || item.Name,
            status: item.role?.status || item.status,
          }))
          .filter(role => role.status && role.status.toLowerCase() === "active");
        setRoles(normalizedRoles);
      })
      .catch((err) => console.error("Error fetching roles:", err));
  }, []);

  // Filter active clients
  const activeClients = clients.filter(
    (c) => c.status && c.status.toLowerCase() === "active"
  );

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".multi-select-container")) {
        setShowPermissionGroupDropdown(false);
        setShowRoleDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white border-b p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Plus className="text-white w-4 h-4" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Add Permission</h1>
          <p className="text-sm text-gray-500">Create Permission</p>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 bg-white rounded-lg shadow border space-y-4">
        {/* Permission Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Permission Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.permissionName}
            onChange={(e) => handleInputChange("permissionName", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Permission Name"
          />
          {errors.permissionName && (
            <p className="text-red-500 text-sm">{errors.permissionName}</p>
          )}
        </div>

        {/* Definition */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Definition <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.definition}
            onChange={(e) => handleInputChange("definition", e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows="3"
            placeholder="Definition"
          />
          {errors.definition && (
            <p className="text-red-500 text-sm">{errors.definition}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Please select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </div>

        {/* Client */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Client <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.client}
            onChange={(e) => {
              const value = e.target.value;
              handleInputChange("client", value);
              
              // Find and set full client object
              const selected = activeClients.find((c) => c.name === value);
              setSelectedClient(selected || null);
            }}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Please select client</option>
            {activeClients.map((client, idx) => (
              <option key={idx} value={client.name}>
                {client.name}
              </option>
            ))}
          </select>
          {errors.client && (
            <p className="text-red-500 text-sm">{errors.client}</p>
          )}
        </div>

        {/* Permission Groups - Multi-Select */}
        <div className="multi-select-container relative">
          <label className="block text-sm font-medium mb-1">Permission Groups</label>
          
          {/* Selected Permission Groups Display */}
          <div className="w-full border rounded px-3 py-2 min-h-[40px] bg-white">
            <div className="flex flex-wrap gap-2">
              {formData.permissionGroups.map((group) => (
                <span
                  key={group.id}
                  className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  {group.name}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => removePermissionGroup(group.id)}
                  />
                </span>
              ))}
              <button
                type="button"
                onClick={() => setShowPermissionGroupDropdown(!showPermissionGroupDropdown)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                {formData.permissionGroups.length === 0 ? "Select permission groups..." : "Add more..."}
              </button>
            </div>
          </div>

          {/* Dropdown */}
          {showPermissionGroupDropdown && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {permissionGroups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => handlePermissionGroupSelect(group)}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    formData.permissionGroups.some(pg => pg.id === group.id)
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissionGroups.some(pg => pg.id === group.id)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {group.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Roles - Multi-Select */}
        <div className="multi-select-container relative">
          <label className="block text-sm font-medium mb-1">Roles</label>
          
          {/* Selected Roles Display */}
          <div className="w-full border rounded px-3 py-2 min-h-[40px] bg-white">
            <div className="flex flex-wrap gap-2">
              {formData.roles.map((role) => (
                <span
                  key={role.id}
                  className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                >
                  {role.name}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => removeRole(role.id)}
                  />
                </span>
              ))}
              <button
                type="button"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                {formData.roles.length === 0 ? "Select roles..." : "Add more..."}
              </button>
            </div>
          </div>

          {/* Dropdown */}
          {showRoleDropdown && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    formData.roles.some(r => r.id === role.id)
                      ? "bg-green-50 text-green-600"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.roles.some(r => r.id === role.id)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {role.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Client Info Table */}
        {selectedClient && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Selected Client Information</h3>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-3 py-2 text-left">Name</th>
                  <th className="border px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">{selectedClient.name}</td>
                  <td className="border px-3 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        selectedClient.status?.toLowerCase() === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedClient.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}



        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Save Permission
        </button>
      </div>
    </div>
  );
};

export default PermissionPage;
