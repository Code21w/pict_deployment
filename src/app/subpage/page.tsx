'use client';
import fetchLocationInfo from '@/api/fetchLocationInfo';
import KakaoMapByCoordinates from '@/components/subpage/kakaoMapInSubpage';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import generateAndStoreImage from '../../api/generateAndStoreImage';

const ImageSkeleton = () => (
  <div className='w-[1000px] h-[400px] bg-gray-200 animate-pulse flex items-center justify-center mt-8 mb-2'>
    <div className='bg-gray-300 w-full h-full'></div>
  </div>
);

interface TextSkeletonProps {
  width?: string;
}

const TextSkeleton: React.FC<TextSkeletonProps> = ({ width }) => (
  <div className={`bg-gray-200 animate-pulse h-6 ${width ? width : 'w-full'} my-2`}></div>
);

function SubPage() {
  const searchParams = useSearchParams();
  const index = searchParams.get('index');

  const [imageUrl, setImageUrl] = useState('');
  const [insertImage, setInsertImage] = useState('');
  const isImage = false;
  const [location, setLocation] = useState<{ latitude: number; longitude: number; name: string }>({
    latitude: 0,
    longitude: 0,
    name: '위치 정보가 없습니다.',
  });
  const [result, setResult] = useState('');
  const [explanation, setExplanation] = useState('');
  const [similarity, setSimilarity] = useState('');
  const [similarityReason, setSimilarityReason] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uploadFileResponse = sessionStorage.getItem('uploadFileResponse');
    const uploadedImage = sessionStorage.getItem('uploadedImage');
    const parsedUploadFileResponse = uploadFileResponse ? JSON.parse(uploadFileResponse) : null;

    if (parsedUploadFileResponse && index !== null) {
      const resultArray = parsedUploadFileResponse.result;
      const idx = parseInt(index, 10);

      if (resultArray[idx]) {
        const selectedResult = resultArray[idx];

        const fetchInfo = async () => {
          setLoading(true);

          const locationInfo = await fetchLocationInfo(selectedResult.location);
          const similarityWhy = await generateAndStoreImage(
            parsedUploadFileResponse.image_url,
            selectedResult.location
          );
          setImageUrl(selectedResult.image_url);
          setResult(selectedResult.location);
          setInsertImage(uploadedImage || `data:image/png;base64,${selectedResult.base64_image}`);
          setLocation({
            longitude: selectedResult.mapx * 0.0000001,
            latitude: selectedResult.mapy * 0.0000001,
            name: selectedResult.gal_title,
          });
          setExplanation(locationInfo || '설명이 없습니다.');
          setSimilarity(selectedResult.similarity.toFixed(2));
          setSimilarityReason(similarityWhy.data.response || '오류가 발생했습니다.');
          setLoading(false);
        };

        fetchInfo().catch((error) => {
          console.error('Error fetching location info:', error);
          setLoading(false);
        });
      }
    }
  }, [index]);

  return (
    <main
      className='bg-white h-screen flex flex-col items-center overflow-y-scroll py-8'
      style={{ paddingBottom: '30px' }}
    >
      <div className='w-full flex justify-center'>
        {loading ? (
          <ImageSkeleton />
        ) : (
          <div className='w-[1000px] h-[400px] flex items-center justify-center mt-8 mb-2'>
            {isImage ? (
              <img src={insertImage} alt='location' className='max-w-full max-h-full' />
            ) : (
              <img src={imageUrl} alt='location' className='max-w-full max-h-full' />
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className='w-full flex flex-col items-center'>
          <TextSkeleton width='w-[300px]' /> {/* 제목 skeleton */}
          <TextSkeleton width='w-[200px]' /> {/* 유사도 skeleton */}
          <TextSkeleton width='w-[200px]' /> {/* 설명 skeleton */}
          <TextSkeleton width='w-[200px]' /> {/* 유사도 설명 reason skeleton */}
        </div>
      ) : (
        <>
          <div className="font-['Cafe24Moyamoya-Face-v1.0'] text-center text-5xl mt-7 mb-10">
            <span className='text-4xl'>비슷한 장소로</span>{' '}
            <span className='text-blue-500'>{result}</span>{' '}
            <span className='text-4xl'>어때요?</span>
          </div>

          <div className='w-[1000px] flex justify-center items-center py-4 relative mb-10'>
            <div className='absolute left-1/2 transform -translate-x-1/2'>유사율 {similarity}%</div>
          </div>
          <div className='flex flex-col items-center justify-center w-[1000px] mb-8'>
            <p className='text-left w-full mb-10'>{explanation}</p>
            <p className='text-left w-full mb-8'>{similarityReason}</p>
            <KakaoMapByCoordinates
              latitude={location.latitude}
              longitude={location.longitude}
              name={location.name}
            />
            <div className='w-full flex justify-end' style={{ maxWidth: 'calc(50% + 500px)' }}>
              <Link href={`/travelplan?index=${index}`}>
                <Button
                  variant='blue'
                  className='mt-4 mb-8 text-white flex items-center bg-blue-600 py-2 px-4 rounded'
                >
                  <span className='mr-2'>🗺️</span> {/* Map emoji */}
                  여행 계획 만들러가기
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default SubPage;
