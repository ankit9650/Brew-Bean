import React, { useState } from "react";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';  // Import the tick icon from react-icons
import 'react-toastify/dist/ReactToastify.css';  // Import styles for toastify

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // POST request using axios
      const response = await axios.post("http://localhost:5000/api/contact", formData);

      console.log(response.status, response.data);

      if (response.status === 201 || response.status === 200) {
        setSuccess(true);  // Set success state
        setFormData({ name: "", email: "", phone: "", message: "" });  // Reset form

        // Show success toast notification with tick icon
        toast.success(
          <div className="flex items-center">           
            Message Sent
          </div>, 
          {
            autoClose: 5000,
          }
        );
      } else {
        setSuccess(false);
        // Show error toast notification
        toast.error(response.data.error || "Error submitting form", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.", {
        autoClose: 5000,
      });
    } finally {
      setLoading(false);  // Hide loading spinner
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <div className="font-[sans-serif] max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-transparent rounded-3xl overflow-hidden mt-4" id="contact">
        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-mainhead-button"></div>
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-mainhead-button"></div>

        <div className="grid md:grid-cols-2 gap-8 py-8 px-6">
          <div className="text-center flex flex-col items-center justify-center">
            <img src="/assets/contact.png" className="shrink-0 w-5/6" alt="Contact us" />
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
                className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone No."
                className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                value={formData.phone}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Message"
                rows="6"
                className="w-full bg-gray-100 rounded-md px-4 text-sm pt-3 outline-blue-600 focus-within:bg-transparent"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button
                type="submit"
                className="sm:w-[200px] w-full group px-3.5 py-2 bg-body hover:bg-mainhead-heading rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex mx-auto"
                disabled={loading}
              >
                <span className="px-1.5 text-mainhead-heading group-hover:text-body text-sm font-semibold leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                  {loading ? "Submitting..." : "Submit"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add ToastContainer for toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Contact;
