"use client";

import React, { use, useState } from "react";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

// Content structural schema map
const supportContent: Record<string, { title: string; description: string }> = {
  "track-order": {
    title: "Track Your Order",
    description:
      "Enter your order ID and email address below to see the latest shipping updates and tracking history.",
  },
  returns: {
    title: "Returns & Refunds",
    description:
      "Not 100% satisfied? Learn about our 30-day hassle-free return policy and how to initiate a refund.",
  },
  shipping: {
    title: "Shipping Information",
    description:
      "We offer standard and express shipping worldwide. Find estimated delivery times and shipping costs here.",
  },
  contact: {
    title: "Contact Us",
    description:
      "Our customer support team is available 24/7. Reach out via email or message intake form below.",
  },
};

const SupportPage = ({ params }: Props) => {
  const { slug } = use(params);

  // Interactive client state handlers
  const [trackId, setTrackId] = useState("");
  const [email, setEmail] = useState("");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    msg: "",
  });

  const content = supportContent[slug] || {
    title: "Support Center",
    description:
      "Welcome to our help center. Please select a category to get started.",
  };

  // --- SUB-COMPONENT RENDERERS FOR EACH DYNAMIC SLUG ---

  const renderTrackOrder = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Fetching updates for ${trackId}`);
      }}
      className="max-w-md bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-4"
    >
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Order Number
        </label>
        <input
          type="text"
          required
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          placeholder="e.g. KRIDA-9821"
          className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer text-sm"
      >
        Check Status
      </button>
    </form>
  );

  const renderAccordion = (items: { q: string; a: string }[]) => (
    <div className="space-y-3 max-w-2xl">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm"
        >
          <button
            type="button"
            onClick={() =>
              setActiveAccordion(activeAccordion === idx ? null : idx)
            }
            className="w-full flex justify-between items-center p-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <span>{item.q}</span>
            <span className="text-gray-400">
              {activeAccordion === idx ? "−" : "+"}
            </span>
          </button>
          {activeAccordion === idx && (
            <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-600 leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderContact = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Message queued successfully!");
      }}
      className="max-w-lg bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Full Name
          </label>
          <input
            type="text"
            required
            value={contactForm.name}
            onChange={(e) =>
              setContactForm({ ...contactForm, name: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            required
            value={contactForm.email}
            onChange={(e) =>
              setContactForm({ ...contactForm, email: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Message
        </label>
        <textarea
          rows={4}
          required
          value={contactForm.msg}
          onChange={(e) =>
            setContactForm({ ...contactForm, msg: e.target.value })
          }
          placeholder="How can our operations desk help you today?"
          className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer text-sm"
      >
        Send Message
      </button>
    </form>
  );

  // Dynamic selector mapping UI outputs
  const renderContentBody = () => {
    switch (slug) {
      case "track-order":
        return renderTrackOrder();
      case "returns":
        return renderAccordion([
          {
            q: "What is your return window timeline?",
            a: "We offer a 30-day hassle-free structural window return constraint policy from the day your package arrives at your delivery pincode layout.",
          },
          {
            q: "How long do processing cycles take?",
            a: "Once inspected by our warehouse sorting framework, funds reappear in your account slice within 5-7 business working banking cycles.",
          },
        ]);
      case "shipping":
        return renderAccordion([
          {
            q: "What are your logistical options?",
            a: "We offer Standard Shipping (3-5 business delivery cycles) and Priority Express Shipping (1-2 logistics cycles).",
          },
          {
            q: "Do you offer international dispatch frameworks?",
            a: "Yes, standard duties and border clearance custom configurations are dynamically evaluated right inside the checkout checkout pipelines.",
          },
        ]);
      case "contact":
        return renderContact();
      default:
        return (
          <div className="text-sm font-medium text-gray-400">
            Select a section in our layout footer context loop.
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 min-h-[65vh]">
      {/* Dynamic Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {content.title}
        </h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-2xl">
          {content.description}
        </p>
      </div>

      {/* Structured Content Dynamic Insertion Node Slot */}
      <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
        {renderContentBody()}
      </div>
    </div>
  );
};

export default SupportPage;
