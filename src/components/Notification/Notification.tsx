"use client";

import React, { useState } from "react";
import { LuBell } from "../../constants/Icons";

type NotificationItem = {
  id: string;
  message: string;
  time: string;
  isUnread: boolean;
};

const dummyNotifications: NotificationItem[] = [
  {
    id: "1",
    message: "Your order for Trending Sports Gear has been shipped!",
    time: "2 mins ago",
    isUnread: true,
  },
  {
    id: "2",
    message: "Flash Deal! Get 20% off on Electronics for the next 2 hours.",
    time: "1 hour ago",
    isUnread: true,
  },
  {
    id: "3",
    message: "Payment confirmed for order #48291.",
    time: "Yesterday",
    isUnread: false,
  },
];

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(dummyNotifications);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleTogglePanel = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    }
  };

  return (
    <>
      {/* BACKGROUND OVERLAY & BLUR */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/15 backdrop-blur-[2px] z-40 transition-all duration-300"
        />
      )}

      <div className="relative inline-block z-50">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={handleTogglePanel}
          className={`relative p-2 rounded-full transition-colors cursor-pointer focus:outline-none flex items-center justify-center ${
            isOpen
              ? "bg-gray-100 text-gray-900"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <LuBell className="w-6 h-6" />

          {/* Unread Badge Count */}
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          )}
        </button>

        {/* Notification Dropdown Panel */}
        {isOpen && (
          /* 💡 FIX: Replaced absolute positioning anomalies with viewport-fixed layouts for flawless mobile rendering */
          <div className="fixed inset-x-4 top-16 mx-auto w-auto max-w-md sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-96 sm:max-w-none bg-white rounded-2xl border border-gray-200/80 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 origin-top">
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-gray-900 text-white font-extrabold px-2 py-0.5 rounded-full tracking-wide">
                  {unreadCount} NEW
                </span>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
              {notifications.length === 0 ? (
                <div className="px-4 py-12 text-center text-xs text-gray-400 font-medium">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-5 py-4 hover:bg-gray-50/80 transition-all flex gap-3 items-start cursor-pointer group"
                  >
                    <div className="mt-1.5 relative flex-shrink-0">
                      <span
                        className={`block h-2 w-2 rounded-full transition-transform group-hover:scale-125 ${
                          n.isUnread ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <p className="text-xs text-gray-700 leading-relaxed font-medium group-hover:text-gray-900 transition-colors">
                        {n.message}
                      </p>
                      <span className="block text-[10px] text-gray-400 font-medium">
                        {n.time}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-gray-100 text-center bg-gray-50/70">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-bold text-gray-500 hover:text-gray-900 hover:underline cursor-pointer transition-colors"
              >
                Close Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
