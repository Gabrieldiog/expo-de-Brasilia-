import React, { useEffect, useRef, useState } from 'react';

const BrasiliaTransitions: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentImageIndexRef = useRef<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationRef = useRef<number | null>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const imagePaths: string[] = [
    '/images/brasilia1.jpeg',
    '/images/brasilia8.jpeg',
    '/images/brasilia3.jpeg',
    '/images/brasilia4.jpeg',
    '/images/brasilia5.jpeg',
    '/images/brasilia10.jpeg',
    '/images/brasilia6.jpeg',
    '/images/brasilia9.jpeg',
    '/images/brasilia7.jpeg',
    '/images/brasilia2.jpeg',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawImage = (img: HTMLImageElement, opacity: number = 1): void => {
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      let drawWidth: number, drawHeight: number, posX: number, posY: number;

      if (imgAspect > canvasAspect) {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspect;
        posX = 0;
        posY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        posX = (canvas.width - drawWidth) / 2;
        posY = 0;
      }

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(img, posX, posY, drawWidth, drawHeight);
      ctx.restore();
    };

    const createClipPath = (
      shapeType: 'circle' | 'star' | 'square',
      centerX: number,
      centerY: number,
      size: number,
      rotation: number = 0
    ): void => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.beginPath();

      if (shapeType === 'circle') {
        ctx.arc(0, 0, size, 0, Math.PI * 2);
      } else if (shapeType === 'star') {
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 2) * i;
          const outerX = Math.cos(angle) * size;
          const outerY = Math.sin(angle) * size;
          const innerAngle = angle + Math.PI / 4;
          const innerX = Math.cos(innerAngle) * (size * 0.4);
          const innerY = Math.sin(innerAngle) * (size * 0.4);
          if (i === 0) ctx.moveTo(outerX, outerY);
          else ctx.lineTo(outerX, outerY);
          ctx.lineTo(innerX, innerY);
        }
      } else if (shapeType === 'square') {
        ctx.rect(-size / 2, -size / 2, size, size);
      }

      ctx.closePath();
      ctx.restore();
    };

    const drawClipBorder = (
      shapeType: 'circle' | 'star' | 'square',
      centerX: number,
      centerY: number,
      size: number,
      opacity: number,
      rotation: number = 0
    ): void => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.strokeStyle = `rgba(251, 187, 16, ${opacity})`;
      ctx.lineWidth = 4;
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#FBBB10';
      ctx.beginPath();

      if (shapeType === 'circle') {
        ctx.arc(0, 0, size, 0, Math.PI * 2);
      } else if (shapeType === 'star') {
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 2) * i;
          const outerX = Math.cos(angle) * size;
          const outerY = Math.sin(angle) * size;
          const innerAngle = angle + Math.PI / 4;
          const innerX = Math.cos(innerAngle) * (size * 0.4);
          const innerY = Math.sin(innerAngle) * (size * 0.4);
          if (i === 0) ctx.moveTo(outerX, outerY);
          else ctx.lineTo(outerX, outerY);
          ctx.lineTo(innerX, innerY);
        }
      } else if (shapeType === 'square') {
        ctx.rect(-size / 2, -size / 2, size, size);
      }

      ctx.stroke();
      ctx.restore();
    };

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const startTransition = (): void => {
  if (isTransitioningRef.current) return;
  isTransitioningRef.current = true;

  const currentIndex = currentImageIndexRef.current;
  const nextIndex = (currentIndex + 1) % imagesRef.current.length;
  const currentImg = imagesRef.current[currentIndex];
  const nextImg = imagesRef.current[nextIndex];

  if (!currentImg || !nextImg) return;

  let frame = 0;
  const transitionDuration = 190;

  // APENAS TRANSIÇÕES DE DENTRO PARA FORA (sem reverse)
  const transitions: Array<'circle' | 'star' | 'square'> = ['circle', 'star', 'square'];
  const selectedShape = transitions[Math.floor(Math.random() * transitions.length)];

  const animate = (): void => {
    frame++;
    const progress = frame / transitionDuration;
    const easedProgress = easeInOutCubic(progress);

    // LIMPEZA COMPLETA
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxSize = Math.sqrt(centerX * centerX + centerY * centerY) * 2;
    const shapeRotation = progress * Math.PI * 2;

    // Tamanho cresce de 0 até maxSize (de dentro para fora)
    const currentSize = maxSize * easedProgress;

    // Desenha imagem atual no fundo
    drawImage(currentImg, 1);
    
    // Desenha próxima imagem dentro da forma crescente
    ctx.save();
    createClipPath(selectedShape, centerX, centerY, currentSize, shapeRotation);
    ctx.clip();
    drawImage(nextImg, 1);
    ctx.restore();

    // Borda da forma
    const borderOpacity = Math.sin(progress * Math.PI) * 0.8;
    drawClipBorder(selectedShape, centerX, centerY, currentSize, borderOpacity, shapeRotation);

    if (frame < transitionDuration) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // ATUALIZA O ÍNDICE E LIMPA
      currentImageIndexRef.current = nextIndex;
      isTransitioningRef.current = false;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawImage(nextImg, 1);

      // PRÓXIMA TRANSIÇÃO
      setTimeout(() => {
        startTransition();
      }, 4000);
    }
  };

  animate();
};


    const loadImages = async (): Promise<void> => {
      const promises = imagePaths.map(path => {
        return new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = path;
        });
      });

      const loadedImages = await Promise.all(promises);
      imagesRef.current = loadedImages.filter((img): img is HTMLImageElement => img !== null);

      if (imagesRef.current.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawImage(imagesRef.current[0], 1);

        setTimeout(() => setShowPrompt(true), 3000);
        setTimeout(() => startTransition(), 7000);
      }
    };

    loadImages();

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (imagesRef.current[currentImageIndexRef.current]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawImage(imagesRef.current[currentImageIndexRef.current], 1);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#000',
      margin: 0,
      padding: 0,
      position: 'relative'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />

      {/* Logo */}
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        zIndex: 3000,
        width: '200px',
        opacity: logoLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}>
        <img
          src="/images/logo.jpeg"
          alt="Brasília Logo"
          onLoad={() => setLogoLoaded(true)}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.8))'
          }}
        />
      </div>

      {/* Card Modo de Espera - COM GRADIENTE E LINHAS */}
      {showPrompt && (
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          zIndex: 2000,
          animation: 'fadeInRight 1.2s ease-in-out',
          pointerEvents: 'none',
          maxWidth: '500px'
        }}>
          <div style={{
            position: 'relative',
            textAlign: 'left',
            padding: '35px 40px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgb(227, 227, 226) 0%, rgb(46, 46, 46) 25%, rgb(60, 60, 60) 50%, rgb(46, 46, 46) 75%, rgb(227, 227, 226) 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 30s ease infinite, pulse 3.5s ease-in-out infinite',
            border: '3px solid rgba(251, 187, 16, 0.6)',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.8), 0 0 60px rgba(251, 187, 16, 0.2)',
            overflow: 'hidden'
          }}>
            {/* GRADE DE LINHAS NO CARD */}
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

            <h2 style={{
              position: 'relative',
              color: 'rgb(251, 187, 16)',
              fontFamily: 'Jost, sans-serif',
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '18px',
              letterSpacing: '1px',
              textShadow: '0 2px 15px rgba(0, 0, 0, 0.8)',
              lineHeight: '1.2',
              zIndex: 1
            }}>
              Modo de Espera Ativo
            </h2>

            <p style={{
              position: 'relative',
              color: 'rgb(255, 255, 255)',
              fontFamily: 'Jost, sans-serif',
              fontSize: '18px',
              fontWeight: '400',
              lineHeight: '1.6',
              marginBottom: '25px',
              letterSpacing: '0.3px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
              zIndex: 1
            }}>
              Toque na tela <br />
              Para acessar os Jornais e Revistas
            </p>

            <div style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '20px',
              zIndex: 1
            }}>
              {/* SEMICÍRCULO - Azul */}
              <div style={{
                width: '55px',
                height: '27.5px',
                backgroundColor: 'rgb(66, 152, 207)',
                borderRadius: '55px 55px 0 0',
                animation: 'bounce 2s ease-in-out infinite',
                animationDelay: '0s',
                boxShadow: '0 5px 25px rgba(66, 152, 207, 0.6)'
              }} />

              {/* ESTRELA DIAMANTE - Amarelo */}
              <div style={{
                width: '55px',
                height: '55px',
                backgroundColor: 'rgb(251, 187, 16)',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                animation: 'bounce 2s ease-in-out infinite',
                animationDelay: '0.35s',
                boxShadow: '0 5px 25px rgba(251, 187, 16, 0.6)'
              }} />

              {/* QUADRADO - Vermelho */}
              <div style={{
                width: '55px',
                height: '55px',
                backgroundColor: 'rgb(96, 35, 24)',
                animation: 'bounce 2s ease-in-out infinite',
                animationDelay: '0.7s',
                boxShadow: '0 5px 25px rgba(96, 35, 24, 0.6)'
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Texto inferior */}
      <div style={{
        position: 'absolute',
        bottom: '35px',
        left: '40px',
        color: 'rgb(251, 187, 16)',
        fontFamily: 'Jost, sans-serif',
        fontSize: '18px',
        fontWeight: '300',
        backgroundColor: 'rgba(46, 46, 46, 0.8)',
        padding: '16px 35px',
        borderRadius: '12px',
        backdropFilter: 'blur(12px)',
        letterSpacing: '0.8px',
        textAlign: 'left',
        border: '2px solid rgba(251, 187, 16, 0.3)',
        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.6)',
        zIndex: 2000,
        pointerEvents: 'none',
        maxWidth: '500px'
      }}>
        Brasília: O Alicerce Goiano de um Sonho Brasileiro
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            border-color: rgba(251, 187, 16, 0.5);
          }
          50% {
            transform: scale(1.02);
            border-color: rgba(251, 187, 16, 0.7);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
};

export default BrasiliaTransitions;
