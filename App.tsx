
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import MapPage from './pages/MapPage';
import ChatPage from './pages/ChatPage';
import MarketplacePage from './pages/MarketplacePage'; // Import MarketplacePage
import { UserProvider } from './contexts/UserContext';

// --- Icon SVGs ---
const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

const MarketplaceIcon = () => ( // New Marketplace Icon (Briefcase)
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 0 1-2.25 2.25h-12a2.25 2.25 0 0 1-2.25-2.25V14.15M16.5 18.225v-1.841a2.25 2.25 0 0 0-2.25-2.25h-3.75a2.25 2.25 0 0 0-2.25 2.25v1.841M16.5 18.225h.008v.008h-.008v-.008Zm-4.5 0h.008v.008h-.008v-.008Zm-4.5 0h.008v.008h-.008v-.008Zm0 0H6.75V9.75l.75-2.25h9l.75 2.25v8.475H3.75Z" />
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159-1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.68-3.091a1.993 1.993 0 0 0-1.015-.282H6.75A2.25 2.25 0 0 1 4.5 15V6.75A2.25 2.25 0 0 1 6.75 4.5h7.5c.884 0 1.672.484 2.063 1.222M10.5 11.25H13.5v.007H10.5v-.007Z" />
  </svg>
);
// --- End Icon SVGs ---

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Profile', path: '/', icon: <ProfileIcon /> },
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { name: 'Marketplace', path: '/marketplace', icon: <MarketplaceIcon /> }, // Added Marketplace
    { name: 'Map', path: '/map', icon: <MapIcon /> },
    { name: 'Chat', path: '/chat', icon: <ChatIcon /> },
  ];

  return (
    <aside className="w-64 bg-slate-800 text-slate-100 p-4 flex flex-col fixed inset-y-0 left-0 shadow-2xl">
      <div className="text-3xl font-bold text-teal-400 mb-10 py-3 px-2 border-b border-slate-700">
        HDTN Connect
      </div>
      <nav className="flex-grow">
        <ul className="space-y-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ease-in-out group
                              ${isActive 
                                ? 'bg-sky-500 text-white shadow-md scale-105'  // Brighter blue for active
                                : 'hover:bg-slate-700 hover:text-teal-300 hover:shadow-sm'
                              }`}
                >
                  <span className={`transform transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} HDTN</p>
      </div>
    </aside>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="flex min-h-screen bg-slate-900 text-slate-200">
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col"> {/* Adjust ml to match sidebar width */}
          <main className="flex-grow p-6 sm:p-8 lg:p-10 custom-scrollbar overflow-y-auto">
            <Routes>
              <Route path="/" element={<ProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} /> {/* Added Marketplace Route */}
              <Route path="/map" element={<MapPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </UserProvider>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-center py-4 shadow-inner-top"> {/* Custom shadow for inner top effect */}
      <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} HDTN Connect. All rights reserved.</p>
    </footer>
  );
};

export default App;
