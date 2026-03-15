'use client';
import React from 'react';
import './SplineBackground.css'

export default function SplineBackground() {
  const [robotRotation, setRobotRotation] = React.useState({ x: 0, y: 0 });
  const robotRef = React.useRef(null);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!robotRef.current) return;
      const rect = robotRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;
      
      const rotateY = Math.max(-15, Math.min(15, deltaX / 30));
      const rotateX = Math.max(-10, Math.min(10, -deltaY / 40));
      
      setRobotRotation({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="spline-bg">
      <div
        ref={robotRef}
        style={{
          transform: `perspective(800px) rotateX(${robotRotation.x}deg) rotateY(${robotRotation.y}deg)`,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
          display: 'inline-block',
          width: '100%',
          height: '100%'
        }}
      >
        <iframe
          src="https://my.spline.design/genkubgreetingrobot-ebIyjNtZJkxJeSQB3NutjCwR/"
          frameBorder="0"
          title="3D Robot Background"
          loading="lazy"
        />
      </div>
    </div>
  )
}


