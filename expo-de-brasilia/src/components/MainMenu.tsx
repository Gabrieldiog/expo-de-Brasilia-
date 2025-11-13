import React, { useEffect, useRef, useState } from 'react';
import JornaisScreen from './JornaisScreen';
import RevistasBrasiliaScreen from './RevistasBrasiliaScreen';
import MapaMundiScreen from './MapaMundiScreen';

interface MainMenuProps {
  onInactivity: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onInactivity }) => {
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showJornaisScreen, setShowJornaisScreen] = useState(false);
  const [showRevistasScreen, setShowRevistasScreen] = useState(false);
  const [showMapaMundiScreen, setShowMapaMundiScreen] = useState(false);

  useEffect(() => {
    const resetTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(() => {
        onInactivity();
      }, 300000);
    };

    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('mousemove', handleActivity);

    resetTimer();

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
    };
  }, [onInactivity]);

  const handleCardClick = (cardIndex: number) => {
    console.log(`Card ${cardIndex} clicado`);
    
    setIsTransitioning(true);
    setTimeout(() => {
      if (cardIndex === 0) {
        setShowJornaisScreen(true);
        setShowRevistasScreen(false);
        setShowMapaMundiScreen(false);
      } else if (cardIndex === 1) {
        setShowRevistasScreen(true);
        setShowJornaisScreen(false);
        setShowMapaMundiScreen(false);
      } else if (cardIndex === 2) {
        setShowMapaMundiScreen(true);
        setShowJornaisScreen(false);
        setShowRevistasScreen(false);
      }
    }, 600);
  };

  const handleBackToMenu = () => {
    setIsTransitioning(false);
    setTimeout(() => {
      setShowJornaisScreen(false);
      setShowRevistasScreen(false);
      setShowMapaMundiScreen(false);
    }, 600);
  };

  if (showMapaMundiScreen) {
    return (
      <div className="screen-transition" style={{ opacity: isTransitioning ? 1 : 0 }}>
        <MapaMundiScreen 
          onBack={handleBackToMenu} 
          onMainMenu={handleBackToMenu}  
        />
      </div>
    );
  }

  if (showRevistasScreen) {
    return (
      <div className="screen-transition" style={{ opacity: isTransitioning ? 1 : 0 }}>
        <RevistasBrasiliaScreen 
          onBack={handleBackToMenu} 
          onMainMenu={handleBackToMenu} 
        />
      </div>
    );
  }

  if (showJornaisScreen) {
    return (
      <div className="screen-transition" style={{ opacity: isTransitioning ? 1 : 0 }}>
        <JornaisScreen 
          onBack={handleBackToMenu} 
          onMainMenu={handleBackToMenu}  
        />
      </div>
    );
  }

  return (
    <div className="main-menu-container" style={{ opacity: isTransitioning ? 0 : 1 }}>
      {/* Formas de apoio - CANTO SUPERIOR DIREITO */}
      <div className="forma-apoio-superior">
        <img
          src="/images/formas_apoio_laranja.png"
          alt=""
          className="forma-apoio-img-laranja"
        />
      </div>

      {/* Formas de apoio - CANTO INFERIOR ESQUERDO */}
      <div className="forma-apoio-inferior">
        <img
          src="/images/formas_apoio_laranja.png"
          alt=""
          className="forma-apoio-img-laranja"
        />
      </div>

      {/* Título Principal */}
      <div className="titulo-header">
        <h1 className="titulo-brasilia">BRASÍLIA</h1>
        <p className="subtitulo-brasilia">
          O NASCIMENTO DA CAPITAL NA IMPRENSA
        </p>
      </div>

      {/* Container dos Cards */}
      <div className="cards-container">
        {/* Card 1 - Jornais */}
        <div
          onClick={() => handleCardClick(0)}
          className="touch-card menu-card card-jornais"
        >
          <div className="card-image-container">
            <img 
              src="/images/mapa_brasil.png" 
              alt="Mapa do Brasil"
              className="card-image"
            />
          </div>
          <h2 className="card-title card-title-single">Jornais</h2>
          <img 
            src="/images/imagem_mao.jpeg" 
            alt="Toque aqui"
            className="icone-toque-card"
          />
        </div>

        {/* Card 2 - Revista Brasília */}
        <div
          onClick={() => handleCardClick(1)}
          className="touch-card menu-card card-revista"
        >
          <div className="card-image-container">
            <img 
              src="/images/brasilia_menu.png" 
              alt="Mapa de Brasília"
              className="card-image"
            />
          </div>
          <h2 className="card-title card-title-duplo">
            Revista<br />Brasília
          </h2>
          <img 
            src="/images/imagem_mao.jpeg" 
            alt="Toque aqui"
            className="icone-toque-card"
            style={{ animation: 'tapBounce 1.5s ease-in-out infinite 0.3s' }}
          />
        </div>

        {/* Card 3 - Mapa Mundi */}
        <div
          onClick={() => handleCardClick(2)}
          className="touch-card menu-card card-mapa"
        >
          <img 
            src="/images/mapa_mundi_menu.png" 
            alt="Mapa Mundi"
            className="card-image-mapa"
          />
          <h2 className="card-title card-title-duplo">
            Repercussão<br />internacional
          </h2>
          <img 
            src="/images/imagem_mao.jpeg" 
            alt="Toque aqui"
            className="icone-toque-card"
            style={{ animation: 'tapBounce 1.5s ease-in-out infinite 0.6s' }}
          />
        </div>
      </div>

      {/* Texto de instrução */}
      <p className="texto-instrucao">
        Toque em um tema para iniciar
      </p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Container Principal */
        .main-menu-container {
          width: 100vw;
          height: 100vh;
          background: rgb(255, 255, 255);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(30px, 4vw, 60px);
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: opacity 0.6s ease-in-out;
        }

        .screen-transition {
          transition: opacity 0.6s ease-in-out;
        }

        /* Formas de apoio */
        .forma-apoio-superior {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          gap: 10px;
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

        .forma-apoio-img-laranja {
          width: clamp(200px, 20vw, 380px);
          height: clamp(100px, 10vw, 200px);
          object-fit: contain;
        }

        .forma-apoio-superior .forma-apoio-img-laranja {
          position: relative;
          top: clamp(-40px, -4vw, -76px);
          left: clamp(40px, 4vw, 80px);
        }

        .forma-apoio-inferior .forma-apoio-img-laranja {
          position: relative;
          top: clamp(40px, 4vw, 76px);
          left: clamp(-40px, -4vw, -80px);
        }

        /* Título Header */
        .titulo-header {
          position: absolute;
          top: clamp(80px, 15vh, 200px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: baseline;
          gap: clamp(10px, 1vw, 15px);
          z-index: 100;
          animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .titulo-brasilia {
          font-size: clamp(48px, 7vw, 120px);
          font-weight: 600;
          color: rgb(0, 0, 0);
          margin: 0;
          letter-spacing: clamp(2px, 0.3vw, 4px);
          line-height: 1;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        .subtitulo-brasilia {
          font-size: clamp(12px, 1.3vw, 22px);
          font-weight: 400;
          color: rgb(0, 0, 0);
          margin: 0;
          letter-spacing: clamp(0.5px, 0.1vw, 1.5px);
          text-transform: uppercase;
          white-space: nowrap;
          font-family: 'Jost', sans-serif;
        }

        /* Container dos Cards */
        .cards-container {
          display: flex;
          gap: clamp(25px, 3vw, 50px);
          justify-content: center;
          align-items: center;
          max-width: min(90vw, 1400px);
          width: 100%;
          margin-top: clamp(50px, 8vh, 120px);
          z-index: 10;
          flex-wrap: wrap;
        }

        /* Cards */
        .menu-card {
          position: relative;
          width: clamp(250px, 20vw, 350px);
          height: clamp(300px, 23vw, 400px);
          background: rgb(190, 70, 27);
          border-radius: clamp(12px, 1.2vw, 20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(190, 70, 27, 0.4);
          overflow: hidden;
        }

        .card-jornais {
        margin-top:120px;
          animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards, cardFloat 4s ease-in-out infinite;
        }

        .card-revista {
          margin-top:120px;
          animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards, cardFloat 4s ease-in-out infinite 0.5s;
        }

        .card-mapa {
        margin-top:120px;
          animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards, cardFloat 4s ease-in-out infinite 1s;
        }

        .card-image-container {
          position: relative;
          width: clamp(140px, 13vw, 220px);
          height: clamp(120px, 12vw, 200px);
          margin-bottom: clamp(20px, 2vw, 30px);
        }

        .card-image {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
          z-index: 1;
        }

        .card-image-mapa {
          width: clamp(150px, 14vw, 240px);
          height: clamp(120px, 12vw, 200px);
          object-fit: contain;
          margin-bottom: clamp(20px, 2vw, 30px);
        }

        .card-title {
          font-weight: 600;
          color: rgb(255, 255, 255);
          margin: 0;
          letter-spacing: clamp(0.5px, 0.08vw, 1px);
          text-align: center;
          font-family: 'Jost', sans-serif;
        }

        .card-title-single {
          font-size: clamp(28px, 2.2vw, 36px);
        }

        .card-title-duplo {
          font-size: clamp(22px, 1.8vw, 32px);
          line-height: 1.2;
        }

        .icone-toque-card {
          position: absolute;
          bottom: clamp(12px, 1.2vw, 20px);
          right: clamp(12px, 1.2vw, 20px);
          width: clamp(40px, 3.5vw, 60px);
          height: clamp(40px, 3.5vw, 60px);
          object-fit: contain;
          opacity: 0.9;
          animation: tapBounce 1.5s ease-in-out infinite;
        }

        /* Texto de instrução */
        .texto-instrucao {
          font-size: clamp(18px, 1.7vw, 28px);
          font-weight: 400;
          color: rgb(30, 58, 138);
          text-align: center;
          margin-top: clamp(30px, 4vh, 60px);
          z-index: 10;
          animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s backwards;
          font-family: 'Jost', sans-serif;
        }

        /* Animações */
        @keyframes cardFloat {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% { 
            transform: translateY(-15px) rotate(0.5deg) scale(1.02);
          }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-60px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes tapBounce {
          0%, 100% { 
            transform: scale(1) translateY(0) rotate(0deg);
          }
          50% { 
            transform: scale(1.3) translateY(-18px) rotate(-5deg);
          }
        }

        /* Interações */
        .touch-card:active {
          transform: scale(0.97) translateY(2px) !important;
          transition: transform 0.1s ease;
        }

        .touch-card:hover {
          transform: scale(1.05);
          transition: all 0.3s ease;
        }

        /* Media Queries para telas grandes (32 polegadas e maiores) */
        @media (min-width: 2560px) {
          .main-menu-container {
            padding: 80px;
          }

          .titulo-header {
            top: 140px;
          }

          .titulo-brasilia {
            font-size: 140px;
            letter-spacing: 5px;
          }

          .subtitulo-brasilia {
            font-size: 26px;
          }

          .cards-container {
            margin-top: 100px;
          }

          .menu-card {
            width: 400px;
            height: 460px;
            border-radius: 24px;
          }

          .card-image-container {
            width: 260px;
            height: 240px;
          }

          .card-image-mapa {
            width: 280px;
            height: 240px;
          }

          .card-title-single {
            font-size: 42px;
          }

          .card-title-duplo {
            font-size: 36px;
          }

          .texto-instrucao {
            font-size: 32px;
            margin-top: 80px;
          }

          .icone-toque-card {
            width: 70px;
            height: 70px;
            bottom: 25px;
            right: 25px;
          }
        }

        /* Media Queries para telas médias */
        @media (max-width: 1440px) {
          .titulo-header {
            top: 100px;
            flex-direction: column;
            align-items: center;
            gap: 5px;
          }

          .subtitulo-brasilia {
            white-space: normal;
            text-align: center;
          }
        }

        /* Media Queries para tablets */
        @media (max-width: 1024px) {
          .titulo-brasilia {
            font-size: 60px;
          }

          .subtitulo-brasilia {
            font-size: 14px;
          }

          .menu-card {
            width: 280px;
            height: 330px;
          }

          .cards-container {
            gap: 20px;
          }
        }

        /* Media Queries para mobile */
        @media (max-width: 768px) {
          .titulo-header {
            top: 60px;
          }

          .titulo-brasilia {
            font-size: 48px;
          }

          .subtitulo-brasilia {
            font-size: 12px;
          }

          .menu-card {
            width: 250px;
            height: 300px;
          }

          .card-title-single {
            font-size: 28px;
          }

          .card-title-duplo {
            font-size: 24px;
          }

          .texto-instrucao {
            font-size: 18px;
            margin-top: 30px;
          }
        }

        /* Ajustes para telas muito pequenas */
        @media (max-width: 480px) {
          .cards-container {
            flex-direction: column;
            gap: 15px;
          }

          .menu-card {
            width: 90vw;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default MainMenu;