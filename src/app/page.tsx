'use client';

import React, { useState, useEffect } from 'react';
import StarBackground from '@/components/StarBackground';
import Opening from '@/components/Opening';
import Logo from '@/components/Logo';
import Crawl from '@/components/Crawl';

const App: React.FC = () => {
  const [openingText, setOpeningText] = useState('遠い昔 はるかかなたの銀河系で…');
  const [logoText, setLogoText] = useState('SW風');
  const [crawlText, setCrawlText] = useState('銀河共和国には混乱が渦巻いていた。辺境の星との交易での課税の是非で意見が割れたのだ。\n\n貪欲な通商連合は恐るべき宇宙戦艦の包囲で事態解決を図り小さな惑星ナブーへの航路を封鎖してしまった。\n\nこの非常事態に共和国議会は果てしない討議をただ繰り返すばかり。共和国最高議長は紛争解決のために平和と正義の守護者ジェダイの騎士２人を特使として秘密裏に派遣したのだった…');
  
  const [openingTime, setOpeningTime] = useState(2); // 初期表示時間2秒
  const [logoTime, setLogoTime] = useState(2); // 初期表示時間2秒
  const [crawlTime, setCrawlTime] = useState(10); // 初期表示時間10秒

  const [isStarted, setIsStarted] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1); // 初期速度を1に設定
  const [stage, setStage] = useState(0); // 0: 初期状態, 1: OpeningText, 2: Logo, 3: Crawl

  const handleStart = () => {
    // 速度設定
    const lineCount = crawlText.split('\n').length;
    const speed = lineCount <= 10 ? 1 : lineCount / 10; // 10行以下は速度1、それ以上は行数/10の速度
    setAnimationSpeed(speed);

    // 表示開始
    setIsStarted(true);
    setStage(1);
  };

  useEffect(() => {
    if (stage === 1) {
      const timer = setTimeout(() => {
        setStage(2); // 指定時間後にロゴを表示
      }, openingTime * 1000);
      return () => clearTimeout(timer);
    }
    if (stage === 2) {
      const timer = setTimeout(() => {
        setStage(3); // 指定時間後にCrawlを表示
      }, logoTime * 1000);
      return () => clearTimeout(timer);
    }
    if (stage === 3) {
      const timer = setTimeout(() => {
        setIsStarted(false);
        setStage(0); // 指定時間後に初期状態に戻す
      }, crawlTime * 1000);
      return () => clearTimeout(timer);
    }
  }, [stage, openingTime, logoTime, crawlTime]);

  return (
    <div className="relative h-screen overflow-hidden">
      <StarBackground />
      {!isStarted ? (
        <div className="absolute w-full h-full flex flex-col items-center justify-center space-y-6 p-4">
          <h1 className="text-4xl font-bold text-yellow-400 mb-8">SW風オープニングクロールアニメーション</h1>
          <div className="w-full md:w-1/2 space-y-2">
            <h2 className="text-2xl font-semibold text-white">冒頭テキスト</h2>
            <textarea
              className="w-full p-2 text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={1}
              placeholder="ここに文章を入力してください..."
              value={openingText}
              onChange={(e) => setOpeningText(e.target.value)}
            />
            <label className="text-white">表示時間（秒）</label>
            <input
              type="number"
              className="w-full p-2 text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="表示時間（秒）"
              value={openingTime}
              onChange={(e) => setOpeningTime(Number(e.target.value))}
            />
          </div>
          <div className="w-full md:w-1/2 space-y-2">
            <h2 className="text-2xl font-semibold text-white">ロゴテキスト</h2>
            <textarea
              className="w-full p-2 text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={2}
              placeholder="ここに文字を入力してください..."
              value={logoText}
              onChange={(e) => setLogoText(e.target.value)}
            />
            <label className="text-white">表示時間（秒）</label>
            <input
              type="number"
              className="w-full p-2 text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="表示時間（秒）"
              value={logoTime}
              onChange={(e) => setLogoTime(Number(e.target.value))}
            />
          </div>
          <div className="w-full md:w-1/2 space-y-2">
            <h2 className="text-2xl font-semibold text-white">クロールテキスト</h2>
            <textarea
              className="w-full p-2 text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={6}
              placeholder="ここに文章を入力してください..."
              value={crawlText}
              onChange={(e) => setCrawlText(e.target.value)}
            />
            <label className="text-white">表示時間（秒）</label>
            <input
              type="number"
              className="w-full p-2 text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="表示時間（秒）"
              value={crawlTime}
              onChange={(e) => setCrawlTime(Number(e.target.value))}
            />
          </div>
          <button
            className="mt-4 px-6 py-2 bg-yellow-500 text-white font-bold rounded-md shadow-md hover:bg-yellow-600 transition"
            onClick={handleStart}
          >
            スタート
          </button>
        </div>
      ) : (
        <>
          {stage === 1 && <Opening text={openingText} />}
          {stage === 2 && <Logo text={logoText} time={logoTime} />}
          {stage === 3 && <Crawl text={crawlText} time={crawlTime} speed={animationSpeed} />}
        </>
      )}
    </div>
  );
}

export default App;
