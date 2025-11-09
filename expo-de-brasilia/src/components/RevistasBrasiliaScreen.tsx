import React, { useState } from 'react';

interface RevistasBrasiliaScreenProps {
  onBack: () => void;
}

interface RevistaConfig {
  id: string;
  inicio: number;
  fim: number;
  totalPaginas: number;
  titulo: string;
}

const RevistasBrasiliaScreen: React.FC<RevistasBrasiliaScreenProps> = ({ onBack }) => {
  const [selectedAno, setSelectedAno] = useState<string | null>(null);
  const [selectedRevista, setSelectedRevista] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const anos = [
    { ano: '1957', cor: 'rgb(195, 84, 40)' },
    { ano: '1958', cor: 'rgb(195, 84, 40)' },
    { ano: '1959', cor: 'rgb(195, 84, 40)' },
    { ano: '1960', cor: 'rgb(195, 84, 40)' }
  ];

  const getRevistasPorAno = (ano: string): RevistaConfig[] => {
    const configs: { [key: string]: RevistaConfig[] } = {
      '1957': [
        { id: 'revista1', inicio: 1, fim: 12, totalPaginas: 12, titulo: 'Revista Brasília #1' },
        { id: 'revista2', inicio: 13, fim: 20, totalPaginas: 8, titulo: 'Revista Brasília #2' },
        { id: 'revista3', inicio: 21, fim: 28, totalPaginas: 8, titulo: 'Revista Brasília #3' },
        { id: 'revista4', inicio: 29, fim: 40, totalPaginas: 12, titulo: 'Revista Brasília #4' }
      ],
      '1958': [
        { id: 'revista1', inicio: 1, fim: 16, totalPaginas: 16, titulo: 'Revista Brasília #1' },
        { id: 'revista2', inicio: 17, fim: 26, totalPaginas: 10, titulo: 'Revista Brasília #2' },
        { id: 'revista3', inicio: 27, fim: 39, totalPaginas: 13, titulo: 'Revista Brasília #3' }
      ],
      '1959': [
        { id: 'revista1', inicio: 1, fim: 7, totalPaginas: 7, titulo: 'Revista Brasília #1' },
        { id: 'revista2', inicio: 8, fim: 18, totalPaginas: 11, titulo: 'Revista Brasília #2' },
        { id: 'revista3', inicio: 19, fim: 20, totalPaginas: 2, titulo: 'Revista Brasília #3' }
      ],
      '1960': [
        { id: 'revista1', inicio: 1, fim: 4, totalPaginas: 4, titulo: 'Revista Brasília #1' },
        { id: 'revista2', inicio: 5, fim: 10, totalPaginas: 6, titulo: 'Revista Brasília #2' },
        { id: 'revista3', inicio: 11, fim: 17, totalPaginas: 7, titulo: 'Revista Brasília #3' },
        { id: 'revista4', inicio: 18, fim: 48, totalPaginas: 31, titulo: 'Revista Brasília #4' },
        { id: 'revista5', inicio: 49, fim: 59, totalPaginas: 11, titulo: 'Revista Brasília #5' },
        { id: 'revista6', inicio: 60, fim: 66, totalPaginas: 7, titulo: 'Revista Brasília #6' }
      ]
    };
    return configs[ano as keyof typeof configs] || [];
  };

  const getImagensAno = (ano: string): string[] => {
    const quantidades: { [key: string]: number } = {
      '1957': 40,
      '1958': 39,
      '1959': 20,
      '1960': 66
    };

    const quantidade = quantidades[ano] || 0;
    return Array.from({ length: quantidade }, (_, i) =>
      `/images/Revista_Basília_ imagens/Revista_Brasília ano_${ano}/foto${i + 1}.jpg`
    );
  };

  const getImagensRevista = (ano: string, inicio: number, fim: number): string[] => {
    const todasImagens = getImagensAno(ano);
    return todasImagens.slice(inicio - 1, fim);
  };

  const handleAnoClick = (ano: string) => {
    if (selectedAno === ano) {
      setSelectedAno(null);
      setSelectedRevista(null);
      setCurrentImageIndex(0);
    } else {
      setSelectedAno(ano);
      setSelectedRevista(null);
      setCurrentImageIndex(0);
    }
  };

  const handleRevistaClick = (revistaId: string) => {
    if (selectedRevista === revistaId) {
      setSelectedRevista(null);
      setCurrentImageIndex(0);
    } else {
      setSelectedRevista(revistaId);
      setCurrentImageIndex(0);
    }
  };

  const handleCloseRevista = () => {
    if (selectedRevista) {
      setSelectedRevista(null);
    } else if (selectedAno) {
      setSelectedAno(null);
    } else {
      onBack();
    }
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    if (imagensAtuais.length > 0 && currentImageIndex < imagensAtuais.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const revistasAnoAtual = selectedAno ? getRevistasPorAno(selectedAno) : [];
  let imagensAtuais: string[] = [];
  let configRevistaAtual: RevistaConfig | null = null;

  if (selectedRevista && selectedAno && revistasAnoAtual.length > 0) {
    configRevistaAtual = revistasAnoAtual.find(r => r.id === selectedRevista) || null;
    if (configRevistaAtual) {
      imagensAtuais = getImagensRevista(selectedAno, configRevistaAtual.inicio, configRevistaAtual.fim);
    }
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#ffffff',
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

      <div
        onClick={handleCloseRevista}
        className="touch-card"
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          background: 'rgb(195, 84, 40)',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(195, 84, 40, 0.4)',
          zIndex: 1000,
          animation: 'fadeIn 1s ease 0.2s backwards'
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>

      {!selectedAno && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          gap: '40px'
        }}>
          <div style={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
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
              REVISTA
            </h1>
            <img
              src="/images/brasilia.png"
              alt="Brasília"
              style={{
                width: '200px',
                height: '190px',
                objectFit: 'contain',
                filter: 'brightness(0) saturate(100%) invert(39%) sepia(44%) saturate(1162%) hue-rotate(347deg) brightness(91%) contrast(87%)'
              }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            maxWidth: '700px',
            width: '100%',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards'
          }}>
            {anos.map((item, index) => (
              <div
                key={item.ano}
                onClick={() => handleAnoClick(item.ano)}
                className="touch-card"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '220px',
                  background: item.cor,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(195, 84, 40, 0.3)',
                  overflow: 'hidden',
                  animation: `fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + index * 0.1}s backwards, cardFloat 4s ease-in-out infinite ${index * 0.2}s`,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <h2 style={{
                  fontSize: '60px',
                  fontWeight: '700',
                  color: 'rgb(255, 255, 255)',
                  margin: 0,
                  letterSpacing: '2px',
                  textAlign: 'center',
                  fontFamily: "'Jost', sans-serif",
                  transition: 'all 0.3s ease'
                }}>
                  {item.ano}
                </h2>
                <img
                  src="/images/imagem_mao.jpeg"
                  alt="Toque aqui"
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    width: '45px',
                    height: '45px',
                    objectFit: 'contain',
                    opacity: 0.9,
                    animation: 'tapBounce 1.5s ease-in-out infinite'
                  }}
                />
              </div>
            ))}
          </div>

          <p style={{
            fontSize: '33px',
            fontWeight: '600',
            color: 'rgba(0, 0, 0, 1)',
            textAlign: 'center',
            marginTop: '20px',
            maxWidth: '100%',
            lineHeight: '1.4'
          }}>
            Clique em um dos anos para visualizar as revistas
          </p>
        </div>
      )}

      {/* TELA DE SELEÇÃO DE REVISTAS - AGORA INCLUI 1960! */}
      {selectedAno && !selectedRevista && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          gap: '50px'
        }}>
          <h3 style={{
            fontSize: '80px',
            fontWeight: '700',
            color: 'rgba(0, 0, 0, 1)',
            margin: 0,
            textAlign: 'center',
            letterSpacing: '2px',
            fontFamily: "'Jost', sans-serif"
          }}>
            REVISTAS DE {selectedAno}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '50px',
            maxWidth: '800px',
            width: '100%',
            justifyContent: 'center'
          }}>
            {revistasAnoAtual.map((revista) => (
              <div
                key={revista.id}
                onClick={() => handleRevistaClick(revista.id)}
                className="touch-card"
                style={{
                  width: '93%',
                  height: '205px',
                  background: 'rgb(195, 84, 40)',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(195, 84, 40, 0.25)',
                  border: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4,1,0.4,1)',
                }}
              >
                <span style={{
                  fontSize: '90px',
                  fontWeight: '800',
                  color: '#fff',
                  textAlign: 'center'
                }}>
                  {revista.titulo.split('#')[1]}
                </span>
                <span style={{
                  marginTop: '12px',
                  fontSize: '22px',
                  color: 'rgba(255,255,255,0.92)',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  {revista.totalPaginas} páginas
                </span>
              </div>
            ))}
          </div>
          <p style={{
            fontSize: '33px',
            fontWeight: '600',
            color: 'rgba(0, 0, 0, 1)',
            textAlign: 'center',
            marginTop: '20px',
            maxWidth: '700px',
            lineHeight: '1.5'
          }}>
            Clique em uma revista para visualizar as páginas
          </p>
        </div>
      )}

      {selectedRevista && (
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
            width: '280px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '20px 15px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            animation: 'slideInLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            marginRight: '40px'
          }}>
            <div style={{
              padding: '18px',
              background: 'rgba(195, 84, 40, 0.1)',
              borderRadius: '12px',
              marginBottom: '15px',
              border: '3px solid rgba(195, 84, 40, 0.3)'
            }}>
              <p style={{
                fontSize: '15px',
                fontWeight: '600',
                color: 'rgb(195, 84, 40)',
                textAlign: 'center',
                margin: 0,
                lineHeight: '1.4',
                fontFamily: "'Jost', sans-serif"
              }}>
                Clique novamente na revista selecionada para fechar ou escolha outra
              </p>
            </div>

            {revistasAnoAtual.map((revista) => (
              <div
                key={revista.id}
                onClick={() => handleRevistaClick(revista.id)}
                className="mini-card"
                style={{
                  padding: '25px 15px',
                  background: selectedRevista === revista.id ? 'rgb(195, 84, 40)' : 'rgba(195, 84, 40, 0.1)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: selectedRevista === revista.id ? '3px solid rgb(195, 84, 40)' : '3px solid transparent',
                  transform: selectedRevista === revista.id ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <span style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: selectedRevista === revista.id ? 'rgb(255, 255, 255)' : 'rgb(195, 84, 40)',
                  textAlign: 'center',
                  display: 'block',
                  fontFamily: "'Jost', sans-serif"
                }}>
                  {revista.titulo.split('#')[1]}
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
              background: currentImageIndex === 0 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(195, 84, 40)',
              border: 'none',
              cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(195, 84, 40, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.95) 100%)',
            padding: '20px 20px 80px 20px',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 8px rgb(195, 84, 40)',
            border: '4px solid rgba(0, 0, 0, 0.8)',
            maxWidth: '900px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img
              src={imagensAtuais[currentImageIndex]}
              alt={`Revista Brasília ${selectedAno} ${configRevistaAtual?.titulo || ''} - Página ${currentImageIndex + 1}`}
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
              color: 'rgb(195, 84, 40)',
              textAlign: 'center',
              lineHeight: '1.4',
              fontFamily: "'Jost', sans-serif"
            }}>
              {configRevistaAtual
                ? `${configRevistaAtual.titulo} - Ano ${selectedAno} - Página ${currentImageIndex + 1} de ${imagensAtuais.length}`
                : `Revista Brasília - Ano ${selectedAno} - Página ${currentImageIndex + 1} de ${imagensAtuais.length}`
              }
            </p>
          </div>

          <button
            onClick={handleNext}
            disabled={currentImageIndex === imagensAtuais.length - 1}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: currentImageIndex === imagensAtuais.length - 1 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(195, 84, 40)',
              border: 'none',
              cursor: currentImageIndex === imagensAtuais.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(195, 84, 40, 0.3)',
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
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
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

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px); }
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

        .mini-card:hover {
          transform: scale(1.08) !important;
          background: rgb(195, 84, 40) !important;
        }

        .mini-card:hover span {
          color: rgb(255, 255, 255) !important;
        }

        .mini-card:active {
          transform: scale(0.95) !important;
        }

        button:hover:not(:disabled) {
          transform: scale(1.1);
        }

        button:active:not(:disabled) {
          transform: scale(0.95);
        }

        div::-webkit-scrollbar {
          width: 8px;
        }

        div::-webkit-scrollbar-track {
          background: rgba(195, 84, 40, 0.1);
          borderRadius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: rgb(195, 84, 40);
          borderRadius: 10px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: rgb(215, 104, 60);
        }
      `}</style>
    </div>
  );
};

export default RevistasBrasiliaScreen;
