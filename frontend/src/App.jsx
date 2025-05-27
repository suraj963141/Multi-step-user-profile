import React, { useState } from "react";
import Step1 from "./components/Step1PersonalInfo";
import Step2 from "./components/Step2ProfessionalDetails";
import Step3 from "./components/Step3LocationDetails";
import Step4 from "./components/Step4SubscriptionDetails";
import axios from "axios";

const App = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    profilePhoto: null,
    username: "",
    currentPassword: "",
    newPassword: "",
    profession: "",
    companyName: "",
    addressLine1: "",
    country: "",
    state: "",
    city: "",
    subscriptionPlan: "",
    newsletter: true,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (step === 1) {
      if (!formData.profilePhoto) err.profilePhoto = "Required";
      if (!formData.username) err.username = "Required";
      if (!formData.currentPassword) err.currentPassword = "Required";
    } else if (step === 2) {
      if (!formData.profession) err.profession = "Required";
      if (formData.profession === "Entrepreneur" && !formData.companyName)
        err.companyName = "Required";
      if (!formData.addressLine1) err.addressLine1 = "Required";
    } else if (step === 3) {
      if (!formData.country) err.country = "Required";
      if (!formData.state) err.state = "Required";
      if (!formData.city) err.city = "Required";
    } else if (step === 4) {
      if (!formData.subscriptionPlan) err.subscriptionPlan = "Required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const form = new FormData();

    if (formData.profilePhoto) {
      form.append("profilePhoto", formData.profilePhoto);
    }

    Object.keys(formData).forEach((key) => {
      if (key !== "profilePhoto") form.append(key, formData[key]);
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/submit`,
        form
      );
      console.log(res.data);
      setSubmitted(true); //  show success message
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <div className="text-center p-10 bg-white rounded shadow-lg">
          <h1 className="text-2xl font-bold text-green-700 mb-4">
            Form Submitted Successfully!
          </h1>
          <p className="text-gray-700">Thank you for updating your profile.</p>
        </div>
      </div>
    );
  }

  //  Preview
  const renderPreview = () => {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Preview Your Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Username:</strong> {formData.username}</div>
          <div><strong>Profession:</strong> {formData.profession}</div>
          {formData.profession === "Entrepreneur" && (
            <div><strong>Company Name:</strong> {formData.companyName}</div>
          )}
          <div><strong>Address:</strong> {formData.addressLine1}</div>
          <div><strong>Country:</strong> {formData.country}</div>
          <div><strong>State:</strong> {formData.state}</div>
          <div><strong>City:</strong> {formData.city}</div>
          <div><strong>Subscription Plan:</strong> {formData.subscriptionPlan}</div>
          <div><strong>Newsletter:</strong> {formData.newsletter ? "Yes" : "No"}</div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handlePrev}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {step === 1 && (
        <Step1 {...{ formData, setFormData, errors, setErrors }} />
      )}
      {step === 2 && (
        <Step2 {...{ formData, setFormData, errors, setErrors }} />
      )}
      {step === 3 && (
        <Step3 {...{ formData, setFormData, errors, setErrors }} />
      )}
      {step === 4 && (
        <Step4 {...{ formData, setFormData, errors, setErrors }} />
      )}
      {step === 5 && renderPreview()}

      {step < 5 && (
        <div className="mt-5 flex justify-center space-x-4">
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
