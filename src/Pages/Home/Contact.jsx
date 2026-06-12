import React, { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSpinner,
  faUser,
  faMobile,
  faEnvelope,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useSubmitContactMutation } from "../../redux/services/contactservice";
import CustomerReview from "./CustomerReview";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(formData).unwrap();
      setFormData({ name: "", email: "", phone: "", message: "" });
      toast.success("Your message has been sent successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Let's Talk Coffee</h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Have questions about our beans? Want to discuss wholesale? We're all ears.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-darkchocolate rounded-2xl shadow-sm flex flex-col">
            <CustomerReview />
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm h-fit">
            <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-4">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 pointer-events-none">
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
                    minLength={2}
                    maxLength={100}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 pointer-events-none">
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

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 pointer-events-none">
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

                <div className="relative">
                  <div className="absolute top-3 left-3 text-amber-600 pointer-events-none">
                    <FontAwesomeIcon icon={faComment} />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    className="w-full pl-10 pr-4 py-2 bg-amber-50 border border-mainhead-heading rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={2000}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${
                  isLoading ? "bg-amber-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
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
    </div>
  );
}

export default Contact;
