import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Wind } from 'lucide-react';

interface DashboardProps {
  onSimulateAlert: () => void;
}

const DashboardScreen: React.FC<DashboardProps> = ({ onSimulateAlert }) => {
  const [phase, setPhase] = useState<'calm' | 'rumble' | 'overload'>('calm');
  const [hr, setHr] = useState(78);
  const [resp, setResp] = useState(18);

  // Subtle natural variations
  useEffect(() => {
    const interval = setInterval(() => {
      setHr(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      if (Math.random() > 0.8) {
        setResp(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPhaseColor = () => {
    switch (phase) {
      case 'calm': return 'var(--color-green-homeostasis)';
      case 'rumble': return 'var(--color-yellow-rumble)';
      case 'overload': return 'var(--color-red-overload)';
    }
  };

  const getPhaseGlow = () => {
    switch (phase) {
      case 'calm': return 'var(--shadow-calm)';
      case 'rumble': return 'var(--shadow-rumble)';
      case 'overload': return '0 0 25px rgba(239, 68, 68, 0.5)';
    }
  };

  const [actionMessage, setActionMessage] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'fadeIn 0.5s ease-out', position: 'relative' }}>
      
      {/* Simulation controls for demonstration */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '-1rem' }}>
        <button className="btn btn-outline" onClick={() => setPhase('calm')} style={{ padding: '0.5rem', fontSize: '0.8rem' }}>Calma</button>
        <button className="btn btn-outline" onClick={() => { setPhase('rumble'); onSimulateAlert(); }} style={{ padding: '0.5rem', fontSize: '0.8rem', borderColor: 'var(--color-yellow-rumble)', color: 'var(--color-yellow-rumble)' }}>Simular Rumble</button>
      </div>

      {/* Main Sensory Ring */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
        <motion.div
          animate={{
            boxShadow: [
              `0 0 0 0px ${getPhaseColor()}40`,
              `0 0 0 20px ${getPhaseColor()}00`
            ]
          }}
          transition={{
            duration: phase === 'calm' ? 3 : 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
          style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: `6px solid ${getPhaseColor()}`,
            boxShadow: getPhaseGlow(),
            position: 'relative'
          }}
        >
          <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
            Estado Actual
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: getPhaseColor() }}>
            {phase === 'calm' ? 'Homeostasis' : phase === 'rumble' ? 'Rumble' : 'Sobrecarga'}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem', textAlign: 'center', padding: '0 1rem' }}>
            {phase === 'calm' ? 'Sistema nervioso en equilibrio' : 'Variación autonómica detectada'}
          </div>
        </motion.div>
      </div>

      {/* Secondary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
            <Heart size={20} color="var(--color-red-overload)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Frec. Cardíaca</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            {hr} <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>BPM</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
            <Activity size={20} color="var(--color-accent-medium)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>GSR</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            Línea base
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Wind size={24} color="var(--color-accent-light)" />
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>Respiración</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{resp} <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>resp/min</span></div>
            </div>
          </div>
          <div style={{ height: '30px', width: '60px', borderBottom: '2px solid var(--color-accent-light)', position: 'relative' }}>
             {/* Simple visual wave representation */}
             <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
               <path d="M0,15 Q25,0 50,15 T100,15" fill="none" stroke="var(--color-accent-light)" strokeWidth="2" />
             </svg>
          </div>
        </div>
      </div>

      {/* Quick Intervention Feature */}
      <div style={{ marginTop: '1rem' }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '1rem' }}>
          Intervención Rápida
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <button 
            className="btn" 
            style={{ backgroundColor: 'var(--color-accent-medium)', color: 'white', padding: '1rem', borderRadius: '12px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            onClick={() => setActionMessage("Se ha enviado el comando al reloj de Tomás para reproducir su lista de música relajante.")}
          >
            Música Calma
          </button>
          <button 
            className="btn" 
            style={{ backgroundColor: 'var(--color-accent-light)', color: 'white', padding: '1rem', borderRadius: '12px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            onClick={() => setActionMessage("El mensaje de voz ha sido enviado y se reproducirá en el dispositivo de Tomás.")}
          >
            Enviar Audio
          </button>
          <button 
            className="btn" 
            style={{ backgroundColor: 'var(--color-yellow-rumble)', color: 'white', padding: '1rem', borderRadius: '12px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            onClick={() => setActionMessage("Se ha abierto el formulario en la bitácora para registrar la observación actual.")}
          >
            Anotar Estado
          </button>
          <button 
            className="btn" 
            style={{ backgroundColor: 'var(--color-text-main)', color: 'white', padding: '1rem', borderRadius: '12px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            onClick={() => setActionMessage("Iniciando llamada de emergencia al dispositivo de Tomás...")}
          >
            Llamar a Tomás
          </button>
        </div>
      </div>

      {/* Support Section */}
      <div style={{ marginTop: '1rem', padding: '1.5rem', backgroundColor: 'var(--color-bg-card-alt)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>¿Necesitás ayuda técnica?</div>
        <button 
          onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=joacodeluca2009@gmail.com&su=Solicitud%20de%20Soporte%20Técnico%20-%20AutVoz&body=Hola%20equipo%20técnico%20AutVoz,%20tengo%20un%20problema.', '_blank')}
          className="btn"
          style={{ backgroundColor: 'white', color: 'var(--color-text-main)', border: '1px solid var(--color-accent-light)', fontSize: '0.85rem', width: '100%', cursor: 'pointer' }}
        >
          Contactar Soporte
        </button>
      </div>

      {/* Custom Action Modal */}
      {actionMessage && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(30, 42, 88, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '2rem'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '350px', textAlign: 'center', animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '1rem' }}>
              Acción Confirmada
            </div>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
              {actionMessage}
            </p>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => setActionMessage(null)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;
