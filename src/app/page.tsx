'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ErrorCode, FileRejection, useDropzone } from 'react-dropzone';

import UploadFile from '@/api/SendingImage';
import imageIcon from '@/assets/images/image_icon.png';
import CloudAnimation from '@/components/main/Cloud';
import { DialogDemo } from '@/components/resultmodal/ResultModal';
import { Dialog } from '@/components/ui/dialog';

import AirplaneAnimation from '@/components/main/Airplane';
import Globe from '@/components/main/Globe';
import MainLayout from '@/components/main/MainLayout';
import useWindowHeightSize from '@/hooks/useWindowHeightSize';
import { useCartStore, useLoginModalStore } from '@/store/store.ts';

import { instance } from '@/api/instance';
import { ClipLoader } from 'react-spinners';

function Main() {
  interface ResultItem {
    gal_title: string;
    image_url: string | null;
    location: string;
    similarity: number;
    mapx: number;
    mapy: number;
  }

  const { setIsOpenLoginModal } = useLoginModalStore();
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [result, setResult] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploadedImageVisible, setIsUploadedImageVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeResultIndex, setActiveResultIndex] = useState(0); // Track the active result index
  const { setCurrentCart, setCurrentIndex } = useCartStore();
  const windowHeight = useWindowHeightSize();

  useEffect(() => {
    setCurrentCart([]);
    setCurrentIndex('');
    const checkLoginStatus = async () => {
      try {
        const response = await instance.get('/api/user', {
          withCredentials: true,
        });

        if (response.data) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const tooManyFilesError = fileRejections.find((rejection) =>
        rejection.errors.find((error) => error.code === ErrorCode.TooManyFiles)
      );

      if (tooManyFilesError) {
        setErrorMessage('하나의 이미지 파일만 업로드 해주세요!');
        setImage(null);
        setFile(null);
        return;
      }

      setErrorMessage('이미지 형식이 아닙니다!');
      setImage(null);
      setFile(null);
      return;
    }

    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setImage(objectUrl);
        setFile(file);
        setErrorMessage('');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    multiple: false,
  });

  const onUploadImage = async () => {
    if (!file) {
      console.error('No file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setDialogOpen(true);
    setLoading(true);

    try {
      const { result } = await UploadFile(formData);
      setResult(result); // Update results state with fetched results
      setLoading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false);
    }
  };

  const handleButtonClick = async () => {
    if (!isLoggedIn) {
      setIsOpenLoginModal(true);
      return;
    }

    await onUploadImage();
  };

  const handleNavigate = (index: number) => {
    if (index >= 0 && index < result.length) {
      setActiveResultIndex(index);
    }
  };

  return (
    <MainLayout>
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

          <div
            className='relative z-4 -mt-[470px] mb-[370px] ml-[40%] flex flex-col w-[500px] h-[350px] max-[1500px]:h-[285px] max-[1200px]:-mt-[400px] max-150 big-screen-size small-screen-size'
            style={
              {
                '--inner-height': `${windowHeight.height}px`,
              } as React.CSSProperties
            }
          >
            <div className='flex'>
              <div className='text-lg'>해외 이미지를 넣으면&nbsp;</div>
              <b className='text-lg'>국내에서 가장 비슷한 곳</b>
              <div className='text-lg'>을 찾아드려요!</div>
            </div>

            <div
              {...getRootProps()}
              className={`flex items-center bg-gray-100 rounded-3xl shadow-md justify-center mt-[10px] `}
              style={{
                width: '100%',
                height: 'calc(100% - 100px)',
                margin: '10px 0',
              }}
            >
              <input
                {...getInputProps()}
                className='w-[300px] h-[300px] bg-transparent pl-[10px]'
              />
              {!image && <Image src={imageIcon} alt='UploadImageIcon.png' />}
              {image && (
                <img
                  src={image}
                  alt='Uploaded Preview'
                  className='w-[300px] h-[300px] object-cover'
                />
              )}
            </div>

            <div>
              <button
                onClick={handleButtonClick}
                disabled={!file}
                className={`w-[500px] h-[50px] rounded-3xl shadow-md mt-[10px] ${
                  file ? 'bg-cyan-300 active:bg-cyan-400' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {file ? '여기랑 비슷한 곳 찾아주세요!' : '이미지를 업로드 해주세요!'}
              </button>
              {errorMessage && <div className='text-red-500 mt-2'>{errorMessage}</div>}

              {loading && (
                <div className='flex justify-center mt-4'>
                  <ClipLoader size={50} color={'#36D7B7'} loading={loading} />
                </div>
              )}

              <Dialog open={dialogOpen && result.length > 0} onOpenChange={setDialogOpen}>
                {result.length > 0 && (
                  <DialogDemo
                    responseImage={result[activeResultIndex].image_url} // Pass the active image URL
                    location={result[activeResultIndex].location}
                    locationInfo={result[activeResultIndex].gal_title}
                    similarity={result[activeResultIndex].similarity}
                    isUploadedImageVisible={isUploadedImageVisible}
                    setIsUploadedImageVisible={setIsUploadedImageVisible}
                    image={image}
                    loading={loading}
                    totalResults={result.length} // Pass total results
                    activeResultIndex={activeResultIndex} // Pass current index
                    onNavigate={handleNavigate}
                  />
                )}
              </Dialog>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
