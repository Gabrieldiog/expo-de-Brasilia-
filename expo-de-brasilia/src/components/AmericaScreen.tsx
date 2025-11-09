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
    
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'rgb(255, 255, 255)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 60px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Jost', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>

      {/* TELA INICIAL - GRID */}
      {!selectedPais && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          zIndex: 10,
          animation: 'fadeIn 1s ease-in-out'
        }}>
          <div style={{
            marginBottom: '60px',
            textAlign: 'center',
            animation: 'fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards'
          }}>
            <h1 style={{
              fontSize: 'clamp(80px, 12vw, 100px)',
              fontWeight: '700',
              color: 'rgb(24, 99, 173)',
              margin: 0,
              letterSpacing: '3px',
              lineHeight: '1',
              textTransform: 'uppercase',
              fontFamily: "'Jost', sans-serif"
            }}>
              AMÉRICAS
            </h1>
            <p style={{
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: '500',
              color: 'rgb(24, 99, 173)',
              margin: '10px 0 0 0',
              letterSpacing: '1px'
            }}>
              Repercussão Internacional
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            maxWidth: 'clamp(600px, 70vw, 900px)',
            width: '100%',
            zIndex: 10,
            animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards'
          }}>
            {paises.map((pais) => (
              <div
                key={pais.nome}
                onClick={() => handlePaisClick(pais.nome)}
                className="touch-card"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'clamp(120px, 20vh, 160px)',
                  background: 'rgb(24, 99, 173)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(24, 99, 173, 0.3)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <span style={{
                  fontSize: 'clamp(14px, 2.5vw, 20px)',
                  fontWeight: '700',
                  color: 'rgb(255, 255, 255)',
                  margin: 0,
                  letterSpacing: '1px',
                  textAlign: 'center',
                  fontFamily: "'Jost', sans-serif"
                }}>
                  {pais.nome}
                </span>
                <img 
                  src="/images/imagem_mao.jpeg" 
                  alt="Toque aqui"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    width: 'clamp(30px, 4vw, 45px)',
                    height: 'clamp(30px, 4vw, 45px)',
                    objectFit: 'contain',
                    opacity: 0.9,
                    animation: 'tapBounce 1.5s ease-in-out infinite'
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '40px',
            textAlign: 'center',
            zIndex: 10,
            animation: 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s backwards'
          }}>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 24px)',
              fontWeight: '400',
              color: 'rgb(24, 99, 173)',
              textAlign: 'center',
              margin: '0 0 10px 0',
              lineHeight: '1.4',
              fontFamily: "'Jost', sans-serif"
            }}>
              Toque em um país para visualizar
            </p>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 24px)',
              fontWeight: '400',
              color: 'rgb(24, 99, 173)',
              textAlign: 'center',
              margin: 0,
              lineHeight: '1.4',
              fontFamily: "'Jost', sans-serif"
            }}>
              a repercussão internacional de Brasília
            </p>
          </div>
        </div>
      )}

      {/* VISUALIZADOR COM PAINEL LATERAL */}
      {selectedPais && fotosAtuais.length > 0 && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          zIndex: 10,
          animation: 'slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            width: '280px',  // AUMENTADO de 200px para 280px
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '20px 15px',  // AUMENTADO o padding
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            animation: 'slideInLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            marginRight: '40px'  // AFASTADO da foto
          }}>
            {/* MENSAGEM DE INSTRUÇÃO */}
            <div style={{
              padding: '18px',  // AUMENTADO de 12px para 18px
              background: 'rgba(195, 84, 40, 0.1)',
              borderRadius: '12px',  // AUMENTADO de 8px para 12px
              marginBottom: '15px',
              border: '3px solid rgb(24, 99, 173)'  // BORDA MAIS GROSSA
            }}>
              <p style={{
                fontSize: '20px',  // AUMENTADO de 12px para 15px
                fontWeight: '600',
                color: 'rgb(24, 99, 173)',
                textAlign: 'center',
                margin: 0,
                lineHeight: '1.4',
                fontFamily: "'Jost', sans-serif"
              }}>
                Clique novamente na revista selecionada para fechar ou escolha outra
              </p>
            </div>

            {/* LISTA DE PAÍSES */}
            {paises.map((pais) => (
              <div
                key={pais.nome}
                onClick={() => handlePaisClick(pais.nome)}
                style={{
                  padding: '22px 10px',
                  background: selectedPais === pais.nome ? 'rgb(24, 99, 173)' : 'rgba(24, 99, 173, 0.1)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: selectedPais === pais.nome ? '3px solid rgb(24, 99, 173)' : '3px solid transparent',
                  transform: selectedPais === pais.nome ? 'scale(1.05)' : 'scale(1)'
                }}
                className="mini-card"
              >
                <span style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: selectedPais === pais.nome ? 'rgb(255, 255, 255)' : 'rgb(24, 99, 173)',
                  textAlign: 'center',
                  display: 'block',
                  fontFamily: "'Jost', sans-serif"
                }}>
                  {pais.nome}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handlePrevious}
            disabled={currentImageIndex === 0}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: currentImageIndex === 0 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(24, 99, 173)',
              border: 'none',
              cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(24, 99, 173, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.95) 100%)',
            padding: '20px 20px 80px 20px',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 8px rgb(24, 99, 173)',
            border: '4px solid rgba(0, 0, 0, 0.8)',
            maxWidth: '900px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img
              src={`/images/Americas/foto${fotoAtual.numeroFoto}.jpg`}
              alt={`${selectedPais} - ${fotoAtual.nomeJornal}`}
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
              color: 'rgb(24, 99, 173)',
              textAlign: 'center',
              lineHeight: '1.4'
            }}>
              {fotoAtual.nomeJornal} - Página {currentImageIndex + 1} de {fotosAtuais.length}
            </p>
          </div>

          <button
            onClick={handleNext}
            disabled={currentImageIndex === fotosAtuais.length - 1}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: currentImageIndex === fotosAtuais.length - 1 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(24, 99, 173)',
              border: 'none',
              cursor: currentImageIndex === fotosAtuais.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(24, 99, 173, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

        .touch-card:active {
          transform: scale(0.95) !important;
        }

        .touch-card:hover {
          transform: scale(1.02);
        }

        .mini-card:hover {
          transform: scale(1.08) !important;
          background: rgb(24, 99, 173) !important;
        }

        .mini-card:hover span {
          color: rgb(255, 255, 255) !important;
        }

        .mini-card:active {
          transform: scale(0.95) !important;
        }

        button:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(24, 99, 173, 0.5) !important;
        }

        button:active:not(:disabled) {
          transform: scale(0.95);
        }

        div::-webkit-scrollbar {
          width: 8px;
        }

        div::-webkit-scrollbar-track {
          background: rgba(24, 99, 173, 0.1);
          borderRadius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: rgb(24, 99, 173);
          borderRadius: 10px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: rgb(66, 152, 207);
        }
      `}</style>
    </div>
  );
};

export default AmericaScreen;
