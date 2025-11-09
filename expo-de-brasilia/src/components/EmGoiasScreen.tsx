import React, { useState } from 'react';

interface EmGoiasScreenProps {
  onBack: () => void;
}

const EmGoiasScreen: React.FC<EmGoiasScreenProps> = ({ onBack }) => {
  const [selectedJornal, setSelectedJornal] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const jornais = {
    'Jornal de Goiás': {
      images: Array.from({ length: 18 }, (_, i) => `/images/jornal_noticias/noticias${i + 1}.jpg`)
    },
    'Jornal Óio': {
      images: Array.from({ length: 6 }, (_, i) => `/images/jornal_oio/jornal_oio${i + 1}.jpg`)
    },
    'Cidade de Goias': {
      images: [
        '/images/cidade_de_goias/cidade1.jpg',
        '/images/cidade_de_goias/cidade2.jpeg',
        '/images/cidade_de_goias/cidade3.jpeg'
      ]
    }
  };

  const handleJornalClick = (jornalName: string) => {
    if (selectedJornal === jornalName) {
      setSelectedJornal(null);
      setCurrentImageIndex(0);
    } else {
      setSelectedJornal(jornalName);
      setCurrentImageIndex(0);
    }
  };

  const handleNext = () => {
    if (selectedJornal && currentImageIndex < jornais[selectedJornal as keyof typeof jornais].images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const currentImages = selectedJornal ? jornais[selectedJornal as keyof typeof jornais].images : [];

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'rgb(255, 255, 255)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '40px 60px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Jost', -apple-system, BlinkMacSystemFont, sans-serif"
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
          src="/images/formas_apoio_verde.png"
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
          src="/images/formas_apoio_verde.png"
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
        onClick={onBack}
        className="touch-card"
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          background: 'rgb(84, 94, 56)',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(84, 94, 56, 0.4)',
          zIndex: 1000,
          animation: 'fadeIn 1s ease 0.2s backwards'
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>

      {/* COLUNA ESQUERDA - Cards dos Jornais */}
      <div style={{
        width: selectedJornal ? '380px' : '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        gap: selectedJornal ? '20px' : '40px',
        paddingTop: selectedJornal ? '120px' : '0'
      }}>

        {/* Título - só aparece quando não tem jornal selecionado */}
        {!selectedJornal && (
          <div style={{
            marginBottom: '20px',
            textAlign: 'center',
            animation: 'fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards'
          }}>
            <h1 style={{
              fontSize: '72px',
              fontWeight: '700',
              color: 'rgb(0, 0, 0)',
              margin: '0 0 8px 0',
              letterSpacing: '3px',
              lineHeight: '1',
              textTransform: 'uppercase',
              fontFamily: "'Jost', sans-serif"
            }}>
              Em Goiás
            </h1>
            <p style={{
              fontSize: '22px',
              fontWeight: '500',
              color: 'rgb(84, 94, 56)',
              margin: 0,
              letterSpacing: '1px'
            }}>
              O nascimento da capital na Imprensa
            </p>
          </div>
        )}

        {/* Cards dos jornais - CENTRALIZADOS */}
        <div style={{
          display: 'flex',
          flexDirection: selectedJornal ? 'column' : 'row',
          gap: selectedJornal ? '20px' : '40px',
          width: '100%',
          maxWidth: selectedJornal ? '320px' : '1200px',
          justifyContent: 'center',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          {/* Card Jornal de Goiás */}
          <div
            onClick={() => handleJornalClick('Jornal de Goiás')}
            className="touch-card"
            style={{
              position: 'relative',
              height: selectedJornal ? '150px' : '300px',
              width: selectedJornal ? '100%' : 'auto',
              flex: selectedJornal ? 'none' : 1,
              background: selectedJornal === 'Jornal de Goiás'
                ? 'rgb(84, 94, 56)'
                : 'linear-gradient(135deg, rgb(84, 94, 56) 0%, rgb(100, 110, 72) 100%)',
              borderRadius: '28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: selectedJornal === 'Jornal de Goiás'
                ? '0 25px 70px rgba(84, 94, 56, 0.6), 0 10px 30px rgba(84, 94, 56, 0.5)'
                : '0 20px 60px rgba(84, 94, 56, 0.35)',
              animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s backwards, cardFloat 4s ease-in-out infinite',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: selectedJornal === 'Jornal de Goiás' ? 'scale(1.08)' : 'scale(1)',
              border: selectedJornal === 'Jornal de Goiás' ? '4px solid rgba(255, 255, 255, 0.3)' : 'none'
            }}
          >
            <h2 style={{
              fontSize: selectedJornal ? '28px' : '40px',
              fontWeight: '700',
              color: 'rgb(255, 255, 255)',
              margin: 0,
              letterSpacing: '1px',
              textAlign: 'center',
              lineHeight: '1.2',
              transition: 'all 0.3s ease'
            }}>
              Jornal de<br />Goiás
            </h2>
            {!selectedJornal && (
              <img
                src="/images/imagem_mao.jpeg"
                alt="Toque aqui"
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '65px',
                  height: '65px',
                  objectFit: 'contain',
                  opacity: 0.95,
                  animation: 'tapBounce 1.5s ease-in-out infinite'
                }}
              />
            )}
          </div>

          {/* Card Jornal Óio */}
          <div
            onClick={() => handleJornalClick('Jornal Óio')}
            className="touch-card"
            style={{
              position: 'relative',
              height: selectedJornal ? '150px' : '300px',
              width: selectedJornal ? '100%' : 'auto',
              flex: selectedJornal ? 'none' : 1,
              background: selectedJornal === 'Jornal Óio'
                ? 'rgb(84, 94, 56)'
                : 'linear-gradient(135deg, rgb(84, 94, 56) 0%, rgb(100, 110, 72) 100%)',
              borderRadius: '28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: selectedJornal === 'Jornal Óio'
                ? '0 25px 70px rgba(84, 94, 56, 0.6), 0 10px 30px rgba(84, 94, 56, 0.5)'
                : '0 20px 60px rgba(84, 94, 56, 0.35)',
              animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.1s backwards, cardFloat 4s ease-in-out infinite 0.5s',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: selectedJornal === 'Jornal Óio' ? 'scale(1.08)' : 'scale(1)',
              border: selectedJornal === 'Jornal Óio' ? '4px solid rgba(255, 255, 255, 0.3)' : 'none'
            }}
          >
            <h2 style={{
              fontSize: selectedJornal ? '32px' : '48px',
              fontWeight: '700',
              color: 'rgb(255, 255, 255)',
              margin: 0,
              letterSpacing: '1px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
              Jornal Óio
            </h2>
            {!selectedJornal && (
              <img
                src="/images/imagem_mao.jpeg"
                alt="Toque aqui"
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '65px',
                  height: '65px',
                  objectFit: 'contain',
                  opacity: 0.95,
                  animation: 'tapBounce 1.5s ease-in-out infinite 0.3s'
                }}
              />
            )}
          </div>

          {/* Card Cidade de Goias */}
          <div
            onClick={() => handleJornalClick('Cidade de Goias')}
            className="touch-card"
            style={{
              position: 'relative',
              height: selectedJornal ? '150px' : '300px',
              width: selectedJornal ? '100%' : 'auto',
              flex: selectedJornal ? 'none' : 1,
              background: selectedJornal === 'Cidade de Goias'
                ? 'rgb(84, 94, 56)'
                : 'linear-gradient(135deg, rgb(84, 94, 56) 0%, rgb(100, 110, 72) 100%)',
              borderRadius: '28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: selectedJornal === 'Cidade de Goias'
                ? '0 25px 70px rgba(84, 94, 56, 0.6), 0 10px 30px rgba(84, 94, 56, 0.5)'
                : '0 20px 60px rgba(84, 94, 56, 0.35)',
              animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.3s backwards, cardFloat 4s ease-in-out infinite 1s',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: selectedJornal === 'Cidade de Goias' ? 'scale(1.08)' : 'scale(1)',
              border: selectedJornal === 'Cidade de Goias' ? '4px solid rgba(255, 255, 255, 0.3)' : 'none'
            }}
          >
            <h2 style={{
              fontSize: selectedJornal ? '28px' : '40px',
              fontWeight: '700',
              color: 'rgb(255, 255, 255)',
              margin: 0,
              letterSpacing: '1px',
              textAlign: 'center',
              lineHeight: '1.2',
              transition: 'all 0.3s ease'
            }}>
              Cidade de<br />Goias
            </h2>
            {!selectedJornal && (
              <img
                src="/images/imagem_mao.jpeg"
                alt="Toque aqui"
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '65px',
                  height: '65px',
                  objectFit: 'contain',
                  opacity: 0.95,
                  animation: 'tapBounce 1.5s ease-in-out infinite 0.6s'
                }}
              />
            )}
          </div>
        </div>

        {/* Aviso dinâmico - ABAIXO DOS CARDS */}
        <p style={{
          fontSize: selectedJornal ? '18px' : '20px',
          fontWeight: '600',
          color: 'rgb(84, 94, 56)',
          textAlign: 'center',
          marginTop: '30px',
          animation: 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards',
          transition: 'all 0.3s ease',
          maxWidth: selectedJornal ? '320px' : '800px',
          lineHeight: '1.4'
        }}>
          {selectedJornal
            ? 'Clique novamente no jornal selecionado para fechar ou escolha outro'
            : 'Clique em um dos jornais abaixo para visualizar as páginas'}
        </p>
      </div>

      {/* COLUNA DIREITA - Visualizador de Imagem */}
      {selectedJornal && currentImages.length > 0 && (
        <div style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          zIndex: 10,
          animation: 'slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}>
          {/* Botão Anterior */}
          <button
            onClick={handlePrevious}
            disabled={currentImageIndex === 0}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: currentImageIndex === 0
                ? 'rgba(150, 150, 150, 0.5)'
                : 'rgb(84, 94, 56)',
              border: 'none',
              cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(84, 94, 56, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Frame da imagem tipo Polaroid */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.95) 100%)',
            padding: '20px 20px 80px 20px',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 8px rgb(84, 94, 56)',
            border: '4px solid rgba(0, 0, 0, 0.8)',
            maxWidth: '900px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img
              src={currentImages[currentImageIndex]}
              alt={`${selectedJornal} - Página ${currentImageIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(90vh - 180px)',
                objectFit: 'contain',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            />

            <p style={{
              marginTop: '20px',
              fontSize: '18px',
              fontWeight: '600',
              color: 'rgb(84, 94, 56)',
              textAlign: 'center'
            }}>
              {selectedJornal} - Página {currentImageIndex + 1} de {currentImages.length}
            </p>
          </div>

          {/* Botão Próximo */}
          <button
            onClick={handleNext}
            disabled={currentImageIndex === currentImages.length - 1}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: currentImageIndex === currentImages.length - 1
                ? 'rgba(150, 150, 150, 0.5)'
                : 'rgb(84, 94, 56)',
              border: 'none',
              cursor: currentImageIndex === currentImages.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(84, 94, 56, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800&display=swap');

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-15px) rotate(0.5deg) scale(1.02); }
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
          0%, 100% { transform: scale(1) translateY(0) rotate(0deg); }
          50% { transform: scale(1.3) translateY(-18px) rotate(-5deg); }
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

        button:hover:not(:disabled) {
          transform: scale(1.1);
        }

        button:active:not(:disabled) {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default EmGoiasScreen;
