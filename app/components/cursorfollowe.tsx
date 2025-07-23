'use client';

import { useEffect, useState } from 'react';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x - 15}px, ${position.y - 15}px, 0)`,
      }}
    >
      <div className="w-60 h-60 bg-white rounded-full mix-blend-difference opacity-100"></div>
    </div>
  );
};

export default CursorFollower;
