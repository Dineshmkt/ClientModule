import { useState, useEffect } from "react";
import { Plus, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type ErrorFields = {
 roleName ?: string;
  definition?: string;
  startDate?: string;
    endDate ?: string;
};

interface FormData {
  roleName: string;
  roleType:string;
  isExternal: boolean;
  definition: string;
  // alignClients: Array[];
  startDate: string;
  endDate: string;
  status:string
}

const RolePage = ({ storedData, setStoredData }:any) => {
  const [formData, setFormData] = useState<FormData>({
    roleName: "",
    roleType: "",
    isExternal: false,
    definition: "",
    startDate: "",
    endDate: "",
    status: ""
  });
  const [errors, setErrors] = useState<any>({});
  const [showDatePicker, setShowDatePicker] = useState<string|null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleInputChange = (field:any, value:any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev:any) => ({ ...prev, [field]: "" }));
    }
  };
 console.log(storedData)
  const validateForm = () => {
    const newErrors:ErrorFields = {};
    if (!formData.roleName.trim()) newErrors.roleName = "Please enter the Role Name.";
    if (!formData.definition.trim()) newErrors.definition = "Please enter the Definition.";
    if (!formData.startDate) newErrors.startDate = "Start Date is required.";
    if (!formData.endDate) newErrors.endDate = "End Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const newRole = {
      id: Date.now(),
      role: {
        roleName: formData.roleName,
        roleType: formData.roleType,
        isExternal: formData.isExternal,
        definition: formData.definition,
        startDate: formData.startDate,
        endDate: formData.endDate,
        // functionalArea: formData.functionalArea,
        status: formData.status || "",
      }
    };

    try {
      const res = await fetch(
        "https://689c201f58a27b18087cfaa5.mockapi.io/api/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRole),
        }
      );

      if (!res.ok) throw new Error("Failed to save to MockAPI");

      const savedData = await res.json();

      setStoredData((prev:any) => ({
        ...prev,
        roles: [...prev.roles, savedData],
      }));

      alert("Role saved to MockAPI!");

      setFormData({
        roleName: "",
        roleType: "",
        isExternal: false,
        definition: "",
        startDate: "",
        endDate: "",
        // functionalArea: "",
        status: ""
      });

    } catch (error) {
      console.error("Error saving to MockAPI:", error);
      alert("Failed to save. Please try again.");
    }
  };


    const renderDatePicker = (field:keyof FormData ) => 
{
  const date = new Date(currentDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const days: React.ReactNode[] = [];

  const adjustedFirstDay = (firstDayOfMonth + 6) % 7; 

  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
       const dateObj = new Date(dateString);

    let isDisabled = false;

   
    if (field === "endDate") {
      if (!formData.startDate) {
        
        isDisabled = true;
      } else {
        const start = new Date(formData.startDate);
        if (dateObj < start) {
          isDisabled = true; 
        }
      }
    }
   
       days.push(
  <button
    key={day}
    onClick={() => {
      if (!isDisabled) {
        handleInputChange(field, dateString);
        setShowDatePicker(null);
      }
    }}
    disabled={isDisabled}
    className={`w-8 h-8 text-sm rounded 
      ${formData[field] === dateString ? "bg-blue-600 text-white" : ""}
      ${isDisabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-blue-100"}
    `}
  >
    {day}
  </button>
);
  }

  return (
    <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg p-4 z-50 shadow">
      <div className="flex justify-between mb-2">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
          <ChevronLeft />
        </button>
        <span>{monthNames[month]} {year}</span>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
          <ChevronRight />
        </button>
      </div>

  
      <div className="grid grid-cols-7 gap-1 font-semibold text-sm mb-1">
        {weekDays.map((day) => (
          <div key={day} className="w-8 h-8 flex items-center justify-center text-gray-600">
            {day}
          </div>
        ))}
      </div>

    
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
};
  useEffect(() => {
    const handleClickOutside = (e:any) => {
      if (showDatePicker && !e.target.closest(".relative")) {
        setShowDatePicker(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDatePicker]);

  return (
    <div className="bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white border-b p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Plus className="text-white w-4 h-4" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Add Role</h1>
          <p className="text-sm text-gray-500">Create Role</p>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 bg-white rounded-lg shadow border space-y-4">
        {/* Role Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Role Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.roleName}
            onChange={(e) => handleInputChange("roleName", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Role Name"
          />
          {errors.roleName && <p className="text-red-500 text-sm">{errors.roleName}</p>}
        </div>

        {/* Role Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Role Type</label>
          <input
            type="text"
            value={formData.roleType}
            onChange={(e) => handleInputChange("roleType", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Role Type"
          />
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
            rows={3}
            placeholder="Definition"
          />
          {errors.definition && <p className="text-red-500 text-sm">{errors.definition}</p>}
        </div>

        {/* Is External */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isExternal}
            onChange={(e) => handleInputChange("isExternal", e.target.checked)}
          />
          <label className="text-sm">Is External</label>
        </div>

       

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Status --</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formData.startDate}
              readOnly
              placeholder="Start Date"
              className="w-full border rounded px-3 py-2"
              onClick={() => setShowDatePicker("startDate")}
            />
            <Calendar
              className="w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => setShowDatePicker("startDate")}
            />
          </div>
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
          {showDatePicker === "startDate" && renderDatePicker("startDate")}
        </div>

        {/* End Date */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            End Date <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formData.endDate}
              readOnly
              placeholder="End Date"
              className="w-full border rounded px-3 py-2"
              onClick={() => setShowDatePicker("endDate")}
            />
            <Calendar
              className="w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => setShowDatePicker("endDate")}
            />
          </div>
          {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
          {showDatePicker === "endDate" && renderDatePicker("endDate")}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RolePage;
