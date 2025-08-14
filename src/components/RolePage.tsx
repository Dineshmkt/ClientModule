// import  { useState } from "react";

// export default function RolePage() {
//   const [formData, setFormData] = useState({
//     roleName: "",
//     roleType: "",
//     isExternal: false,
//     definition: "",
//     startDate: "",
//     endDate: "",
//     functionalArea: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     let newErrors = {};
//     if (!formData.roleName.trim()) newErrors.roleName = "Please enter the Role Name.";
//     if (!formData.definition.trim()) newErrors.definition = "Please enter the Definition.";
//     if (!formData.startDate) newErrors.startDate = "Please select the Start Date.";
//     if (!formData.endDate) newErrors.endDate = "Please select the End Date.";
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = validate();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//     console.log("Form submitted:", formData);
//     // save to MockAPI or localStorage here
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-lg font-semibold mb-4">Role Info</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Role Name */}
//         <div>
//           <label className="block font-medium">
//             Role Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="roleName"
//             value={formData.roleName}
//             onChange={handleChange}
//             className={`w-full border rounded px-3 py-2 focus:outline-none ${
//               errors.roleName ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Role Name"
//           />
//           {errors.roleName && (
//             <p className="text-red-500 text-sm">{errors.roleName}</p>
//           )}
//         </div>

//         {/* Role Type & Is External */}
//         <div className="flex items-center gap-4">
//           <div className="flex-1">
//             <label className="block font-medium">Role Type</label>
//             <input
//               type="text"
//               name="roleType"
//               value={formData.roleType}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 border-gray-300 focus:outline-none"
//               placeholder="Role Type"
//             />
//           </div>
//           <div className="flex items-center mt-6">
//             <input
//               type="checkbox"
//               name="isExternal"
//               checked={formData.isExternal}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label>Is External?</label>
//           </div>
//         </div>

//         {/* Definition */}
//         <div>
//           <label className="block font-medium">
//             Definition <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             name="definition"
//             value={formData.definition}
//             onChange={handleChange}
//             className={`w-full border rounded px-3 py-2 focus:outline-none ${
//               errors.definition ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Definition"
//           ></textarea>
//           {errors.definition && (
//             <p className="text-red-500 text-sm">{errors.definition}</p>
//           )}
//         </div>

      
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">
//               Start Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className={`w-full border rounded px-3 py-2 focus:outline-none ${
//                 errors.startDate ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.startDate && (
//               <p className="text-red-500 text-sm">{errors.startDate}</p>
//             )}
//           </div>

//           <div>
//             <label className="block font-medium">
//               End Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               min={formData.startDate} // disable before start date
//               className={`w-full border rounded px-3 py-2 focus:outline-none ${
//                 errors.endDate ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.endDate && (
//               <p className="text-red-500 text-sm">{errors.endDate}</p>
//             )}
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Plus, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const RolePage = ({ storedData, setStoredData }) => {
  const [formData, setFormData] = useState({
    roleName: "",
    roleType: "",
    isExternal: false,
    definition: "",
    startDate: "",
    endDate: "",
    functionalArea: "",
    status: ""
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleInputChange = (field:any, value:any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
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
        functionalArea: formData.functionalArea,
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

      setStoredData((prev) => ({
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
        functionalArea: "",
        status: ""
      });

    } catch (error) {
      console.error("Error saving to MockAPI:", error);
      alert("Failed to save. Please try again.");
    }
  };

  const renderDatePicker = (field) => {
    const date = new Date(currentDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    // Weekday names (starting Monday)
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const days = [];

    // Adjust first day index for Monday start
    const adjustedFirstDay = (firstDayOfMonth + 6) % 7; // Shift Sunday(0) to end

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      days.push(
        <button
          key={day}
          onClick={() => {
            handleInputChange(field, dateString);
            setShowDatePicker(null);
          }}
          className={`w-8 h-8 text-sm rounded ${
            formData[field] === dateString
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100"
          }`}
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
    const handleClickOutside = (e) => {
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
            rows="3"
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

        {/* Functional Area */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Functional Area</label>
          <select
            value={formData.functionalArea}
            onChange={(e) => handleInputChange("functionalArea", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Functional Area --</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>
        </div> */}
        

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
