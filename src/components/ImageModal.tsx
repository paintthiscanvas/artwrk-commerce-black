
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ imageUrl, isOpen, onClose }: ImageModalProps) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure animation works
      setTimeout(() => setAnimateIn(true), 10);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setAnimateIn(false);
      document.body.style.overflow = '';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black/95 flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
        animateIn ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-8 w-8" />
      </button>
      
      <div 
        className="w-[90%] h-[90%] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={imageUrl} 
          alt="Full size artwork" 
          className={`max-w-full max-h-full object-contain transition-all duration-300 ${
            animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export default ImageModal;
