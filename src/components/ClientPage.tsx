import { useState, useEffect } from "react";
import { Plus, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type result={
  functionalAreaName?:string,
  definition?:string,
  startDate?:string
}
interface FormData {
  functionalAreaName: string;
  isExternal: boolean;
  definition: string;
  // alignClients: Array[];
  startDate: string;
  endDate: string;
  status:string
}
const ClientPage = ({ storedData, setStoredData }:any) => {

  const [formData, setFormData] = useState<FormData>({
    functionalAreaName: "",
    definition: "",
    isExternal: false,
    // alignClients: [],
    startDate: "",
    endDate: "",
    status: ""          // if not need means, then delete it 
  });
  const [errors, setErrors] = useState<any>({});
  const [showDatePicker, setShowDatePicker] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log("storedData",storedData) ;    
 // console.log("curent date",currentDate)

  const handleInputChange = (field:any, value:any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev:any) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors:result = {};
    if (!formData.functionalAreaName.trim()) newErrors.functionalAreaName = "Please enter the Functional Area Name.";
    if (!formData.definition.trim()) newErrors.definition = "Please enter a Definition.";
    if (!formData.startDate) newErrors.startDate = "Start Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSave = async () => {
  if (!validateForm()) return;

  const newArea = {
    id: Date.now(),
    client: {
      functionalAreaName: formData.functionalAreaName,
      definition: formData.definition,
      isExternal: formData.isExternal,
      // alignClients: formData.alignClients,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status || "",    
    }
  };

  try {
    const res = await fetch(
      "https://689c201f58a27b18087cfaa5.mockapi.io/api/v1/users",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArea),
      }
    );

    if (!res.ok) throw new Error("Failed to save to MockAPI");

    const savedData = await res.json();

    setStoredData((prev:any)=>({
      ...prev,
      functionalAreas: [...prev.functionalAreas, savedData],
    }));

    alert("Client saved to MockAPI!");

    setFormData({
      functionalAreaName: "",
      definition: "",
      isExternal: false,
      // alignClients: [],
      startDate: "",
      endDate: "",
      status: ""
    });

  } catch (error) {
    console.error("Error saving to MockAPI:", error);
    alert("Failed to save. Please try again.");
  }
};

  const renderDatePicker = (field:keyof FormData) => 
 {
  const date = new Date(currentDate);      // it will be select according to our selection process           
  const year = date.getFullYear();         //2025
  const month = date.getMonth();            //6
  const daysInMonth = new Date(year, month + 1, 0).getDate();      // 31 , give the total number of days for that respective month
  const firstDayOfMonth = new Date(year, month, 1).getDay();      //  new Date(2025, 7, 1); it will be give the starting day- return 4 (friday)
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const days: React.ReactNode[] = [];

  const adjustedFirstDay = (firstDayOfMonth + 6) % 7;          //(5+6)%7=4 (friday)
  console.log("adjustedfirstday",adjustedFirstDay)

  for (let i = 0; i < adjustedFirstDay; i++) {                         // it give the first 4 empty space ,because of days starting from friday onwards
    days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
  }

  for (let day = 1; day <= daysInMonth; day++) 
  {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      console.log("dataString",dateString)
        const dateObj = new Date(dateString);
       console.log("dateObj",dateObj) 

     let isDisabled = false; 
    if (field === "endDate") {
      if (!formData.startDate) {  
        isDisabled = true;
      } else {
        const start = new Date(formData.startDate);
        console.log("start",start)            // get the start date for the validation
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
// console.log("days",days)
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
          <h1 className="text-xl font-semibold">Add Client </h1>
          <p className="text-sm text-gray-500">Create Client</p>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 bg-white rounded-lg shadow border space-y-4">
        {/* Functional Area Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Client Name</label>
          <input
            type="text"
            value={formData.functionalAreaName}
            onChange={(e) => handleInputChange("functionalAreaName", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.functionalAreaName && <p className="text-red-500 text-sm">{errors.functionalAreaName}</p>}
        </div>

        {/* Definition */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.definition}
            onChange={(e) => handleInputChange("definition", e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
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

        <div>
     <label className="block text-sm font-medium mb-1">Status</label>
    <select
       value={formData.status}      // single value, not array
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
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formData.startDate}
              readOnly
              placeholder="start Date"
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
          <label className="block text-sm font-medium mb-1">End Date</label>
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

export default ClientPage;
