import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    const countWords = (text) => {
      return text.trim().split(/\s+/).length;
    };

    // Name validation
    if (!formData.name.trim()) {
      formErrors.name = "Fill Name";
    } else if (countWords(formData.name)<3){
      formErrors.name="Enter Full Name"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Corrected regex
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Enter a valid email";
    }

    // Phone validation (10 digits required)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      formErrors.phone = "Enter phone number";
    } else if (!phoneRegex.test(formData.phone)) {
      formErrors.phone = "Enter a valid phone number (10 digits)";
    }

    // Message validation (minimum 50 words)
    if (!formData.message.trim()) {
      formErrors.message = "Message cannot be empty";
    } else if (countWords(formData.message) < 50) {
      formErrors.message = "Minimum 50 words required";
    }

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // No errors, form is valid, submit the form
      alert("Form submitted successfully!");
      // Reset the form
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle click
  const handleClick = () => {
    alert("Thank you! \nYour message is sent");
  };

  return (
    <>
      <div className="font-[sans-serif] max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-transparent rounded-3xl overflow-hidden mt-4" id="contact">
        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-mainhead-button"></div>
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-mainhead-button"></div>

        <div className="grid md:grid-cols-2 gap-8 py-8 px-6">
          <div className="text-center flex flex-col items-center justify-center">
            <img src="src/assets/contact.png" className="shrink-0 w-5/6" alt="Contact us" />
          </div>

          <form className="rounded-tl-3xl rounded-bl-3xl" onSubmit={handleSubmit}>
            <h2 className="text-2xl text-mainhead-heading font-bold text-center mb-6">
              Contact us
            </h2>
            <div className="max-w-md mx-auto space-y-3 relative">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent ${errors.name ? 'border-red-500' : ''}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <input
                type="text"
                name="phone"
                placeholder="Phone No."
                className={`w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent ${errors.phone ? 'border-red-500' : ''}`}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

              <textarea
                name="message"
                placeholder="Message"
                rows="6"
                className={`w-full bg-gray-100 rounded-md px-4 text-sm pt-3 outline-blue-600 focus-within:bg-transparent ${errors.message ? 'border-red-500' : ''}`}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

              <button
                type="submit"
                className="sm:w-[200px] w-full group px-3.5 py-2 bg-body hover:bg-mainhead-heading rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex mx-auto"
              >
                <span className="px-1.5 text-mainhead-heading group-hover:text-body text-sm font-semibold leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                  Submit
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
