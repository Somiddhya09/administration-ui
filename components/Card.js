import { useState } from 'react';
import PanoramicViewer from './PanoramicViewer';

// Dummy municipalities and wards mapping
const MUNICIPALITIES = [
  { name: 'City North', wards: ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'] },
  { name: 'City South', wards: ['Ward 5', 'Ward 6', 'Ward 7'] },
  { name: 'City East', wards: ['Ward 8', 'Ward 9'] },
  { name: 'City West', wards: ['Ward 10', 'Ward 11', 'Ward 12'] }
];

// Dummy panoramic images - you can replace these with your actual images
const dummyPanoramicImages = [
  'https://pannellum.org/images/cerro-toco-0.jpg', // Example panoramic image
  'https://pannellum.org/images/jfk.jpg', // Another example
  'https://pannellum.org/images/cerro-toco-0.jpg', // Repeating for demo
];

const Card = ({ title, description, onAction, isCompleted, completedAction, imageIndex = 0, severity, lat, lng, date, municipality, ward, type, reportedAt }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showPanoramicViewer, setShowPanoramicViewer] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showForwardForm, setShowForwardForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [forwardData, setForwardData] = useState({
    currentMunicipality: '',
    currentWard: '',
    targetMunicipality: '',
    targetWard: '',
    reason: ''
  });

  const handleActionClick = (action) => {
    setPendingAction(action);
    setShowConfirmation(true);
  };

  const confirmAction = () => {
    // If forwarding, open questionnaire instead of immediate action
    if (pendingAction === 'Forward') {
      setShowConfirmation(false);
      setShowForwardForm(true);
      return;
    }
    if (pendingAction === 'Rejected') {
      const augmented = `${description}\n\nRejection Reason: ${rejectReason || 'Not specified'}`;
      onAction('Rejected', title, augmented);
      setRejectReason('');
    } else {
      onAction(pendingAction, title, description);
    }
    setShowConfirmation(false);
    setPendingAction(null);
  };

  const cancelAction = () => {
    setShowConfirmation(false);
    setPendingAction(null);
  };

  const handleImageClick = () => {
    setShowPanoramicViewer(true);
  };

  const closePanoramicViewer = () => {
    setShowPanoramicViewer(false);
  };

  const openDetails = () => setShowDetails(true);
  const closeDetails = () => setShowDetails(false);

  const submitForward = (e) => {
    e.preventDefault();
    // Pass along forward info as part of description for now
    const augmentedDescription = `${description}\n\nForwarding From: ${forwardData.currentMunicipality || 'City North'} - ${forwardData.currentWard || 'Ward 2'}\nTo: ${forwardData.targetMunicipality || 'City West'} - ${forwardData.targetWard || 'Ward 11'}\nReason: ${forwardData.reason || 'Re-assigning to responsible jurisdiction'}`;
    onAction('Forward', title, augmentedDescription);
    setShowForwardForm(false);
    setPendingAction(null);
    setForwardData({ currentMunicipality: '', currentWard: '', targetMunicipality: '', targetWard: '', reason: '' });
  };

  // Get the image for this card (cycling through dummy images)
  const cardImage = dummyPanoramicImages[imageIndex % dummyPanoramicImages.length];

  // Always show the interactive card on the landing page regardless of status

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 cursor-pointer" onClick={openDetails}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {/* Clickable Image */}
          <div 
            className="w-24 h-24 sm:w-16 sm:h-16 bg-gray-300 rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200 overflow-x-auto overflow-y-hidden"
            onClick={(e)=>{ e.stopPropagation(); handleImageClick(); }}
          >
            <img 
              src={cardImage} 
              alt={title}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-xs ">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{title}</h3>
            <p className="text-gray-600 text-sm mt-1 cursor-pointer line-clamp-3 sm:line-clamp-none" onClick={openDetails}>{description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
              {severity && (
                <span className={`px-2 py-1 rounded-full border ${
                  severity === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                  severity === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-green-50 text-green-700 border-green-200'
                }`}>Severity: {severity}</span>
              )}
              {(lat !== undefined && lng !== undefined) && (
                <a className="px-2 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" rel="noreferrer">{lat?.toFixed ? lat.toFixed(4) : lat}, {lng?.toFixed ? lng.toFixed(4) : lng}</a>
              )}
              {date && (<span className="px-2 py-1 rounded-full border bg-gray-50 text-gray-700 border-gray-200">{date}</span>)}
              {municipality && (<span className="px-2 py-1 rounded-full border bg-gray-50 text-gray-700 border-gray-200">{municipality}</span>)}
              {ward && (<span className="px-2 py-1 rounded-full border bg-gray-50 text-gray-700 border-gray-200">{ward}</span>)}
            </div>
          </div>
          
          {/* Action Area */}
          <div className="flex items-center gap-2 self-start sm:self-auto justify-start">
            {completedAction ? (
              <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium ${
                completedAction === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
                completedAction === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                'bg-blue-100 text-blue-800 border-blue-200'
              }`}>
                {completedAction === 'Approved' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
                {completedAction === 'Rejected' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                )}
                {completedAction !== 'Approved' && completedAction !== 'Rejected' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                )}
                <span>{completedAction === 'Forward' ? 'Forwarded' : completedAction}</span>
              </span>
            ) : (
              <>
                {/* Approve Button - Green */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleActionClick('Approved'); }}
                  className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm hover:shadow-md"
                  aria-label="Approve"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                {/* Reject Button - Red */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleActionClick('Rejected'); }}
                  className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm hover:shadow-md"
                  aria-label="Reject"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Forward Button - Blue */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleActionClick('Forward'); }}
                  className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm hover:shadow-md"
                  aria-label="Forward"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Action</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to <span className="font-medium">{pendingAction?.toLowerCase()}</span> this task?
            </p>
            {pendingAction === 'Rejected' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Rejection</label>
                <textarea className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" rows="3" placeholder="Describe the reason..." value={rejectReason} onChange={(e)=>setRejectReason(e.target.value)} />
              </div>
            )}
            <div className="flex space-x-3">
              <button
                onClick={cancelAction}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 rounded-md text-white transition-colors duration-200 ${
                  pendingAction === 'Approved' ? 'bg-green-500 hover:bg-green-600' :
                  pendingAction === 'Rejected' ? 'bg-red-500 hover:bg-red-600' :
                  'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forward Questionnaire Modal */}
      {showForwardForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Forward Task</h3>
            <form onSubmit={submitForward} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Municipality</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={forwardData.currentMunicipality}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForwardData({ ...forwardData, currentMunicipality: value, currentWard: '' });
                    }}
                  >
                    <option value="" disabled>Select municipality</option>
                    {MUNICIPALITIES.map((m) => (
                      <option key={m.name} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Ward</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={forwardData.currentWard}
                    onChange={(e) => setForwardData({ ...forwardData, currentWard: e.target.value })}
                    disabled={!forwardData.currentMunicipality}
                  >
                    <option value="" disabled>{forwardData.currentMunicipality ? 'Select ward' : 'Select municipality first'}</option>
                    {MUNICIPALITIES.find(m => m.name === forwardData.currentMunicipality)?.wards.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transfer To Municipality</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={forwardData.targetMunicipality}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForwardData({ ...forwardData, targetMunicipality: value, targetWard: '' });
                    }}
                  >
                    <option value="" disabled>Select municipality</option>
                    {MUNICIPALITIES.map((m) => (
                      <option key={m.name} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transfer To Ward</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={forwardData.targetWard}
                    onChange={(e) => setForwardData({ ...forwardData, targetWard: e.target.value })}
                    disabled={!forwardData.targetMunicipality}
                  >
                    <option value="" disabled>{forwardData.targetMunicipality ? 'Select ward' : 'Select municipality first'}</option>
                    {MUNICIPALITIES.find(m => m.name === forwardData.targetMunicipality)?.wards.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Transfer</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Brief description..."
                  value={forwardData.reason}
                  onChange={(e) => setForwardData({ ...forwardData, reason: e.target.value })}
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button type="button" onClick={() => setShowForwardForm(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
          <div className="relative z-[101] flex items-center justify-center h-full p-4">
            <div className="bg-white rounded-2xl w-full max-w-md sm:max-w-2xl mx-4 overflow-hidden shadow-xl">
              <div className="relative bg-gray-100">
                <img src={cardImage} alt={title} className="w-full h-52 sm:h-60 object-cover" />
                <button onClick={closeDetails} aria-label="Close" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-gray-700 shadow flex items-center justify-center hover:bg-white">✕</button>
              </div>
              <div className="p-5 sm:p-6 bg-white">
                <h3 className="text-base font-semibold text-gray-900 mb-3 truncate">{title}</h3>
                <div className="mb-5">
                  <div className="text-xs font-medium text-gray-600 mb-1">Description</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900">{type || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Reported</span>
                    <span className="font-medium text-gray-900">{reportedAt ? (()=>{ const diff = Date.now()-new Date(reportedAt).getTime(); const days = Math.floor(diff/86400000); return days>0 ? `${days} day${days>1?'s':''} ago` : 'Today'; })() : '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location</span>
                    {(lat !== undefined && lng !== undefined) ? (
                      <a className="font-medium text-blue-700 hover:underline" href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" rel="noreferrer">{lat.toFixed ? lat.toFixed(2) : lat}, {lng.toFixed ? lng.toFixed(2) : lng}</a>
                    ) : <span className="text-gray-500">—</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Severity</span>
                    <span className={`px-2 py-0.5 rounded border text-xs ${
                      severity === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                      severity === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-green-50 text-green-700 border-green-200'
                    }`}>{severity || '—'}</span>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button onClick={closeDetails} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Panoramic Viewer */}
      <PanoramicViewer
        imageUrl={cardImage}
        isOpen={showPanoramicViewer}
        onClose={closePanoramicViewer}
      />
    </>
  );
};

export default Card;
