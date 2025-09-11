// context/ReportsContext.js
import React, { createContext, useState, useMemo, useContext } from 'react';
import toast from 'react-hot-toast';

// The initial data source, acting as our database
const sampleData = [
  { id: 1, title: 'Pothole', category: 'Roads', reportedAt: '2025-09-11T14:45:00Z', description: 'A large pothole near the RDB Boulevard signal is slowing traffic and damaging vehicles.', severity: 'High', lat: 22.5751, lng: 88.4312, municipality: 'Bidhannagar', ward: 'Ward 27', date: '2025-09-11', status: 'Pending' },
  { id: 2, title: 'Garbage Overflow', category: 'Sanitation', reportedAt: '2025-09-11T09:20:00Z', description: 'Garbage bins near Infinity Benchmark are overflowing, causing a foul smell and attracting stray animals.', severity: 'Medium', lat: 22.5775, lng: 88.4290, municipality: 'Bidhannagar', ward: 'Ward 28', date: '2025-09-11', status: 'Pending' },
  { id: 3, title: 'Streetlight Outage', category: 'Electrical', reportedAt: '2025-09-10T19:30:00Z', description: 'Two consecutive streetlights near Technopolis are not working, making the stretch unsafe at night.', severity: 'High', lat: 22.5789, lng: 88.4335, municipality: 'New Town', ward: 'Ward 5', date: '2025-09-10', status: 'Pending' },
  { id: 4, title: 'Waterlogging', category: 'Drainage', reportedAt: '2025-09-10T11:10:00Z', description: 'Heavy waterlogging in front of TCS Gitanjali Park after a short spell of rain.', severity: 'High', lat: 22.5762, lng: 88.4350, municipality: 'Bidhannagar', ward: 'Ward 29', date: '2025-09-10', status: 'Pending' },
  { id: 5, title: 'Broken Pavement', category: 'Roads', reportedAt: '2025-09-09T16:00:00Z', description: 'The footpath near the Wipro gate is broken, making it difficult for pedestrians.', severity: 'Medium', lat: 22.5740, lng: 88.4325, municipality: 'Bidhannagar', ward: 'Ward 28', date: '2025-09-09', status: 'Pending' },
  { id: 6, title: 'Clogged Drain', category: 'Drainage', reportedAt: '2025-09-09T08:45:00Z', description: 'The main drain near the SDF Building is clogged, causing dirty water to overflow onto the road.', severity: 'Medium', lat: 22.5757, lng: 88.4282, municipality: 'Bidhannagar', ward: 'Ward 28', date: '2025-09-09', status: 'Pending' },
  { id: 7, title: 'Damaged Bus Shelter', category: 'Public Infrastructure', reportedAt: '2025-09-08T13:20:00Z', description: 'The roof of the bus shelter at Webel More is damaged and leaks during rain.', severity: 'Low', lat: 22.5728, lng: 88.4343, municipality: 'New Town', ward: 'Ward 3', date: '2025-09-08', status: 'Pending' },
  { id: 8, title: 'Unattended Debris', category: 'Sanitation', reportedAt: '2025-09-08T10:15:00Z', description: 'Construction debris has been left on the side of the road near Godrej Waterside for over a week, obstructing traffic.', severity: 'High', lat: 22.5782, lng: 88.4370, municipality: 'Bidhannagar', ward: 'Ward 29', date: '2025-09-08', status: 'Pending' },
  { id: 9, title: 'Flickering Streetlight', category: 'Electrical', reportedAt: '2025-09-07T21:00:00Z', description: 'The main streetlight at College More crossing is constantly flickering, which can be dangerous for drivers.', severity: 'Medium', lat: 22.5733, lng: 88.4287, municipality: 'Bidhannagar', ward: 'Ward 27', date: '2025-09-07', status: 'Pending' },
  { id: 10, title: 'Illegal Parking', category: 'Traffic', reportedAt: '2025-09-11T17:50:00Z', description: 'Cars are illegally parked in the no-parking zone near Martin Burn Business Park, causing congestion.', severity: 'Low', lat: 22.5770, lng: 88.4360, municipality: 'New Town', ward: 'Ward 5', date: '2025-09-11', status: 'Pending' }
];

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState(sampleData);

  const stats = useMemo(() => {
    const pending = reports.filter(r => r.status === 'Pending').length;
    const approved = reports.filter(r => r.status === 'Approved').length;
    const rejected = reports.filter(r => r.status === 'Rejected').length;
    const forwarded = reports.filter(r => r.status === 'Forwarded').length;
    return { pending, approved, rejected, forwarded };
  }, [reports]);

  const handleAction = (action, id, description) => {
    let successMessage = '';
    const actedReport = reports.find(r => r.id === id);
    if (!actedReport) return;

    setReports(currentReports =>
      currentReports.map(report =>
        report.id === id ? { ...report, status: action, description } : report
      )
    );

    if (action === 'Approved') successMessage = `Report "${actedReport.title}" was approved!`;
    if (action === 'Rejected') successMessage = `Report "${actedReport.title}" was rejected.`;
    if (action === 'Forwarded') successMessage = `Report "${actedReport.title}" was forwarded.`;
    
    if (successMessage) {
        toast.success(successMessage);
    }
  };

  const value = { reports, stats, handleAction };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};

// Custom hook to easily use the context
export const useReports = () => {
    return useContext(ReportsContext);
};