import React from 'react';

const Step4SubscriptionDetails = ({ formData, setFormData, errors }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6 max-w-xl mx-auto mt-20">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Step 4: Subscription Details</h2>

      {/* Subscription Plan */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Subscription Plan</label>
        <select
          value={formData.subscriptionPlan}
          onChange={(e) => setFormData(prev => ({ ...prev, subscriptionPlan: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select</option>
          <option value="Basic">Basic</option>
          <option value="Pro">Pro</option>
          <option value="Enterprise">Enterprise</option>
        </select>
        {errors.subscriptionPlan && (
          <p className="text-red-500 text-sm mt-1">{errors.subscriptionPlan}</p>
        )}
      </div>

      {/* Newsletter */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={formData.newsletter}
          onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm text-gray-700">Subscribe to Newsletter</label>
      </div>
    </div>
  );
};

export default Step4SubscriptionDetails;
