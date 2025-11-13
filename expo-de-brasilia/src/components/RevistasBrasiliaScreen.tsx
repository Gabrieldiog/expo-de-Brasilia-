import React, { useState } from 'react';

interface RevistasBrasiliaScreenProps {
  onBack: () => void;
  onMainMenu?: () => void;
}

interface RevistaConfig {
  id: string;
  inicio: number;
  fim: number;
  totalPaginas: number;
  titulo: string;
}

const RevistasBrasiliaScreen: React.FC<RevistasBrasiliaScreenProps> = ({ onBack, onMainMenu }) => {
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
        { id: 'revista6', inicio: 60, fim: 65, totalPaginas: 5, titulo: 'Revista Brasília #6' }
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
    <div className="revistas-container">
      {/* Formas de apoio - Superior Direito */}
      <div className="forma-apoio-superior">
        <img
          src="/images/formas_apoio_laranja.png"
          alt=""
          className="forma-apoio-img-laranja"
        />
      </div>

      {/* Formas de apoio - Inferior Esquerdo */}
      <div className="forma-apoio-inferior">
        <img
          src="/images/formas_apoio_laranja.png"
          alt=""
          className="forma-apoio-img-laranja"
        />
      </div>

      {/* Botão Voltar */}
      <div
        onClick={handleCloseRevista}
        className="touch-card botao-voltar-revista"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>

      {/* Botão Menu Principal (Home) */}
      <div
        onClick={onMainMenu || onBack}
        className="touch-card botao-home-revista"
        title="Voltar ao Menu Principal"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>

      {/* Tela inicial - Seleção de Anos */}
      {!selectedAno && (
        <div className="tela-anos">
          <div className="titulo-revista-container">
            <h1 className="titulo-revista">REVISTA</h1>
            <img
              src="/images/brasilia.png"
              alt="Brasília"
              className="logo-brasilia"
            />
          </div>

          <div className="grid-anos">
            {anos.map((item, index) => (
              <div
                key={item.ano}
                onClick={() => handleAnoClick(item.ano)}
                className="touch-card card-ano"
                style={{
                  background: item.cor,
                  animation: `fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + index * 0.1}s backwards, cardFloat 4s ease-in-out infinite ${index * 0.2}s`
                }}
              >
                <h2 className="ano-texto">{item.ano}</h2>
                <img
                  src="/images/imagem_mao.jpeg"
                  alt="Toque aqui"
                  className="icone-toque-ano"
                />
              </div>
            ))}
          </div>

          <p className="texto-instrucao-anos">
            Clique em um dos anos para visualizar as revistas
          </p>
        </div>
      )}

      {/* Tela de seleção de Revistas */}
      {selectedAno && !selectedRevista && (
        <div className="tela-revistas">
          <h3 className="titulo-ano-selecionado">
            REVISTAS DE {selectedAno}
          </h3>
          <div className="grid-revistas">
            {revistasAnoAtual.map((revista) => (
              <div
                key={revista.id}
                onClick={() => handleRevistaClick(revista.id)}
                className="touch-card card-revista"
              >
                <span className="revista-numero">
                  {revista.titulo.split('#')[1]}
                </span>
                <span className="revista-paginas">
                  {revista.totalPaginas} páginas
                </span>
              </div>
            ))}
          </div>
          <p className="texto-instrucao-revistas">
            Clique em uma revista para visualizar as páginas
          </p>
        </div>
      )}

      {/* Visualizador de Revista */}
      {selectedRevista && (
        <div className="visualizador-revista">
          {/* Sidebar com mini-cards */}
          <div className="sidebar-revistas">
            <div className="aviso-sidebar">
              <p className="aviso-texto">
                Clique novamente na revista selecionada para fechar ou escolha outra
              </p>
            </div>

            {revistasAnoAtual.map((revista) => (
              <div
                key={revista.id}
                onClick={() => handleRevistaClick(revista.id)}
                className="mini-card"
                style={{
                  background: selectedRevista === revista.id ? 'rgb(195, 84, 40)' : 'rgba(195, 84, 40, 0.1)',
                  border: selectedRevista === revista.id ? '3px solid rgb(195, 84, 40)' : '3px solid transparent',
                  transform: selectedRevista === revista.id ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <span className="mini-card-numero" style={{
                  color: selectedRevista === revista.id ? 'rgb(255, 255, 255)' : 'rgb(195, 84, 40)'
                }}>
                  {revista.titulo.split('#')[1]}
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
              background: currentImageIndex === 0 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(195, 84, 40)',
              cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Frame Polaroid */}
          <div className="polaroid-frame-revista">
            <img
              src={imagensAtuais[currentImageIndex]}
              alt={`Revista Brasília ${selectedAno} ${configRevistaAtual?.titulo || ''} - Página ${currentImageIndex + 1}`}
              className="revista-imagem"
            />
            <p className="revista-legenda">
              {configRevistaAtual
                ? `${configRevistaAtual.titulo} - Ano ${selectedAno} - Página ${currentImageIndex + 1} de ${imagensAtuais.length}`
                : `Revista Brasília - Ano ${selectedAno} - Página ${currentImageIndex + 1} de ${imagensAtuais.length}`
              }
            </p>
          </div>

          {/* Botão Próximo */}
          <button
            onClick={handleNext}
            disabled={currentImageIndex === imagensAtuais.length - 1}
            className="nav-button nav-button-next"
            style={{
              background: currentImageIndex === imagensAtuais.length - 1 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(195, 84, 40)',
              cursor: currentImageIndex === imagensAtuais.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

        /* Container Principal */
        .revistas-container {
          width: 100vw;
          height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: clamp(20px, 3vw, 60px) clamp(30px, 4vw, 60px);
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;
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

        /* Botão Voltar */
        .botao-voltar-revista {
          position: absolute;
          top: clamp(20px, 2.5vw, 40px);
          left: clamp(20px, 2.5vw, 40px);
          background: rgb(195, 84, 40);
          border-radius: 50%;
          width: clamp(60px, 5vw, 80px);
          height: clamp(60px, 5vw, 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(195, 84, 40, 0.4);
          z-index: 1000;
          animation: fadeIn 1s ease 0.2s backwards;
        }

        .botao-voltar-revista svg {
          width: clamp(30px, 2.5vw, 40px);
          height: clamp(30px, 2.5vw, 40px);
        }

        /* Botão Home (Menu Principal) */
        .botao-home-revista {
          position: absolute;
          top: clamp(20px, 2.5vw, 40px);
          left: clamp(100px, 9vw, 140px);
          background: rgb(195, 84, 40);
          border-radius: 50%;
          width: clamp(60px, 5vw, 80px);
          height: clamp(60px, 5vw, 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(195, 84, 40, 0.4);
          z-index: 1000;
          animation: fadeIn 1s ease 0.3s backwards;
        }

        .botao-home-revista svg {
          width: clamp(30px, 2.5vw, 40px);
          height: clamp(30px, 2.5vw, 40px);
        }

        /* Tela de Anos */
        .tela-anos {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          gap: clamp(30px, 3vh, 40px);
        }

        .titulo-revista-container {
          margin-bottom: clamp(15px, 1.5vw, 20px);
          display: flex;
          align-items: center;
          gap: clamp(20px, 2vw, 30px);
          animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
        }

        .titulo-revista {
          font-size: clamp(60px, 6vw, 100px);
          font-weight: 700;
          color: rgb(0, 0, 0);
          margin: 0;
          letter-spacing: clamp(2px, 0.2vw, 3px);
          line-height: 1;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        .logo-brasilia {
          width: clamp(120px, 12vw, 200px);
          height: clamp(115px, 11vw, 190px);
          object-fit: contain;
          filter: brightness(0) saturate(100%) invert(39%) sepia(44%) saturate(1162%) hue-rotate(347deg) brightness(91%) contrast(87%);
        }

        .grid-anos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(25px, 2.5vw, 40px);
          max-width: clamp(500px, 45vw, 700px);
          width: 100%;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
        }

        .card-ano {
          position: relative;
          width: 100%;
          height: clamp(160px, 14vw, 220px);
          border-radius: clamp(8px, 0.8vw, 12px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(195, 84, 40, 0.3);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .ano-texto {
          font-size: clamp(40px, 3.8vw, 60px);
          font-weight: 700;
          color: rgb(255, 255, 255);
          margin: 0;
          letter-spacing: clamp(1px, 0.15vw, 2px);
          text-align: center;
          font-family: 'Jost', sans-serif;
          transition: all 0.3s ease;
        }

        .icone-toque-ano {
          position: absolute;
          bottom: clamp(8px, 0.8vw, 12px);
          right: clamp(8px, 0.8vw, 12px);
          width: clamp(35px, 3vw, 45px);
          height: clamp(35px, 3vw, 45px);
          object-fit: contain;
          opacity: 0.9;
          animation: tapBounce 1.5s ease-in-out infinite;
        }

        .texto-instrucao-anos {
          font-size: clamp(22px, 2vw, 33px);
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          text-align: center;
          margin-top: clamp(15px, 1.5vw, 20px);
          max-width: 100%;
          line-height: 1.4;
        }

        /* Tela de Revistas */
        .tela-revistas {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          gap: clamp(35px, 3.5vh, 50px);
        }

        .titulo-ano-selecionado {
          font-size: clamp(50px, 5vw, 80px);
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
          margin: 0;
          text-align: center;
          letter-spacing: clamp(1px, 0.15vw, 2px);
          font-family: 'Jost', sans-serif;
        }

        .grid-revistas {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(30px, 3vw, 50px);
          max-width: clamp(600px, 50vw, 800px);
          width: 100%;
          justify-content: center;
        }

        .card-revista {
          width: 93%;
          height: clamp(160px, 15vw, 205px);
          background: rgb(195, 84, 40);
          border-radius: clamp(12px, 1.3vw, 20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(195, 84, 40, 0.25);
          border: none;
          transition: all 0.3s cubic-bezier(0.4,1,0.4,1);
        }

        .revista-numero {
          font-size: clamp(60px, 5.5vw, 90px);
          font-weight: 800;
          color: #fff;
          text-align: center;
        }

        .revista-paginas {
          margin-top: clamp(8px, 0.8vw, 12px);
          font-size: clamp(16px, 1.4vw, 22px);
          color: rgba(255,255,255,0.92);
          font-weight: 600;
          text-align: center;
        }

        .texto-instrucao-revistas {
          font-size: clamp(22px, 2vw, 33px);
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          text-align: center;
          margin-top: clamp(15px, 1.5vw, 20px);
          max-width: clamp(500px, 50vw, 700px);
          line-height: 1.5;
        }

        /* Visualizador de Revista */
        .visualizador-revista {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(15px, 1.5vw, 20px);
          z-index: 10;
          animation: slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .sidebar-revistas {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 1.4vw, 18px);
          width: clamp(200px, 17vw, 280px);
          max-height: 90vh;
          overflow-y: auto;
          padding: clamp(15px, 1.5vw, 20px) clamp(12px, 1.2vw, 15px);
          background: rgba(255, 255, 255, 0.95);
          border-radius: clamp(12px, 1.2vw, 16px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          animation: slideInLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          margin-right: clamp(25px, 2.5vw, 40px);
        }

        .aviso-sidebar {
          padding: clamp(14px, 1.4vw, 18px);
          background: rgba(195, 84, 40, 0.1);
          border-radius: clamp(8px, 0.8vw, 12px);
          margin-bottom: clamp(12px, 1.2vw, 15px);
          border: clamp(2px, 0.25vw, 3px) solid rgba(195, 84, 40, 0.3);
        }

        .aviso-texto {
          font-size: clamp(12px, 1vw, 15px);
          font-weight: 600;
          color: rgb(195, 84, 40);
          text-align: center;
          margin: 0;
          line-height: 1.4;
          font-family: 'Jost', sans-serif;
        }

        .mini-card {
          padding: clamp(18px, 1.8vw, 25px) clamp(12px, 1.2vw, 15px);
          border-radius: clamp(8px, 0.8vw, 12px);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mini-card-numero {
          font-size: clamp(18px, 1.5vw, 24px);
          font-weight: 700;
          text-align: center;
          display: block;
          font-family: 'Jost', sans-serif;
        }

        .nav-button {
          width: clamp(50px, 4vw, 70px);
          height: clamp(50px, 4vw, 70px);
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(195, 84, 40, 0.3);
          transition: all 0.3s ease;
        }

        .nav-icon {
          width: clamp(25px, 2.2vw, 35px);
          height: clamp(25px, 2.2vw, 35px);
        }

        .polaroid-frame-revista {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.95) 100%);
          padding: clamp(15px, 1.5vw, 20px) clamp(15px, 1.5vw, 20px) clamp(60px, 5vw, 80px) clamp(15px, 1.5vw, 20px);
          border-radius: clamp(8px, 0.8vw, 12px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 clamp(4px, 0.5vw, 8px) rgb(195, 84, 40);
          border: clamp(2px, 0.3vw, 4px) solid rgba(0, 0, 0, 0.8);
          max-width: min(85vw, 900px);
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .revista-imagem {
          max-width: 100%;
          max-height: calc(90vh - clamp(120px, 12vh, 180px));
          object-fit: contain;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .revista-legenda {
          margin-top: clamp(15px, 1.5vw, 20px);
          font-size: clamp(14px, 1.3vw, 20px);
          font-weight: 600;
          color: rgb(195, 84, 40);
          text-align: center;
          line-height: 1.4;
          font-family: 'Jost', sans-serif;
        }

        /* Animações */
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

        /* Interações */
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

        .mini-card:hover .mini-card-numero {
          color: rgb(255, 255, 255) !important;
        }

        .mini-card:active {
          transform: scale(0.95) !important;
        }

        .nav-button:hover:not(:disabled) {
          transform: scale(1.1);
        }

        .nav-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        /* Scrollbar */
        div::-webkit-scrollbar {
          width: clamp(6px, 0.5vw, 8px);
        }

        div::-webkit-scrollbar-track {
          background: rgba(195, 84, 40, 0.1);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: rgb(195, 84, 40);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: rgb(215, 104, 60);
        }

        /* Media Queries para telas grandes (32 polegadas e maiores) */
        @media (min-width: 2560px) {
          .revistas-container {
            padding: 80px;
          }

          .titulo-revista {
            font-size: 120px;
            letter-spacing: 4px;
          }

          .logo-brasilia {
            width: 240px;
            height: 230px;
          }

          .grid-anos {
            max-width: 850px;
            gap: 50px;
          }

          .card-ano {
            height: 260px;
          }

          .ano-texto {
            font-size: 72px;
          }

          .icone-toque-ano {
            width: 55px;
            height: 55px;
          }

          .texto-instrucao-anos {
            font-size: 38px;
          }

          .titulo-ano-selecionado {
            font-size: 96px;
          }

          .grid-revistas {
            max-width: 1000px;
            gap: 60px;
          }

          .card-revista {
            height: 240px;
          }

          .revista-numero {
            font-size: 100px;
          }

          .revista-paginas {
            font-size: 26px;
          }

          .texto-instrucao-revistas {
            font-size: 38px;
            max-width: 850px;
          }

          .sidebar-revistas {
            width: 320px;
            padding: 25px 18px;
            gap: 22px;
          }

          .aviso-sidebar {
            padding: 22px;
          }

          .aviso-texto {
            font-size: 17px;
          }

          .mini-card {
            padding: 30px 18px;
          }

          .mini-card-numero {
            font-size: 28px;
          }

          .polaroid-frame-revista {
            max-width: 1100px;
          }

          .revista-legenda {
            font-size: 24px;
          }
        }

        /* Media Queries para tablets */
        @media (max-width: 1024px) {
          .titulo-revista {
            font-size: 70px;
          }

          .logo-brasilia {
            width: 140px;
            height: 135px;
          }

          .grid-anos {
            max-width: 550px;
          }

          .titulo-ano-selecionado {
            font-size: 60px;
          }

          .grid-revistas {
            max-width: 650px;
          }

          .botao-home-revista {
            left: clamp(90px, 8vw, 120px);
          }
        }

        /* Media Queries para mobile */
        @media (max-width: 768px) {
          .revistas-container {
            flex-direction: column;
            padding: 20px;
          }

          .titulo-revista-container {
            flex-direction: column;
            gap: 10px;
          }

          .titulo-revista {
            font-size: 50px;
          }

          .logo-brasilia {
            width: 100px;
            height: 95px;
          }

          .grid-anos {
            grid-template-columns: 1fr;
            max-width: 100%;
          }

          .card-ano {
            height: 140px;
          }

          .titulo-ano-selecionado {
            font-size: 42px;
          }

          .grid-revistas {
            grid-template-columns: 1fr;
            max-width: 100%;
          }

          .visualizador-revista {
            flex-direction: column;
          }

          .sidebar-revistas {
            width: 100%;
            max-height: 200px;
            margin-right: 0;
            margin-bottom: 15px;
          }

          .botao-home-revista {
            top: clamp(90px, 8vh, 110px);
            left: clamp(20px, 2.5vw, 40px);
          }
        }
      `}</style>
    </div>
  );
};

export default RevistasBrasiliaScreen;