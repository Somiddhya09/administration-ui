import { useState } from 'react';

const Navbar = ({ stats = { pending: 0, approved: 0, rejected: 0, forwarded: 0 }, groupedReports = { Pending: [], Approved: [], Rejected: [], Forwarded: [] } }) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState({ Pending: false, Approved: false, Rejected: false, Forwarded: false });

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Site Name */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-md flex-shrink-0"></div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">MySite Administration</h1>
          </div>

          {/* Right side - Hamburger Menu */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex flex-col space-y-1 cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <span className="w-6 h-0.5 bg-gray-700"></span>
            <span className="w-6 h-0.5 bg-gray-700"></span>
            <span className="w-6 h-0.5 bg-gray-700"></span>
          </button>
        </div>
      </div>

      {/* Drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          ></div>
          {/* Drawer */}
          <aside className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-gray-600 hover:text-gray-800">✕</button>
            </div>

            {/* Statistics */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-medium text-gray-700">Statistics</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md border border-gray-100 bg-blue-50 text-center py-3">
                  <div className="text-xl font-bold text-blue-700">{stats.pending || 0}</div>
                  <div className="text-xs text-blue-800">Pending</div>
                </div>
                <div className="rounded-md border border-gray-100 bg-green-50 text-center py-3">
                  <div className="text-xl font-bold text-green-700">{stats.approved || 0}</div>
                  <div className="text-xs text-green-800">Approved</div>
                </div>
                <div className="rounded-md border border-gray-100 bg-rose-50 text-center py-3">
                  <div className="text-xl font-bold text-rose-700">{stats.rejected || 0}</div>
                  <div className="text-xs text-rose-800">Rejected</div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 mt-3">
                <div className="rounded-md border border-gray-100 bg-indigo-50 text-center py-3">
                  <div className="text-xl font-bold text-indigo-700">{stats.forwarded || 0}</div>
                  <div className="text-xs text-indigo-800">Forwarded</div>
                </div>
              </div>
            </div>

            {/* Navigation with expandable lists */}
            <div className="space-y-2 mb-8">
              <h3 className="text-sm font-medium text-gray-700">Navigation</h3>
              {(['Pending','Approved','Rejected','Forwarded']).map((section) => (
                <div key={section} className="border border-gray-100 rounded-md">
                  <button onClick={()=>setExpanded(prev=>({ ...prev, [section]: !prev[section] }))} className={`w-full flex items-center justify-between px-3 py-2 text-left ${expanded[section] ? 'bg-gray-50' : 'bg-white'}`}>
                    <span className="text-gray-800 text-sm font-medium">{section} Reports</span>
                    <span className={`transition-transform ${expanded[section] ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                  {expanded[section] && (
                    <div className="px-3 pb-2">
                      <ul className="space-y-1 max-h-56 overflow-y-auto">
                        {(groupedReports[section] || []).map((r)=> (
                          <li key={r.id} className="text-sm text-gray-700 bg-white rounded px-2 py-1 border border-gray-100">{r.title}</li>
                        ))}
                        {(groupedReports[section] || []).length === 0 && (
                          <li className="text-xs text-gray-500 px-2 py-1">No reports</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Task Reviews removed as requested */}

            {/* Help & Support */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Help & Support</h3>
              <ul className="space-y-1 text-gray-700">
                <li><a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">Documentation</a></li>
                <li><a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">Contact Support</a></li>
                <li><a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">Feedback</a></li>
              </ul>
            </div>
          </aside>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
