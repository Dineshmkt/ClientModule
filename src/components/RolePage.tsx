import React, { useState } from "react";

export default function RolePage() {
  const [formData, setFormData] = useState({
    roleName: "",
    roleType: "",
    isExternal: false,
    definition: "",
    startDate: "",
    endDate: "",
    functionalArea: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.roleName.trim()) newErrors.roleName = "Please enter the Role Name.";
    if (!formData.definition.trim()) newErrors.definition = "Please enter the Definition.";
    if (!formData.startDate) newErrors.startDate = "Please select the Start Date.";
    if (!formData.endDate) newErrors.endDate = "Please select the End Date.";
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
    console.log("Form submitted:", formData);
    // save to MockAPI or localStorage here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Role Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Role Name */}
        <div>
          <label className="block font-medium">
            Role Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="roleName"
            value={formData.roleName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.roleName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Role Name"
          />
          {errors.roleName && (
            <p className="text-red-500 text-sm">{errors.roleName}</p>
          )}
        </div>

        {/* Role Type & Is External */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block font-medium">Role Type</label>
            <input
              type="text"
              name="roleType"
              value={formData.roleType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 border-gray-300 focus:outline-none"
              placeholder="Role Type"
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
        <div>
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

      
        <div className="grid grid-cols-2 gap-4">
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
        </div>

        {/* Submit */}
        <div className="flex justify-end">
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

