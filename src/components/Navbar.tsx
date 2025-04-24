
const Navbar = () => {
  return (
    <div className="py-6 px-4 md:px-8 flex justify-between items-center fade-in">
      <a href="/" className="text-xl md:text-2xl font-light tracking-wider hover:opacity-80 transition-opacity">
        thisistheartwrk
      </a>
      
      <a 
        href="https://x.com/setiaaris_" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 hover:opacity-70 transition-opacity"
        aria-label="Twitter"
      >
        <img 
          src="/lovable-uploads/b03860cc-cda7-48bd-acd7-12a43accabf1.png" 
          alt="X Logo" 
          className="h-5 w-5 object-contain"
        />
      </a>
    </div>
  );
};

export default Navbar;
