import React, { useState } from 'react';
import { PlusCircle, Calendar, MapPin, Tag } from 'lucide-react';

const TAGS = ['Ruido / Sirena', 'Cambio de Rutina', 'Cansancio', 'Multitud', 'Luz Brillante', 'Selección Alimentaria', 'Textura', 'Interacción Social'];

const LogScreen: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-blue-institutional)' }}>Bitácora de Incidentes</h2>
        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <PlusCircle size={16} /> Nuevo
        </button>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>Registro Rápido (Ex-Post)</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--color-bg-card-alt)', padding: '0.75rem', borderRadius: '8px' }}>
             <Calendar size={20} color="var(--color-accent-medium)" />
             <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Hoy, 14:30 hs (Alerta registrada)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--color-bg-card-alt)', padding: '0.75rem', borderRadius: '8px' }}>
             <MapPin size={20} color="var(--color-accent-medium)" />
             <input type="text" placeholder="Ubicación (ej: Escuela)" style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.9rem' }} />
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Tag size={16} /> Seleccionar Detonantes (Triggers)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {TAGS.map(tag => (
                <button 
                  key={tag}
                  className={`pill ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                  style={{ border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <textarea 
            placeholder="Notas adicionales (opcional)..." 
            style={{ 
              width: '100%', 
              minHeight: '80px', 
              padding: '0.75rem', 
              borderRadius: '8px', 
              border: '1px solid #cbd5e1', 
              resize: 'none',
              fontFamily: 'inherit',
              fontSize: '0.9rem'
            }}
          />

          <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>Guardar Registro</button>
        </div>
      </div>

      <div className="card">
         <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>Tendencias Semanales</h3>
         <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-card-alt)', borderRadius: '8px', color: 'var(--color-accent-medium)', fontSize: '0.9rem' }}>
           [ Gráfico de Mapa de Calor (Próximamente) ]
         </div>
      </div>
    </div>
  );
};

export default LogScreen;
