"use client";
import { useEffect, useState } from "react";

export default function WhitepaperPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
        <div className="bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-[90vw]">
          <span className="text-4xl mb-4">📄</span>
          <div className="text-xl font-semibold text-gray-800 mb-2 text-center">
            Please view this whitepaper on a desktop device
          </div>
          <div className="text-gray-600 mb-6 text-center">
            or download it from here:
          </div>
          <a
            href="https://github.com/rythmern02/Vara-Naming-Service/whitepaper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow hover:from-blue-600 hover:to-purple-600 transition font-medium"
          >
            Download Whitepaper
          </a>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src="/whitepaper.pdf"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        zIndex: 9999,
        background: "#fff",
      }}
      title="Whitepaper"
      allowFullScreen
    />
  );
}