"use client";

import { useState } from "react";
import ScrollReveal from "../animations/ScrollReveal";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <ScrollReveal delay={0.2}>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-16 tracking-tight">
            Contact
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal delay={0.4}>
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
                Let's work together to bring your ideas to life. I'm always open to
                discussing new projects and opportunities.
              </p>
              <div className="flex items-center gap-4 text-gray-400">
                <Mail size={20} />
                <a
                  href="mailto:bhatsuraj22@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  bhatsuraj22@gmail.com
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative z-50">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-700 py-4 px-2 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors cursor-text relative z-50"
                  style={{ pointerEvents: "auto" }}
                />
              </div>
              <div className="relative z-50">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-700 py-4 px-2 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors cursor-text relative z-50"
                  style={{ pointerEvents: "auto" }}
                />
              </div>
              <div className="relative z-50">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-transparent border-b-2 border-gray-700 py-4 px-2 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors resize-none cursor-text relative z-50"
                  style={{ pointerEvents: "auto" }}
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-4 border border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>

              {/* Status Message */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 text-sm ${
                    submitStatus.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{submitStatus.message}</span>
                </motion.div>
              )}
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

