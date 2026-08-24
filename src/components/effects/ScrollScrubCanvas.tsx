import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

interface ScrollScrubCanvasProps {
  /** Ref of the tall section that drives the scrub (scroll progress 0→1 over its full height). */
  targetRef: React.RefObject<HTMLElement | null>;
  /** Total number of frames (1-based). */
  totalFrames: number;
  /** Returns the URL of frame `index` (1-based). */
  frameUrl: (index: number) => string;
  className?: string;
}

/**
 * Canvas that scrubs a sequence of prerendered frames in sync with scroll.
 * The section owning `targetRef` should be pinned (e.g. `position: sticky`)
 * so the canvas stays in view while the scroll progress drives the frames.
 */
export const ScrollScrubCanvas: React.FC<ScrollScrubCanvasProps> = ({
  targetRef,
  totalFrames,
  frameUrl,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload and cache all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      // Count failures too so a single missing frame doesn't block the sequence
      img.onload = img.onerror = () => {
        count++;
        if (count === totalFrames) {
          setLoaded(true);
        }
      };
      images.push(img);
    }
    setFrames(images);
  }, [totalFrames, frameUrl]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  useEffect(() => {
    if (!loaded || frames.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const renderFrame = (idx: number) => {
      const img = frames[Math.max(0, Math.min(totalFrames - 1, Math.round(idx)))];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Object-fit: cover math
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const unsubscribe = frameIndex.on('change', renderFrame);

    const handleResize = () => {
      canvas.width = (canvas.clientWidth || window.innerWidth) * window.devicePixelRatio;
      canvas.height = (canvas.clientHeight || window.innerHeight) * window.devicePixelRatio;
      renderFrame(frameIndex.get());
    };

    // Initial paint + resize handling
    renderFrame(frameIndex.get());
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [loaded, frames, frameIndex, totalFrames]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
};

export default ScrollScrubCanvas;
