"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const videoSrc = "/videos/portfolio-motion.mp4";
const posterSrc = "/videos/portfolio-motion-poster.png";

export function PresentationVideo() {
  const [isPlayingRequested, setIsPlayingRequested] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isPlayingRequested || !videoRef.current) return;

    void videoRef.current.play().catch(() => {
      // Keep the native controls visible if the browser requires manual playback.
    });
  }, [attempt, isPlayingRequested]);

  function handlePlay() {
    setHasLoadError(false);
    setIsPlayingRequested(true);
  }

  function handleRetry() {
    setHasLoadError(false);
    setAttempt((currentAttempt) => currentAttempt + 1);
  }

  return (
    <div className="presentation-player">
      {isPlayingRequested ? (
        <video
          key={attempt}
          ref={videoRef}
          className="presentation-media"
          src={videoSrc}
          poster={posterSrc}
          controls
          playsInline
          preload="none"
          onCanPlay={() => setHasLoadError(false)}
          onError={() => setHasLoadError(true)}
        />
      ) : (
        <>
          <Image
            className="presentation-media"
            src={posterSrc}
            alt="Fotograma del vídeo de presentación del portfolio de Andrés Basurto"
            fill
            sizes="(max-width: 420px) calc(100vw - 58px), (max-width: 760px) calc(100vw - 70px), 722px"
            loading="eager"
          />
          <button
            className="presentation-play"
            type="button"
            onClick={handlePlay}
            aria-label="Reproducir vídeo de presentación"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 7 8 5-8 5V7Z" />
            </svg>
          </button>
          <span className="presentation-caption">Ver presentación · 24 segundos</span>
        </>
      )}

      {hasLoadError && (
        <div className="presentation-error" role="alert">
          <span>No se ha podido cargar el vídeo.</span>
          <button type="button" onClick={handleRetry}>Reintentar</button>
        </div>
      )}
    </div>
  );
}
