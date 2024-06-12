import React, { useEffect, useState } from 'react';

interface LogoProps {
  text: string;
  time: number;
}

const Logo: React.FC<LogoProps> = ({ text, time }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, ((time*1000)-500)); // 入力時間の0.5秒前に消える

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-transform duration-1000 ${isVisible ? 'scale-100' : 'scale-0'}`}>
      <h1 className="text-5xl font-black text-black tracking-widest uppercase mx-auto h-32" style={{ WebkitTextStroke: '2px #FFD700' }}>
        {text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            <span>{line}</span>
          </React.Fragment>
        ))}
      </h1>
    </div>
  );
}

export default Logo;
