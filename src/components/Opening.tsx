import React from 'react';

interface OpeningProps {
  text: string;
}

const Opening: React.FC<OpeningProps> = ({ text }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-blue-400 text-xl">
      {text}
    </div>
  );
}

export default Opening;
