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


        //   const handleSave = async () => {
//   if (!validateForm()) return;

//   const newArea = { id: Date.now(), ...formData };

//   try {
   
//     const res = await fetch(
//       "https://689c201f58a27b18087cfaa5.mockapi.io/api/v1/users",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newArea),
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to save to MockAPI");
//     }

//     const savedData = await res.json();

//     // Update local state
//     setStoredData((prev) => ({
//       ...prev,
//       functionalAreas: [...prev.functionalAreas, savedData],
//     }));

//     alert("Functional Area saved to MockAPI!");

//     // Reset form
//     setFormData({
//       functionalAreaName: "",
//       definition: "",
//       isExternal: false,
//       alignClients: [],
//       startDate: "",
//       endDate: "",
//     });

//   } catch (error) {
//     console.error("Error saving to MockAPI:", error);
//     alert("Failed to save. Please try again.");
//   }
// };




// import  { useState } from "react";

// export default function FunctionalPage() {
//   const [formData, setFormData] = useState({
//     functionalAreaName: "",
//     functionalAreaType: "",
//     isExternal: false,
//     definition: "",
//     alignClients: "",
//     startDate: "",
//     endDate: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     let newErrors = {};
//     if (!formData.functionalAreaName.trim())
//       newErrors.functionalAreaName = "Please enter the Functional Area Name.";
//     if (!formData.definition.trim())
//       newErrors.definition = "Please enter a Definition.";
//     if (!formData.startDate)
//       newErrors.startDate = "Please select the Start Date.";
//     if (!formData.endDate)
//       newErrors.endDate = "Please select the End Date.";
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
//     console.log("Functional Area saved:", formData);
//     // Store in localStorage or MockAPI here
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-lg font-semibold mb-4">Add Functional Area</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

//         {/* Functional Area Name */}
//         <div>
//           <label className="block font-medium">
//             Functional Area Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="functionalAreaName"
//             value={formData.functionalAreaName}
//             onChange={handleChange}
//             className={`w-full border rounded px-3 py-2 focus:outline-none ${
//               errors.functionalAreaName ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Functional Area Name"
//           />
//           {errors.functionalAreaName && (
//             <p className="text-red-500 text-sm">{errors.functionalAreaName}</p>
//           )}
//         </div>

//         {/* Functional Area Type & Is External */}
//         <div className="flex items-center gap-4">
//           <div className="flex-1">
//             <label className="block font-medium">Functional Area Type</label>
//             <input
//               type="text"
//               name="functionalAreaType"
//               value={formData.functionalAreaType}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 border-gray-300 focus:outline-none"
//               placeholder="Type"
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
//         <div className="col-span-2">
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

//         {/* Align Clients */}
//         <div className="col-span-2">
//           <label className="block font-medium">Align Clients</label>
//           <select
//             name="alignClients"
//             value={formData.alignClients}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 border-gray-300 focus:outline-none"
//           >
//             <option value="">Please select client names</option>
//             <option value="Client A">Client A</option>
//             <option value="Client B">Client B</option>
//           </select>
//         </div>

//         {/* Start Date */}
//         <div>
//           <label className="block font-medium">
//             Start Date <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             className={`w-full border rounded px-3 py-2 focus:outline-none ${
//               errors.startDate ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.startDate && (
//             <p className="text-red-500 text-sm">{errors.startDate}</p>
//           )}
//         </div>

//         {/* End Date */}
//         <div>
//           <label className="block font-medium">
//             End Date <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="endDate"
//             value={formData.endDate}
//             onChange={handleChange}
//             min={formData.startDate} // disable before start date
//             className={`w-full border rounded px-3 py-2 focus:outline-none ${
//               errors.endDate ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.endDate && (
//             <p className="text-red-500 text-sm">{errors.endDate}</p>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="col-span-2 flex justify-between mt-4">
//           <button
//             type="button"
//             className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
//           >
//             Back
//           </button>
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


// import React, { useState, useEffect } from 'react';
// import { User, Users, Shield, Key, Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// const AdminDashboard = () => {
//   const [currentPage, setCurrentPage] = useState('client');
//   const [formData, setFormData] = useState({
//     functionalAreaName: '',
//     definition: '',
//     isExternal: false,
//     alignClients: [],
//     startDate: '',
//     endDate: ''
//   });
//   const [showDatePicker, setShowDatePicker] = useState(null);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [errors, setErrors] = useState({});

//   // Simulated data storage (would use localStorage in real app)
//   const [storedData, setStoredData] = useState({
//     clients: [],
//     functionalAreas: [],
//     roles: [],
//     permissions: []
//   });

//   const sidebarItems = [
//     { id: 'client', label: 'Client', icon: User },
//     { id: 'functional', label: 'Functional', icon: Users },
//     { id: 'role', label: 'Role', icon: Shield },
//     { id: 'permission', label: 'Permission', icon: Key }
//   ];

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.functionalAreaName.trim()) {
//       newErrors.functionalAreaName = 'Please enter the Functional Area Name.';
//     }
    
//     if (!formData.definition.trim()) {
//       newErrors.definition = 'Please enter a Definition.';
//     }
    
//     if (!formData.startDate) {
//       newErrors.startDate = 'Start Date is required.';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = () => {
//     if (!validateForm()) {
//       return;
//     }

//     const newFunctionalArea = {
//       id: Date.now(),
//       ...formData,
//       createdAt: new Date().toISOString()
//     };

//     setStoredData(prev => ({
//       ...prev,
//       functionalAreas: [...prev.functionalAreas, newFunctionalArea]
//     }));

//     // In a real app, this would be:
//     // localStorage.setItem('adminData', JSON.stringify(updatedData));
    
//     alert('Functional Area saved successfully!');
    
//     // Reset form
//     setFormData({
//       functionalAreaName: '',
//       definition: '',
//       isExternal: false,
//       alignClients: [],
//       startDate: '',
//       endDate: ''
//     });
//   };

//   const renderDatePicker = (field) => {
//     const date = new Date(currentDate);
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const firstDayOfMonth = new Date(year, month, 1).getDay();
    
//     const monthNames = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ];
    
//     const days = [];
//     const today = new Date();
    
//     // Empty cells for days before the first day of the month
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
//     }
    
//     // Days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//       const isSelected = formData[field] === dateString;
//       const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
      
//       days.push(
//         <button
//           key={day}
//           className={`w-8 h-8 text-sm rounded hover:bg-blue-100 ${
//             isSelected ? 'bg-blue-600 text-white' : isToday ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
//           }`}
//           onClick={() => {
//             handleInputChange(field, dateString);
//             setShowDatePicker(null);
//           }}
//         >
//           {day}
//         </button>
//       );
//     }
    
//     return (
//       <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
//         <div className="flex items-center justify-between mb-4">
//           <button
//             onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
//             className="p-1 hover:bg-gray-100 rounded"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//           <span className="font-medium">
//             {monthNames[month]} {year}
//           </span>
//           <button
//             onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
//             className="p-1 hover:bg-gray-100 rounded"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
        
//         <div className="grid grid-cols-7 gap-1 mb-2">
//           {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
//             <div key={day} className="w-8 h-8 text-xs text-gray-500 flex items-center justify-center font-medium">
//               {day}
//             </div>
//           ))}
//         </div>
        
//         <div className="grid grid-cols-7 gap-1">
//           {days}
//         </div>
//       </div>
//     );
//   };

//   const renderFunctionalAreaForm = () => (
//     <div className="bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 p-6">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//             <Plus className="w-4 h-4 text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl font-semibold text-gray-900">Add Functional Area</h1>
//             <p className="text-sm text-gray-500">Create functional area</p>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Functional Area Name */}
//             <div className="lg:col-span-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Functional Area Name *
//               </label>
//               <input
//                 type="text"
//                 value={formData.functionalAreaName}
//                 onChange={(e) => handleInputChange('functionalAreaName', e.target.value)}
//                 placeholder="Functional Area Name"
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.functionalAreaName ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.functionalAreaName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.functionalAreaName}</p>
//               )}
//             </div>

//             {/* Functional Area Type */}
//             <div className="lg:col-span-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Functional Area Type
//               </label>
//               <div className="flex items-center gap-2 mt-3">
//                 <input
//                   type="checkbox"
//                   id="isExternal"
//                   checked={formData.isExternal}
//                   onChange={(e) => handleInputChange('isExternal', e.target.checked)}
//                   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <label htmlFor="isExternal" className="text-sm text-gray-700">
//                   Is External ?
//                 </label>
//               </div>
//             </div>

//             {/* Definition */}
//             <div className="lg:col-span-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Definition *
//               </label>
//               <textarea
//                 value={formData.definition}
//                 onChange={(e) => handleInputChange('definition', e.target.value)}
//                 placeholder="Definition"
//                 rows="4"
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
//                   errors.definition ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.definition && (
//                 <p className="mt-1 text-sm text-red-600">{errors.definition}</p>
//               )}
//             </div>

//             {/* Align Clients */}
//             <div className="lg:col-span-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Align Clients
//               </label>
//               <select
//                 multiple
//                 value={formData.alignClients}
//                 onChange={(e) => handleInputChange('alignClients', Array.from(e.target.selectedOptions, option => option.value))}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 size="4"
//               >
//                 <option value="">Please select client Names</option>
//                 <option value="client1">Client 1</option>
//                 <option value="client2">Client 2</option>
//                 <option value="client3">Client 3</option>
//                 <option value="client4">Client 4</option>
//               </select>
//             </div>

//             {/* Start Date */}
//             <div className="lg:col-span-1 relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Start Date *
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={formData.startDate}
//                   onClick={() => setShowDatePicker('startDate')}
//                   placeholder="MM/DD/YYYY"
//                   readOnly
//                   className={`w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
//                     errors.startDate ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 {showDatePicker === 'startDate' && renderDatePicker('startDate')}
//               </div>
//               {errors.startDate && (
//                 <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
//               )}
//             </div>

//             {/* End Date */}
//             <div className="lg:col-span-1 relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 End Date
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={formData.endDate}
//                   onClick={() => setShowDatePicker('endDate')}
//                   placeholder="MM/DD/YYYY"
//                   readOnly
//                   className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                 />
//                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 {showDatePicker === 'endDate' && renderDatePicker('endDate')}
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <button
//               onClick={() => setCurrentPage('client')}
//               className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Back
//             </button>
            
//             <button
//               onClick={handleSave}
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderContent = () => {
//     switch (currentPage) {
//       case 'client':
//         return renderFunctionalAreaForm();
//       case 'functional':
//         return (
//           <div className="bg-gray-50 flex items-center justify-center h-full">
//             <div className="text-center">
//               <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h2 className="text-xl font-semibold text-gray-700 mb-2">Functional Area Management</h2>
//               <p className="text-gray-500">Manage functional areas and their configurations</p>
//               <p className="text-sm text-gray-400 mt-2">Stored Areas: {storedData.functionalAreas.length}</p>
//             </div>
//           </div>
//         );
//       case 'role':
//         return (
//           <div className="bg-gray-50 flex items-center justify-center h-full">
//             <div className="text-center">
//               <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h2 className="text-xl font-semibold text-gray-700 mb-2">Role Management</h2>
//               <p className="text-gray-500">Define and manage user roles</p>
//             </div>
//           </div>
//         );
//       case 'permission':
//         return (
//           <div className="bg-gray-50 flex items-center justify-center h-full">
//             <div className="text-center">
//               <Key className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h2 className="text-xl font-semibold text-gray-700 mb-2">Permission Management</h2>
//               <p className="text-gray-500">Configure user permissions and access controls</p>
//             </div>
//           </div>
//         );
//       default:
//         return renderFunctionalAreaForm();
//     }
//   };

//   // Close date picker when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showDatePicker && !event.target.closest('.relative')) {
//         setShowDatePicker(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showDatePicker]);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col overflow-hidden">
//         <div className="p-6 border-b border-gray-200 flex-shrink-0">
//           <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
//           <p className="text-sm text-gray-500">Management Dashboard</p>
//         </div>
        
//         <nav className="mt-6 flex-1 overflow-hidden">
//           {sidebarItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = currentPage === item.id;
            
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => setCurrentPage(item.id)}
//                 className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
//                   isActive 
//                     ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
//                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
//                 }`}
//               >
//                 <Icon className="w-5 h-5" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         {/* Storage Info */}
//         <div className="p-4 bg-gray-100 m-4 rounded-lg flex-shrink-0">
//           <p className="text-xs text-gray-600 font-medium mb-1">Data Storage</p>
//           <p className="text-xs text-gray-500">
//             Functional Areas: {storedData.functionalAreas.length}
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


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