'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import KakaoMapByCoordinates from '@/components/subpage/kakaoMapInSubpage';

function SubPage() {
  const [imageUrl, setImageUrl] = useState('');
  const [insertImage, setInsertImage] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; name: string }>({
    latitude: 0,
    longitude: 0,
    name: '위치 정보가 없습니다.',
  });
  const [result, setResult] = useState('');
  const [explanation, setExplanation] = useState('');
  const [similarity, setSimilarity] = useState('');
  const [similarityReason, setSimilarityReason] = useState('');

  useEffect(() => {
    const uploadFileResponse = sessionStorage.getItem('uploadFileResponse');
    const locationInfoResponse = sessionStorage.getItem('locationInfoResponse');
    const uploadedImage = sessionStorage.getItem('uploadedImage');
    const generatedImage = sessionStorage.getItem('generatedImage');

    const parsedUploadFileResponse = uploadFileResponse ? JSON.parse(uploadFileResponse) : null;
    const parsedLocationInfoResponse = locationInfoResponse
      ? JSON.parse(locationInfoResponse)
      : null;
    const parsedGeneratedImage = generatedImage ? JSON.parse(generatedImage) : null;

    if (parsedLocationInfoResponse) {
      parsedLocationInfoResponse.response[0].explanation =
        parsedLocationInfoResponse.response[0].explanation.replace(/\\n/g, '\n');
    }

    if (parsedGeneratedImage) {
      parsedGeneratedImage.response = parsedGeneratedImage.response.replace(/\*/g, '');
    }

    if (parsedUploadFileResponse && parsedLocationInfoResponse) {
      const result = parsedUploadFileResponse.result[0];
      setImageUrl(result.image_url);
      setResult(result.location);
      setInsertImage(uploadedImage || `data:image/png;base64,${result.base64_image}`);
      setLocation({
        longitude: result.mapx * 0.0000001,
        latitude: result.mapy * 0.0000001,
        name: result.location,
      });
      setExplanation(parsedLocationInfoResponse.response[0].explanation);
      setSimilarity(Math.round(result.similarity).toString());
      setSimilarityReason(parsedGeneratedImage ? parsedGeneratedImage.response : null);
    }
  }, []);
  const handleToggleImage = () => {
    setIsImage((prev) => !prev);
  };

  return (
    <main className='bg-white h-screen flex flex-col items-center overflow-y-scroll py-8'>
      <div className='w-full flex justify-center'>
        <div className='w-[1000px] h-[400px] flex items-center justify-center mt-8 mb-2'>
          {isImage ? (
            <img src={insertImage} alt='location' className='max-w-full max-h-full' />
          ) : (
            <img src={imageUrl} alt='location' className='max-w-full max-h-full' />
          )}
        </div>
      </div>
      <div className="font-['Cafe24Moyamoya-Face-v1.0'] text-center text-5xl mt-7 mb-10">
        <span className='text-4xl'>비슷한 장소로</span>{' '}
        <span className='text-blue-500'>{result}</span> <span className='text-4xl'>어때요?</span>
      </div>

      <div className='w-[1000px] flex justify-center items-center py-4 relative mb-10'>
        <div style={{ position: 'absolute', left: 'calc(50% - 500px)' }}>
          <Button variant='link' onClick={handleToggleImage}>
            {isImage ? '서버에서 받은 사진 보기' : '내가 넣은 사진 보기'}
          </Button>
        </div>
        <div className='absolute left-1/2 transform -translate-x-1/2'>유사율 {similarity}%</div>
      </div>
      <div className='flex flex-col items-center justify-center w-[1000px] mb-8'>
        <p className='text-left w-full mb-10'>{explanation}</p>
        <p className='text-left w-full mb-8'>{similarityReason}</p>
        {/* Pass the location to the KakaoMap component */}
        <KakaoMapByCoordinates
          latitude={location.latitude}
          longitude={location.longitude}
          name={location.name}
        />
        <div className='w-full flex justify-end' style={{ maxWidth: 'calc(50% + 500px)' }}>
          <Link href='/travelplan'>
            <Button variant='link' className='mt-4 mb-8'>
              여행 계획 만들러가기
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SubPage;
