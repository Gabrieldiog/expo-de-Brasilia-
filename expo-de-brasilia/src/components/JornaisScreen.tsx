import React, { useState } from 'react';
import EmGoiasScreen from './EmGoiasScreen';

interface OutrosEstadosScreenProps {
  onBack: () => void;
  onMainMenu?: () => void;
}

interface Jornal {
  path: string;
  nome: string;
}

const OutrosEstadosScreen: React.FC<OutrosEstadosScreenProps> = ({ onBack, onMainMenu }) => {
  const [showEmGoias, setShowEmGoias] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const estados = [
    { nome: 'GO', sigla: 'Goiás', imagem: '/images/goias.png' },
    { nome: 'RJ', sigla: 'Rio de Janeiro', imagem: '/images/rio_de_janeiro.png' },
    { nome: 'SP', sigla: 'São Paulo', imagem: '/images/sao_paulo.png' },
    { nome: 'MG', sigla: 'Minas Gerais', imagem: '/images/minas.png' },
    { nome: 'DF', sigla: 'Distrito Federal', imagem: '/images/brasilia.png' }
  ];

  const jornaisEstados: { [key: string]: Jornal[] } = {
    'Distrito Federal': [
      {
        path: '/images/Jornais_em_outros_Estados/correio.jpg',
        nome: 'Correio Brasiliense - Brasília'
      }
    ],
    'Minas Gerais': [
      {
        path: '/images/Jornais_em_outros_Estados/dirario.jpg',
        nome: 'Diário Associados - Minas Gerais'
      }
    ],
    'São Paulo': [
      {
        path: '/images/Jornais_em_outros_Estados/estado_sp.jpg',
        nome: 'O Estado de São Paulo - São Paulo'
      }
    ],
    'Rio de Janeiro': [
      {
        path: '/images/Jornais_em_outros_Estados/jornada.jpg',
        nome: 'Jornal do Brasil - Rio de Janeiro'
      },
      {
        path: '/images/Jornais_em_outros_Estados/o_globo.jpeg',
        nome: 'O Globo - Rio de Janeiro'
      },
      {
        path: '/images/Jornais_em_outros_Estados/rio_de_janeiro.jpeg',
        nome: 'O Jornal - Rio de Janeiro'
      }
    ]
  };

  const handleEstadoClick = (sigla: string) => {
    console.log(`${sigla} clicado`);
    
    if (sigla === 'Goiás') {
      setShowEmGoias(true);
    } else {
      setSelectedEstado(sigla);
      setCurrentImageIndex(0);
    }
  };

  const handleBackFromEmGoias = () => {
    setShowEmGoias(false);
  };

  const handleCloseJornal = () => {
    setSelectedEstado(null);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    if (selectedEstado && jornaisEstados[selectedEstado]) {
      const jornais = jornaisEstados[selectedEstado];
      if (currentImageIndex < jornais.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (showEmGoias) {
    return <EmGoiasScreen onBack={handleBackFromEmGoias} onMainMenu={onMainMenu} />;
  }

  const jornaisDoEstado = selectedEstado ? jornaisEstados[selectedEstado] : null;
  const jornalAtual = jornaisDoEstado ? jornaisDoEstado[currentImageIndex] : null;
  const temMultiplosJornais = jornaisDoEstado && jornaisDoEstado.length > 1;

  return (
    <div className="container-principal">
      {/* Formas de apoio - CANTO SUPERIOR DIREITO */}
      <div className="forma-apoio-superior">
        <img
          src="/images/formas_apoio_verde.png"
          alt=""
          className="forma-apoio-img"
        />
      </div>

      <div className="forma-apoio-inferior">
        <img
          src="/images/formas_apoio_verde.png"
          alt=""
          className="forma-apoio-img"
        />
      </div>

      {/* Botão Voltar */}
      <div
        onClick={selectedEstado ? handleCloseJornal : onBack}
        className="touch-card botao-voltar"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </div>

      {/* Botão Menu Principal (Home) */}
      <div
        onClick={onMainMenu || onBack}
        className="touch-card botao-home"
        title="Voltar ao Menu Principal"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>

      {/* SE ESTADO SELECIONADO, MOSTRA A(S) FOTO(S) */}
      {selectedEstado && jornalAtual ? (
        <div className="jornal-viewer">
          {/* Botão Anterior */}
          {temMultiplosJornais && (
            <button
              onClick={handlePrevious}
              disabled={currentImageIndex === 0}
              className="nav-button nav-button-prev"
              style={{
                background: currentImageIndex === 0 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(84, 94, 56)',
                cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          )}

          {/* Frame Polaroid */}
          <div className="polaroid-frame">
            <img
              src={jornalAtual.path}
              alt={jornalAtual.nome}
              className="jornal-img"
            />
            <p className="jornal-titulo">
              {jornalAtual.nome}
              {temMultiplosJornais && ` - ${currentImageIndex + 1} de ${jornaisDoEstado.length}`}
            </p>
          </div>

          {/* Botão Próximo */}
          {temMultiplosJornais && (
            <button
              onClick={handleNext}
              disabled={currentImageIndex === jornaisDoEstado.length - 1}
              className="nav-button nav-button-next"
              style={{
                background: currentImageIndex === jornaisDoEstado.length - 1 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(84, 94, 56)',
                cursor: currentImageIndex === jornaisDoEstado.length - 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          )}
        </div>
      ) : (
        /* GRID DE ESTADOS */
        <>
          <div className="titulo-container">
            <h1 className="titulo-principal">JORNAIS</h1>
            <img 
              src="/images/mapa_brasil.png" 
              alt="Brasil"
              className="mapa-brasil"
            />
          </div>

          <div className="estados-grid">
            {estados.map((estado, index) => (
              <div
                key={estado.nome}
                onClick={() => handleEstadoClick(estado.sigla)}
                className="touch-card estado-card"
                style={{
                  animation: `fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + index * 0.1}s backwards, cardFloat 4s ease-in-out infinite ${index * 0.2}s`
                }}
              >
                <img 
                  src={estado.imagem} 
                  alt={estado.sigla}
                  className={`estado-img ${estado.nome === 'RJ' ? 'estado-img-rj' : ''}`}
                  style={{
                    filter: estado.nome === 'DF' ? 'none' : 'brightness(0) invert(1)'
                  }}
                />
                <h2 className="estado-nome">
                  {estado.nome}
                </h2>
                <img 
                  src="/images/imagem_mao.jpeg" 
                  alt="Toque aqui"
                  className="icone-toque"
                />
              </div>
            ))}
          </div>
        </>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .container-principal {
          width: 100vw;
          height: 100vh;
          background: rgb(255, 255, 255);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: clamp(20px, 3vw, 60px);
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

        .forma-apoio-img {
          width: clamp(200px, 20vw, 380px);
          height: clamp(100px, 10vw, 200px);
          object-fit: contain;
        }

        .forma-apoio-superior .forma-apoio-img {
          position: relative;
          top: clamp(-40px, -4vw, -76px);
          left: clamp(40px, 4vw, 80px);
        }

        .forma-apoio-inferior .forma-apoio-img {
          position: relative;
          top: clamp(40px, 4vw, 76px);
          left: clamp(-40px, -4vw, -80px);
        }

        /* Botão Voltar */
        .botao-voltar {
          position: absolute;
          top: clamp(20px, 2.5vw, 40px);
          left: clamp(20px, 2.5vw, 40px);
          background: rgb(84, 94, 56);
          border-radius: 50%;
          width: clamp(60px, 5vw, 80px);
          height: clamp(60px, 5vw, 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(84, 94, 56, 0.4);
          z-index: 1000;
          animation: fadeIn 1s ease 0.2s backwards;
        }

        .botao-voltar svg {
          width: clamp(30px, 2.5vw, 40px);
          height: clamp(30px, 2.5vw, 40px);
        }

        /* Botão Home (Menu Principal) */
        .botao-home {
          position: absolute;
          top: clamp(20px, 2.5vw, 40px);
          left: clamp(100px, 9vw, 140px);
          background: rgb(84, 94, 56);
          border-radius: 50%;
          width: clamp(60px, 5vw, 80px);
          height: clamp(60px, 5vw, 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(84, 94, 56, 0.4);
          z-index: 1000;
          animation: fadeIn 1s ease 0.3s backwards;
        }

        .botao-home svg {
          width: clamp(30px, 2.5vw, 40px);
          height: clamp(30px, 2.5vw, 40px);
        }

        /* Título Container */
        .titulo-container {
          position: absolute;
          top: clamp(80px, 10vh, 150px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: clamp(15px, 1.5vw, 20px);
          z-index: 100;
          animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
        }

        .titulo-principal {
          font-size: clamp(48px, 6vw, 100px);
          font-weight: 700;
          color: rgb(0, 0, 0);
          margin: 0;
          letter-spacing: clamp(1px, 0.2vw, 3px);
          line-height: 1;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        .mapa-brasil {
          width: clamp(60px, 7vw, 120px);
          height: clamp(75px, 8.5vw, 150px);
          object-fit: contain;
          filter: brightness(0) saturate(100%) invert(35%) sepia(15%) saturate(800%) hue-rotate(39deg) brightness(95%) contrast(88%);
        }

        /* Grid de Estados */
        .estados-grid {
          display: flex;
          gap: clamp(20px, 2.5vw, 40px);
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          max-width: min(90vw, 1400px);
          width: 100%;
          z-index: 10;
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
          margin-top: clamp(100px, 15vh, 200px);
        }

        .estado-card {
          position: relative;
          width: clamp(180px, 15vw, 240px);
          height: clamp(200px, 16vw, 270px);
          background: rgb(84, 94, 56);
          border-radius: clamp(8px, 0.8vw, 12px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(84, 94, 56, 0.3);
          overflow: hidden;
        }

        .estado-img {
          width: 60%;
          height: 80%;
          object-fit: contain;
          margin-bottom: clamp(5px, 0.8vw, 10px);
        }

        .estado-img-rj {
          width: 78%;
          height: 78%;
        }

        .estado-nome {
          font-size: clamp(20px, 1.8vw, 28px);
          font-weight: 600;
          color: rgb(255, 255, 255);
          margin: 0;
          letter-spacing: clamp(0.5px, 0.08vw, 1px);
          text-align: center;
          font-family: 'Jost', sans-serif;
        }

        .icone-toque {
          position: absolute;
          bottom: clamp(5px, 0.8vw, 10px);
          right: clamp(5px, 0.8vw, 10px);
          width: clamp(35px, 3vw, 50px);
          height: clamp(35px, 3vw, 50px);
          object-fit: contain;
          opacity: 0.9;
          animation: tapBounce 1.5s ease-in-out infinite;
        }

        /* Visualizador de Jornal */
        .jornal-viewer {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(15px, 2vw, 30px);
          z-index: 10;
          animation: slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .nav-button {
          width: clamp(50px, 4vw, 70px);
          height: clamp(50px, 4vw, 70px);
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(84, 94, 56, 0.3);
          transition: all 0.3s ease;
        }

        .nav-icon {
          width: clamp(25px, 2.2vw, 35px);
          height: clamp(25px, 2.2vw, 35px);
        }

        .polaroid-frame {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.95) 100%);
          padding: clamp(15px, 1.5vw, 20px) clamp(15px, 1.5vw, 20px) clamp(60px, 5vw, 80px) clamp(15px, 1.5vw, 20px);
          border-radius: clamp(8px, 0.8vw, 12px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 clamp(4px, 0.5vw, 8px) rgb(84, 94, 56);
          border: clamp(2px, 0.3vw, 4px) solid rgba(0, 0, 0, 0.8);
          max-width: min(85vw, 900px);
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .jornal-img {
          max-width: 100%;
          max-height: calc(90vh - clamp(120px, 12vh, 180px));
          object-fit: contain;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .jornal-titulo {
          margin-top: clamp(15px, 1.5vw, 20px);
          font-size: clamp(16px, 1.3vw, 20px);
          font-weight: 600;
          color: rgb(84, 94, 56);
          text-align: center;
          line-height: 1.4;
        }

        /* Animações */
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-40px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes tapBounce {
          0%, 100% { transform: scale(1) translateY(0) rotate(0deg); }
          50% { transform: scale(1.3) translateY(-10px) rotate(-5deg); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Interações */
        .touch-card:active {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease;
        }

        .touch-card:hover {
          transform: scale(1.05);
          transition: all 0.3s ease;
        }

        .nav-button:hover:not(:disabled) {
          transform: scale(1.1);
        }

        .nav-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        /* Media Queries para telas grandes (32 polegadas e maiores) */
        @media (min-width: 2560px) {
          .container-principal {
            padding: 80px;
          }

          .titulo-principal {
            font-size: 120px;
          }

          .mapa-brasil {
            width: 140px;
            height: 170px;
          }

          .estado-card {
            width: 280px;
            height: 310px;
          }

          .estado-nome {
            font-size: 32px;
          }

          .polaroid-frame {
            max-width: 1100px;
          }

          .jornal-titulo {
            font-size: 24px;
          }
        }

        /* Media Queries para telas médias */
        @media (max-width: 1440px) {
          .titulo-container {
            top: 100px;
          }

          .estados-grid {
            margin-top: 150px;
          }
        }

        /* Media Queries para tablets */
        @media (max-width: 1024px) {
          .titulo-principal {
            font-size: 60px;
          }

          .estado-card {
            width: 200px;
            height: 230px;
          }

          .botao-home {
            left: clamp(90px, 8vw, 120px);
          }
        }

        /* Media Queries para mobile */
        @media (max-width: 768px) {
          .titulo-principal {
            font-size: 48px;
          }

          .mapa-brasil {
            width: 70px;
            height: 85px;
          }

          .estado-card {
            width: 160px;
            height: 190px;
          }

          .estado-nome {
            font-size: 22px;
          }

          .estados-grid {
            gap: 15px;
            margin-top: 120px;
          }

          .botao-home {
            top: clamp(90px, 8vh, 110px);
            left: clamp(20px, 2.5vw, 40px);
          }
        }
      `}</style>
    </div>
  );
};

export default OutrosEstadosScreen;