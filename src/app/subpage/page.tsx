'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import KakaoMap from '../../components/subpage/kakaoMap';

function SubPage() {
  const [imageUrl, setImageUrl] = useState('');
  const [insertImage, setInsertImage] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [location, setLocation] = useState('');
  const [explanation, setExplanation] = useState('');
  const [similarity, setSimilarity] = useState('');
  const [similarityReason, setSimilarityReason] = useState('');

  useEffect(() => {
    const uploadFileResponse = JSON.parse(sessionStorage.getItem('uploadFileResponse'));
    const locationInfoResponse = JSON.parse(sessionStorage.getItem('locationInfoResponse'));
    const uploadedImage = sessionStorage.getItem('uploadedImage');
    const generatedImage = JSON.parse(sessionStorage.getItem('generatedImage'));

    if (uploadFileResponse && locationInfoResponse) {
      const result = uploadFileResponse.result[0];
      setImageUrl(result.image_url);
      setInsertImage(uploadedImage || `data:image/png;base64,${result.base64_image}`);
      setLocation(result.location);
      setExplanation(locationInfoResponse.response[0].explanation);
      setSimilarity(Math.round(result.similarity));
      setSimilarityReason(generatedImage.response);
    }
  }, []);

  const handleToggleImage = () => {
    setIsImage((prev) => !prev);
  };

  return (
    <main className='bg-white h-screen'>
      <Button variant='link' onClick={handleToggleImage} className='text-gray-500'>
        {isImage ? '서버에서 받은 사진 보기' : '내가 넣은 사진 보기'}
      </Button>
      <div className='flex items-center justify-center py-4'>
        {isImage ? <img src={insertImage} alt='location' /> : <img src={imageUrl} alt='location' />}
      </div>
      <div className={`font-['Cafe24Moyamoya-Face-v1.0'] text-center text-5xl`}>
        비슷한 장소로 {location} 어때요?
      </div>
      <div className='flex items-center justify-center py-4'>유사율 {similarity}%</div>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-center w-3/4'>{explanation}</p>
        <p className='text-center w-3/4'>{similarityReason}</p>
        <Link href='/travelplan'>
          <Button variant='link'>더 많은 정보 보러 가기</Button>
        </Link>
      </div>
      <div className='flex flex-col items-center justify-center w-screen'>{/* <KakaoMap /> */}</div>
    </main>
  );
}

export default SubPage;
