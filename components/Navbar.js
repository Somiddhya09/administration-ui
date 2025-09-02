const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Site Name */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-md flex-shrink-0"></div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Site Name</h1>
          </div>
          
          {/* Right side - Hamburger Menu */}
          <div className="flex flex-col space-y-1 cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
            <div className="w-5 h-0.5 sm:w-6 bg-gray-600"></div>
            <div className="w-5 h-0.5 sm:w-6 bg-gray-600"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
