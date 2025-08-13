// const renderDatePicker = (field:any) => {
  //   const date = new Date(currentDate);
  //   const year = date.getFullYear();
  //   const month = date.getMonth();
  //   const daysInMonth = new Date(year, month + 1, 0).getDate();
  //   const firstDayOfMonth = new Date(year, month, 1).getDay();
  //   const monthNames = [
  //     "January","February","March","April","May","June",
  //     "July","August","September","October","November","December"
  //   ];

  //   const days = [];
  //   for (let i = 0; i < firstDayOfMonth; i++) days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
  //   for (let day = 1; day <= daysInMonth; day++) {
  //     const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  //     days.push(
  //       <button
  //         key={day}
  //         onClick={() => {
  //           handleInputChange(field, dateString);
  //           setShowDatePicker(null);
  //         }}
  //         className={`w-8 h-8 text-sm rounded ${
  //           formData[field] === dateString
  //             ? "bg-blue-600 text-white"
  //             : "text-gray-700 hover:bg-blue-100"
  //         }`}
  //       >
  //         {day}
  //       </button>
  //     );
  //   }

//   const renderDatePicker = (field: any) => {
//   const date = new Date(currentDate);
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const firstDayOfMonth = new Date(year, month, 1).getDay();
//   const monthNames = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December"
//   ];

//   // Weekday names (starting Monday)
//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const days: JSX.Element[] = [];

//   // Adjust first day index for Monday start
//   const adjustedFirstDay = (firstDayOfMonth + 6) % 7; // Shift Sunday(0) to end

//   for (let i = 0; i < adjustedFirstDay; i++) {
//     days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
//   }

//   for (let day = 1; day <= daysInMonth; day++) {
//     const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
//     days.push(
//       <button
//         key={day}
//         onClick={() => {
//           handleInputChange(field, dateString);
//           setShowDatePicker(null);
//         }}
//         className={`w-8 h-8 text-sm rounded ${
//           formData[field] === dateString
//             ? "bg-blue-600 text-white"
//             : "text-gray-700 hover:bg-blue-100"
//         }`}
//       >
//         {day}
//       </button>
//     );
//   }

//   return (
//     <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg p-4 z-50 shadow">
//       <div className="flex justify-between mb-2">
//         <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
//           <ChevronLeft />
//         </button>
//         <span>{monthNames[month]} {year}</span>
//         <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
//           <ChevronRight />
//         </button>
//       </div>

//       {/* Weekday header */}
//       <div className="grid grid-cols-7 gap-1 font-semibold text-sm mb-1">
//         {weekDays.map((day) => (
//           <div key={day} className="w-8 h-8 flex items-center justify-center text-gray-600">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* Days grid */}
//       <div className="grid grid-cols-7 gap-1">{days}</div>
//     </div>
//   );
// };

  //   return (
  //     <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg p-4 z-50 shadow">
  //       <div className="flex justify-between mb-2">
  //         <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}><ChevronLeft /></button>
  //         <span>{monthNames[month]} {year}</span>
  //         <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}><ChevronRight /></button>
  //       </div>
  //       <div className="grid grid-cols-7 gap-1">{days}</div>
  //     </div>
  //   );
  // };


  // import React, { useState, useEffect } from "react";
  // import { Plus, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
  
  // const ClientPage = ({ storedData, setStoredData }) => {
  //   const [formData, setFormData] = useState({
  //     functionalAreaName: "",
  //     definition: "",
  //     isExternal: false,
  //     alignClients: [],
  //     startDate: "",
  //     endDate: ""
  //   });
  //   const [errors, setErrors] = useState({});
  //   const [showDatePicker, setShowDatePicker] = useState(null);
  //   const [currentDate, setCurrentDate] = useState(new Date());
  
  //   const handleInputChange = (field, value) => {
  //     setFormData((prev) => ({ ...prev, [field]: value }));
  //     if (errors[field]) {
  //       setErrors((prev) => ({ ...prev, [field]: "" }));
  //     }
  //   };
  
  //   const validateForm = () => {
  //     const newErrors = {};
  //     if (!formData.functionalAreaName.trim()) newErrors.functionalAreaName = "Please enter the Functional Area Name.";
  //     if (!formData.definition.trim()) newErrors.definition = "Please enter a Definition.";
  //     if (!formData.startDate) newErrors.startDate = "Start Date is required.";
  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };
  
  //   const handleSave = () => {
  //     if (!validateForm()) return;
  //     const newArea = { id: Date.now(), ...formData };
  //     setStoredData((prev) => ({
  //       ...prev,
  //       functionalAreas: [...prev.functionalAreas, newArea]
  //     }));
  //     alert("Functional Area saved!");
  //     setFormData({
  //       functionalAreaName: "",
  //       definition: "",
  //       isExternal: false,
  //       alignClients: [],
  //       startDate: "",
  //       endDate: ""
  //     });
  //   };
  
  //   const renderDatePicker = (field) => {
  //     const date = new Date(currentDate);
  //     const year = date.getFullYear();
  //     const month = date.getMonth();
  //     const daysInMonth = new Date(year, month + 1, 0).getDate();
  //     const firstDayOfMonth = new Date(year, month, 1).getDay();
  //     const monthNames = [
  //       "January","February","March","April","May","June",
  //       "July","August","September","October","November","December"
  //     ];
  
  //     const days = [];
  //     for (let i = 0; i < firstDayOfMonth; i++) days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
  //     for (let day = 1; day <= daysInMonth; day++) {
  //       const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  //       days.push(
  //         <button
  //           key={day}
  //           onClick={() => {
  //             handleInputChange(field, dateString);
  //             setShowDatePicker(null);
  //           }}
  //           className={`w-8 h-8 text-sm rounded ${
  //             formData[field] === dateString
  //               ? "bg-blue-600 text-white"
  //               : "text-gray-700 hover:bg-blue-100"
  //           }`}
  //         >
  //           {day}
  //         </button>
  //       );
  //     }
  
  //     return (
  //       <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg p-4 z-50 shadow">
  //         <div className="flex justify-between mb-2">
  //           <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}><ChevronLeft /></button>
  //           <span>{monthNames[month]} {year}</span>
  //           <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}><ChevronRight /></button>
  //         </div>
  //         <div className="grid grid-cols-7 gap-1">{days}</div>
  //       </div>
  //     );
  //   };
  
  //   useEffect(() => {
  //     const handleClickOutside = (e) => {
  //       if (showDatePicker && !e.target.closest(".relative")) {
  //         setShowDatePicker(null);
  //       }
  //     };
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => document.removeEventListener("mousedown", handleClickOutside);
  //   }, [showDatePicker]);
  
  //   return (
  //     <div className="bg-gray-50 p-6">
  //       <div className="bg-white border-b p-6 flex items-center gap-3">
  //         <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
  //           <Plus className="text-white w-4 h-4" />
  //         </div>
  //         <div>
  //           <h1 className="text-xl font-semibold">Add Functional Area</h1>
  //           <p className="text-sm text-gray-500">Create functional area</p>
  //         </div>
  //       </div>
  //       {/* Form */}
  //       <div className="p-6 bg-white rounded-lg shadow border">
  //         {/* Input fields here (same as your original) */}
  //         {/* Start date picker here */}
  //         {/* Save button */}
  //         <button onClick={handleSave} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">Save</button>
  //       </div>
  //     </div>
  //   );
  // };
  
  // export default ClientPage;


  
        {/* Align Clients */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            multiple
            value={formData.alignClients}
            onChange={(e) =>
              handleInputChange("alignClients", Array.from(e.target.selectedOptions, opt => opt.value))
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="Client A">Active</option>
            <option value="Client B">InActive</option>
           
          </select>
        </div> */}
