  import { useMemo, useState } from 'react';
  import Navbar from '../components/Navbar';
  import MessageBar from '../components/MessageBar';
  import Card from '../components/Card';

  export default function Home() {
    // Sample data array for cards
    const sampleData = [
      { 
        id: 1, 
        title: 'Pothole', 
        type: 'Road', 
        reportedAt: '2025-09-01T14:45:00Z', 
        description: 'A large pothole near the RDB Boulevard signal is slowing traffic and damaging two-wheelers. Several riders have slipped during rain.', 
        severity: 'High', 
        lat: 22.5751, 
        lng: 88.4312, 
        municipality: 'Bidhannagar Municipal Corporation', 
        ward: 'Ward 27', 
        date: '2025-09-01' 
      },
      { 
        id: 2, 
        title: 'Garbage overflow', 
        type: 'Sanitation', 
        reportedAt: '2025-09-02T09:20:00Z', 
        description: 'Garbage bins near Infinity Benchmark are overflowing and the smell is spreading to nearby offices. Attracting dogs and crows.', 
        severity: 'Medium', 
        lat: 22.5775, 
        lng: 88.4290, 
        municipality: 'Bidhannagar Municipal Corporation', 
        ward: 'Ward 28', 
        date: '2025-09-02' 
      },
      { 
        id: 3, 
        title: 'Streetlight issue', 
        type: 'Lighting', 
        reportedAt: '2025-09-01T19:30:00Z', 
        description: 'Two consecutive streetlights near Technopolis are not working, making the stretch unsafe for pedestrians at night.', 
        severity: 'High', 
        lat: 22.5789, 
        lng: 88.4335, 
        municipality: 'Bidhannagar Municipal Corporation', 
        ward: 'Ward 30', 
        date: '2025-09-01' 
      },
      { 
        id: 4, 
        title: 'Waterlogging', 
        type: 'Drainage', 
        reportedAt: '2025-09-03T11:10:00Z', 
        description: 'Heavy waterlogging in front of TCS Gitanjali Park after rain. Vehicles are stranded and office-goers are wading through knee-deep water.', 
        severity: 'High', 
        lat: 22.5762, 
        lng: 88.4350, 
        municipality: 'Bidhannagar Municipal Corporation', 
        ward: 'Ward 29', 
        date: '2025-09-03' 
      },
      { 
        id: 5, 
        title: 'Pothole', 
        type: 'Road', 
        reportedAt: '2025-09-04T10:15:00Z', 
        description: 'Multiple potholes near College More crossing are forcing cars to swerve suddenly, creating traffic congestion.', 
        severity: 'Medium', 
        lat: 22.5733, 
        lng: 88.4287, 
        municipality: 'Bidhannagar Municipal Corporation', 
        ward: 'Ward 27', 
        date: '2025-09-04' 
      },
      { 
        id: 6, 
        title: 'Garbage overflow', 
        type: 'Sanitation', 
        reportedAt: '2025-09-02T17:50:00Z', 
        description: 'Unattended garbage heap near Wipro Gate 5 blocking half the footpath, forcing pedestrians to walk on the road.', 
        severity: 'Low', 
        lat: 22.5740, 
        lng: 88.4325, 
        municipality: 'Bidhannagar Municipal Corporation', 
        ward: 'Ward 28', 
        date: '2025-09-02' 
      },
      { 
        id: 7, 
        title: 'Streetlight issue', 
        type: 'Lighting', 
        reportedAt: '2025-09-05T06:30:00Z', 
        description: 'Flickering lights near Nalban bus stop. The area feels unsafe for early commuters and women walking alone.', 
        severity: 'Low', 
        lat: 22.5795, 
        lng: 88.4301, 
        municipality: 'Bidhannagar Municipal Corporation', 
        ward: 'Ward 31', 
        date: '2025-09-05' 
      },
      { 
        id: 8, 
        title: 'Waterlogging', 
        type: 'Drainage', 
        reportedAt: '2025-09-03T15:40:00Z', 
        description: 'Persistent stagnant water near Webel Bus Stand, becoming a breeding ground for mosquitoes.', 
        severity: 'Medium', 
        lat: 22.5728, 
        lng: 88.4343, 
        municipality: 'Bidhannagar Municipal Corporation', 
        ward: 'Ward 27', 
        date: '2025-09-03' 
      },
      { 
        id: 9, 
        title: 'Pothole', 
        type: 'Road', 
        reportedAt: '2025-09-05T12:00:00Z', 
        description: 'Deep pothole in front of Godrej Waterside. Cars frequently braking sharply are causing minor accidents.', 
        severity: 'High', 
        lat: 22.5782, 
        lng: 88.4370, 
        municipality: 'Bidhannagar Municipal Corporation', 
        ward: 'Ward 29', 
        date: '2025-09-05' 
      },
      { 
        id: 10, 
        title: 'Garbage overflow', 
        type: 'Sanitation', 
        reportedAt: '2025-09-01T08:10:00Z', 
        description: 'Open garbage dump left unattended near SDF Building. Strong odor spreading to nearby tea stalls.', 
        severity: 'Low', 
        lat: 22.5757, 
        lng: 88.4282, 
        municipality: 'Bidhannagar Municipal Corporation', 
        ward: 'Ward 28', 
        date: '2025-09-01' 
      }
    ];


    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState({
      pending: sampleData.length,
      approved: 0,
      rejected: 0,
      forwarded: 0,
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [completedTasks, setCompletedTasks] = useState({});
    // Filters toolbar state
    const [sortOrder, setSortOrder] = useState('newest');
    const [filterMunicipality, setFilterMunicipality] = useState('');
    const [filterWard, setFilterWard] = useState('');
    const [filterDate, setFilterDate] = useState('');
    

    const filteredAndSorted = useMemo(() => {
      let arr = [...sampleData];
      if (filterMunicipality) arr = arr.filter(i => i.municipality === filterMunicipality);
      if (filterWard) arr = arr.filter(i => i.ward === filterWard);
      if (filterDate) arr = arr.filter(i => i.date === filterDate);
      arr.sort((a, b) => sortOrder === 'newest' ? b.id - a.id : a.id - b.id);
      return arr;
    }, [sampleData, filterMunicipality, filterWard, filterDate, sortOrder]);

    const groupedReports = useMemo(() => {
      const groups = { Pending: [], Approved: [], Rejected: [], Forwarded: [] };
      filteredAndSorted.forEach((item) => {
        const status = completedTasks[item.id]?.action || 'Pending';
        groups[status].push({
          id: item.id,
          title: item.title,
          timestamp: item.reportedAt,
          action: status,
        });
      });
      return groups;
    }, [filteredAndSorted, completedTasks]);

    const handleAction = (action, id, description) => {
      // Create a new review (optional, if you’re logging history somewhere)
      const newReview = {
        id: Date.now(),
        title:  sampleData.find(i => i.id === id)?.title || 'Unknown',
        description,
        action,
        timestamp: new Date().toLocaleString()
      };

      // ✅ Update the cards state so UI shows Approved / Rejected / Forward
      setCompletedTasks(prev => ({
        ...prev,
        [id]: {
          completed: true,
          action,
          description
        }
      }));

      // If you also want to keep a list of reviews:
      setReviews(prev => [...prev, newReview]);

      setStats(prev => {
        const updated = { ...prev, pending: Math.max(0, prev.pending - 1) };
        if (action === 'Approved') updated.approved += 1;
        if (action === 'Rejected') updated.rejected += 1;
        if (action === 'Forwarded') updated.forwarded += 1;
        return updated;
      });
    };


    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar stats={stats} groupedReports={groupedReports} />
        {/* Toolbar below navbar */}
        <div className="border-b border-gray-100 bg-white/60 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
            <div className="flex-1 text-sm font-semibold text-gray-800">Reports</div>
            {/* Sort - keep as is conceptually */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort</span>
              <select value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white">
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
            {/* Filter - Municipality */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Municipality</span>
              <select value={filterMunicipality} onChange={(e)=>{ setFilterMunicipality(e.target.value); setFilterWard(''); }} className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white">
                <option value="">All</option>
                <option>City North</option>
                <option>City South</option>
                <option>City East</option>
                <option>City West</option>
              </select>
            </div>
            {/* Filter - Ward */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Ward</span>
              <select value={filterWard} onChange={(e)=>setFilterWard(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white">
                <option value="">All</option>
                {['Ward 1','Ward 2','Ward 3','Ward 4','Ward 5','Ward 6','Ward 7','Ward 8','Ward 9','Ward 10','Ward 11','Ward 12'].map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
            {/* Search by date */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Date</span>
              <input type="date" value={filterDate} onChange={(e)=>setFilterDate(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white" />
            </div>
          </div>
        </div>
        
        <main className="max-w-4xl mx-auto px-4 py-6">
          {/* Pending Reports */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Pending Reports</h2>
            <div className="space-y-4">
              {filteredAndSorted.filter(item => !completedTasks[item.id]?.completed).map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  onAction={handleAction}
                  isCompleted={false}
                  completedAction={undefined}
                  imageIndex={item.id - 1}
                  severity={item.severity}
                  lat={item.lat}
                  lng={item.lng}
                  date={item.date}
                  municipality={item.municipality}
                  ward={item.ward}
                  type={item.type}
                  reportedAt={item.reportedAt}
                />
              ))}
            </div>
            {filteredAndSorted.filter(item => !completedTasks[`${item.title}-${item.description}`]?.completed).length === 0 && (
              <p className="text-sm text-gray-500">No pending reports.</p>
            )}
          </section>

          {/* Actions Taken */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Actions Taken</h2>
            <div className="space-y-4">
              {filteredAndSorted.filter(item => completedTasks[item.id]?.completed).map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  onAction={handleAction}
                  isCompleted={false}
                  completedAction={completedTasks[`${item.title}-${item.description}`]?.action}
                  imageIndex={item.id - 1}
                  severity={item.severity}
                  lat={item.lat}
                  lng={item.lng}
                  date={item.date}
                  municipality={item.municipality}
                  ward={item.ward}
                  type={item.type}
                  reportedAt={item.reportedAt}
                />
              ))}
            </div>
            {filteredAndSorted.filter(item => completedTasks[item.id]?.completed).length === 0 && (
              <p className="text-sm text-gray-500">No actions taken yet.</p>
            )}
          </section>
        </main>
      </div>
    );
  }
