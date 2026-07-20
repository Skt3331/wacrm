"use client";

import { MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

export function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false);

  // Delay the widget appearance slightly so it doesn't block initial paint
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // The wa.me link format: https://wa.me/<number>?text=<url-encoded-message>
  const phoneNumber = "917507408461"; // Formatting without '+' as required by wa.me
  const defaultMessage = encodeURIComponent("Hi, I'm interested in Success Digital and would like to learn more!");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center h-16 w-16 bg-whatsapp text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(57,255,20,0.7)] transition-all duration-300 hover:scale-110"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Pulsing rings for attention */}
        <span className="absolute inset-0 rounded-full border border-whatsapp animate-ping opacity-75 duration-1000"></span>
        <span className="absolute -inset-2 rounded-full border border-whatsapp/50 animate-pulse opacity-50 duration-2000"></span>
        
        <MessageSquare className="h-8 w-8 relative z-10" />

        {/* Tooltip on hover */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 border border-white/10 text-sm font-medium text-white rounded-xl opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-xl">
          Chat with Sales
          {/* Tooltip arrow */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-slate-900 border-r border-t border-white/10 rotate-45"></div>
        </div>
      </a>
    </div>
  );
}
