import React, { useState } from 'react';

interface AmericaScreenProps {
  onBack: () => void;
}

const AmericaScreen: React.FC<AmericaScreenProps> = ({ onBack }) => {
  const [selectedPais, setSelectedPais] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const paises = [
    { nome: 'Venezuela', cor: 'rgb(24, 99, 173)' },
    { nome: 'Colômbia', cor: 'rgb(24, 99, 173)' },
    { nome: 'Guatemala', cor: 'rgb(24, 99, 173)' },
    { nome: 'Uruguai', cor: 'rgb(24, 99, 173)' },
    { nome: 'México', cor: 'rgb(24, 99, 173)' },
    { nome: 'Argentina', cor: 'rgb(24, 99, 173)' },
    { nome: 'EUA', cor: 'rgb(24, 99, 173)' }
  ];

  const fotoPorPais: { [key: string]: { numeroFoto: number; nomeJornal: string }[] } = {
    'Venezuela': [
      { numeroFoto: 1, nomeJornal: 'Ariba - Venezuela' }
    ],
    'Colômbia': [
      { numeroFoto: 2, nomeJornal: 'Colombia' }
    ],
    'Guatemala': [
      { numeroFoto: 3, nomeJornal: 'Diário de Centro América - Guatemala' }
    ],
    'Uruguai': [
      { numeroFoto: 4, nomeJornal: 'El Bien Público - Uruguai' }
    ],
    'México': [
      { numeroFoto: 5, nomeJornal: 'El Tiempo - México' },
      { numeroFoto: 6, nomeJornal: 'El Universal - México' }
    ],
    'Argentina': [
      { numeroFoto: 7, nomeJornal: 'La Nacion - Argentina' }
    ],
    'EUA': [
      { numeroFoto: 8, nomeJornal: 'New York Times - EUA' },
      { numeroFoto: 9, nomeJornal: 'Newsweek - EUA' },
      { numeroFoto: 10, nomeJornal: 'Time Magazine - EUA' }
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

  const fotosAtuais = selectedPais ? fotoPorPais[selectedPais] : [];
  const fotoAtual = fotosAtuais[currentImageIndex];

  return (
    <div className="america-container">
      {/* TELA INICIAL - GRID */}
      {!selectedPais && (
        <div className="tela-inicial-america">
          <div className="titulo-america-container">
            <h1 className="titulo-america">AMÉRICAS</h1>
            <p className="subtitulo-america">
              Repercussão Internacional
            </p>
          </div>

          <div className="grid-paises-america">
            {paises.map((pais) => (
              <div
                key={pais.nome}
                onClick={() => handlePaisClick(pais.nome)}
                className="touch-card card-pais-america"
              >
                <span className="pais-nome-america">
                  {pais.nome}
                </span>
                <img 
                  src="/images/imagem_mao.jpeg" 
                  alt="Toque aqui"
                  className="icone-toque-pais-america"
                />
              </div>
            ))}
          </div>

          <div className="instrucoes-america">
            <p className="instrucao-texto-america">
              Toque em um país para visualizar
            </p>
            <p className="instrucao-texto-america">
              a repercussão internacional de Brasília
            </p>
          </div>
        </div>
      )}

      {/* VISUALIZADOR COM PAINEL LATERAL */}
      {selectedPais && fotosAtuais.length > 0 && (
        <div className="visualizador-america">
          <div className="sidebar-paises-america">
            {/* Mensagem de Instrução */}
            <div className="aviso-sidebar-america">
              <p className="aviso-texto-america">
                Clique novamente no país selecionado para fechar ou escolha outro
              </p>
            </div>

            {/* Lista de Países */}
            {paises.map((pais) => (
              <div
                key={pais.nome}
                onClick={() => handlePaisClick(pais.nome)}
                className="mini-card-america"
                style={{
                  background: selectedPais === pais.nome ? 'rgb(24, 99, 173)' : 'rgba(24, 99, 173, 0.1)',
                  border: selectedPais === pais.nome ? '3px solid rgb(24, 99, 173)' : '3px solid transparent',
                  transform: selectedPais === pais.nome ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <span className="mini-card-nome-america" style={{
                  color: selectedPais === pais.nome ? 'rgb(255, 255, 255)' : 'rgb(24, 99, 173)'
                }}>
                  {pais.nome}
                </span>
              </div>
            ))}
          </div>

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

          <div className="polaroid-frame-america">
            <img
              src={`/images/Americas/foto${fotoAtual.numeroFoto}.jpg`}
              alt={`${selectedPais} - ${fotoAtual.nomeJornal}`}
              className="america-imagem"
            />
            <p className="america-legenda">
              {fotoAtual.nomeJornal} - Página {currentImageIndex + 1} de {fotosAtuais.length}
            </p>
          </div>

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
        .america-container {
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
        .tela-inicial-america {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          z-index: 10;
          animation: fadeIn 1s ease-in-out;
        }

        /* Título AMÉRICAS */
        .titulo-america-container {
          margin-bottom: clamp(40px, 4vh, 60px);
          text-align: center;
          animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
        }

        .titulo-america {
          font-size: clamp(60px, 7vw, 100px);
          font-weight: 700;
          color: rgb(24, 99, 173);
          margin: 0;
          letter-spacing: clamp(2px, 0.2vw, 3px);
          line-height: 1;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        .subtitulo-america {
          font-size: clamp(16px, 1.8vw, 24px);
          font-weight: 500;
          color: rgb(24, 99, 173);
          margin: clamp(8px, 0.8vw, 10px) 0 0 0;
          letter-spacing: clamp(0.5px, 0.08vw, 1px);
        }

        /* Grid de Países */
        .grid-paises-america {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 1.2vw, 18px);
          max-width: clamp(550px, 60vw, 900px);
          width: 100%;
          z-index: 10;
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
        }

        .card-pais-america {
          position: relative;
          width: 100%;
          height: clamp(100px, 16vh, 140px);
          background: rgb(24, 99, 173);
          border-radius: clamp(8px, 0.9vw, 12px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(24, 99, 173, 0.3);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .pais-nome-america {
          font-size: clamp(13px, 1.4vw, 18px);
          font-weight: 700;
          color: rgb(255, 255, 255);
          margin: 0;
          letter-spacing: clamp(0.5px, 0.08vw, 1px);
          text-align: center;
          font-family: 'Jost', sans-serif;
        }

        .icone-toque-pais-america {
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
        .instrucoes-america {
          margin-top: clamp(30px, 3vh, 40px);
          text-align: center;
          z-index: 10;
          animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s backwards;
        }

        .instrucao-texto-america {
          font-size: clamp(16px, 1.8vw, 24px);
          font-weight: 400;
          color: rgb(24, 99, 173);
          text-align: center;
          margin: 0 0 clamp(8px, 0.8vw, 10px) 0;
          line-height: 1.4;
          font-family: 'Jost', sans-serif;
        }

        .instrucao-texto-america:last-child {
          margin-bottom: 0;
        }

        /* Visualizador */
        .visualizador-america {
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
        .sidebar-paises-america {
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

        .aviso-sidebar-america {
          padding: clamp(14px, 1.4vw, 18px);
          background: rgba(24, 99, 173, 0.1);
          border-radius: clamp(8px, 0.9vw, 12px);
          margin-bottom: clamp(12px, 1.2vw, 15px);
          border: clamp(2px, 0.25vw, 3px) solid rgb(24, 99, 173);
        }

        .aviso-texto-america {
          font-size: clamp(13px, 1.2vw, 16px);
          font-weight: 600;
          color: rgb(24, 99, 173);
          text-align: center;
          margin: 0;
          line-height: 1.4;
          font-family: 'Jost', sans-serif;
        }

        .mini-card-america {
          padding: clamp(12px, 1.2vw, 22px) clamp(8px, 0.8vw, 10px);
          border-radius: clamp(6px, 0.7vw, 8px);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mini-card-nome-america {
          font-size: clamp(14px, 1.3vw, 17px);
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
        .polaroid-frame-america {
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

        .america-imagem {
          max-width: 100%;
          max-height: calc(90vh - clamp(120px, 12vh, 180px));
          object-fit: contain;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .america-legenda {
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
        }

        .touch-card:hover {
          transform: scale(1.02);
        }

        .mini-card-america:hover {
          transform: scale(1.08) !important;
          background: rgb(24, 99, 173) !important;
        }

        .mini-card-america:hover .mini-card-nome-america {
          color: rgb(255, 255, 255) !important;
        }

        .mini-card-america:active {
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
          .america-container {
            padding: 100px 80px;
          }

          .titulo-america {
            font-size: 120px;
            letter-spacing: 4px;
          }

          .subtitulo-america {
            font-size: 28px;
            margin-top: 12px;
          }

          .titulo-america-container {
            margin-bottom: 70px;
          }

          .grid-paises-america {
            max-width: 1050px;
            gap: 20px;
          }

          .card-pais-america {
            height: 150px;
            border-radius: 14px;
          }

          .pais-nome-america {
            font-size: 20px;
          }

          .icone-toque-pais-america {
            width: 42px;
            height: 42px;
            bottom: 10px;
            right: 10px;
          }

          .instrucoes-america {
            margin-top: 50px;
          }

          .instrucao-texto-america {
            font-size: 28px;
            margin-bottom: 10px;
          }

          .sidebar-paises-america {
            width: 320px;
            padding: 25px 18px;
            gap: 22px;
            margin-right: 45px;
          }

          .aviso-sidebar-america {
            padding: 22px;
            margin-bottom: 18px;
          }

          .aviso-texto-america {
            font-size: 18px;
          }

          .mini-card-america {
            padding: 22px 12px;
          }

          .mini-card-nome-america {
            font-size: 19px;
          }

          .polaroid-frame-america {
            max-width: 1100px;
          }

          .america-legenda {
            font-size: 24px;
          }
        }

        /* Media Queries para telas médias */
        @media (max-width: 1440px) {
          .grid-paises-america {
            max-width: 750px;
          }
        }

        /* Media Queries para tablets */
        @media (max-width: 1024px) {
          .titulo-america {
            font-size: 70px;
          }

          .subtitulo-america {
            font-size: 18px;
          }

          .grid-paises-america {
            max-width: 650px;
            gap: 15px;
          }

          .card-pais-america {
            height: 115px;
          }
        }

        /* Media Queries para mobile */
        @media (max-width: 768px) {
          .america-container {
            padding: 40px 25px;
          }

          .titulo-america {
            font-size: 50px;
          }

          .subtitulo-america {
            font-size: 16px;
          }

          .grid-paises-america {
            grid-template-columns: repeat(2, 1fr);
            max-width: 100%;
            gap: 10px;
          }

          .card-pais-america {
            height: 95px;
          }

          .instrucao-texto-america {
            font-size: 16px;
          }

          .visualizador-america {
            flex-direction: column;
          }

          .sidebar-paises-america {
            width: 100%;
            max-height: 180px;
            margin-right: 0;
            margin-bottom: 15px;
          }
        }

        /* Media Queries para telas muito pequenas */
        @media (max-width: 480px) {
          .grid-paises-america {
            grid-template-columns: 1fr;
          }

          .card-pais-america {
            height: 80px;
          }

          .pais-nome-america {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default AmericaScreen;