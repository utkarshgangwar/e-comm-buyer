import React from "react";

type Props = {
  title: string;
};

const GroupCard = ({ title }: Props) => {
  return (
    /* 💡 FIX: Remove 'sm:w-80'. 
      We use 'w-full' so it cleanly scales down to fill whatever space its parent column gives it.
      We use 'max-w-sm' (or 'max-w-md') so it doesn't stretch out to be comically huge on massive desktop screens.
    */
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Card Content Details */}
      <span className="inline-block text-xl font-semibold tracking-wider text-black-600 uppercase mb-2">
        {title}
      </span>

      {/* 2x2 Image Grid Container */}
      <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-xl bg-gray-50 p-1">
        <div className="aspect-square w-full bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden relative">
          <img
            src="https://picsum.photos/200?random=1"
            alt="Item 1"
            className="block h-full w-full object-cover"
          />
        </div>
        <div className="aspect-square w-full bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden relative">
          <img
            src="https://picsum.photos/200?random=2"
            alt="Item 2"
            className="block h-full w-full object-cover"
          />
        </div>
        <div className="aspect-square w-full bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden relative">
          <img
            src="https://picsum.photos/200?random=3"
            alt="Item 3"
            className="block h-full w-full object-cover"
          />
        </div>
        <div className="aspect-square w-full bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden relative">
          <img
            src="https://picsum.photos/200?random=4"
            alt="Item 4"
            className="block h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
