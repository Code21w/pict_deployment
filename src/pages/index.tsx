import Image from 'next/image';
import { Inter } from 'next/font/google';
import Globe from '@/components/Globe';
import CloudAnimation from '@/components/Cloud';
import imageicon from '@/assets/images/image_icon.png';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`bg-gradient-to-b from-cyan-500 to-white-500 to-90% flex min-h-screen items-center justify-between`}
    >
      <div className='w-full h-full'>
        <div className='mx-[100px] mb-[100px] lg:-mb-[200px] flex flex-col justify-between'>
          <div
            className={`relative text-8xl lg:text-[144px] font-['Cafe24Moyamoya-Face-v1.0'] -py-3`}
          >
            여기서
          </div>
          <div
            className={`self-end relative text-8xl lg:text-[144px] font-['Cafe24Moyamoya-Face-v1.0'] -my-3`}
          >
            세계속으로
          </div>
        </div>
        <div className='relative z-1 -mt-[100px] ml-[50px]'>
          <Globe />
        </div>
        <div className='relative z-2 -mt-[650px]'>
          <CloudAnimation />
        </div>
        <div className='relative z-3 -mt-[450px] mb-[150px] ml-[50%] flex flex-col w-[500px] h-[100px] '>
          <div className='flex'>
            <div className='text-lg'>해외 이미지를 넣으면&nbsp;</div>
            <b className='text-lg'>국내에서 가장 비슷한 곳</b>
            <div className='text-lg'>을 찾아드려요!</div>
          </div>
          <div className=' flex items-center bg-gray-100 rounded-3xl shadow-md justify-center mt-[10px]'>
            <Image src={imageicon} alt='UploadImageIcon.png' />
            <input
              className='w-[300px] h-[100px] bg-gray-100 pl-[10px]'
              placeholder='Drag an image here or upload a file'
            ></input>
          </div>
          <div>
            <button className='w-[500px] h-[50px] bg-cyan-300 active:bg-cyan-400 rounded-3xl shadow-md mt-[10px]'>
              여기랑 비슷한 곳 찾아주세요!
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
