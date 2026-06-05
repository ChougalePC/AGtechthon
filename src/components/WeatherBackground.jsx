import React from 'react';

const WeatherBackground = ({ condition }) => {
  const safeCondition = condition || '';
  const isRain = safeCondition.toLowerCase().includes('rain') || safeCondition.toLowerCase().includes('drizzle');
  const isStorm = safeCondition.toLowerCase().includes('thunderstorm') || safeCondition.toLowerCase().includes('storm');
  const isClouds = safeCondition.toLowerCase().includes('cloud');
  const isClear = safeCondition.toLowerCase().includes('clear') || safeCondition.toLowerCase().includes('sun');

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Gradient */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isClear ? 'bg-gradient-to-br from-[#0a150a] via-[#101a05] to-[#1a2510]' :
        isRain ? 'bg-gradient-to-br from-[#050a10] via-[#0a1015] to-[#05080a]' :
        isStorm ? 'bg-gradient-to-br from-[#020502] via-[#050805] to-[#000000]' :
        'bg-gradient-to-br from-[#0a0f0a] via-[#0f150f] to-[#0a0a0a]'
      }`} />

      {/* Sunny Glow */}
      {isClear && (
        <>
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[rgba(230,245,120,0.15)] blur-[100px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[rgba(180,210,140,0.08)] blur-[120px] mix-blend-screen" />
        </>
      )}

      {/* Clouds Fog */}
      {isClouds && (
        <>
          <div className="absolute top-[20%] left-[-20%] w-[80vw] h-[40vh] rounded-full bg-[rgba(140,180,120,0.05)] blur-[80px] animate-cloud" style={{ animationDuration: '40s' }} />
          <div className="absolute top-[40%] left-[-10%] w-[70vw] h-[50vh] rounded-full bg-[rgba(200,220,180,0.03)] blur-[100px] animate-cloud" style={{ animationDuration: '60s', animationDelay: '-20s' }} />
        </>
      )}

      {/* Rain Particles */}
      {(isRain || isStorm) && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute top-[-10%] w-[1px] h-[15vh] bg-gradient-to-b from-transparent via-[rgba(180,210,140,0.3)] to-transparent animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Lightning Flashes */}
      {isStorm && (
        <div className="absolute inset-0 bg-white mix-blend-overlay animate-lightning pointer-events-none" />
      )}

      {/* Subtle Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
    </div>
  );
};

export default WeatherBackground;
