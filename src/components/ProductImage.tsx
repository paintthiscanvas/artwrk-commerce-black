
import { useState } from "react";
import ImageModal from "./ImageModal";

interface ProductImageProps {
  imageUrl: string;
  altText: string;
}

const ProductImage = ({ imageUrl, altText }: ProductImageProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div 
        className="w-full cursor-pointer relative overflow-hidden group"
        onClick={() => setModalOpen(true)}
      >
        <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 z-10"></div>
        <img 
          src={imageUrl} 
          alt={altText} 
          className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
      
      <ImageModal 
        imageUrl={imageUrl}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProductImage;
