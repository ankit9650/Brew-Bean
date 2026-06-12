import React from "react";

function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-body z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-brand-cream border-t-brand-warm animate-spin" />
      </div>
      <p className="mt-4 text-brand-warm font-medium text-sm tracking-widest uppercase animate-pulse">
        Brewing...
      </p>
    </div>
  );
}

export default PageLoader;
