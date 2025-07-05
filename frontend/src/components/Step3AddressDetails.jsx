import React from 'react';

const Step3AddressDetails = ({ formData, setFormData, errors, setErrors, onNext, onBack }) => {
  const countries = ['India', 'USA', 'UK'];
  const states = {
    India: ['Maharashtra', 'Karnataka', 'Delhi'],
    USA: ['California', 'Texas', 'New York'],
    UK: ['England', 'Scotland', 'Wales'],
  };
  const cities = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Karnataka: ['Bengaluru', 'Mysuru', 'Mangalore'],
    Delhi: ['New Delhi', 'Dwarka', 'Saket'],
    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    Texas: ['Houston', 'Dallas', 'Austin'],
    NewYork: ['New York City', 'Buffalo', 'Albany'],
    England: ['London', 'Manchester', 'Birmingham'],
    Scotland: ['Edinburgh', 'Glasgow', 'Aberdeen'],
    Wales: ['Cardiff', 'Swansea', 'Newport'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'country') {
      setFormData({ ...formData, country: value, state: '', city: '' });
    } else if (name === 'state') {
      setFormData({ ...formData, state: value, city: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Step 3: Address Details</h2>

      <div> 
        <label className="block mb-1 font-medium">Address Line 1</label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Country</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">-- Select Country --</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">State</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border rounded p-2"
          disabled={!formData.country}
        >
          <option value="">-- Select State --</option>
          {(states[formData.country] || []).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">City</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border rounded p-2"
          disabled={!formData.state}
        >
          <option value="">-- Select City --</option>
          {(cities[formData.state] || []).map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
        <button onClick={() => validate() && onNext()} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
};

export default Step3AddressDetails;
