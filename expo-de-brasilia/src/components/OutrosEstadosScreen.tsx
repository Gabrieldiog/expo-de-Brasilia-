import React, { useState } from 'react';

interface OutrosEstadosScreenProps {
  onBack: () => void;
}

const OutrosEstadosScreen: React.FC<OutrosEstadosScreenProps> = ({ onBack }) => {
  const [selectedJornal, setSelectedJornal] = useState<string | null>(null);

  // Lista dos 6 jornais
  const jornais = [
    { 
      filename: 'correio.jpg', 
      path: '/images/Jornais_em_outros_Estados/correio.jpg',
      nome: 'Correio Brasiliense - Brasília'
    },
    { 
      filename: 'dirario.jpg', 
      path: '/images/Jornais_em_outros_Estados/dirario.jpg',
      nome: 'Diário Associados - Minas Gerais'
    },
    { 
      filename: 'estado_sp.jpg', 
      path: '/images/Jornais_em_outros_Estados/estado_sp.jpg',
      nome: 'O Estado de São Paulo - São Paulo'
    },
    { 
      filename: 'jornada.jpg', 
      path: '/images/Jornais_em_outros_Estados/jornada.jpg',
      nome: 'Jornal do Brasil - Rio de Janeiro'
    },
    { 
      filename: 'o_globo.jpeg', 
      path: '/images/Jornais_em_outros_Estados/o_globo.jpeg',
      nome: 'O Globo - Rio de Janeiro'
    },
    { 
      filename: 'rio_de_janeiro.jpeg', 
      path: '/images/Jornais_em_outros_Estados/rio_de_janeiro.jpeg',
      nome: 'O Jornal - Rio de Janeiro'
    }
  ];

  const handleJornalClick = (filename: string) => {
    if (selectedJornal === filename) {
      setSelectedJornal(null); // Fecha se clicar no mesmo
    } else {
      setSelectedJornal(filename);
    }
  };

  const selectedJornalData = jornais.find(j => j.filename === selectedJornal);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'rgb(45, 94, 74)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '40px 60px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Jost', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      
      {/* JORNAL - CANTO SUPERIOR ESQUERDO */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: -114,
        width: '600px',
        height: '830px',
        backgroundImage: 'url(/images/jornal_lateral.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom right',
        opacity: 0.7,
        zIndex: 1,
        pointerEvents: 'none',
        transform: 'rotate(90deg)'
      }} />

      {/* JORNAL - CANTO INFERIOR DIREITO */}
      <div style={{
        position: 'absolute',
        right: 0,
        bottom: -99,
        width: '600px',
        height: '790px',
        backgroundImage: 'url(/images/jornal_lateral.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top left',
        opacity: 0.7,
        zIndex: 1,
        pointerEvents: 'none',
        transform: 'rotate(270deg)'
      }} />

      {/* GRADE DE LINHAS */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(80, 130, 110, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(80, 130, 110, 0.2) 2px, transparent 2px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.4
      }} />

      {/* Botão Voltar */}
      <div
        onClick={onBack}
        className="touch-card"
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          background: 'linear-gradient(135deg, rgba(251, 187, 16, 0.95) 0%, rgba(255, 215, 80, 0.85) 50%, rgba(251, 187, 16, 0.95) 100%)',
          border: '3px solid rgba(45, 94, 74, 0.6)',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          animation: 'fadeIn 1s ease 0.8s backwards, buttonPulse 3s ease-in-out infinite'
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(45, 94, 74)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </div>

      {/* COLUNA ESQUERDA - Grid dos Jornais */}
      <div style={{
        width: selectedJornal ? '450px' : '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        gap: '30px',
        paddingTop: selectedJornal ? '120px' : '0'
      }}>
        
        {/* Título - só aparece quando não tem jornal selecionado */}
        {!selectedJornal && (
          <div style={{
            marginBottom: '40px',
            textAlign: 'center',
            animation: 'fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards'
          }}>
            <div style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(251, 187, 16, 0.95) 0%, rgba(255, 215, 80, 0.75) 30%, rgba(255, 235, 150, 0.60) 60%, rgba(255, 255, 255, 0.95) 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              border: '2px solid rgba(251, 187, 16, 0.5)',
              borderTop: '3px solid rgba(251, 187, 16, 0.6)',
              borderBottom: '3px solid rgba(251, 187, 16, 0.6)',
              borderRadius: '32px',
              padding: '30px 65px',
              boxShadow: '0 25px 70px rgba(45, 94, 74, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.6), inset 0 -2px 0 rgba(45, 94, 74, 0.2)',
              animation: 'titleFloat 4s ease-in-out infinite'
            }}>
              <h1 style={{
                fontSize: '68px',
                fontWeight: '700',
                color: 'rgb(45, 94, 74)',
                margin: '0 0 8px 0',
                letterSpacing: '3px',
                lineHeight: '1',
                textShadow: '3px 3px 0px rgba(45, 94, 74, 0.2)',
                textTransform: 'uppercase'
              }}>
                Outros Estados
              </h1>
              <p style={{
                fontSize: '19px',
                fontWeight: '500',
                color: 'rgb(45, 94, 74)',
                margin: 0,
                letterSpacing: '1px',
                textShadow: '1px 1px 0px rgba(45, 94, 74, 0.15)'
              }}>
                O nascimento da capital na Imprensa
              </p>
            </div>
          </div>
        )}

        {/* Aviso dinâmico */}
        <p style={{
          fontSize: selectedJornal ? '16px' : '24px',
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.95)',
          textAlign: 'center',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          animation: 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards',
          transition: 'all 0.3s ease',
          maxWidth: selectedJornal ? '400px' : '100%',
          lineHeight: '1.4'
        }}>
          {selectedJornal 
            ? 'Clique novamente no jornal para fechar ou escolha outro' 
            : 'Clique em um dos jornais abaixo para visualizar'}
        </p>

        {/* Grid dos jornais */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: selectedJornal ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: selectedJornal ? '15px' : '30px',
          width: '100%',
          maxWidth: selectedJornal ? '420px' : '1300px',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflowY: selectedJornal ? 'auto' : 'visible',
          maxHeight: selectedJornal ? '70vh' : 'none',
          padding: selectedJornal ? '10px' : '0'
        }}>
          {jornais.map((jornal, index) => (
            <div
              key={index}
              onClick={() => handleJornalClick(jornal.filename)}
              className="touch-card"
              style={{
                position: 'relative',
                height: selectedJornal ? '140px' : '280px',
                background: selectedJornal === jornal.filename
                  ? 'linear-gradient(135deg, rgba(251, 187, 16, 1) 0%, rgba(255, 215, 80, 0.95) 50%, rgba(251, 187, 16, 1) 100%)'
                  : 'linear-gradient(135deg, rgba(251, 187, 16, 0.98) 0%, rgba(255, 215, 80, 0.88) 20%, rgba(255, 235, 150, 0.75) 45%, rgba(255, 245, 200, 0.92) 75%, rgba(255, 255, 255, 0.98) 100%)',
                backdropFilter: 'blur(50px) saturate(200%)',
                WebkitBackdropFilter: 'blur(50px) saturate(200%)',
                border: selectedJornal === jornal.filename ? '4px solid rgba(255, 255, 255, 0.9)' : '4px solid rgba(251, 187, 16, 0.5)',
                borderTop: '5px solid rgba(251, 187, 16, 0.6)',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: selectedJornal === jornal.filename
                  ? '0 25px 70px rgba(251, 187, 16, 0.6), 0 10px 30px rgba(255, 215, 80, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.3)'
                  : '0 20px 60px rgba(45, 94, 74, 0.45), 0 8px 20px rgba(251, 187, 16, 0.3)',
                animation: `fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.9 + index * 0.1}s backwards, cardFloat 4s ease-in-out infinite ${index * 0.3}s`,
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: selectedJornal === jornal.filename ? 'scale(1.05)' : 'scale(1)',
                padding: '15px'
              }}
            >
              <h2 style={{
                fontSize: selectedJornal ? '14px' : '22px',
                fontWeight: '700',
                color: 'rgb(45, 94, 74)',
                margin: 0,
                letterSpacing: '0.5px',
                textAlign: 'center',
                lineHeight: '1.3',
                textShadow: '2px 2px 0px rgba(45, 94, 74, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                {jornal.nome}
              </h2>
              {!selectedJornal && (
                <img 
                  src="/images/imagem_mao.jpeg" 
                  alt="Toque aqui"
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    width: '55px',
                    height: '55px',
                    objectFit: 'contain',
                    opacity: 0.95,
                    filter: 'drop-shadow(0 6px 20px rgba(45, 94, 74, 0.6))',
                    animation: `tapBounce 1.5s ease-in-out infinite ${index * 0.2}s`
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* COLUNA DIREITA - Visualizador de Imagem */}
      {selectedJornal && selectedJornalData && (
        <div style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          animation: 'slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}>
          {/* Frame da imagem tipo Polaroid */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.95) 100%)',
            padding: '20px 20px 80px 20px',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 8px rgba(251, 187, 16, 0.8)',
            border: '4px solid rgba(0, 0, 0, 0.8)',
            maxWidth: '800px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img
              src={selectedJornalData.path}
              alt={selectedJornalData.nome}
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(90vh - 180px)',
                objectFit: 'contain',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            />
            <p style={{
              marginTop: '20px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'rgb(45, 94, 74)',
              textAlign: 'center',
              lineHeight: '1.4'
            }}>
              {selectedJornalData.nome}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800&display=swap');

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes titleFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.01); }
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-12px) rotate(0.5deg) scale(1.02); }
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

        @keyframes buttonPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes tapBounce {
          0%, 100% { transform: scale(1) translateY(0) rotate(0deg); }
          50% { transform: scale(1.3) translateY(-15px) rotate(-5deg); }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .touch-card:active {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease;
        }

        .touch-card:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default OutrosEstadosScreen;
