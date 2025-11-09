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
      }, 60000);
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
      <div style={{
        opacity: isTransitioning ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out'
      }}>
        <MapaMundiScreen onBack={handleBackToMenu} />
      </div>
    );
  }

  if (showRevistasScreen) {
    return (
      <div style={{
        opacity: isTransitioning ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out'
      }}>
        <RevistasBrasiliaScreen onBack={handleBackToMenu} />
      </div>
    );
  }

  if (showJornaisScreen) {
    return (
      <div style={{
        opacity: isTransitioning ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out'
      }}>
        <JornaisScreen onBack={handleBackToMenu} />
      </div>
    );
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'rgb(255, 255, 255)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Jost', -apple-system, BlinkMacSystemFont, sans-serif",
      opacity: isTransitioning ? 0 : 1,
      transition: 'opacity 0.6s ease-in-out'
    }}>

      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        gap: '10px',
        zIndex: 1
      }}>
        <img
          src="/images/formas_apoio_laranja.png"
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
          src="/images/formas_apoio_laranja.png"
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

      {/* Título Principal */}
      <div style={{
        position: 'absolute',
        top: '140px',
        left: '440px',
        right: '80px',
        display: 'flex',
        alignItems: 'baseline',
        gap: '15px',
        zIndex: 100,
        animation: 'fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <h1 style={{
          fontSize: '120px',
          fontWeight: '600',
          color: 'rgb(0, 0, 0)',
          margin: 0,
          letterSpacing: '4px',
          lineHeight: '1',
          textTransform: 'uppercase',
          fontFamily: "'Jost', sans-serif",
    
        }}>
          BRASÍLIA
        </h1>
        <p style={{
          fontSize: '22px',
          fontWeight: '400',
          color: 'rgb(0, 0, 0)',
          margin: 0,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          fontFamily: "'Jost', sans-serif"
        }}>
          O NASCIMENTO DA CAPITAL NA IMPRENSA
        </p>
      </div>

      {/* Container dos Cards */}
      <div style={{
        display: 'flex',
        gap: '50px',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1400px',
        width: '100%',
        marginTop: '80px',
        zIndex: 10
      }}>
        {/* Card 1 - Jornais */}
        <div
          onClick={() => handleCardClick(0)}
          className="touch-card"
          style={{
            position: 'relative',
            width: '350px',
            height: '400px',
            background: 'rgb(190, 70, 27)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(190, 70, 27, 0.4)',
            overflow: 'hidden',
            animation: 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards, cardFloat 4s ease-in-out infinite'
          }}
        >
          <div style={{
            position: 'relative',
            width: '220px',
            height: '200px',
            marginBottom: '30px'
          }}>
            <img 
              src="/images/mapa_brasil.png" 
              alt="Mapa do Brasil"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 1
              }}
            />
          </div>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '600',
            color: 'rgb(255, 255, 255)',
            margin: 0,
            letterSpacing: '1px',
            textAlign: 'center',
            fontFamily: "'Jost', sans-serif"
          }}>
            Jornais
          </h2>
          <img 
            src="/images/imagem_mao.jpeg" 
            alt="Toque aqui"
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '60px',
              height: '60px',
              objectFit: 'contain',
              opacity: 0.9,
              animation: 'tapBounce 1.5s ease-in-out infinite'
            }}
          />
        </div>

        {/* Card 2 - Revista Brasília */}
        <div
          onClick={() => handleCardClick(1)}
          className="touch-card"
          style={{
            position: 'relative',
            width: '350px',
            height: '400px',
            background: 'rgb(190, 70, 27)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(190, 70, 27, 0.4)',
            overflow: 'hidden',
            animation: 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards, cardFloat 4s ease-in-out infinite 0.5s'
          }}
        >
          <div style={{
            position: 'relative',
            width: '220px',
            height: '200px',
            marginBottom: '30px'
          }}>
            <img 
              src="/images/brasilia_menu.png" 
              alt="Mapa de Brasília"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 1
              }}
            />
          </div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: 'rgb(255, 255, 255)',
            margin: 0,
            letterSpacing: '1px',
            textAlign: 'center',
            lineHeight: '1.2',
            fontFamily: "'Jost', sans-serif"
          }}>
            Revista<br />Brasília
          </h2>
          <img 
            src="/images/imagem_mao.jpeg" 
            alt="Toque aqui"
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '60px',
              height: '60px',
              objectFit: 'contain',
              opacity: 0.9,
              animation: 'tapBounce 1.5s ease-in-out infinite 0.3s'
            }}
          />
        </div>

        {/* Card 3 - Mapa Mundi */}
        <div
          onClick={() => handleCardClick(2)}
          className="touch-card"
          style={{
            position: 'relative',
            width: '350px',
            height: '400px',
            background: 'rgb(190, 70, 27)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(190, 70, 27, 0.4)',
            overflow: 'hidden',
            animation: 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards, cardFloat 4s ease-in-out infinite 1s'
          }}
        >
          <img 
            src="/images/mapa_mundi_menu.png" 
            alt="Mapa Mundi"
            style={{
              width: '240px',
              height: '200px',
              objectFit: 'contain',
              marginBottom: '30px'
            }}
          />
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: 'rgb(255, 255, 255)',
            margin: 0,
            letterSpacing: '1px',
            textAlign: 'center',
            lineHeight: '1.2',
            fontFamily: "'Jost', sans-serif"
          }}>
            Repercussão<br />internacional
          </h2>
          <img 
            src="/images/imagem_mao.jpeg" 
            alt="Toque aqui"
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '60px',
              height: '60px',
              objectFit: 'contain',
              opacity: 0.9,
              animation: 'tapBounce 1.5s ease-in-out infinite 0.6s'
            }}
          />
        </div>
      </div>

      {/* Texto de instrução */}
      <p style={{
        fontSize: '28px',
        fontWeight: '400',
        color: 'rgb(30, 58, 138)',
        textAlign: 'center',
        marginTop: '60px',
        zIndex: 10,
        animation: 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s backwards',
        fontFamily: "'Jost', sans-serif"
      }}>
        Toque em um tema para iniciar
      </p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes cardFloat {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% { 
            transform: translateY(-15px) rotate(0.5deg) scale(1.02);
          }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-60px); }
          to { opacity: 1; transform: translateY(0); }
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

        .touch-card:active {
          transform: scale(0.97) translateY(2px) !important;
          transition: transform 0.1s ease;
        }

        .touch-card:hover {
          transform: scale(1.05);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default MainMenu;
