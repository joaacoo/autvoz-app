import React, { useState, useRef } from 'react';
import { Shield, Users, FileSignature, ChevronRight, Lock, Edit2 } from 'lucide-react';

interface ProfileProps {
  profilePic: string | null;
  setProfilePic: (val: string) => void;
}

const ProfileScreen: React.FC<ProfileProps> = ({ profilePic, setProfilePic }) => {
  const [privacyEnabled, setPrivacyEnabled] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--color-bg-card)', borderRadius: '16px' }}>
        <div 
          style={{ 
            width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-accent-medium)', color: 'white', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600,
            position: 'relative', cursor: 'pointer'
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <img 
            src={profilePic || "/foto-tomas.jpg"} 
            alt="Tomás"
            onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Tomas&background=617ad8&color=ffffff&rounded=true" }}
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', bottom: -2, right: -2, background: 'var(--color-bg-card)', borderRadius: '50%', padding: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ background: 'var(--color-accent-light)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Edit2 size={12} color="white" />
            </div>
          </div>
        </div>
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleImageUpload}
        />
        <div>
          <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-text-main)' }}>Tomás López</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Grado 2 - TEA</p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={18} color="var(--color-accent-medium)" /> Equipo de Cuidado (Roles)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
             <div>
                <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>Bárbara (Madre)</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Tutor Principal</div>
             </div>
             <span className="pill active" style={{ fontSize: '0.7rem' }}>Admin</span>
           </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div>
                <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>Martín (AT)</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Acompañante Terapéutico</div>
             </div>
             <ChevronRight size={18} color="#94a3b8" />
           </div>
           <button className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}>Vincular Nuevo Rol</button>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={18} color="var(--color-green-homeostasis)" /> Privacidad de Datos
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>Escudo Ley N° 25.326</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Anonimato y encriptación de biometría en la nube.</div>
          </div>
        </div>
        

      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-bg-card-alt) 0%, white 100%)' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileSignature size={18} color="var(--color-accent-medium)" /> Trámites CUD
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
          Asistente para solicitar cobertura (Leyes N° 27.043 y 24.901).
        </p>
        <button className="btn btn-secondary" style={{ width: '100%' }}>Descargar Modelo de Nota</button>
      </div>

    </div>
  );
};

export default ProfileScreen;
