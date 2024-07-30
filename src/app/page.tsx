'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react'; // useState 추가
import { useDropzone } from 'react-dropzone';

import imageicon from '@/assets/images/image_icon.png';
import CloudAnimation from '@/components/main/Cloud';
import { DialogDemo } from '@/components/resultmodal/ResultModal';
// import { toast } from '@/components/ui/use-toast';

// import { Join } from '@/components/Join';

import AirplaneAnimation from '@/components/main/Airplane';
import Globe from '@/components/main/Globe';
function Main() {
  const [image, setImage] = useState(null);
  // Todo define type acceptedFiles
  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      const objectUrl: any = URL.createObjectURL(file);
      //Todo define type objectUrl
      setImage(objectUrl);
      console.log('Uploaded file:', file);
      console.log('Object URL:', objectUrl);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <main className='flex min-h-screen items-center justify-between'>
      <div className='w-full h-screen'>
        <div className='mx-[200px] lg:mx-[250px] max-[1200px]:mt-[10%] min-[1500px]:-mb-[150px] flex flex-col justify-between min-w-[460px]'>
          <div
            className={`relative text-8xl min-[1200px]:text-[144px] min-[1500px]:text-[192px] font-['Cafe24Moyamoya-Face-v1.0'] -py-3`}
          >
            여기서
          </div>
          <div
            className={`self-end relative text-8xl min-[1200px]:text-[144px] min-[1500px]:text-[192px] font-['Cafe24Moyamoya-Face-v1.0'] -my-3`}
          >
            세계속으로
          </div>
        </div>

        <div className='relative z-1 ml-[50px]'>
          <Globe />
        </div>
        <div className='fixed z-2 -mt-[600px]'>
          <AirplaneAnimation />
        </div>
        <div className='relative z-3 -mt-[800px]'>
          <CloudAnimation />
        </div>
        <div className='relative z-4 max-[1200px]:-mt-[300px] -mt-[400px] mb-[150px] ml-[40%] flex flex-col w-[500px] h-[100px] '>
          <div className='flex'>
            <div className='text-lg'>해외 이미지를 넣으면&nbsp;</div>
            <b className='text-lg'>국내에서 가장 비슷한 곳</b>
            <div className='text-lg'>을 찾아드려요!</div>
          </div>
          <div
            {...getRootProps()}
            className={`flex items-center bg-gray-100 rounded-3xl shadow-md justify-center mt-[10px] ${
              isDragActive ? 'bg-gray-200' : 'bg-gray-100'
            }`}
          >
            <input {...getInputProps()} className='w-[300px] h-[100px] bg-transparent pl-[10px]' />
            {!image && <Image src={imageicon} alt='UploadImageIcon.png' />}
            {image && (
              <img
                src={image}
                alt='Uploaded Preview'
                className='w-[300px] h-[100px] object-cover'
              />
            )}
          </div>
          <div>
            <DialogDemo triggerClassName='w-[500px] h-[50px] bg-cyan-300 active:bg-cyan-400 rounded-3xl shadow-md mt-[10px]'>
              여기랑 비슷한 곳 찾아주세요!
            </DialogDemo>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
