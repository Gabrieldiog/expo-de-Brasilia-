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
    <div className="emgoias-container">
      {/* Formas de apoio - CANTO SUPERIOR DIREITO */}
      <div className="forma-apoio-superior">
        <img
          src="/images/formas_apoio_verde.png"
          alt=""
          className="forma-apoio-img"
        />
      </div>

      {/* Formas de apoio - CANTO INFERIOR ESQUERDO */}
      <div className="forma-apoio-inferior">
        <img
          src="/images/formas_apoio_verde.png"
          alt=""
          className="forma-apoio-img"
        />
      </div>

      {/* Botão Voltar */}
      <div
        onClick={onBack}
        className="touch-card botao-voltar"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>

      {/* COLUNA ESQUERDA - Cards dos Jornais */}
      <div className={`coluna-jornais ${selectedJornal ? 'jornal-selecionado' : ''}`}>
        {/* Título - só aparece quando não tem jornal selecionado */}
        {!selectedJornal && (
          <div className="titulo-emgoias">
            <h1 className="titulo-principal-emgoias">Em Goiás</h1>
            <p className="subtitulo-emgoias">
              O nascimento da capital na Imprensa
            </p>
          </div>
        )}

        {/* Cards dos jornais - CENTRALIZADOS */}
        <div className={`cards-jornais ${selectedJornal ? 'modo-compacto' : ''}`}>
          {/* Card Jornal de Goiás */}
          <div
            onClick={() => handleJornalClick('Jornal de Goiás')}
            className={`touch-card jornal-card ${selectedJornal === 'Jornal de Goiás' ? 'card-ativo' : ''}`}
            style={{
              animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s backwards, cardFloat 4s ease-in-out infinite'
            }}
          >
            <h2 className={`jornal-titulo ${selectedJornal ? 'titulo-compacto' : ''}`}>
              Jornal de<br />Goiás
            </h2>
            {!selectedJornal && (
              <img
                src="/images/imagem_mao.jpeg"
                alt="Toque aqui"
                className="icone-toque-jornal"
              />
            )}
          </div>

          {/* Card Jornal Óio */}
          <div
            onClick={() => handleJornalClick('Jornal Óio')}
            className={`touch-card jornal-card ${selectedJornal === 'Jornal Óio' ? 'card-ativo' : ''}`}
            style={{
              animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.1s backwards, cardFloat 4s ease-in-out infinite 0.5s'
            }}
          >
            <h2 className={`jornal-titulo jornal-titulo-oio ${selectedJornal ? 'titulo-compacto' : ''}`}>
              Jornal Óio
            </h2>
            {!selectedJornal && (
              <img
                src="/images/imagem_mao.jpeg"
                alt="Toque aqui"
                className="icone-toque-jornal"
                style={{ animation: 'tapBounce 1.5s ease-in-out infinite 0.3s' }}
              />
            )}
          </div>

          {/* Card Cidade de Goias */}
          <div
            onClick={() => handleJornalClick('Cidade de Goias')}
            className={`touch-card jornal-card ${selectedJornal === 'Cidade de Goias' ? 'card-ativo' : ''}`}
            style={{
              animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.3s backwards, cardFloat 4s ease-in-out infinite 1s'
            }}
          >
            <h2 className={`jornal-titulo ${selectedJornal ? 'titulo-compacto' : ''}`}>
              Cidade de<br />Goias
            </h2>
            {!selectedJornal && (
              <img
                src="/images/imagem_mao.jpeg"
                alt="Toque aqui"
                className="icone-toque-jornal"
                style={{ animation: 'tapBounce 1.5s ease-in-out infinite 0.6s' }}
              />
            )}
          </div>
        </div>

        {/* Aviso dinâmico - ABAIXO DOS CARDS */}
        <p className="texto-aviso">
          {selectedJornal
            ? 'Clique novamente no jornal selecionado para fechar ou escolha outro'
            : 'Clique em um dos jornais abaixo para visualizar as páginas'}
        </p>
      </div>

      {/* COLUNA DIREITA - Visualizador de Imagem */}
      {selectedJornal && currentImages.length > 0 && (
        <div className="visualizador-imagem">
          {/* Botão Anterior */}
          <button
            onClick={handlePrevious}
            disabled={currentImageIndex === 0}
            className="nav-button nav-button-prev"
            style={{
              background: currentImageIndex === 0 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(84, 94, 56)',
              cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Frame da imagem tipo Polaroid */}
          <div className="polaroid-frame">
            <img
              src={currentImages[currentImageIndex]}
              alt={`${selectedJornal} - Página ${currentImageIndex + 1}`}
              className="jornal-imagem"
            />
            <p className="imagem-legenda">
              {selectedJornal} - Página {currentImageIndex + 1} de {currentImages.length}
            </p>
          </div>

          {/* Botão Próximo */}
          <button
            onClick={handleNext}
            disabled={currentImageIndex === currentImages.length - 1}
            className="nav-button nav-button-next"
            style={{
              background: currentImageIndex === currentImages.length - 1 ? 'rgba(150, 150, 150, 0.5)' : 'rgb(84, 94, 56)',
              cursor: currentImageIndex === currentImages.length - 1 ? 'not-allowed' : 'pointer',
            }}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

        /* Container Principal */
        .emgoias-container {
          width: 100vw;
          height: 100vh;
          background: rgb(255, 255, 255);
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

        .forma-apoio-img {
          width: clamp(200px, 20vw, 380px);
          height: clamp(100px, 10vw, 200px);
          object-fit: contain;
        }

        .forma-apoio-superior .forma-apoio-img {
          position: relative;
          top: clamp(-40px, -4vw, -76px);
          left: clamp(40px, 4vw, 80px);
        }

        .forma-apoio-inferior .forma-apoio-img {
          position: relative;
          top: clamp(40px, 4vw, 76px);
          left: clamp(-40px, -4vw, -80px);
        }

        /* Botão Voltar */
        .botao-voltar {
          position: absolute;
          top: clamp(20px, 2.5vw, 40px);
          left: clamp(20px, 2.5vw, 40px);
          background: rgb(84, 94, 56);
          border-radius: 50%;
          width: clamp(60px, 5vw, 80px);
          height: clamp(60px, 5vw, 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(84, 94, 56, 0.4);
          z-index: 1000;
          animation: fadeIn 1s ease 0.2s backwards;
        }

        .botao-voltar svg {
          width: clamp(30px, 2.5vw, 40px);
          height: clamp(30px, 2.5vw, 40px);
        }

        /* Coluna dos Jornais */
        .coluna-jornais {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          gap: clamp(20px, 2.5vw, 40px);
          transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .coluna-jornais:not(.jornal-selecionado) {
          width: 100%;
          padding-top: 0;
        }

        .coluna-jornais.jornal-selecionado {
          width: clamp(280px, 22vw, 380px);
          padding-top: clamp(80px, 8vh, 120px);
          gap: clamp(15px, 1.5vw, 20px);
        }

        /* Título Em Goiás */
        .titulo-emgoias {
          margin-bottom: clamp(15px, 1.5vw, 20px);
          text-align: center;
          animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
        }

        .titulo-principal-emgoias {
          font-size: clamp(48px, 4.5vw, 72px);
          font-weight: 700;
          color: rgb(0, 0, 0);
          margin: 0 0 clamp(5px, 0.5vw, 8px) 0;
          letter-spacing: clamp(1.5px, 0.2vw, 3px);
          line-height: 1;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        .subtitulo-emgoias {
          font-size: clamp(16px, 1.4vw, 22px);
          font-weight: 500;
          color: rgb(84, 94, 56);
          margin: 0;
          letter-spacing: clamp(0.5px, 0.08vw, 1px);
        }

        /* Cards dos Jornais */
        .cards-jornais {
          display: flex;
          width: 100%;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cards-jornais:not(.modo-compacto) {
          flex-direction: row;
          gap: clamp(20px, 2.5vw, 40px);
          max-width: min(90vw, 1200px);
        }

        .cards-jornais.modo-compacto {
          flex-direction: column;
          gap: clamp(15px, 1.5vw, 20px);
          max-width: clamp(240px, 18vw, 320px);
        }

        .jornal-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: clamp(16px, 1.8vw, 28px);
          box-shadow: 0 20px 60px rgba(84, 94, 56, 0.35);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: linear-gradient(135deg, rgb(84, 94, 56) 0%, rgb(100, 110, 72) 100%);
          border: none;
        }

        .cards-jornais:not(.modo-compacto) .jornal-card {
          height: clamp(220px, 18vw, 300px);
          flex: 1;
          min-width: clamp(200px, 15vw, 280px);
        }

        .cards-jornais.modo-compacto .jornal-card {
          height: clamp(120px, 11vw, 150px);
          width: 100%;
        }

        .jornal-card.card-ativo {
          background: rgb(84, 94, 56);
          box-shadow: 0 25px 70px rgba(84, 94, 56, 0.6), 0 10px 30px rgba(84, 94, 56, 0.5);
          transform: scale(1.08);
          border: clamp(2px, 0.3vw, 4px) solid rgba(255, 255, 255, 0.3);
        }

        .jornal-titulo {
          font-weight: 700;
          color: rgb(255, 255, 255);
          margin: 0;
          letter-spacing: clamp(0.5px, 0.08vw, 1px);
          text-align: center;
          line-height: 1.2;
          transition: all 0.3s ease;
        }

        .cards-jornais:not(.modo-compacto) .jornal-titulo {
          font-size: clamp(28px, 2.5vw, 40px);
        }

        .cards-jornais.modo-compacto .jornal-titulo {
          font-size: clamp(20px, 1.8vw, 28px);
        }

        .jornal-titulo-oio {
          line-height: 1 !important;
        }

        .cards-jornais:not(.modo-compacto) .jornal-titulo-oio {
          font-size: clamp(32px, 3vw, 48px) !important;
        }

        .cards-jornais.modo-compacto .jornal-titulo-oio {
          font-size: clamp(24px, 2vw, 32px) !important;
        }

        .icone-toque-jornal {
          position: absolute;
          bottom: clamp(12px, 1.2vw, 20px);
          right: clamp(12px, 1.2vw, 20px);
          width: clamp(45px, 4vw, 65px);
          height: clamp(45px, 4vw, 65px);
          object-fit: contain;
          opacity: 0.95;
          animation: tapBounce 1.5s ease-in-out infinite;
        }

        /* Texto Aviso */
        .texto-aviso {
          font-weight: 600;
          color: rgb(84, 94, 56);
          text-align: center;
          margin-top: clamp(20px, 2vw, 30px);
          animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards;
          transition: all 0.3s ease;
          line-height: 1.4;
        }

        .coluna-jornais:not(.jornal-selecionado) .texto-aviso {
          font-size: clamp(16px, 1.3vw, 20px);
          max-width: min(80vw, 800px);
        }

        .coluna-jornais.jornal-selecionado .texto-aviso {
          font-size: clamp(14px, 1.1vw, 18px);
          max-width: clamp(240px, 18vw, 320px);
        }

        /* Visualizador de Imagem */
        .visualizador-imagem {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(15px, 2vw, 30px);
          z-index: 10;
          animation: slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .nav-button {
          width: clamp(50px, 4vw, 70px);
          height: clamp(50px, 4vw, 70px);
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(84, 94, 56, 0.3);
          transition: all 0.3s ease;
        }

        .nav-icon {
          width: clamp(25px, 2.2vw, 35px);
          height: clamp(25px, 2.2vw, 35px);
        }

        .polaroid-frame {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.95) 100%);
          padding: clamp(15px, 1.5vw, 20px) clamp(15px, 1.5vw, 20px) clamp(60px, 5vw, 80px) clamp(15px, 1.5vw, 20px);
          border-radius: clamp(8px, 0.8vw, 12px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 clamp(4px, 0.5vw, 8px) rgb(84, 94, 56);
          border: clamp(2px, 0.3vw, 4px) solid rgba(0, 0, 0, 0.8);
          max-width: min(85vw, 900px);
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .jornal-imagem {
          max-width: 100%;
          max-height: calc(90vh - clamp(120px, 12vh, 180px));
          object-fit: contain;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .imagem-legenda {
          margin-top: clamp(15px, 1.5vw, 20px);
          font-size: clamp(14px, 1.1vw, 18px);
          font-weight: 600;
          color: rgb(84, 94, 56);
          text-align: center;
        }

        /* Animações */
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
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Interações */
        .touch-card:active {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease;
        }

        .touch-card:hover {
          transform: scale(1.02);
        }

        .nav-button:hover:not(:disabled) {
          transform: scale(1.1);
        }

        .nav-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        /* Media Queries para telas grandes (32 polegadas e maiores) */
        @media (min-width: 2560px) {
          .emgoias-container {
            padding: 80px;
          }

          .titulo-principal-emgoias {
            font-size: 90px;
            letter-spacing: 4px;
          }

          .subtitulo-emgoias {
            font-size: 26px;
          }

          .coluna-jornais.jornal-selecionado {
            width: 420px;
            padding-top: 140px;
            gap: 25px;
          }

          .cards-jornais:not(.modo-compacto) {
            max-width: 1400px;
            gap: 50px;
          }

          .cards-jornais:not(.modo-compacto) .jornal-card {
            height: 350px;
          }

          .cards-jornais.modo-compacto {
            max-width: 360px;
            gap: 25px;
          }

          .cards-jornais.modo-compacto .jornal-card {
            height: 170px;
          }

          .cards-jornais:not(.modo-compacto) .jornal-titulo {
            font-size: 46px;
          }

          .cards-jornais.modo-compacto .jornal-titulo {
            font-size: 32px;
          }

          .cards-jornais:not(.modo-compacto) .jornal-titulo-oio {
            font-size: 54px !important;
          }

          .cards-jornais.modo-compacto .jornal-titulo-oio {
            font-size: 36px !important;
          }

          .icone-toque-jornal {
            width: 70px;
            height: 70px;
            bottom: 25px;
            right: 25px;
          }

          .coluna-jornais:not(.jornal-selecionado) .texto-aviso {
            font-size: 24px;
          }

          .coluna-jornais.jornal-selecionado .texto-aviso {
            font-size: 20px;
            max-width: 360px;
          }

          .polaroid-frame {
            max-width: 1100px;
          }

          .imagem-legenda {
            font-size: 22px;
          }
        }

        /* Media Queries para tablets */
        @media (max-width: 1024px) {
          .titulo-principal-emgoias {
            font-size: 56px;
          }

          .subtitulo-emgoias {
            font-size: 18px;
          }

          .cards-jornais:not(.modo-compacto) {
            flex-wrap: wrap;
            gap: 20px;
          }

          .cards-jornais:not(.modo-compacto) .jornal-card {
            min-width: 240px;
          }
        }

        /* Media Queries para mobile */
        @media (max-width: 768px) {
          .emgoias-container {
            flex-direction: column;
            padding: 20px;
          }

          .coluna-jornais {
            width: 100% !important;
            padding-top: 80px !important;
          }

          .titulo-principal-emgoias {
            font-size: 42px;
          }

          .subtitulo-emgoias {
            font-size: 16px;
          }

          .cards-jornais {
            flex-direction: column !important;
            gap: 15px !important;
            max-width: 100% !important;
          }

          .jornal-card {
            width: 100% !important;
            height: 140px !important;
          }

          .visualizador-imagem {
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default EmGoiasScreen;