// pages/forwarded.js
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { useReports } from '../context/ReportsContext';

export default function ForwardedPage() {
  const { reports, stats, handleAction } = useReports();
  const forwardedReports = reports.filter(report => report.status === 'Forwarded');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar stats={stats} />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Forwarded Reports</h2>
        <div className="space-y-4">
          {forwardedReports.length > 0 ? (
            forwardedReports.map((item, index) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                onAction={handleAction}
                isCompleted={true}
                completedAction="Forwarded"
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
             <p className="text-sm text-gray-500">No forwarded reports found.</p>
          )}
        </div>
      </main>
    </div>
  );
}