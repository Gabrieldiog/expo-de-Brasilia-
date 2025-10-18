import React, { useEffect, useRef, useState } from 'react';

interface MainMenuProps {
  onInactivity: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onInactivity }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

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
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, rgb(227, 227, 226) 0%, rgb(46, 46, 46) 25%, rgb(60, 60, 60) 50%, rgb(46, 46, 46) 75%, rgb(227, 227, 226) 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 30s ease infinite',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 60px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Jost', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* GRADE DE LINHAS SUTIS NO FUNDO */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* FORMAS DE APOIO - Canto Superior Esquerdo */}
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        display: 'flex',
        gap: '15px',
        zIndex: 1,
        opacity: 0.6,
        animation: 'fadeIn 1.5s ease-in-out'
      }}>
        {/* Círculo AZUL */}
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          border: '4px solid rgba(66, 152, 207, 0.8)',
          animation: 'shapeFloatSmooth 3s ease-in-out infinite'
        }} />
        {/* Quadrado AMARELO */}
        <div style={{
          width: '45px',
          height: '45px',
          border: '4px solid rgba(251, 187, 16, 0.8)',
          borderRadius: '4px',
          animation: 'shapeFloatSmooth 3s ease-in-out infinite 0.5s'
        }} />
        {/* Semi-círculo VERDE */}
        <div style={{
          width: '45px',
          height: '22.5px',
          borderRadius: '45px 45px 0 0',
          border: '4px solid rgba(85, 95, 60, 0.8)',
          borderBottom: 'none',
          animation: 'shapeFloatSmooth 3s ease-in-out infinite 1s'
        }} />
        {/* Estrela (losango) VERMELHO */}
        <div style={{
          width: '32px',
          height: '32px',
          background: 'rgba(190, 70, 27, 0.8)',
          transform: 'rotate(45deg)',
          marginTop: '7px',
          animation: 'shapeFloatSmooth 3s ease-in-out infinite 1.5s'
        }} />
      </div>

      {/* Título Principal */}
      <div style={{
        marginTop: '60px',
        marginBottom: 'auto',
        textAlign: 'center',
        zIndex: 100,
        animation: 'fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '32px',
          padding: '30px 65px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
        }}>
          <h1 style={{
            fontSize: '68px',
            fontWeight: '600',
            color: 'rgb(255, 255, 255)',
            margin: '0 0 8px 0',
            letterSpacing: '2px',
            lineHeight: '1',
            textShadow: '0 6px 30px rgba(0, 0, 0, 0.8)'
          }}>
            Brasília
          </h1>
          <p style={{
            fontSize: '19px',
            fontWeight: '400',
            color: 'rgb(227, 227, 226)',
            margin: 0,
            letterSpacing: '0.8px',
            textShadow: '0 3px 20px rgba(0, 0, 0, 0.6)'
          }}>
            O nascimento da capital na Imprensa
          </p>
        </div>
      </div>

      {/* Container dos Cards */}
      <div style={{
        display: 'flex',
        gap: '35px',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1100px',
        width: '100%',
        marginBottom: 'auto',
        zIndex: 10
      }}>
        {/* Card 1 - Jornais - TRANSIÇÃO DESSINCRONIZADA */}
        <div
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick(0)}
          style={{
            width: '270px',
            height: '340px',
            background: hoveredCard === 0 
              ? 'linear-gradient(135deg, rgba(251, 187, 16, 0.15), rgba(251, 187, 16, 0.05))'
              : 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(25px) saturate(140%)',
            WebkitBackdropFilter: 'blur(25px) saturate(140%)',
            border: `1px solid ${hoveredCard === 0 ? 'rgba(251, 187, 16, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            cursor: 'pointer',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: hoveredCard === 0 ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
            boxShadow: hoveredCard === 0
              ? '0 22px 60px rgba(0, 0, 0, 0.7), 0 0 70px rgba(251, 187, 16, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'visible',
            marginTop: '55px',
            animation: 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s backwards, cardFloat 3s ease-in-out infinite, cardColorPulse1 15s ease-in-out infinite'
          }}
        >
          {/* Círculo com brasilia1 */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '115px',
            height: '115px',
            borderRadius: '50%',
            border: `4px solid ${hoveredCard === 0 ? 'rgba(251, 187, 16, 0.9)' : 'rgba(251, 187, 16, 0.6)'}`,
            overflow: 'hidden',
            boxShadow: '0 15px 45px rgba(251, 187, 16, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 10
          }}>
            <img
              src="/images/brasilia1.jpeg"
              alt="Jornais"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === 0 ? 'scale(1.12)' : 'scale(1)'
              }}
            />
          </div>

          <h2 style={{
            fontSize: '40px',
            fontWeight: '600',
            color: 'rgb(255, 255, 255)',
            margin: '25px 0 0 0',
            letterSpacing: '0px',
            textAlign: 'center',
            textShadow: '0 5px 25px rgba(0, 0, 0, 0.8)'
          }}>
            Jornais
          </h2>

          <img 
            src="/images/imagem_mao.jpeg" 
            alt="Toque aqui"
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '68px',
              height: '68px',
              objectFit: 'contain',
              opacity: 0.92,
              filter: 'drop-shadow(0 5px 18px rgba(0, 0, 0, 0.9))',
              animation: 'tapAnimation 1.2s ease-in-out infinite'
            }}
          />
        </div>

        {/* Card 2 - Revista - TRANSIÇÃO DESSINCRONIZADA */}
        <div
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick(1)}
          style={{
            width: '270px',
            height: '340px',
            background: hoveredCard === 1 
              ? 'linear-gradient(135deg, rgba(85, 95, 60, 0.15), rgba(45, 94, 74, 0.08))'
              : 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(25px) saturate(140%)',
            WebkitBackdropFilter: 'blur(25px) saturate(140%)',
            border: `1px solid ${hoveredCard === 1 ? 'rgba(85, 95, 60, 0.35)' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            cursor: 'pointer',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: hoveredCard === 1 ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
            boxShadow: hoveredCard === 1
              ? '0 22px 60px rgba(0, 0, 0, 0.7), 0 0 70px rgba(85, 95, 60, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'visible',
            marginTop: '55px',
            animation: 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards, cardFloat 3s ease-in-out infinite 0.5s, cardColorPulse2 15s ease-in-out infinite 5s'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '115px',
            height: '115px',
            borderRadius: '50%',
            border: `4px solid ${hoveredCard === 1 ? 'rgba(85, 95, 60, 1)' : 'rgba(85, 95, 60, 0.7)'}`,
            overflow: 'hidden',
            boxShadow: '0 15px 45px rgba(85, 95, 60, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 10
          }}>
            <img
              src="/images/brasilia5.jpeg"
              alt="Revista"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === 1 ? 'scale(1.12)' : 'scale(1)'
              }}
            />
          </div>

          <h2 style={{
            fontSize: '40px',
            fontWeight: '600',
            color: 'rgb(255, 255, 255)',
            margin: '25px 0 0 0',
            letterSpacing: '0px',
            textAlign: 'center',
            lineHeight: '1.15',
            textShadow: '0 5px 25px rgba(0, 0, 0, 0.8)'
          }}>
            Revista<br />Brasília
          </h2>

          <img 
            src="/images/imagem_mao.jpeg" 
            alt="Toque aqui"
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '68px',
              height: '68px',
              objectFit: 'contain',
              opacity: 0.92,
              filter: 'drop-shadow(0 5px 18px rgba(0, 0, 0, 0.9))',
              animation: 'tapAnimation 1.2s ease-in-out infinite 0.2s'
            }}
          />
        </div>

        {/* Card 3 - Repercussão - TRANSIÇÃO DESSINCRONIZADA */}
        <div
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick(2)}
          style={{
            width: '270px',
            height: '340px',
            background: hoveredCard === 2 
              ? 'linear-gradient(135deg, rgba(190, 70, 27, 0.15), rgba(96, 35, 24, 0.08))'
              : 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(25px) saturate(140%)',
            WebkitBackdropFilter: 'blur(25px) saturate(140%)',
            border: `1px solid ${hoveredCard === 2 ? 'rgba(190, 70, 27, 0.35)' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            cursor: 'pointer',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: hoveredCard === 2 ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
            boxShadow: hoveredCard === 2
              ? '0 22px 60px rgba(0, 0, 0, 0.7), 0 0 70px rgba(190, 70, 27, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'visible',
            marginTop: '55px',
            animation: 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.45s backwards, cardFloat 3s ease-in-out infinite 1s, cardColorPulse3 15s ease-in-out infinite 10s'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '115px',
            height: '115px',
            borderRadius: '50%',
            border: `4px solid ${hoveredCard === 2 ? 'rgba(190, 70, 27, 1)' : 'rgba(190, 70, 27, 0.7)'}`,
            overflow: 'hidden',
            boxShadow: '0 15px 45px rgba(190, 70, 27, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 10
          }}>
            <img
              src="/images/brasilia6.jpeg"
              alt="Internacional"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === 2 ? 'scale(1.12)' : 'scale(1)'
              }}
            />
          </div>

          <h2 style={{
            fontSize: '40px',
            fontWeight: '600',
            color: 'rgb(255, 255, 255)',
            margin: '25px 0 0 0',
            letterSpacing: '0px',
            textAlign: 'center',
            lineHeight: '1.15',
            textShadow: '0 5px 25px rgba(0, 0, 0, 0.8)'
          }}>
            Repercussão<br />internacional
          </h2>

          <img 
            src="/images/imagem_mao.jpeg" 
            alt="Toque aqui"
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '68px',
              height: '68px',
              objectFit: 'contain',
              opacity: 0.92,
              filter: 'drop-shadow(0 5px 18px rgba(0, 0, 0, 0.9))',
              animation: 'tapAnimation 1.2s ease-in-out infinite 0.4s'
            }}
          />
        </div>
      </div>

      {/* Botão LONGO com fundo BRANCO */}
      <div style={{
        marginBottom: '50px',
        background: 'rgb(255, 255, 255)',
        border: '1px solid rgba(227, 227, 226, 0.3)',
        color: 'rgb(24, 99, 173)',
        fontSize: '24px',
        fontWeight: '600',
        padding: '22px 100px',
        borderRadius: '60px',
        letterSpacing: '0.5px',
        textAlign: 'center',
        zIndex: 2000,
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        animation: 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s backwards',
        cursor: 'default'
      }}>
        Toque em um tema para iniciar
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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

        @keyframes cardFloat {
          0%, 100% { 
            transform: translateY(0) rotate(0deg);
          }
          50% { 
            transform: translateY(-8px) rotate(0.5deg);
          }
        }

        @keyframes shapeFloatSmooth {
          0%, 100% { 
            transform: translateY(0px);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-10px);
            opacity: 0.85;
          }
        }

        @keyframes cardColorPulse1 {
          0%, 20%, 100% { 
            background: rgba(255, 255, 255, 0.04);
          }
          10% { 
            background: linear-gradient(135deg, rgba(251, 187, 16, 0.08), rgba(251, 187, 16, 0.02));
          }
        }

        @keyframes cardColorPulse2 {
          0%, 20%, 100% { 
            background: rgba(255, 255, 255, 0.04);
          }
          10% { 
            background: linear-gradient(135deg, rgba(85, 95, 60, 0.08), rgba(45, 94, 74, 0.04));
          }
        }

        @keyframes cardColorPulse3 {
          0%, 20%, 100% { 
            background: rgba(255, 255, 255, 0.04);
          }
          10% { 
            background: linear-gradient(135deg, rgba(190, 70, 27, 0.08), rgba(96, 35, 24, 0.04));
          }
        }

        @keyframes tapAnimation {
          0%, 100% { 
            transform: scale(1) translateY(0);
          }
          50% { 
            transform: scale(1.18) translateY(-12px);
          }
        }
      `}</style>
    </div>
  );
};

export default MainMenu;
