"use client";

import React, { useState } from "react";
import Title from "./Title";

type Props = {
  title: string;
};

const GroupCard = ({ title }: Props) => {
  // 💡 Keep track of the loaded status for all 4 image grid index frames
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>(
    {},
  );

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  // Image source configuration list
  const gridItems = [
    { id: 1, src: "https://picsum.photos/200?random=1", alt: "Item 1" },
    { id: 2, src: "https://picsum.photos/200?random=2", alt: "Item 2" },
    { id: 3, src: "https://picsum.photos/200?random=3", alt: "Item 3" },
    { id: 4, src: "https://picsum.photos/200?random=4", alt: "Item 4" },
  ];

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Card Content Details */}
      <Title title={title} />

      {/* 2x2 Image Grid Container */}
      <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-xl bg-gray-50 p-1">
        {gridItems.map((item, index) => {
          const isLoaded = !!loadedImages[index];

          return (
            <div
              key={item.id}
              className="aspect-square w-full bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden relative"
            >
              {/* 💡 WAVE SHIMMER SKELETON: Displayed until this specific item indexes are loaded */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                </div>
              )}

              <img
                src={item.src}
                alt={item.alt}
                onLoad={() => handleImageLoad(index)}
                className={`block h-full w-full object-cover transition-all duration-300 ease-out ${
                  isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(GroupCard);
