"use client";

import React, { useState } from "react";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "file";
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

interface ContactFormProps {
  fields: FormField[];
  submitLabel?: string;
  formId: string;
}

export default function ContactForm({ fields, submitLabel = "Send Message", formId }: ContactFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData[field.name] || "";
      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field.name] = "Please enter a valid email address";
      }
      if (field.type === "tel" && value && !/^[+]?[\d\s()-]{7,}$/.test(value)) {
        newErrors[field.name] = "Please enter a valid phone number";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setErrors({ _form: result.error || "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ _form: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  if (submitted) {
    return (
      <div className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold font-heading text-deep-teal mb-2">Thank You!</h3>
        <p className="text-secondary-text mb-4">
          Your message has been saved. You can download the complete submissions Excel sheet below.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center my-4">
          <a
            href="/api/contact/download"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Submissions (.xlsx)
          </a>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({});
          }}
          className="mt-3 text-brand-green font-semibold hover:underline block mx-auto text-sm"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id={formId} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={`${formId}-${field.name}`} className="block text-sm font-semibold text-dark-slate mb-1.5">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={`${formId}-${field.name}`}
              name={field.name}
              rows={4}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors[field.name] ? "border-red-400" : "border-border"
              } focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-dark-slate bg-white`}
            />
          ) : field.type === "select" ? (
            <select
              id={`${formId}-${field.name}`}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors[field.name] ? "border-red-400" : "border-border"
              } focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-dark-slate bg-white`}
            >
              <option value="">{field.placeholder || `Select ${field.label}`}</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : field.type === "file" ? (
            <input
              id={`${formId}-${field.name}`}
              name={field.name}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleChange(field.name, e.target.files?.[0]?.name || "")}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors[field.name] ? "border-red-400" : "border-border"
              } focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-dark-slate bg-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-brand-green/10 file:text-brand-green file:font-semibold file:text-sm hover:file:bg-brand-green/20`}
            />
          ) : (
            <input
              id={`${formId}-${field.name}`}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors[field.name] ? "border-red-400" : "border-border"
              } focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-dark-slate bg-white`}
            />
          )}

          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-8 py-3.5 bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}
