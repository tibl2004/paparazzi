import React, { useState, useEffect } from 'react';
import './FlashlightToggle.scss';

const FlashlightToggle = () => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    let interval;

    if (isFlashing) {
      interval = setInterval(() => {
        toggleFlashlight();
      }, 500); // Taschenlampe alle 500 ms umschalten
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isFlashing]);

  const toggleFlashlight = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      const capabilities = await imageCapture.getPhotoCapabilities();

      if (capabilities.fillLightMode.includes('flash')) {
        await track.applyConstraints({ advanced: [{ torch: true }] });
        await new Promise((resolve) => setTimeout(resolve, 200)); // Taschenlampe für 200 ms einschalten
        await track.applyConstraints({ advanced: [{ torch: false }] });
      }

      track.stop();
    } catch (error) {
      console.error('Fehler beim Umschalten der Taschenlampe:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsFlashing(!isFlashing)}>
        {isFlashing ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default FlashlightToggle;
