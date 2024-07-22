import { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import Cloud1 from '@/assets/images/cloud1.png';
import Cloud2 from '@/assets/images/cloud2.png';
import Cloud3 from '@/assets/images/cloud3.png';
import Cloud4 from '@/assets/images/cloud4.png';
import Cloud5 from '@/assets/images/cloud5.png';
const cloudImages: StaticImageData[] = [Cloud1, Cloud2, Cloud3, Cloud4, Cloud5];
const cloudInitialXPositions = ['0', '50vw', '25vw', '90vw', '50vw'];

interface WindowSize {
  width: number;
  height: number;
}

const CloudAnimation: React.FC = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      {cloudImages.map((CloudImage, idx) => (
        <div
          key={idx}
          className={`absolute cloud-${idx + 1} ${idx % 2 === 1 ? 'cloud-left' : 'cloud-right'}`}
          style={
            {
              '--start-x': cloudInitialXPositions[idx],
              '--start-y': `${10 + idx * 20}%`,
            } as React.CSSProperties
          }
        >
          <Image
            className={`!w-[${100 / idx}px] !h-[${100 / idx}px]`}
            src={CloudImage}
            alt={`Cloud ${idx + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default CloudAnimation;
