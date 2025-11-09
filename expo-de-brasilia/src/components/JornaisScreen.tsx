import React, { useState } from 'react';
import EmGoiasScreen from './EmGoiasScreen';

interface OutrosEstadosScreenProps {
  onBack: () => void;
}

interface Jornal {
  path: string;
  nome: string;
}

const OutrosEstadosScreen: React.FC<OutrosEstadosScreenProps> = ({ onBack }) => {
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

  // Jornais de cada estado (RJ tem array, outros têm apenas 1)
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
    return <EmGoiasScreen onBack={handleBackFromEmGoias} />;
  }

  const jornaisDoEstado = selectedEstado ? jornaisEstados[selectedEstado] : null;
  const jornalAtual = jornaisDoEstado ? jornaisDoEstado[currentImageIndex] : null;
  const temMultiplosJornais = jornaisDoEstado && jornaisDoEstado.length > 1;

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'rgb(255, 255, 255)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 60px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Jost', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>

      {/* Formas de apoio - CANTO SUPERIOR DIREITO */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
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
        onClick={selectedEstado ? handleCloseJornal : onBack}
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
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </div>

      {/* SE ESTADO SELECIONADO, MOSTRA A(S) FOTO(S) */}
      {selectedEstado && jornalAtual ? (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          zIndex: 10,
          animation: 'slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}>
          {/* Botão Anterior (só aparece se tiver múltiplos jornais) */}
          {temMultiplosJornais && (
            <button
              onClick={handlePrevious}
              disabled={currentImageIndex === 0}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: currentImageIndex === 0 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(84, 94, 56)',
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
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          )}

          {/* Frame Polaroid */}
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
              src={jornalAtual.path}
              alt={jornalAtual.nome}
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
              color: 'rgb(84, 94, 56)',
              textAlign: 'center',
              lineHeight: '1.4'
            }}>
              {jornalAtual.nome}
              {temMultiplosJornais && ` - ${currentImageIndex + 1} de ${jornaisDoEstado.length}`}
            </p>
          </div>

          {/* Botão Próximo (só aparece se tiver múltiplos jornais) */}
          {temMultiplosJornais && (
            <button
              onClick={handleNext}
              disabled={currentImageIndex === jornaisDoEstado.length - 1}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: currentImageIndex === jornaisDoEstado.length - 1 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(84, 94, 56)',
                border: 'none',
                cursor: currentImageIndex === jornaisDoEstado.length - 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(84, 94, 56, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          )}
        </div>
      ) : (
        /* GRID DE ESTADOS */
        <>
          <div style={{
            position: 'absolute',
            top: '150px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            zIndex: 100,
            animation: 'fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards'
          }}>
            <h1 style={{
              fontSize: '100px',
              fontWeight: '700',
              color: 'rgb(0, 0, 0)',
              margin: 0,
              letterSpacing: '3px',
              lineHeight: '1',
              textTransform: 'uppercase',
              fontFamily: "'Jost', sans-serif"
            }}>
              JORNAIS
            </h1>
            <img 
              src="/images/mapa_brasil.png" 
              alt="Brasil"
              style={{
                width: '120px',
                height: '150px',
                objectFit: 'contain',
                filter: 'brightness(0) saturate(100%) invert(35%) sepia(15%) saturate(800%) hue-rotate(39deg) brightness(95%) contrast(88%)'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            maxWidth: '1400px',
            width: '100%',
            zIndex: 10,
            animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards'
          }}>
            {estados.map((estado, index) => (
              <div
                key={estado.nome}
                onClick={() => handleEstadoClick(estado.sigla)}
                className="touch-card"
                style={{
                  position: 'relative',
                  width: '240px',
                  height: '270px',
                  background: 'rgb(84, 94, 56)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(84, 94, 56, 0.3)',
                  overflow: 'hidden',
                  animation: `fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + index * 0.1}s backwards, cardFloat 4s ease-in-out infinite ${index * 0.2}s`
                }}
              >
                <img 
                  src={estado.imagem} 
                  alt={estado.sigla}
                  style={{
                    width: estado.nome === 'RJ' ? '78%' : '60%',
                    height: estado.nome === 'RJ' ? '78%' : '80%',
                    objectFit: 'contain',
                    marginBottom: '10px',
                    filter: estado.nome === 'DF' ? 'none' : 'brightness(0) invert(1)'
                  }}
                />
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: 'rgb(255, 255, 255)',
                  margin: 0,
                  letterSpacing: '1px',
                  textAlign: 'center',
                  fontFamily: "'Jost', sans-serif"
                }}>
                  {estado.nome}
                </h2>
                <img 
                  src="/images/imagem_mao.jpeg" 
                  alt="Toque aqui"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    width: '50px',
                    height: '50px',
                    objectFit: 'contain',
                    opacity: 0.9,
                    animation: 'tapBounce 1.5s ease-in-out infinite'
                  }}
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

        .touch-card:active {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease;
        }

        .touch-card:hover {
          transform: scale(1.05);
          transition: all 0.3s ease;
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

export default OutrosEstadosScreen;
