import React from "react";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";

type Props = {};

const Cover = (props: Props) => {
  return (
    // Outer responsive wrapper with horizontal padding
    <div className="w-full max-w-7xl mx-auto py-3">
      {/* Banner Container 
        - aspect-[2/1] on mobile keeps it from becoming a tiny strip.
        - md:aspect-[3/1] scales it to a standard landscape banner on tablets and desktops.
      */}
      <div className="relative w-full aspect-[2/1] md:aspect-[3/1] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-100 group">
        {/* The Responsive Advertisement Image */}
        <Image
          src="https://picsum.photos/1200/400?random=10" // Swap with your actual banner image asset path
          alt="Mega Summer Sale Advertisement Banner"
          fill // Tells Next.js to fill the relative container completely
          priority // Loads the image instantly since it's above the fold
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-500 ease-out"
        />

        {/* Optional: Dark gradient overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex flex-col justify-center p-6 sm:p-12 text-white">
          <div className="max-w-xs sm:max-w-md space-y-2">
            <span className="inline-block bg-orange-500 text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded">
              Limited Time Only
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-gray-300">
              ECOMM BY{" "}
              <Link
                href="https://www.gangwar.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 underline decoration-2 decoration-orange-500/30 hover:decoration-orange-600 transition-all inline-flex items-center gap-1 group"
              >
                <span>UTKARSH GANGWAR</span>
                <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 text-lg sm:text-2xl">
                  ↗
                </span>
              </Link>
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 line-clamp-2">
              Get up to 40% off on premium sports gear, apparel, and training
              essential accessories this weekend.
            </p>
            <div className="pt-2">
              <button
                type="button"
                className="bg-white text-gray-900 font-bold px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-100 transition-colors shadow cursor-pointer"
              >
                Shop The Sale
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
