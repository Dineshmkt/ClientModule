
import { useState, useEffect } from "react";
import { Plus, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type ErrorFields = {
  functionalAreaName?: string;
  definition?: string;
  startDate?: string;
  endDate?: string;
};
const FunctionalPage = ({ storedData, setStoredData }) => {
  const [formData, setFormData] = useState({
    functionalAreaName: "",
    functionalAreaType: "",
    isExternal: false,
    definition: "",
    alignClients: "",
    startDate: "",
    endDate: ""
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
   const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };


  const validateForm = () => {
  const newErrors: ErrorFields = {};

  if (!formData.functionalAreaName.trim()) {
    newErrors.functionalAreaName = "Please enter the Functional Area Name.";
  }
  if (!formData.definition.trim()) {
    newErrors.definition = "Please enter a Definition.";
  }
  if (!formData.startDate) {
    newErrors.startDate = "Start Date is required.";
  }
  if (!formData.endDate) {
    newErrors.endDate = "End Date is required.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSave = async () => {
    if (!validateForm()) return;

    const newFunctionalArea = {
      id: Date.now(),
      functionalArea: {
        functionalAreaName: formData.functionalAreaName,
        functionalAreaType: formData.functionalAreaType,
        isExternal: formData.isExternal,
        definition: formData.definition,
        alignClients: formData.alignClients,
        startDate: formData.startDate,
        endDate: formData.endDate,
      }
    };

    try {
      const res = await fetch(
        "https://689c201f58a27b18087cfaa5.mockapi.io/api/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFunctionalArea),
        }
      );

      if (!res.ok) throw new Error("Failed to save to MockAPI");

      const savedData = await res.json();

      setStoredData((prev) => ({
        ...prev,
        functionalAreas: [...prev.functionalAreas, savedData],
      }));

      alert("Functional Area saved to MockAPI!");

      setFormData({
        functionalAreaName: "",
        functionalAreaType: "",
        isExternal: false,
        definition: "",
        alignClients: "",
        startDate: "",
        endDate: ""
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

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const days = [];

    const adjustedFirstDay = (firstDayOfMonth + 6) % 7; 

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

  useEffect(() => {
    fetch("https://689c201f58a27b18087cfaa5.mockapi.io/api/v1/users") 
      .then((res) => res.json())
      .then((data) => {    
        const normalized = data
         .filter((item: any) => "client" in item) 
        .map((item: any) => {
          if (item.client) {
            return {
              name: item.client.functionalAreaName || item.Name,
              startDate: item.client.startDate,
              endDate: item.client.endDate,
              status: item.client.status || item.status,
            };
          } else if (item.functionalArea) {
            return {
              name: item.functionalArea.alignClients || item.Name,
              startDate: item.functionalArea.startDate,
              endDate: item.functionalArea.endDate,
              status: item.status,
            };
          } else {
            return {
              name: item.functionalAreaName || item.Name,
              startDate: item.startDate,
              endDate: item.endDate,
              status: item.status,
            };
          }
        });

        setClients(normalized);
      })
      .catch((err) => console.error("Error fetching clients:", err));
  }, []);
  console.log(clients)

   const activeClients = clients.filter(
    (c) => c.status && c.status.toLowerCase() === "active"
  );

//   const activeClients = clients.filter(
//   (c) => c.client && c.status && c.client.status?.toLowerCase() === "active"
// );

console.log(activeClients)

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selected = activeClients.find(
  //     (c) => c.name === e.target.value
  //   );
  //   setSelectedClient(selected || null);
  // };


  return (
    <div className="bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white border-b p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Plus className="text-white w-4 h-4" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Add Functional Area</h1>
          <p className="text-sm text-gray-500">Create Functional Area</p>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 bg-white rounded-lg shadow border space-y-4">
        {/* Functional Area Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Functional Area Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.functionalAreaName}
            onChange={(e) => handleInputChange("functionalAreaName", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Functional Area Name"
          />
          {errors.functionalAreaName && <p className="text-red-500 text-sm">{errors.functionalAreaName}</p>}
        </div>

        {/* Functional Area Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Functional Area Type</label>
          <input
            type="text"
            value={formData.functionalAreaType}
            onChange={(e) => handleInputChange("functionalAreaType", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Type"
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

        {/* Align Clients */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Align Clients</label>
          <select
            value={formData.alignClients}
            onChange={(e) => handleInputChange("alignClients", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Please select client names</option>
         
            {activeClients.map((client, idx) => (
          <option key={idx} value={client.name}>
            {client.name}
          </option>
        ))}
          </select>
        </div> */}

        {/* Align Clients */}
 <div>
   <label className="block text-sm font-medium mb-1">Align Clients</label>
    <select
     value={formData.alignClients}
     onChange={(e) => {
      const value = e.target.value;
      handleInputChange("alignClients", value);  // update formData
       // find and set full client object
      const selected = activeClients.find((c) => c.name === value);
      setSelectedClient(selected || null);
    }}
    className="w-full border rounded px-3 py-2"
  >
    <option value="">Please select client names</option>
    {activeClients.map((client, idx) => (
      <option key={idx} value={client.name}>
        {client.name}
      </option>
    ))}
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

        {selectedClient && (
        <table className="w-full border mt-4">
          <thead>
            <tr>
              <th className="border px-3 py-1">Name</th>
              <th className="border px-3 py-1">Status</th>
              <th className="border px-3 py-1">Start Date</th>
              <th className="border px-3 py-1">End Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-1">{selectedClient.name}</td>
              <td className="border px-3 py-1">{selectedClient.status}</td>
              <td className="border px-3 py-1">{selectedClient.startDate}</td>
              <td className="border px-3 py-1">{selectedClient.endDate}</td>
            </tr>
          </tbody>
        </table>
      )}

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

export default FunctionalPage;
