
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

  const modalContent = (
    <div 
      className={`fixed inset-0 z-[9999] w-screen h-screen bg-black/80 flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
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
        className="w-[90vw] h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={imageUrl} 
          alt="Full size artwork" 
          className={`max-w-[90vw] max-h-[90vh] object-contain transition-all duration-300 ${
            animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        />
      </div>
    </div>
  );

  // Use createPortal to render the modal at the document body level
  return createPortal(modalContent, document.body);
};

export default ImageModal;
