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