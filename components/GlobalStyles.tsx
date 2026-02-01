import React from 'react';

export const GlobalStyles = () => (
  <style>{`
    .text-gold { color: #fad02c; }
    .bg-gold { background-color: #fad02c; }
    .border-gold { border-color: #fad02c; }
    .hover-gold:hover { color: #fad02c; }

    .image-filter {
      filter: grayscale(100%) contrast(110%);
      transition: filter 0.5s ease;
    }

    .group:hover .image-filter {
      filter: grayscale(0%) contrast(100%);
    }

    /* Custom Scrollbar */
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #999; }

    /* Drop cap style */
    .drop-cap::first-letter {
      float: left;
      font-family: 'Playfair Display', serif;
      font-size: 4rem;
      line-height: 3.5rem;
      padding-right: 1rem;
      padding-top: 0.2rem;
      color: #fad02c;
      font-weight: 700;
    }

    /* Animation */
    @keyframes progress { from { width: 0%; } to { width: 100%; } }
    .animate-progress { animation: progress 8s linear forwards; }
    
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fade-in-up 1s ease-out forwards;
    }
  `}</style>
);