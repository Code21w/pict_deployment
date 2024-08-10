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
        // Set a default location (e.g., Seoul) in case of an error
        setLocation({
          latitude: 37.5665,
          longitude: 126.978,
        });
      }
    );
  }, []);

  return location;
};

interface MapProps {
  recommendedPlaces: {
    map_x: number; // Longitude
    map_y: number; // Latitude
    title: string;
  }[];
}

const Map: React.FC<MapProps> = ({ recommendedPlaces }) => {
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
          level: 12, // Adjust zoom level
        };
        const map = new window.kakao.maps.Map(container, options);

        // Initialize the InfoWindow once
        const infowindow = new window.kakao.maps.InfoWindow({
          content: '', // Initially empty content
        });

        // Create markers from recommendedPlaces
        recommendedPlaces.forEach((place) => {
          const markerPosition = new window.kakao.maps.LatLng(place.map_y, place.map_x);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          // Add a click event listener to the marker
          window.kakao.maps.event.addListener(marker, 'click', () => {
            // Set the content and position of the InfoWindow
            infowindow.setContent(`<div style="padding:5px;">${place.title}</div>`);
            infowindow.open(map, marker); // Open the InfoWindow at the marker's position

            // Move the map to the position of the clicked marke
          });
        });
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap);
      document.head.removeChild(mapScript); // Clean up script after component unmount
    };
  }, [latitude, longitude, recommendedPlaces]);

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
