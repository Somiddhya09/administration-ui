import React from "react";

// --- FIX: Added simple placeholder icons since they were not defined ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-11v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V7a1 1 0 011-1h2a1 1 0 011 1zm-1 4h-2" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.606 11.955 11.955 0 019 2.606c.308-2.553.5-5.189-.5-7.794z" /></svg>;

const ProfilePage = () => {
    // --- STATE MANAGEMENT ---
    const [adminData, setAdminData] = React.useState({
        fullName: 'Arup Roy',
        email: 'arup.roy@kmc.gov.in',
        phone: '9876543210',
        designation: 'Municipal Commissioner',
        municipality: 'Howrah Municipal Corporation',
        authority: 'High',
        // --- FIX: Corrected template literal string for the avatar URL ---
        avatarUrl: `https://i.pravatar.cc/150?u=admin${new Date().getTime()}`,
    });
    const [isEditing, setIsEditing] = React.useState(false);

    // --- HANDLERS ---
    const handleEditToggle = () => {
        if (isEditing) {
            // --- FIX: 'toast' was not defined. Commented out for now.
            // You would need to import a library like 'react-toastify' to use this.
            // toast.success("Profile updated successfully!");
            alert("Profile updated successfully!"); // Using a simple alert as a placeholder
        }
        setIsEditing(!isEditing);
    };

    // Helper component for displaying information fields
    const InfoField = ({ icon, label, value, isEditing }) => (
        <div>
            <label className="text-sm font-semibold text-slate-500">{label}</label>
            <div className="flex items-center mt-1">
                {icon}
                {isEditing && (label === 'Phone Number') ? (
                    <input 
                        type="text" 
                        defaultValue={value}
                        className="w-full p-1 rounded bg-slate-100 border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                ) : (
                    <p className="text-slate-800 text-base">{value}</p>
                )}
            </div>
        </div>
    );
    
    return (
        <div className="p-4 sm:p-6 md:p-8 bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-800">Administration Profile</h1>
            <p className="text-slate-500 mt-1">Manage your profile information and account settings.</p>

            <div className="w-full max-w-4xl mx-auto bg-white p-8 mt-8 rounded-xl shadow-md border border-slate-200">
                <div className="flex flex-col items-center text-center border-b border-slate-200 pb-6">
                    <img 
                        src={adminData.avatarUrl} 
                        alt="Profile Avatar"  
                        className="w-24 h-24 rounded-full object-cover ring-4 ring-orange-100"
                    />
                    <h2 className="mt-4 text-2xl font-bold text-slate-900">{adminData.fullName}</h2>
                    <p className="text-slate-600">{adminData.designation}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <InfoField icon={<MailIcon />} label="Email Address" value={adminData.email} />
                    <InfoField icon={<PhoneIcon />} label="Phone Number" value={adminData.phone} isEditing={isEditing} />
                    <InfoField icon={<BuildingIcon />} label="Municipality" value={adminData.municipality} />
                    <InfoField icon={<ShieldIcon />} label="Authority Level" value={adminData.authority} />
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button 
                        onClick={handleEditToggle}
                        // --- FIX: Changed to template literal for dynamic classes ---
                        className={`w-full py-2.5 px-5 font-semibold rounded-lg transition-colors ${isEditing ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white'}`}
                    >
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                    <button className="w-full py-2.5 px-5 font-semibold rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; 