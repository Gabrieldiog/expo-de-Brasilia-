import React, { useState } from 'react';
import AmericaScreen from './AmericaScreen';
import EuropaScreen from './EuropaScreen';
import AsiaScreen from './AsiaScreen';

interface MapaMundiScreenProps {
  onBack: () => void;
  onMainMenu?: () => void;
}

const MapaMundiScreen: React.FC<MapaMundiScreenProps> = ({ onBack, onMainMenu }) => {
  const [view, setView] = useState<'continentes' | 'america' | 'europa' | 'asia'>('continentes');

  const handleRegionClick = (region: 'america' | 'europa' | 'asia') => {
    setView(region);
  };

  const handleBackToMap = () => {
    setView('continentes');
  };

  return (
    <div className="mapamundi-container">
      {/* Formas decorativas - CANTO SUPERIOR DIREITO */}
      <div className="forma-apoio-superior">
        <img
          src="/images/formas_apoio_azul.png"
          alt=""
          className="forma-apoio-img-azul"
        />
      </div>

      {/* Formas decorativas - CANTO INFERIOR ESQUERDO */}
      <div className="forma-apoio-inferior">
        <img
          src="/images/formas_apoio_azul.png"
          alt=""
          className="forma-apoio-img-azul"
        />
      </div>

      {/* Botão Voltar */}
      <div
        onClick={view !== 'continentes' ? handleBackToMap : onBack}
        className="touch-card botao-voltar-mapa"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </div>

      {/* Botão Menu Principal (Home) */}
      <div
        onClick={onMainMenu || onBack}
        className="touch-card botao-home-mapa"
        title="Voltar ao Menu Principal"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>

      {/* Tela de Continentes */}
      {view === 'continentes' && (
        <div className="tela-continentes">
          <div className="mapa-container">
            <img
              src="/images/mapa_mundi_em_azul.jpg"
              alt="Mapa Mundi em Azul"
              className="mapa-mundi"
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
          
          <div className="instrucoes-container">
            <p className="texto-instrucao-mapa">
              Clique nas regiões do mapa para visualizar a repercussão internacional de Brasília
            </p>
            
            <div className="badges-continentes">
              <div 
                className="badge-continente badge-clicavel"
                onClick={() => handleRegionClick('america')}
              >
                <div className="badge-circulo" />
                <span className="badge-texto">Américas</span>
              </div>
              <div 
                className="badge-continente badge-clicavel"
                onClick={() => handleRegionClick('europa')}
              >
                <div className="badge-circulo" />
                <span className="badge-texto">Europa</span>
              </div>
              <div 
                className="badge-continente badge-clicavel"
                onClick={() => handleRegionClick('asia')}
              >
                <div className="badge-circulo" />
                <span className="badge-texto">Ásia</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Telas de Regiões */}
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

        /* Container Principal */
        .mapamundi-container {
          width: 100vw;
          height: 100vh;
          background: rgb(255, 255, 255);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(20px, 3vw, 60px) clamp(30px, 4vw, 60px);
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Formas de apoio */
        .forma-apoio-superior {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          gap: 15px;
          z-index: 1;
        }

        .forma-apoio-inferior {
          position: absolute;
          bottom: 10px;
          left: 10px;
          display: flex;
          gap: 15px;
          z-index: 1;
        }

        .forma-apoio-img-azul {
          width: clamp(200px, 20vw, 380px);
          height: clamp(100px, 10vw, 200px);
          object-fit: contain;
        }

        .forma-apoio-superior .forma-apoio-img-azul {
          position: relative;
          top: clamp(-40px, -4vw, -76px);
          left: clamp(40px, 4vw, 80px);
        }

        .forma-apoio-inferior .forma-apoio-img-azul {
          position: relative;
          top: clamp(40px, 4vw, 76px);
          left: clamp(-40px, -4vw, -80px);
        }

        /* Botão Voltar */
        .botao-voltar-mapa {
          position: absolute;
          top: clamp(20px, 2.5vw, 40px);
          left: clamp(20px, 2.5vw, 40px);
          background: rgb(24, 99, 173);
          border-radius: 50%;
          width: clamp(60px, 5vw, 80px);
          height: clamp(60px, 5vw, 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(24, 99, 173, 0.4);
          z-index: 1000;
          animation: fadeIn 1s ease 0.2s backwards;
        }

        .botao-voltar-mapa svg {
          width: clamp(30px, 2.5vw, 40px);
          height: clamp(30px, 2.5vw, 40px);
        }

        /* Botão Home (Menu Principal) */
        .botao-home-mapa {
          position: absolute;
          top: clamp(20px, 2.5vw, 40px);
          left: clamp(100px, 9vw, 140px);
          background: rgb(24, 99, 173);
          border-radius: 50%;
          width: clamp(60px, 5vw, 80px);
          height: clamp(60px, 5vw, 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(24, 99, 173, 0.4);
          z-index: 1000;
          animation: fadeIn 1s ease 0.3s backwards;
        }

        .botao-home-mapa svg {
          width: clamp(30px, 2.5vw, 40px);
          height: clamp(30px, 2.5vw, 40px);
        }

        /* Tela de Continentes */
        .tela-continentes {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 0;
          z-index: 10;
        }

        .mapa-container {
          position: relative;
          display: inline-block;
          margin-bottom: clamp(10px, 1vw, 15px);
        }

        .mapa-mundi {
          width: 85vw;
          height: 85vh;
          max-width: clamp(750px, 65vw, 1100px);
          max-height: clamp(450px, 55vh, 65vh);
          object-fit: contain;
          cursor: pointer;
          border-radius: clamp(12px, 1.3vw, 20px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        /* Instruções */
        .instrucoes-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: clamp(5px, 0.8vw, 10px);
          gap: clamp(10px, 1vw, 15px);
        }

        .texto-instrucao-mapa {
          font-size: clamp(16px, 1.5vw, 24px);
          font-weight: 500;
          color: rgb(24, 99, 173);
          line-height: 1.6;
          letter-spacing: clamp(0.3px, 0.04vw, 0.5px);
          font-family: 'Jost', sans-serif;
          text-align: center;
          max-width: clamp(600px, 55vw, 800px);
          margin: 0;
        }

        .badges-continentes {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(15px, 1.8vw, 25px);
          margin-top: clamp(3px, 0.4vw, 5px);
        }

        .badge-continente {
          display: flex;
          align-items: center;
          gap: clamp(8px, 0.8vw, 10px);
          padding: clamp(6px, 0.6vw, 8px) clamp(14px, 1.3vw, 18px);
          background: rgba(24, 99, 173, 0.08);
          border-radius: clamp(8px, 0.9vw, 12px);
          border-left: clamp(3px, 0.3vw, 4px) solid rgb(24, 99, 173);
        }

        .badge-clicavel {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .badge-clicavel:hover {
          background: rgba(24, 99, 173, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(24, 99, 173, 0.2);
        }

        .badge-clicavel:active {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(24, 99, 173, 0.15);
        }

        .badge-circulo {
          width: clamp(14px, 1.2vw, 18px);
          height: clamp(14px, 1.2vw, 18px);
          background: rgb(24, 99, 173);
          border-radius: 50%;
          border: 2px solid white;
        }

        .badge-texto {
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 600;
          color: rgb(24, 99, 173);
        }

        /* Animações */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Interações */
        .touch-card:active {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease;
        }

        .touch-card:hover {
          transform: scale(1.03);
          transition: all 0.3s ease;
        }

        /* Media Queries para telas grandes (32 polegadas e maiores) */
        @media (min-width: 2560px) {
          .mapamundi-container {
            padding: 80px;
          }

          .mapa-mundi {
            max-width: 1300px;
            max-height: 75vh;
            border-radius: 24px;
          }

          .texto-instrucao-mapa {
            font-size: 28px;
            max-width: 950px;
            letter-spacing: 0.6px;
          }

          .badges-continentes {
            gap: 30px;
            margin-top: 8px;
          }

          .badge-continente {
            padding: 10px 22px;
            border-radius: 14px;
            gap: 12px;
          }

          .badge-circulo {
            width: 22px;
            height: 22px;
            border: 3px solid white;
          }

          .badge-texto {
            font-size: 18px;
          }

          .mapa-container {
            margin-bottom: 20px;
          }

          .instrucoes-container {
            gap: 18px;
            margin-top: 15px;
          }
        }

        /* Media Queries para telas médias */
        @media (max-width: 1440px) {
          .mapa-mundi {
            max-width: 950px;
          }
        }

        /* Media Queries para tablets */
        @media (max-width: 1100px) {
          .mapa-mundi {
            width: 85vw;
            height: 75vh;
            max-width: 85vw;
          }

          .texto-instrucao-mapa {
            font-size: 18px;
            max-width: 90vw;
          }

          .badges-continentes {
            gap: 18px;
          }

          .botao-home-mapa {
            left: clamp(90px, 8vw, 120px);
          }
        }

        /* Media Queries para mobile */
        @media (max-width: 768px) {
          .mapamundi-container {
            padding: 20px 30px;
          }

          .mapa-mundi {
            max-width: 90vw;
            max-height: 65vh;
          }

          .texto-instrucao-mapa {
            font-size: 16px;
          }

          .badge-texto {
            font-size: 13px;
          }

          .badges-continentes {
            gap: 12px;
          }

          .badge-continente {
            padding: 6px 14px;
          }

          .botao-home-mapa {
            top: clamp(90px, 8vh, 110px);
            left: clamp(20px, 2.5vw, 40px);
          }
        }

        /* Media Queries para telas muito pequenas */
        @media (max-width: 480px) {
          .mapamundi-container {
            padding: 15px 20px;
          }

          .mapa-mundi {
            width: 95vw;
            height: 75vh;
          }

          .texto-instrucao-mapa {
            font-size: 14px;
          }

          .badge-texto {
            font-size: 12px;
          }

          .badge-circulo {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default MapaMundiScreen;