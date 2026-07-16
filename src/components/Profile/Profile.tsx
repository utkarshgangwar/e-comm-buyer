"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type TabType = "info" | "orders" | "settings";

interface OrderMock {
  id: string;
  date: string;
  total: number;
  status: "Delivered" | "Processing" | "Shipped";
  itemsCount: number;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [isMounted, setIsMounted] = useState(false);

  // 🌟 1. Added Editing States
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // User Profile State
  const [user, setUser] = useState({
    name: "Utkarsh Gangwar",
    email: "utkarsh@example.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    joined: "July 2026",
  });

  // Temporary state to hold changes while typing before hitting save
  const [editForm, setEditForm] = useState({ ...user });

  // Mock Order History
  const mockOrders: OrderMock[] = [
    {
      id: "ORD-98213",
      date: "12 July 2026",
      total: 4599,
      status: "Delivered",
      itemsCount: 2,
    },
    {
      id: "ORD-76492",
      date: "05 July 2026",
      total: 12499,
      status: "Shipped",
      itemsCount: 1,
    },
    {
      id: "ORD-32104",
      date: "28 June 2026",
      total: 850,
      status: "Delivered",
      itemsCount: 3,
    },
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-950"></div>
      </div>
    );
  }

  // Handle inputs switching value changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🌟 Save changes back to our main user object state
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      city: editForm.city,
    });
    setIsEditing(false);
  };

  // Cancel edit mode and revert the form inputs back to current user state
  const handleCancel = () => {
    setEditForm({ ...user });
    setIsEditing(false);
  };

  // Generate initials for profile avatar frame safely
  const avatarInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="h-32 bg-gray-950 w-full" />
          <div className="px-6 pb-6 relative flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gray-200 border-4 border-white rounded-full flex items-center justify-center font-black text-2xl text-gray-700 shadow-sm select-none">
              {avatarInitials}
            </div>
            {/* Basic Info */}
            <div className="flex-1 mb-2">
              <h1 className="text-2xl font-extrabold text-gray-900">
                {user.name}
              </h1>
              <p className="text-xs text-gray-400 font-medium">
                Customer Account • Joined {user.joined}
              </p>
            </div>
            <Link
              href="/"
              className="text-xs font-bold border border-gray-200 text-gray-600 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors self-start sm:self-end cursor-pointer"
            >
              Back to Store
            </Link>
          </div>

          {/* Tab Selection Bar */}
          <div className="flex border-t border-gray-100 px-4 bg-gray-50/50">
            {(["info", "orders", "settings"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsEditing(false); // turn off editing if switching tabs
                }}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer uppercase tracking-wider ${
                  activeTab === tab
                    ? "border-gray-950 text-gray-950"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab === "info"
                  ? "Personal Details"
                  : tab === "orders"
                    ? "Order History"
                    : "Account Settings"}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Tab Body Content */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm min-h-[300px]">
          {/* TAB 1: Personal Details */}
          {activeTab === "info" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Account Information
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-bold bg-gray-950 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {/* 🌟 FORM COMPONENT CONDITIONAL FOR EDITING */}
              <form onSubmit={handleSaveChanges} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        required
                        value={editForm.name}
                        onChange={handleInputChange}
                        className="w-full text-sm font-semibold text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-950"
                      />
                    ) : (
                      <div className="text-sm font-semibold text-gray-800 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                        {user.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        required
                        value={editForm.email}
                        onChange={handleInputChange}
                        className="w-full text-sm font-semibold text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-950"
                      />
                    ) : (
                      <div className="text-sm font-semibold text-gray-800 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                        {user.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        required
                        value={editForm.phone}
                        onChange={handleInputChange}
                        className="w-full text-sm font-semibold text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-950"
                      />
                    ) : (
                      <div className="text-sm font-semibold text-gray-800 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                        {user.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        required
                        value={editForm.city}
                        onChange={handleInputChange}
                        className="w-full text-sm font-semibold text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-950"
                      />
                    ) : (
                      <div className="text-sm font-semibold text-gray-800 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                        {user.city}
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Form Actions Overlay */}
                {isEditing && (
                  <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="text-xs font-bold border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-xs font-bold bg-gray-950 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* TAB 2: Order History */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Recent Orders
              </h2>
              <div className="divide-y divide-gray-100">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 first:pt-0 last:pb-0 gap-2"
                  >
                    <div>
                      <span className="text-sm font-bold text-gray-900">
                        {order.id}
                      </span>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {order.date} • {order.itemsCount} items
                      </p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-sm font-extrabold text-gray-900">
                        ₹{order.total.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                          order.status === "Delivered"
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : order.status === "Shipped"
                              ? "bg-blue-50 text-blue-700 border border-blue-100"
                              : "bg-yellow-50 text-yellow-700 border border-yellow-100"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Account Settings */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Preferences & Security
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-gray-100 bg-gray-50/50 rounded-xl">
                  <div>
                    <span className="text-sm font-bold text-gray-800 block">
                      Email Notifications
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Receive deals and order updates via email.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-gray-950 accent-gray-950 focus:ring-gray-950"
                  />
                </div>

                <div className="flex justify-between items-center p-4 border border-gray-100 bg-gray-50/50 rounded-xl">
                  <div>
                    <span className="text-sm font-bold text-gray-800 block">
                      Password & Authentication
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Update security tokens or change passwords.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      alert("Redirecting to security settings loop...")
                    }
                    className="text-xs font-bold text-gray-600 border border-gray-200 bg-white px-3 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
