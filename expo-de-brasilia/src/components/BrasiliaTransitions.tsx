import React, { useEffect, useRef, useState } from 'react';

interface Shape {
  type: 'semicircle' | 'star' | 'square' | 'circle';
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  rotation: number;
  opacity: number;
}

const BrasiliaTransitions: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentImageIndexRef = useRef<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationRef = useRef<number | null>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const shapesRef = useRef<Shape[]>([]);
  
  const imagePaths: string[] = [
    '/images/brasilia1.jpeg',
    '/images/brasilia2.jpeg',
    '/images/brasilia3.jpeg',
    '/images/brasilia4.jpeg',
    '/images/brasilia5.jpeg',
    '/images/brasilia6.jpeg',
    '/images/brasilia7.jpeg'
  ];

  const brasiliaColors = [
    '#FBBB10',
    '#4298CF',
    '#185AAD',
    '#555F3C',
    '#C8402E'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const initializeShapes = (): void => {
      const shapeTypes: Array<'semicircle' | 'star' | 'square' | 'circle'> = 
        ['semicircle', 'star', 'square', 'circle'];
      
      shapesRef.current = [];
      
      for (let i = 0; i < 5; i++) {
        const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const randomColor = brasiliaColors[Math.floor(Math.random() * brasiliaColors.length)];
        const baseSize = Math.min(canvas.width, canvas.height) * 0.05;
        
        shapesRef.current.push({
          type: randomType,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
          size: baseSize * (0.9 + Math.random() * 0.4),
          color: randomColor,
          rotation: Math.random() * Math.PI * 2,
          opacity: 0
        });
      }
    };

    const drawImage = (
      img: HTMLImageElement,
      opacity: number = 1
    ): void => {
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      
      let drawWidth: number, drawHeight: number, posX: number, posY: number;
      
      if (imgAspect > canvasAspect) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        posX = (canvas.width - drawWidth) / 2;
        posY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspect;
        posX = 0;
        posY = (canvas.height - drawHeight) / 2;
      }
      
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.drawImage(img, posX, posY, drawWidth, drawHeight);
      ctx.restore();
    };

    const createClipPath = (
      shapeType: 'circle' | 'semicircle' | 'star' | 'square',
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
      } else if (shapeType === 'semicircle') {
        ctx.arc(0, 0, size, 0, Math.PI);
        ctx.lineTo(size, 0);
        ctx.lineTo(-size, 0);
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
      shapeType: 'circle' | 'semicircle' | 'star' | 'square',
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
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#FBBB10';
      ctx.beginPath();
      
      if (shapeType === 'circle') {
        ctx.arc(0, 0, size, 0, Math.PI * 2);
      } else if (shapeType === 'semicircle') {
        ctx.arc(0, 0, size, 0, Math.PI);
        ctx.lineTo(size, 0);
        ctx.lineTo(-size, 0);
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

    const drawFloatingShape = (shape: Shape, progress: number): void => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      
      const glowIntensity = 15 + Math.sin(progress * Math.PI * 3) * 5;
      ctx.shadowBlur = glowIntensity;
      ctx.shadowColor = shape.color;
      ctx.globalAlpha = shape.opacity;
      ctx.fillStyle = shape.color;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 1.5;
      
      const currentSize = shape.size * (1 + Math.sin(progress * Math.PI * 4) * 0.08);
      
      if (shape.type === 'semicircle') {
        ctx.beginPath();
        ctx.arc(0, 0, currentSize, 0, Math.PI);
        ctx.fill();
        ctx.globalAlpha = shape.opacity * 0.3;
        ctx.stroke();
      } else if (shape.type === 'star') {
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 2) * i;
          const outerX = Math.cos(angle) * currentSize;
          const outerY = Math.sin(angle) * currentSize;
          const innerAngle = angle + Math.PI / 4;
          const innerX = Math.cos(innerAngle) * (currentSize * 0.4);
          const innerY = Math.sin(innerAngle) * (currentSize * 0.4);
          
          if (i === 0) ctx.moveTo(outerX, outerY);
          else ctx.lineTo(outerX, outerY);
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = shape.opacity * 0.3;
        ctx.stroke();
      } else if (shape.type === 'square') {
        ctx.fillRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize);
        ctx.globalAlpha = shape.opacity * 0.3;
        ctx.strokeRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize);
      } else if (shape.type === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, currentSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = shape.opacity * 0.3;
        ctx.stroke();
      }
      
      ctx.restore();
    };

    const updateShapes = (progress: number): void => {
      shapesRef.current.forEach(shape => {
        shape.opacity = Math.sin(progress * Math.PI) * 0.5;
        
        shape.x += (shape.targetX - shape.x) * 0.01;
        shape.y += (shape.targetY - shape.y) * 0.01;
        
        shape.rotation += 0.015;
        
        if (Math.random() < 0.005) {
          shape.targetX = Math.random() * canvas.width;
          shape.targetY = Math.random() * canvas.height;
        }
      });
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

      initializeShapes();

      let frame = 0;
      const transitionDuration = 390;
      
      const transitions: Array<{
        shape: 'circle' | 'star' | 'square';
        reverse: boolean;
      }> = [
        { shape: 'circle', reverse: false },
        { shape: 'circle', reverse: true },
        { shape: 'star', reverse: false },
        { shape: 'star', reverse: true },
        { shape: 'square', reverse: false },
        { shape: 'square', reverse: true }
      ];
      
      const selectedTransition = transitions[Math.floor(Math.random() * transitions.length)];

      const animate = (): void => {
        frame++;
        const progress = frame / transitionDuration;
        const easedProgress = easeInOutCubic(progress);
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxSize = Math.sqrt(centerX * centerX + centerY * centerY) * 2;
        
        const shapeRotation = progress * Math.PI * 2;
        
        let currentSize: number;
        let clipProgress: number;
        
        if (selectedTransition.reverse) {
          clipProgress = 1 - easedProgress;
          currentSize = maxSize * clipProgress;
          
          drawImage(nextImg, 1);
          
          ctx.save();
          createClipPath(selectedTransition.shape, centerX, centerY, currentSize, shapeRotation);
          ctx.clip();
          drawImage(currentImg, 1);
          ctx.restore();
        } else {
          clipProgress = easedProgress;
          currentSize = maxSize * clipProgress;
          
          drawImage(currentImg, 1);
          
          ctx.save();
          createClipPath(selectedTransition.shape, centerX, centerY, currentSize, shapeRotation);
          ctx.clip();
          drawImage(nextImg, 1);
          ctx.restore();
        }
        
        const borderOpacity = Math.sin(progress * Math.PI) * 0.7;
        drawClipBorder(selectedTransition.shape, centerX, centerY, currentSize, borderOpacity, shapeRotation);

        updateShapes(progress);
        shapesRef.current.forEach(shape => drawFloatingShape(shape, progress));

        if (frame < transitionDuration) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          currentImageIndexRef.current = nextIndex;
          isTransitioningRef.current = false;
          
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          drawImage(nextImg, 1);
          
          setTimeout(() => {
            startTransition();
          }, 7000);
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
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawImage(imagesRef.current[0], 1);
        
        setTimeout(() => {
          startTransition();
        }, 7000);
      }
    };

    loadImages();

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      if (imagesRef.current[currentImageIndexRef.current]) {
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
      
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        width: 'clamp(120px, 15vw, 280px)',
        maxWidth: '280px',
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
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))'
          }}
        />
      </div>

      <div style={{
        position: 'absolute',
        bottom: 'clamp(20px, 3vh, 40px)',
        right: 'clamp(20px, 3vw, 40px)',
        color: '#FBBB10',
        fontFamily: 'Jost, sans-serif',
        fontSize: 'clamp(11px, 1.2vw, 16px)',
        fontWeight: '300',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 'clamp(8px, 1.2vw, 15px) clamp(15px, 2vw, 25px)',
        borderRadius: 'clamp(4px, 0.6vw, 8px)',
        backdropFilter: 'blur(10px)',
        opacity: 0.85,
        letterSpacing: '0.5px',
        maxWidth: '90vw',
        textAlign: 'right'
      }}>
        Brasília: O Alicerce Goiano de um Sonho Brasileiro
      </div>
    </div>
  );
};

export default BrasiliaTransitions;