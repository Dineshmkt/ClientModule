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
        return <FunctionalPage storedData={storedData} />;
      case "role":
        return <RolePage />;
      case "permission":
        return <PermissionPage />;
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

        {/* <div className="p-4 bg-gray-100 m-4 rounded-lg">
          <p className="text-xs text-gray-600 font-medium mb-1">Data Storage</p>
          <p className="text-xs text-gray-500">
            Functional Areas: {storedData.functionalAreas.length}
          </p>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default Admin;

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