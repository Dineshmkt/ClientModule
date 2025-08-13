
import  { useState } from "react";

export default function FunctionalPage() {
  const [formData, setFormData] = useState({
    functionalAreaName: "",
    functionalAreaType: "",
    isExternal: false,
    definition: "",
    alignClients: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.functionalAreaName.trim())
      newErrors.functionalAreaName = "Please enter the Functional Area Name.";
    if (!formData.definition.trim())
      newErrors.definition = "Please enter a Definition.";
    if (!formData.startDate)
      newErrors.startDate = "Please select the Start Date.";
    if (!formData.endDate)
      newErrors.endDate = "Please select the End Date.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log("Functional Area saved:", formData);
    // Store in localStorage or MockAPI here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Add Functional Area</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        {/* Functional Area Name */}
        <div>
          <label className="block font-medium">
            Functional Area Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="functionalAreaName"
            value={formData.functionalAreaName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.functionalAreaName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Functional Area Name"
          />
          {errors.functionalAreaName && (
            <p className="text-red-500 text-sm">{errors.functionalAreaName}</p>
          )}
        </div>

        {/* Functional Area Type & Is External */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block font-medium">Functional Area Type</label>
            <input
              type="text"
              name="functionalAreaType"
              value={formData.functionalAreaType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 border-gray-300 focus:outline-none"
              placeholder="Type"
            />
          </div>
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              name="isExternal"
              checked={formData.isExternal}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Is External?</label>
          </div>
        </div>

        {/* Definition */}
        <div className="col-span-2">
          <label className="block font-medium">
            Definition <span className="text-red-500">*</span>
          </label>
          <textarea
            name="definition"
            value={formData.definition}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.definition ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Definition"
          ></textarea>
          {errors.definition && (
            <p className="text-red-500 text-sm">{errors.definition}</p>
          )}
        </div>

        {/* Align Clients */}
        <div className="col-span-2">
          <label className="block font-medium">Align Clients</label>
          <select
            name="alignClients"
            value={formData.alignClients}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 border-gray-300 focus:outline-none"
          >
            <option value="">Please select client names</option>
            <option value="Client A">Client A</option>
            <option value="Client B">Client B</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-medium">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block font-medium">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={formData.startDate} // disable before start date
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-between mt-4">
          <button
            type="button"
            className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

