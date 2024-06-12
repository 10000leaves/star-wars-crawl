import React from 'react';

interface CrawlProps {
  text: string;
  time: number;
}

const Crawl: React.FC<CrawlProps> = ({ text, time }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective">
      <div
        className="crawl absolute text-yellow-500 text-2xl leading-snug text-center"
        style={{ animationDuration: `${time}s` }} // 持続時間を調整
      >
        {text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            <span>{line}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Crawl;
