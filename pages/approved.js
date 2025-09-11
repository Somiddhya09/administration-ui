// pages/approved.js
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { useReports } from '../context/ReportsContext';

export default function ApprovedPage() {
  const { reports, stats, handleAction } = useReports();
  const approvedReports = reports.filter(report => report.status === 'Approved');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar stats={stats} />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Approved Reports</h2>
        <div className="space-y-4">
          {approvedReports.length > 0 ? (
            approvedReports.map((item, index) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                onAction={handleAction}
                isCompleted={true}
                completedAction="Approved"
                imageIndex={index}
                severity={item.severity}
                lat={item.lat}
                lng={item.lng}
                date={item.date}
                municipality={item.municipality}
                ward={item.ward}
                type={item.type}
                reportedAt={item.reportedAt}
              />
            ))
          ) : (
             <p className="text-sm text-gray-500">No approved reports found.</p>
          )}
        </div>
      </main>
    </div>
  );
}