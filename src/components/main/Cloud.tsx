import Cloud1 from '@/assets/images/cloud1.png';
import Cloud2 from '@/assets/images/cloud2.png';
import Cloud3 from '@/assets/images/cloud3.png';
import Cloud4 from '@/assets/images/cloud4.png';
import Cloud5 from '@/assets/images/cloud5.png';
import Image, { StaticImageData } from 'next/image';

const CLOUD_IMAGES: Array<{ image: StaticImageData; position: string }> = [
  {
    image: Cloud1,
    position: '0',
  },
  {
    image: Cloud2,
    position: '50vw',
  },
  {
    image: Cloud3,
    position: '25vw',
  },
  {
    image: Cloud4,
    position: '90vw',
  },
  {
    image: Cloud5,
    position: '50vw',
  },
];

const CloudAnimation: React.FC = () => {
  return (
    <div className='relative w-full h-screen overflow-hidden'>
      {CLOUD_IMAGES.map((cloudImage, idx) => {
        const { image, position } = cloudImage;
        const { width } = image;

        return (
          <div
            key={idx}
            className={`absolute cloud-${idx + 1}`}
            style={
              {
                '--start-x': position,
                '--start-y': `${idx * 20}%`,
                '--width': `${width}px`,
              } as React.CSSProperties
            }
          >
            <Image
              src={image}
              alt={`Cloud ${idx + 1}`}
              className={`${idx < 3 ? 'opacity-90' : ''}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CloudAnimation;
