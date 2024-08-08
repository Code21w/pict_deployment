'use client';

import React, { useEffect } from 'react';

function KakaoMap() {
  useEffect(() => {
    // DOM을 이용하여 script 태그를 만들어주자.
    const mapScript = document.createElement('script');
    // script.async = true 라면,
    // 해당 스크립트가 다른 페이지와는 비동기적으로 동작함을 의미한다.
    mapScript.async = true;
    // script.src에 map을 불러오는 api를 넣어주자.
    // 여기에서 우리가 기존에 발급 받았던 apiKey를 넣어주면 된다.
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c97a2941e3a63026f2461c0db2f6e7e2&autoload=false`;

    //이제 우리가 만든 script를 document에 붙여주자.
    document.head.appendChild(mapScript);

    // script가 완전히 load 된 이후, 실행될 함수
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        new window.kakao.maps.Map(mapContainer, mapOption);
      });
    };

    // sciprt가 완전히 load 된 이후, 지도를 띄우는 코드를 실행시킨다.
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);

  return <div id='map' className='w-3/4 h-96'></div>;
}

export default KakaoMap;
