import React, { useState } from 'react';
import AmericaScreen from './AmericaScreen';
import EuropaScreen from './EuropaScreen';
import AsiaScreen from './AsiaScreen';

interface MapaMundiScreenProps {
  onBack: () => void;
}

const MapaMundiScreen: React.FC<MapaMundiScreenProps> = ({ onBack }) => {
  const [view, setView] = useState<'continentes' | 'america' | 'europa' | 'asia'>('continentes');

  const handleRegionClick = (region: 'america' | 'europa' | 'asia') => {
    setView(region);
  };

  const handleBackToMap = () => {
    setView('continentes');
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'rgb(255, 255, 255)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 60px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Jost', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>

      {/* Formas decorativas - CANTO SUPERIOR DIREITO */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        gap: '15px',
        zIndex: 1
      }}>
       <img
          src="/images/formas_apoio_azul.png"
          alt=""
          style={{
            width: '380px',
            height: '200px',
            position: 'relative',
            top: '-76px',
            left: '80px'
          
          }}
        />
      </div>

      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        display: 'flex',
        gap: '15px',
        zIndex: 1
      }}>
        
        <img
          src="/images/formas_apoio_azul.png"
          alt=""
          style={{
            width: '380px',
            height: '200px',
            position: 'relative',
            top: '76px',
            left: '-80px'
            
          }}
        />
      </div>

      {/* Botão Voltar */}
      <div
        onClick={view !== 'continentes' ? handleBackToMap : onBack}
        className="touch-card"
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          background: 'rgb(24, 99, 173)',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(24, 99, 173, 0.4)',
          zIndex: 1000
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </div>

      {view === 'continentes' && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '0px',
          zIndex: 10
        }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '15px' }}>
            <img
              src="/images/mapa_mundi_em_azul.jpg"
              alt="Mapa Mundi em Azul"
              style={{
                width: '95vw',
                height: '95vh',
                maxWidth: '1257px',
                maxHeight: '75vh',
                objectFit: 'contain',
                cursor: 'pointer',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}
              onClick={(e) => {
                const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                const x = e.clientX - rect!.left;
                const y = e.clientY - rect!.top;
                
                if (x < rect!.width * 0.40) {
                  handleRegionClick('america');
                }
                else if (x >= rect!.width * 0.40 && x <= rect!.width * 0.51 && y >= rect!.height * 0.33 && y <= rect!.height * 0.53) {
                  handleRegionClick('europa');
                }
                else if (x >= rect!.width * 0.50 && x <= rect!.width * 0.87 && y >= rect!.height * 0.23 && y <= rect!.height * 0.65) {
                  handleRegionClick('asia');
                }
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px',
            gap: '15px'
          }}>
            <p style={{
              fontSize: '24px',
              fontWeight: '500',
              color: 'rgb(24, 99, 173)',
              lineHeight: '1.6',
              letterSpacing: '0.5px',
              fontFamily: "'Jost', sans-serif",
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0'
            }}>
              Clique nas regiões do mapa para visualizar a repercussão internacional de Brasília
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '25px',
              marginTop: '5px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 18px',
                background: 'rgba(24, 99, 173, 0.08)',
                borderRadius: '12px',
                borderLeft: '4px solid rgb(24, 99, 173)'
              }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  background: 'rgb(24, 99, 173)',
                  borderRadius: '50%',
                  border: '2px solid white'
                }} />
                <span style={{ 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  color: 'rgb(24, 99, 173)' 
                }}>
                  Américas
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 18px',
                background: 'rgba(24, 99, 173, 0.08)',
                borderRadius: '12px',
                borderLeft: '4px solid rgb(24, 99, 173)'
              }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  background: 'rgb(24, 99, 173)',
                  borderRadius: '50%',
                  border: '2px solid white'
                }} />
                <span style={{ 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  color: 'rgb(24, 99, 173)' 
                }}>
                  Europa 
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 18px',
                background: 'rgba(24, 99, 173, 0.08)',
                borderRadius: '12px',
                borderLeft: '4px solid rgb(24, 99, 173)'
              }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  background: 'rgb(24, 99, 173)',
                  borderRadius: '50%',
                  border: '2px solid white'
                }} />
                <span style={{ 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  color: 'rgb(24, 99, 173)' 
                }}>
                  Ásia 
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'america' && (
        <AmericaScreen onBack={handleBackToMap} />
      )}

      {view === 'europa' && (
        <EuropaScreen onBack={handleBackToMap} />
      )}

      {view === 'asia' && (
        <AsiaScreen onBack={handleBackToMap} />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .touch-card:active {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease;
        }

        .touch-card:hover {
          transform: scale(1.03);
          transition: all 0.3s ease;
        }

        @media (max-width: 1100px) {
          img[alt="Mapa Mundi em Azul"] {
            width: 95vw !important;
            height: 85vh !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="padding: 40px 60px"] {
            padding: 20px 30px !important;
          }
          span[style*="fontSize: 15px"] {
            font-size: 13px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="padding: 40px 60px"] {
            padding: 15px 20px !important;
          }
          img[alt="Mapa Mundi em Azul"] {
            width: 98vw !important;
            height: 80vh !important;
          }
          span[style*="fontSize: 15px"] {
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MapaMundiScreen;
