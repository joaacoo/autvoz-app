import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Shield, Home, CheckCircle, AlertTriangle } from 'lucide-react';

interface AlertScreenProps {
  onDismiss: () => void;
}

const AlertScreen: React.FC<AlertScreenProps> = ({ onDismiss }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, var(--color-yellow-rumble) 0%, #F59E0B 100%)',
          color: 'white',
          border: 'none',
          boxShadow: 'var(--shadow-rumble)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <AlertTriangle size={32} color="white" />
          <div>
            <h2 style={{ color: 'white', margin: 0, fontSize: '1.25rem', marginBottom: '0.5rem' }}>Alerta Preventiva</h2>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>
              Ventana de acción estimada: <strong>45 a 60 segundos</strong> antes de posible sobrecarga.
            </p>
          </div>
        </div>
      </motion.div>

      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>Protocolo de Descompresión Rápida</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
            <div style={{ background: 'var(--color-bg-card-alt)', padding: '0.75rem', borderRadius: '50%' }}>
              <Headphones size={24} color="var(--color-accent-medium)" />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Paso 1</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Colocar auriculares de cancelación de ruido.</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
            <div style={{ background: 'var(--color-bg-card-alt)', padding: '0.75rem', borderRadius: '50%' }}>
              <Shield size={24} color="var(--color-accent-medium)" />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Paso 2</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Aplicar presión profunda en hombros o usar chaleco ponderado.</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
            <div style={{ background: 'var(--color-bg-card-alt)', padding: '0.75rem', borderRadius: '50%' }}>
              <Home size={24} color="var(--color-accent-medium)" />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Paso 3</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Trasladar a zona de baja estimulación lumínica y sonora.</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Feedback para el algoritmo:</p>
        <button className="btn btn-primary" onClick={onDismiss} style={{ width: '100%', background: 'var(--color-green-homeostasis)' }}>
          <CheckCircle size={20} /> Crisis Evitada (1-Tap)
        </button>
        <button className="btn btn-outline" onClick={onDismiss} style={{ width: '100%', borderColor: '#cbd5e1', color: '#64748b' }}>
          Ocurrió Desregulación
        </button>
      </div>

    </div>
  );
};

export default AlertScreen;
