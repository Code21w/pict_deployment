// pages/travelplan.tsx
'use client';

import { useState, useEffect } from 'react';
import Map from '../../components/kakaoMap/kakaoMap'; 

export default function Home() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting current position:', error);
        // 기본 위치 설정
        setLatitude(37.5665);
        setLongitude(126.9780);
      }
    );
  }, []);

  return (
    <div>
      {/* <h1>Welcome to My App</h1> */}
      {latitude !== 0 && longitude !== 0 && (
        <Map latitude={latitude} longitude={longitude} />
      )}
    </div>
  );
}



