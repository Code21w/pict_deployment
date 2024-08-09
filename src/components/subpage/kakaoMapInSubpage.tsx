import React, { useEffect, useRef } from 'react';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

const KakaoMapByCoordinates: React.FC<KakaoMapProps> = ({ latitude, longitude, name }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(script);

    script.onload = () => {
      if (!window.kakao) {
        console.error('Kakao Maps API not loaded');
        return;
      }

      window.kakao.maps.load(() => {
        const container = mapContainer.current;
        if (!container) {
          console.error('Map container not found');
          return;
        }

        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 10,
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>`,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
        });
      });
    };
    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude, name]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px', marginTop: '20px' }} />;
};

export default KakaoMapByCoordinates;
