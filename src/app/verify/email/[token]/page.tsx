'use client';

import VerifyEmail from '../../../../components/login-join/VerifyEmail';

interface Props {
  params: {
    token: string;
  };
}

const SubPage: React.FC<Props> = ({ params }) => {
  const { token } = params;

  return (
    <main className='w-full h-screen'>
      {token ? <VerifyEmail token={token} /> : <p>Loading...</p>}
    </main>
  );
};

export default SubPage;
