import React from 'react';
import KakaoMap from '../../components/subpage/kakaoMap';

function SubPage() {
  return (
    <main className='bg-white h-screen'>
      <div className='flex items-center justify-center py-4'>img</div>
      <div className={`font-['Cafe24Moyamoya-Face-v1.0'] text-center text-5xl`}>
        여기는 oo 같아요!
      </div>
      <div className='flex items-center justify-center py-4'>유사율 80%</div>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-center w-3/4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum vel vero harum soluta, dolor
          a esse repudiandae quia, excepturi dignissimos perferendis delectus quod eaque alias optio
          sint! Ipsum, possimus tenetur? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Consequuntur consequatur iure ratione reprehenderit cumque. Ipsum ad beatae quidem
          molestiae, nulla nesciunt labore, alias nostrum ipsam earum magnam ipsa dolorum
          repudiandae?
        </p>
        <p className='text-center w-3/4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum vel vero harum soluta, dolor
          a esse repudiandae quia, excepturi dignissimos perferendis delectus quod eaque alias optio
          sint! Ipsum, possimus tenetur? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Consequuntur consequatur iure ratione reprehenderit cumque. Ipsum ad beatae quidem
          molestiae, nulla nesciunt labore, alias nostrum ipsam earum magnam ipsa dolorum
          repudiandae?
        </p>
      </div>
      <div className='flex flex-col items-center justify-center w-screen'>
        <KakaoMap />
      </div>
    </main>
  );
}
export default SubPage;
