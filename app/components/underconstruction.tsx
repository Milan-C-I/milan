"use client"

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

const UnderConstructionBanner = () => {
  return (
    <div className="fixed top-0 w-full z-50 bg-black border-y-4 border-yellow-400 overflow-hidden">
      <div className="under-construction-marquee text-yellow-400 font-semibold text-sm sm:text-base flex items-center gap-3 px-4 py-2 whitespace-nowrap">       
        <div className="flex items-center gap-2 py-4">
        <ExclamationTriangleIcon className="w-5 h-5 animate-pulse shrink-0" />
          This website is currently under construction. Features may be unstable or missing. Data provided may be inaccurate.
        <ExclamationTriangleIcon className="w-5 h-5 animate-pulse shrink-0" />
        </div>
        
      </div>
    </div>
  )
}

export default UnderConstructionBanner
