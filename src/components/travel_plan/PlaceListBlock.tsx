import ImageIcon from '@/assets/images/image_icon.png';
import Image from 'next/image';
interface PlaceListBlockProps {
  children: React.ReactNode;
  variant: string;
}
const PlaceListBlock = ({ children, variant }: PlaceListBlockProps) => {
  return (
    <div
      className={`list_component flex items-center w-full ${variant === 'small' ? 'w-[200px] h-[64px]' : 'w-[300px] h-[100px]'} `}
    >
      <div
        className={`image_component rounded-md mx-[15px] ${variant === 'small' ? 'w-[48px] h-[48px]' : 'w-[64px] h-[64px]'} `}
      >
        <Image
          src={ImageIcon}
          alt='recommended_place'
          className={`object-scale-down ${variant === 'small' ? 'w-[48px] h-[48px]' : 'w-[64px] h-[64px]'}`}
        />
      </div>
      {children}
    </div>
  );
};

export default PlaceListBlock;
