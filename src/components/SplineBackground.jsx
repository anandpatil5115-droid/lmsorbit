export default function SplineBackground() {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0, 
        background: '#000'
      }}
    >
      <iframe 
        src='https://my.spline.design/reactiveorb-q42vo3ZOJwAjCuFInHBHiSzL/' 
        frameborder='0' 
        width='100%' 
        height='100%'
        style={{ border: 'none' }}
      ></iframe>
      {/* Mask to hide the "Effortless AI" text inside the Spline scene */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, transparent 0%, #000 45%, #000 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: '#000',
          filter: 'blur(80px)',
          opacity: 0.95,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    </div>
  );
}
