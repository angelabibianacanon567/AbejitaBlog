import React from 'react'
import '../../styles/pixel-art.css'

export const BackgroundDecoration: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      {/* ABEJAS - DISTRIBUIDAS POR TODO EL FONDO */}
      <div style={{ position: 'absolute', top: '5%', left: '2%', fontSize: '36px', animation: 'float 5s ease-in-out infinite', opacity: 0.5 }}>🐝</div>
      <div style={{ position: 'absolute', top: '12%', left: '85%', fontSize: '32px', animation: 'float 6s ease-in-out infinite 0.5s', opacity: 0.5 }}>🐝</div>
      <div style={{ position: 'absolute', top: '20%', left: '30%', fontSize: '28px', animation: 'float 6s ease-in-out infinite 1s', opacity: 0.45 }}>🐝</div>
      <div style={{ position: 'absolute', top: '35%', left: '92%', fontSize: '34px', animation: 'float 7s ease-in-out infinite 1.5s', opacity: 0.5 }}>🐝</div>
      <div style={{ position: 'absolute', top: '42%', left: '15%', fontSize: '30px', animation: 'float 5.5s ease-in-out infinite 0.5s', opacity: 0.45 }}>🐝</div>
      <div style={{ position: 'absolute', top: '55%', left: '78%', fontSize: '32px', animation: 'float 6.5s ease-in-out infinite 2s', opacity: 0.5 }}>🐝</div>
      <div style={{ position: 'absolute', top: '68%', left: '25%', fontSize: '36px', animation: 'float 5.5s ease-in-out infinite 1s', opacity: 0.5 }}>🐝</div>
      <div style={{ position: 'absolute', top: '80%', left: '88%', fontSize: '30px', animation: 'float 6s ease-in-out infinite 1.5s', opacity: 0.45 }}>🐝</div>
      <div style={{ position: 'absolute', top: '90%', left: '40%', fontSize: '32px', animation: 'float 5.5s ease-in-out infinite 0.5s', opacity: 0.5 }}>🐝</div>

      {/* MARIPOSAS - DISTRIBUIDAS POR TODO EL FONDO */}
      <div style={{ position: 'absolute', top: '8%', left: '12%', fontSize: '28px', animation: 'flutter 3s ease-in-out infinite 0.5s', opacity: 0.45 }}>🦋</div>
      <div style={{ position: 'absolute', top: '18%', left: '80%', fontSize: '26px', animation: 'flutter 3.5s ease-in-out infinite 1s', opacity: 0.5 }}>🦋</div>
      <div style={{ position: 'absolute', top: '28%', left: '55%', fontSize: '28px', animation: 'flutter 3.2s ease-in-out infinite 1.5s', opacity: 0.45 }}>🦋</div>
      <div style={{ position: 'absolute', top: '45%', left: '38%', fontSize: '26px', animation: 'flutter 3.5s ease-in-out infinite 2s', opacity: 0.5 }}>🦋</div>
      <div style={{ position: 'absolute', top: '58%', left: '82%', fontSize: '24px', animation: 'flutter 3s ease-in-out infinite 0.5s', opacity: 0.4 }}>🦋</div>
      <div style={{ position: 'absolute', top: '72%', left: '18%', fontSize: '26px', animation: 'flutter 3.2s ease-in-out infinite 0.5s', opacity: 0.45 }}>🦋</div>
      <div style={{ position: 'absolute', top: '85%', left: '65%', fontSize: '28px', animation: 'flutter 3.5s ease-in-out infinite 1.5s', opacity: 0.5 }}>🦋</div>

      {/* FLORES - DISTRIBUIDAS POR TODO EL FONDO */}
      <div style={{ position: 'absolute', top: '10%', left: '22%', fontSize: '26px', opacity: 0.4 }}>🌸</div>
      <div style={{ position: 'absolute', top: '22%', left: '88%', fontSize: '24px', opacity: 0.35 }}>🌺</div>
      <div style={{ position: 'absolute', top: '32%', left: '50%', fontSize: '22px', opacity: 0.35 }}>🌼</div>
      <div style={{ position: 'absolute', top: '48%', left: '10%', fontSize: '25px', opacity: 0.4 }}>🌸</div>
      <div style={{ position: 'absolute', top: '60%', left: '92%', fontSize: '23px', opacity: 0.35 }}>🌺</div>
      <div style={{ position: 'absolute', top: '72%', left: '60%', fontSize: '26px', opacity: 0.4 }}>🌼</div>
      <div style={{ position: 'absolute', top: '82%', left: '30%', fontSize: '24px', opacity: 0.38 }}>🌸</div>

      {/* LIBÉLULAS - DISTRIBUIDAS POR TODO EL FONDO */}
      <div style={{ position: 'absolute', top: '15%', left: '42%', fontSize: '28px', animation: 'float 5s ease-in-out infinite 0.5s', opacity: 0.5 }}>🦗</div>
      <div style={{ position: 'absolute', top: '33%', left: '75%', fontSize: '26px', animation: 'flutter 4s ease-in-out infinite 1s', opacity: 0.45 }}>🦗</div>
      <div style={{ position: 'absolute', top: '50%', left: '35%', fontSize: '24px', animation: 'float 4.5s ease-in-out infinite 1.5s', opacity: 0.45 }}>🦗</div>
      <div style={{ position: 'absolute', top: '65%', left: '85%', fontSize: '26px', animation: 'flutter 4s ease-in-out infinite 2s', opacity: 0.5 }}>🦗</div>
      <div style={{ position: 'absolute', top: '75%', left: '45%', fontSize: '24px', animation: 'float 5.5s ease-in-out infinite 1s', opacity: 0.4 }}>🦗</div>
      <div style={{ position: 'absolute', top: '88%', left: '15%', fontSize: '26px', animation: 'flutter 4s ease-in-out infinite 2s', opacity: 0.45 }}>🦗</div>

      {/* SUPERIOR - NUBES */}
      <div style={{ position: 'absolute', top: '2%', left: '15%', fontSize: '36px', opacity: 0.2 }}>☁️</div>
      <div style={{ position: 'absolute', top: '3%', right: '15%', fontSize: '32px', opacity: 0.15 }}>☁️</div>
      <div style={{ position: 'absolute', top: '1%', left: '50%', fontSize: '34px', opacity: 0.18, transform: 'translateX(-50%)' }}>☁️</div>

      {/* INFERIOR - HOJAS */}
      <div style={{ position: 'absolute', bottom: '3%', left: '10%', fontSize: '24px', opacity: 0.35, animation: 'drift 8s ease-in-out infinite' }}>🍃</div>
      <div style={{ position: 'absolute', bottom: '5%', left: '25%', fontSize: '22px', opacity: 0.3, animation: 'drift 10s ease-in-out infinite 1s' }}>🍃</div>
      <div style={{ position: 'absolute', bottom: '2%', left: '40%', fontSize: '20px', opacity: 0.25, animation: 'drift 9s ease-in-out infinite 2s' }}>🍃</div>
      <div style={{ position: 'absolute', bottom: '4%', right: '25%', fontSize: '22px', opacity: 0.3, animation: 'drift 11s ease-in-out infinite 1.5s' }}>🍃</div>
      <div style={{ position: 'absolute', bottom: '3%', right: '10%', fontSize: '24px', opacity: 0.35, animation: 'drift 9.5s ease-in-out infinite 0.5s' }}>🍃</div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(15px);
          }
        }

        @keyframes flutter {
          0%, 100% {
            transform: translateY(0px) scaleX(1);
          }
          25% {
            transform: translateY(-15px) scaleX(0.8);
          }
          50% {
            transform: translateY(-30px) scaleX(1);
          }
          75% {
            transform: translateY(-15px) scaleX(0.9);
          }
        }

        @keyframes drift {
          0%, 100% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateX(30px) translateY(-30px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  )
}

