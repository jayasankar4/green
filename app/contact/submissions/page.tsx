"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";

interface Submission {
  "Date & Time"?: string;
  Name?: string;
  Company?: string;
  Email?: string;
  Phone?: string;
  Subject?: string;
  Message?: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data || []);
      } else {
        setError(data.error || "Failed to load submissions.");
      }
    } catch {
      setError("Network error loading submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <>
      <Hero
        title="Form Submissions"
        subtitle="View and download all contact form inquiries submitted through the website."
        backgroundImage="/images/hero-contact.png"
        compact
      />

      <section className="py-12 md:py-16 bg-light-grey min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-border">
            <div>
              <h2 className="text-2xl font-bold font-heading text-deep-teal">
                Submitted Messages ({submissions.length})
              </h2>
              <p className="text-sm text-secondary-text mt-1">
                Data is updated live from the saved Excel spreadsheet.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={fetchSubmissions}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-dark-slate text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <a
                href="/api/contact/download"
                download
                className="px-5 py-2 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-lg transition-all shadow-md flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Excel Sheet (.xlsx)
              </a>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-border">
              <div className="animate-spin w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-secondary-text">Loading submission details...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 rounded-2xl p-8 text-center border border-red-200">
              <p className="font-semibold">{error}</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-border">
              <p className="text-secondary-text text-lg mb-4">No form submissions recorded yet.</p>
              <Link
                href="/contact"
                className="inline-block px-6 py-2.5 bg-brand-green text-white font-semibold rounded-lg"
              >
                Go to Contact Form
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-navy-900 text-white uppercase text-xs tracking-wider">
                    <tr>
                      <th className="py-4 px-5">Date & Time</th>
                      <th className="py-4 px-5">Name</th>
                      <th className="py-4 px-5">Company</th>
                      <th className="py-4 px-5">Contact Details</th>
                      <th className="py-4 px-5">Subject</th>
                      <th className="py-4 px-5">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {submissions.map((sub, i) => (
                      <tr key={i} className="hover:bg-light-grey transition-colors">
                        <td className="py-4 px-5 font-medium whitespace-nowrap text-dark-slate">
                          {sub["Date & Time"] || "N/A"}
                        </td>
                        <td className="py-4 px-5 font-bold text-deep-teal whitespace-nowrap">
                          {sub.Name || "N/A"}
                        </td>
                        <td className="py-4 px-5 text-secondary-text whitespace-nowrap">
                          {sub.Company || "—"}
                        </td>
                        <td className="py-4 px-5 whitespace-nowrap">
                          <div className="text-dark-slate">{sub.Email}</div>
                          {sub.Phone && (
                            <div className="text-xs text-secondary-text">{sub.Phone}</div>
                          )}
                        </td>
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-green/10 text-brand-green">
                            {sub.Subject || "General"}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-secondary-text min-w-[280px]">
                          {sub.Message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
