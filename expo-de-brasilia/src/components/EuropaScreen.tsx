import React, { useState } from 'react';

interface EuropaScreenProps {
  onBack: () => void;
}

const EuropaScreen: React.FC<EuropaScreenProps> = ({ onBack }) => {
  const [selectedPais, setSelectedPais] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const paises = [
    { nome: 'Espanha', cor: 'rgb(24, 99, 173)' },
    { nome: 'Itália', cor: 'rgb(24, 99, 173)' },
    { nome: 'Portugal', cor: 'rgb(24, 99, 173)' },
    { nome: 'Alemanha', cor: 'rgb(24, 99, 173)' },
    { nome: 'Suécia', cor: 'rgb(24, 99, 173)' },
    { nome: 'Finlândia', cor: 'rgb(24, 99, 173)' },
    { nome: 'Suíça', cor: 'rgb(24, 99, 173)' },
    { nome: 'França', cor: 'rgb(24, 99, 173)' },
    { nome: 'Reino Unido', cor: 'rgb(24, 99, 173)' }
  ];

  const fotoPorPais: { [key: string]: { numeroFoto: number; nomeJornal: string }[] } = {
    'Espanha': [
      { numeroFoto: 1, nomeJornal: 'ABC - Espanha' },
      { numeroFoto: 4, nomeJornal: 'Blanco y Negro - Espanha' }
    ],
    'Itália': [
      { numeroFoto: 2, nomeJornal: 'Avanti - Itália' },
      { numeroFoto: 14, nomeJornal: 'Ultimissima della notte - Itália' }
    ],
    'Portugal': [
      { numeroFoto: 3, nomeJornal: 'Avoz - Portugal' }
    ],
    'Alemanha': [
      { numeroFoto: 5, nomeJornal: 'Das Wochenende - Alemanha' }
    ],
    'Suécia': [
      { numeroFoto: 6, nomeJornal: 'Göteborgs Handels - Suécia' }
    ],
    'Finlândia': [
      { numeroFoto: 7, nomeJornal: 'Helsing Sanomat - Finlândia' }
    ],
    'Suíça': [
      { numeroFoto: 8, nomeJornal: 'Journal de Genève - Suíça' },
      { numeroFoto: 11, nomeJornal: 'Neue Zürcher Zeitung - Suíça' }
    ],
    'França': [
      { numeroFoto: 9, nomeJornal: 'L´humanité - França' },
      { numeroFoto: 10, nomeJornal: 'LE FIGARO - França' }
    ],
    'Reino Unido': [
      { numeroFoto: 12, nomeJornal: 'The Financial Times - Reino Unido' },
      { numeroFoto: 13, nomeJornal: 'The Sunday - Reino Unido' },
      { numeroFoto: 15, nomeJornal: 'The Time - Reino Unido' }
    ]
  };

  const handlePaisClick = (pais: string) => {
    if (selectedPais === pais) {
      setSelectedPais(null);
      setCurrentImageIndex(0);
    } else {
      setSelectedPais(pais);
      setCurrentImageIndex(0);
    }
  };

  const handleNext = () => {
    if (selectedPais) {
      const fotos = fotoPorPais[selectedPais];
      if (currentImageIndex < fotos.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleClosePais = () => {
    setSelectedPais(null);
    setCurrentImageIndex(0);
  };

  const fotosAtuais = selectedPais ? fotoPorPais[selectedPais] : [];
  const fotoAtual = fotosAtuais[currentImageIndex];

  return (
    <div className="europa-container">
      {/* TELA INICIAL - GRID 3x3 CENTRALIZADO */}
      {!selectedPais && (
        <div className="tela-inicial-europa">
          {/* Título EUROPA */}
          <div className="titulo-europa-container">
            <h1 className="titulo-europa">EUROPA</h1>
            <p className="subtitulo-europa">
              Repercussão Internacional
            </p>
          </div>

          {/* Grid 3x3 dos Países Europeus */}
          <div className="grid-paises">
            {paises.map((pais, index) => (
              <div
                key={pais.nome}
                onClick={() => handlePaisClick(pais.nome)}
                className="touch-card card-pais"
                style={{
                  background: selectedPais === pais.nome ? 'rgb(66, 152, 207)' : 'rgb(24, 99, 173)',
                  boxShadow: selectedPais === pais.nome
                    ? '0 25px 70px rgba(24, 99, 173, 0.6), 0 10px 30px rgba(24, 99, 173, 0.5)'
                    : '0 10px 30px rgba(24, 99, 173, 0.3)',
                  transform: selectedPais === pais.nome ? 'scale(1.05)' : 'scale(1)',
                  border: selectedPais === pais.nome ? '4px solid rgba(255, 255, 255, 0.3)' : 'none'
                }}
              >
                <span className="pais-nome">
                  {pais.nome}
                </span>
                {!selectedPais && (
                  <img 
                    src="/images/imagem_mao.jpeg" 
                    alt="Toque aqui"
                    className="icone-toque-pais"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Instruções */}
          <div className="instrucoes-europa">
            <p className="instrucao-texto">
              Toque em um país para visualizar 
            </p>
            <p className="instrucao-texto">
              a repercussão internacional de Brasília
            </p>
          </div>
        </div>
      )}

      {/* VISUALIZADOR DE IMAGENS COM PAINEL LATERAL */}
      {selectedPais && fotosAtuais.length > 0 && (
        <div className="visualizador-europa">
          {/* Sidebar */}
          <div className="sidebar-paises">
            {/* Mensagem de Instrução */}
            <div className="aviso-sidebar-europa">
              <p className="aviso-texto-europa">
                Clique novamente no país selecionado para fechar ou escolha outro
              </p>
            </div>

            {/* Lista de Países */}
            {paises.map((pais) => (
              <div
                key={pais.nome}
                onClick={() => handlePaisClick(pais.nome)}
                className="mini-card-europa"
                style={{
                  background: selectedPais === pais.nome ? 'rgb(24, 99, 173)' : 'rgba(24, 99, 173, 0.1)',
                  border: selectedPais === pais.nome ? '3px solid rgb(24, 99, 173)' : '3px solid transparent',
                  transform: selectedPais === pais.nome ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <span className="mini-card-nome" style={{
                  color: selectedPais === pais.nome ? 'rgb(255, 255, 255)' : 'rgb(24, 99, 173)'
                }}>
                  {pais.nome}
                </span>
              </div>
            ))}
          </div>

          {/* Botão Anterior */}
          <button
            onClick={handlePrevious}
            disabled={currentImageIndex === 0}
            className="nav-button nav-button-prev"
            style={{
              background: currentImageIndex === 0 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(24, 99, 173)',
              cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* Container da Imagem */}
          <div className="polaroid-frame-europa">
            <img
              src={`/images/Europa/foto${fotoAtual.numeroFoto}.jpg`}
              alt={`${selectedPais} - ${fotoAtual.nomeJornal}`}
              className="europa-imagem"
            />
            <p className="europa-legenda">
              {fotoAtual.nomeJornal} - Página {currentImageIndex + 1} de {fotosAtuais.length}
            </p>
          </div>

          {/* Botão Próximo */}
          <button
            onClick={handleNext}
            disabled={currentImageIndex === fotosAtuais.length - 1}
            className="nav-button nav-button-next"
            style={{
              background: currentImageIndex === fotosAtuais.length - 1 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(24, 99, 173)',
              cursor: currentImageIndex === fotosAtuais.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Container Principal */
        .europa-container {
          width: 100vw;
          height: 100vh;
          background: rgb(255, 255, 255);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(40px, 5vw, 80px) clamp(30px, 4vw, 60px);
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Tela Inicial */
        .tela-inicial-europa {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          z-index: 10;
          animation: fadeIn 1s ease-in-out;
        }

        /* Título EUROPA */
        .titulo-europa-container {
          margin-bottom: clamp(40px, 4vh, 60px);
          text-align: center;
          animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
        }

        .titulo-europa {
          font-size: clamp(60px, 7vw, 100px);
          font-weight: 700;
          color: rgb(24, 99, 173);
          margin: 0;
          letter-spacing: clamp(2px, 0.2vw, 3px);
          line-height: 1;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        .subtitulo-europa {
          font-size: clamp(16px, 1.8vw, 24px);
          font-weight: 500;
          color: rgb(24, 99, 173);
          margin: clamp(8px, 0.8vw, 10px) 0 0 0;
          letter-spacing: clamp(0.5px, 0.08vw, 1px);
        }

        /* Grid de Países */
        .grid-paises {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 1.2vw, 18px);
          max-width: clamp(550px, 60vw, 900px);
          width: 100%;
          z-index: 10;
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
        }

        .card-pais {
          position: relative;
          width: 100%;
          height: clamp(100px, 16vh, 140px);
          border-radius: clamp(8px, 0.9vw, 12px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .pais-nome {
          font-size: clamp(13px, 1.4vw, 18px);
          font-weight: 700;
          color: rgb(255, 255, 255);
          margin: 0;
          letter-spacing: clamp(0.5px, 0.08vw, 1px);
          text-align: center;
          font-family: 'Jost', sans-serif;
        }

        .icone-toque-pais {
          position: absolute;
          bottom: clamp(6px, 0.6vw, 8px);
          right: clamp(6px, 0.6vw, 8px);
          width: clamp(25px, 2.5vw, 38px);
          height: clamp(25px, 2.5vw, 38px);
          object-fit: contain;
          opacity: 0.9;
          animation: tapBounce 1.5s ease-in-out infinite;
        }

        /* Instruções */
        .instrucoes-europa {
          margin-top: clamp(30px, 3vh, 40px);
          text-align: center;
          z-index: 10;
          animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s backwards;
        }

        .instrucao-texto {
          font-size: clamp(16px, 1.8vw, 24px);
          font-weight: 400;
          color: rgb(24, 99, 173);
          text-align: center;
          margin: 0 0 clamp(8px, 0.8vw, 10px) 0;
          line-height: 1.4;
          font-family: 'Jost', sans-serif;
        }

        .instrucao-texto:last-child {
          margin-bottom: 0;
        }

        /* Visualizador */
        .visualizador-europa {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(15px, 1.5vw, 20px);
          z-index: 10;
          animation: slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Sidebar */
        .sidebar-paises {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 1.4vw, 18px);
          width: clamp(220px, 18vw, 280px);
          max-height: 90vh;
          overflow-y: auto;
          padding: clamp(15px, 1.5vw, 20px) clamp(12px, 1.2vw, 15px);
          background: rgba(255, 255, 255, 0.95);
          border-radius: clamp(12px, 1.2vw, 16px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          animation: slideInLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          margin-right: clamp(30px, 3vw, 40px);
        }

        .aviso-sidebar-europa {
          padding: clamp(14px, 1.4vw, 18px);
          background: rgba(24, 99, 173, 0.1);
          border-radius: clamp(8px, 0.9vw, 12px);
          margin-bottom: clamp(12px, 1.2vw, 15px);
          border: clamp(2px, 0.25vw, 3px) solid rgb(24, 99, 173);
        }

        .aviso-texto-europa {
          font-size: clamp(13px, 1.2vw, 20px);
          font-weight: 600;
          color: rgb(24, 99, 173);
          text-align: center;
          margin: 0;
          line-height: 1.4;
          font-family: 'Jost', sans-serif;
        }

        .mini-card-europa {
          padding: clamp(12px, 1.2vw, 15px) clamp(8px, 0.8vw, 10px);
          border-radius: clamp(6px, 0.7vw, 8px);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mini-card-nome {
          font-size: clamp(15px, 1.4vw, 19px);
          font-weight: 600;
          text-align: center;
          display: block;
          font-family: 'Jost', sans-serif;
        }

        /* Botões de Navegação */
        .nav-button {
          width: clamp(50px, 4vw, 70px);
          height: clamp(50px, 4vw, 70px);
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(24, 99, 173, 0.3);
          transition: all 0.3s ease;
        }

        .nav-icon {
          width: clamp(25px, 2.2vw, 35px);
          height: clamp(25px, 2.2vw, 35px);
        }

        /* Polaroid Frame */
        .polaroid-frame-europa {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.95) 100%);
          padding: clamp(15px, 1.5vw, 20px) clamp(15px, 1.5vw, 20px) clamp(60px, 5vw, 80px) clamp(15px, 1.5vw, 20px);
          border-radius: clamp(8px, 0.9vw, 12px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 clamp(4px, 0.5vw, 8px) rgb(24, 99, 173);
          border: clamp(2px, 0.3vw, 4px) solid rgba(0, 0, 0, 0.8);
          max-width: min(85vw, 900px);
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .europa-imagem {
          max-width: 100%;
          max-height: calc(90vh - clamp(120px, 12vh, 180px));
          object-fit: contain;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .europa-legenda {
          margin-top: clamp(15px, 1.5vw, 20px);
          font-size: clamp(14px, 1.3vw, 20px);
          font-weight: 600;
          color: rgb(24, 99, 173);
          text-align: center;
          line-height: 1.4;
        }

        /* Animações */
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes tapBounce {
          0%, 100% { transform: scale(1) translateY(0) rotate(0deg); }
          50% { transform: scale(1.3) translateY(-10px) rotate(-5deg); }
        }

        /* Interações */
        .touch-card:active {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease;
        }

        .touch-card:hover {
          transform: scale(1.02);
          transition: all 0.3s ease;
        }

        .mini-card-europa:hover {
          transform: scale(1.08) !important;
          background: rgb(24, 99, 173) !important;
        }

        .mini-card-europa:hover .mini-card-nome {
          color: rgb(255, 255, 255) !important;
        }

        .mini-card-europa:active {
          transform: scale(0.95) !important;
        }

        .nav-button:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(24, 99, 173, 0.5) !important;
        }

        .nav-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        /* Scrollbar */
        div::-webkit-scrollbar {
          width: clamp(6px, 0.5vw, 8px);
        }

        div::-webkit-scrollbar-track {
          background: rgba(24, 99, 173, 0.1);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: rgb(24, 99, 173);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: rgb(66, 152, 207);
        }

        /* Media Queries para telas grandes (32 polegadas e maiores) */
        @media (min-width: 2560px) {
          .europa-container {
            padding: 100px 80px;
          }

          .titulo-europa {
            font-size: 120px;
            letter-spacing: 4px;
          }

          .subtitulo-europa {
            font-size: 28px;
            margin-top: 12px;
          }

          .titulo-europa-container {
            margin-bottom: 70px;
          }

          .grid-paises {
            max-width: 1050px;
            gap: 20px;
          }

          .card-pais {
            height: 150px;
            border-radius: 14px;
          }

          .pais-nome {
            font-size: 20px;
          }

          .icone-toque-pais {
            width: 42px;
            height: 42px;
            bottom: 10px;
            right: 10px;
          }

          .instrucoes-europa {
            margin-top: 50px;
          }

          .instrucao-texto {
            font-size: 28px;
            margin-bottom: 10px;
          }

          .sidebar-paises {
            width: 320px;
            padding: 25px 18px;
            gap: 22px;
            margin-right: 45px;
          }

          .aviso-sidebar-europa {
            padding: 22px;
            margin-bottom: 18px;
          }

          .aviso-texto-europa {
            font-size: 22px;
          }

          .mini-card-europa {
            padding: 18px 12px;
          }

          .mini-card-nome {
            font-size: 22px;
          }

          .polaroid-frame-europa {
            max-width: 1100px;
          }

          .europa-legenda {
            font-size: 24px;
          }
        }

        /* Media Queries para telas médias */
        @media (max-width: 1440px) {
          .grid-paises {
            max-width: 750px;
          }
        }

        /* Media Queries para tablets */
        @media (max-width: 1024px) {
          .titulo-europa {
            font-size: 70px;
          }

          .subtitulo-europa {
            font-size: 18px;
          }

          .grid-paises {
            max-width: 650px;
            gap: 15px;
          }

          .card-pais {
            height: 115px;
          }
        }

        /* Media Queries para mobile */
        @media (max-width: 768px) {
          .europa-container {
            padding: 40px 25px;
          }

          .titulo-europa {
            font-size: 50px;
          }

          .subtitulo-europa {
            font-size: 16px;
          }

          .grid-paises {
            grid-template-columns: repeat(2, 1fr);
            max-width: 100%;
            gap: 10px;
          }

          .card-pais {
            height: 95px;
          }

          .instrucao-texto {
            font-size: 16px;
          }

          .visualizador-europa {
            flex-direction: column;
          }

          .sidebar-paises {
            width: 100%;
            max-height: 180px;
            margin-right: 0;
            margin-bottom: 15px;
          }
        }

        /* Media Queries para telas muito pequenas */
        @media (max-width: 480px) {
          .grid-paises {
            grid-template-columns: 1fr;
          }

          .card-pais {
            height: 80px;
          }

          .pais-nome {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default EuropaScreen;