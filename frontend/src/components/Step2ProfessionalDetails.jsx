import React from 'react';

const Step2ProfessionalDetails = ({ formData, setFormData, errors }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6 max-w-xl mx-auto mt-20">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Step 2: Professional Details</h2>

      {/* Profession Select */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Profession</label>
        <select
          value={formData.profession}
          onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="">Select</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
        {errors.profession && (
          <p className="text-red-500 text-sm mt-1">{errors.profession}</p>
        )}
      </div>

      {/* Company Name (Conditional) */}
      {formData.profession === 'Entrepreneur' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>
      )}

      {/* Address Line 1 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 1</label>
        <input
          type="text"
          value={formData.addressLine1}
          onChange={(e) => setFormData(prev => ({ ...prev, addressLine1: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.addressLine1 && (
          <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>
        )}
      </div>
    </div>
  );
};

export default Step2ProfessionalDetails;
