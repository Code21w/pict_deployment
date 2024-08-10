// components/kakaoMap/kakaoMap.tsx

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

const useLocation = (): Location => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting current position:', error);
        setLocation({
          latitude: 37.5665,
          longitude: 126.978,
        });
      }
    );
  }, []);

  return location;
};

const Map: React.FC = () => {
  const { latitude, longitude } = useLocation();

  useEffect(() => {
    if (latitude === 0 && longitude === 0) return;

    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) {
          console.error('Map container element not found');
          return;
        }
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };
        const map = new window.kakao.maps.Map(container, options);

        const handleResize = () => {
          const mapWidth = window.innerWidth;
          const mapHeight = window.innerHeight;
          container.style.width = `${mapWidth}px`;
          container.style.height = `${mapHeight}px`;
          map.relayout();
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap);
    };
  }, [latitude, longitude]);

  return (
    <MapWrapper>
      <MapContainer id='map' />
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export default Map;
