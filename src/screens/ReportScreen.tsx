import React from 'react';
import { Download, FileText, Share2, TrendingUp, ShieldAlert, CheckCircle } from 'lucide-react';

const ReportScreen: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s ease', paddingBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-blue-institutional)' }}>Puente Terapéutico</h2>
      
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-blue-institutional) 0%, #1e2a58 100%)', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
             <h3 style={{ color: 'white', margin: 0, fontSize: '1.1rem' }}>Reporte Mensual</h3>
             <p style={{ margin: 0, opacity: 0.8, fontSize: '0.85rem', marginTop: '0.25rem' }}>Octubre 2026</p>
          </div>
          <FileText size={32} color="rgba(255,255,255,0.8)" />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
           <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.25rem' }}>Alertas Evitadas</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                85% <CheckCircle size={16} color="var(--color-green-homeostasis)" />
              </div>
           </div>
           <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.25rem' }}>Horas Monitoreo</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                142h
              </div>
           </div>
        </div>

        <button className="btn" style={{ width: '100%', background: 'white', color: 'var(--color-blue-institutional)', fontWeight: 600, display: 'flex', gap: '0.5rem' }}>
          <Download size={18} /> Exportar PDF a Terapeuta
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
         <h3 style={{ fontSize: '1rem', color: 'var(--color-text-main)', margin: 0 }}>Historial de Reportes</h3>
         
         {[
           { mes: 'Octubre 2026', estado: 'Borrador' },
           { mes: 'Septiembre 2026', estado: 'Enviado a Terapeuta' },
           { mes: 'Agosto 2026', estado: 'Enviado a Escuela' },
           { mes: 'Julio 2026', estado: 'Archivado' },
           { mes: 'Junio 2026', estado: 'Archivado' },
         ].map((rep, i) => (
           <div key={i} className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ background: 'var(--color-bg-card-alt)', padding: '0.5rem', borderRadius: '8px' }}>
                   <FileText size={20} color="var(--color-accent-medium)" />
                 </div>
                 <div>
                   <div style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>{rep.mes}</div>
                   <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{rep.estado}</div>
                 </div>
              </div>
              <button style={{ background: 'none', border: 'none', color: 'var(--color-accent-light)', cursor: 'pointer' }}>
                 <Share2 size={20} />
              </button>
           </div>
         ))}
      </div>
    </div>
  );
};

export default ReportScreen;
