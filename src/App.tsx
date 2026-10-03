import React, { useState, useEffect, useRef } from 'react';
import { Activity, Bell, FileText, BarChart2, User, Bluetooth, BatteryMedium, BatteryLow, BatteryFull } from 'lucide-react';
import DashboardScreen from './screens/DashboardScreen';
import AlertScreen from './screens/AlertScreen';
import LogScreen from './screens/LogScreen';
import ReportScreen from './screens/ReportScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [battery, setBattery] = useState(85);
  const [showNav, setShowNav] = useState(true);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Drop battery by 1% every 5 minutes (300000 ms) for demonstration
    const batteryInterval = setInterval(() => {
      setBattery(prev => Math.max(0, prev - 1));
    }, 300000);
    return () => clearInterval(batteryInterval);
  }, []);

  const isTabChanging = useRef(false);

  // Reset navbar visibility when tab changes
  useEffect(() => {
    isTabChanging.current = true;
    setShowNav(true);
    // Also reset scroll position for the new tab
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
      lastScrollY.current = 0;
    }
    // Allow a small delay before accepting scroll events again
    // to prevent browser scroll restoration from hiding the nav
    const timer = setTimeout(() => {
      isTabChanging.current = false;
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleScroll = () => {
    if (!contentRef.current || isTabChanging.current) return;
    
    const currentScrollY = contentRef.current.scrollTop;
    
    // Don't hide if we're near the top
    if (currentScrollY <= 20) {
      setShowNav(true);
      lastScrollY.current = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY.current + 15) {
      setShowNav(false); // Scrolling down
    } else if (currentScrollY < lastScrollY.current - 15) {
      setShowNav(true); // Scrolling up
    }
    lastScrollY.current = currentScrollY;
  };

  const getBatteryIcon = () => {
    if (battery > 70) return <BatteryFull size={16} />;
    if (battery > 20) return <BatteryMedium size={16} />;
    return <BatteryLow size={16} color="var(--color-red-overload)" />;
  };

  // Simulating an alert trigger for testing
  const triggerAlert = () => {
    setIsAlertActive(true);
    setActiveTab('alert');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen onSimulateAlert={triggerAlert} />;
      case 'alert':
        return <AlertScreen onDismiss={() => {
          setIsAlertActive(false);
          setActiveTab('dashboard');
        }} />;
      case 'log':
        return <LogScreen />;
      case 'reports':
        return <ReportScreen />;
      case 'profile':
        return <ProfileScreen profilePic={profilePic} setProfilePic={setProfilePic} />;
      default:
        return <DashboardScreen onSimulateAlert={triggerAlert} />;
    }
  };

  return (
    <div className="app-container" style={{ backgroundColor: 'var(--color-bg-main)' }}>
      {/* Top Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        paddingBottom: '0.5rem',
        background: 'linear-gradient(180deg, rgba(195, 185, 240, 0.4) 0%, var(--color-bg-main) 100%)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/logo.png" alt="AutVoz Logo" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'contain' }} />
          <div>
            <h1 style={{ fontSize: '1.25rem', color: 'var(--color-text-main)', margin: 0, fontWeight: 700 }}>Hola, Laura</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <img 
                src={profilePic || "/foto-tomas.jpg"} 
                alt="Tomás" 
                onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Tomas&background=c3b9f0&color=1e2a58&rounded=true" }}
                style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-accent-light)' }} 
              />
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-main)', margin: 0, opacity: 0.8 }}>Monitoreando a Tomás</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-accent-medium)', fontSize: '0.75rem', fontWeight: 600 }}>
            <Bluetooth size={16} /> Conectado
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: battery <= 20 ? 'var(--color-red-overload)' : 'var(--color-text-main)', fontSize: '0.75rem', fontWeight: 600 }}>
            {getBatteryIcon()} {battery}%
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="content-area" ref={contentRef} onScroll={handleScroll}>
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className={`bottom-nav ${showNav ? 'visible' : 'hidden'}`} style={{ 
        transform: showNav ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: 'var(--color-bg-main)',
        borderTop: '2px solid var(--color-accent-lilac)'
      }}>
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Activity size={24} />
          <span>Inicio</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'alert' ? 'active' : ''} ${isAlertActive ? 'rumble' : ''}`}
          onClick={() => setActiveTab('alert')}
          style={{ position: 'relative' }}
        >
          <Bell size={24} />
          <span>Alertas</span>
          {isAlertActive && (
             <span style={{
               position: 'absolute',
               top: '-4px',
               right: '8px',
               width: '10px',
               height: '10px',
               backgroundColor: 'var(--color-yellow-rumble)',
               borderRadius: '50%',
               border: '2px solid white'
             }} />
          )}
        </button>
        <button 
          className={`nav-item ${activeTab === 'log' ? 'active' : ''}`}
          onClick={() => setActiveTab('log')}
        >
          <FileText size={24} />
          <span>Bitácora</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <BarChart2 size={24} />
          <span>Reportes</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={24} />
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
