const MessageBar = ({ reviews, isOpen, toggleDropdown }) => {
  if (reviews.length === 0) return null;
  
  return (
    <div className="w-full bg-blue-50 border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-full flex items-center justify-between text-blue-900 font-bold text-lg cursor-pointer"
          >
            <span>Task Reviews ({reviews.length})</span>
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-blue-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
              {reviews.map((review, index) => (
                <div key={index} className="p-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{review.title}</p>
                      <p className="text-sm text-gray-600">{review.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      review.action === 'Approved' ? 'bg-green-100 text-green-800' :
                      review.action === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {review.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBar;
