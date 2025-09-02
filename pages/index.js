import { useState } from 'react';
import Navbar from '../components/Navbar';
import MessageBar from '../components/MessageBar';
import Card from '../components/Card';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({});
  
  // Sample data array for cards
  const sampleData = [
  {
    "id": 1,
    "title": "Pothole",
    "description": "Large pothole near the main market causing traffic jams and vehicle damage."
  },
  {
    "id": 2,
    "title": "Pothole",
    "description": "Multiple small potholes on the highway near the bus stand creating safety hazards."
  },
  {
    "id": 3,
    "title": "Garbage overflow",
    "description": "Dustbin overflowing near the park leading to foul smell and unhygienic conditions."
  },
  {
    "id": 4,
    "title": "Garbage overflow",
    "description": "Garbage not collected for 3 days in residential area Block C."
  },
  {
    "id": 5,
    "title": "Streetlight issue",
    "description": "Streetlight not working on the main road causing poor visibility at night."
  },
  {
    "id": 6,
    "title": "Streetlight issue",
    "description": "Flickering streetlights near the school making it unsafe for pedestrians."
  },
  {
    "id": 7,
    "title": "Waterlogging",
    "description": "Waterlogging after heavy rain near the railway crossing blocking traffic."
  },
  {
    "id": 8,
    "title": "Waterlogging",
    "description": "Stagnant water near the hospital causing mosquito breeding."
  },
  {
    "id": 9,
    "title": "Pothole",
    "description": "Deep pothole at the intersection of MG Road creating accidents."
  },
  {
    "id": 10,
    "title": "Garbage overflow",
    "description": "Open garbage dump near the temple attracting stray animals."
  }
];

  const handleAction = (action, title, description) => {
    const newReview = {
      id: Date.now(),
      title,
      description,
      action,
      timestamp: new Date().toLocaleString()
    };
    
    // Add to reviews
    setReviews(prevReviews => [newReview, ...prevReviews]);
    
    // Mark task as completed
    const taskKey = `${title}-${description}`;
    setCompletedTasks(prev => ({
      ...prev,
      [taskKey]: {
        action: action,
        completed: true
      }
    }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <MessageBar 
        reviews={reviews} 
        isOpen={isDropdownOpen} 
        toggleDropdown={toggleDropdown} 
      />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Cards section */}
        <div className="space-y-4">
          {sampleData.map((item) => {
            const taskKey = `${item.title}-${item.description}`;
            const isCompleted = completedTasks[taskKey]?.completed;
            const completedAction = completedTasks[taskKey]?.action;
            
            return (
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
                onAction={handleAction}
                isCompleted={isCompleted}
                completedAction={completedAction}
                imageIndex={item.id - 1} // Pass different image index for each card
              />
            );
          })}
        </div>
        
        {/* Mobile-friendly empty state */}
        {sampleData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks available</h3>
            <p className="text-gray-500">Tasks will appear here when they're added to the system.</p>
          </div>
        )}
      </main>
    </div>
  );
}
