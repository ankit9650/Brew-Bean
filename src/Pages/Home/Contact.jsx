import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSpinner,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faUser,
  faMobile,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import CustomerReview from "./CustomerReview";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      if (response.status === 201 || response.status === 200) {
        setFormData({ name: "", email: "", phone: "", message: "" });
        toast.success("Your message has been sent successfully!", {
          icon: (
            <FontAwesomeIcon icon={faPaperPlane} className="text-green-500" />
          ),
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            Let's Talk Coffee
          </h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Have questions about our beans? Want to discuss wholesale? We're all
            ears.
          </p>
        </div>

        {/* Grid Layout - 60/40 Split */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Customer Reviews - 60% */}
          <div className="lg:col-span-3 bg-darkchocolate  rounded-2xl shadow-sm  flex flex-col">
            <CustomerReview />
          </div>

          {/* Contact Form - 40% */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm h-fit">
            <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-4">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
              <div className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-2 bg-white border border-mainhead-heading rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full pl-10 pr-4 py-2 bg-amber-50 border border-mainhead-heading rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                    <FontAwesomeIcon icon={faMobile} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    className="w-full pl-10 pr-4 py-2 bg-amber-50 border border-mainhead-heading rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <div className="absolute top-3 left-3 text-amber-600">
                    <FontAwesomeIcon icon={faComment} />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    className="w-full pl-10 pr-4 py-2 bg-amber-50 border border-mainhead-heading rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${
                  loading ? "bg-amber-400" : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="shadow-lg"
      />
    </div>
  );
}

export default Contact;
