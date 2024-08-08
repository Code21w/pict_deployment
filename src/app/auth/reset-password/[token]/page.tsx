"use client"; 

import ChangePassword from '../../../../components/login-join/ChangePassword';


interface Props {
  params: {
    token: string; 
  };
}

const SubPage: React.FC<Props> = ({ params }) => {
  const { token } = params; 

  return (
    <main className='password-reset-page'>
      {token ? (
        <ChangePassword token={token} />
      ) : (
        <p>Loading...</p> 
      )}
    </main>
  );
};

export default SubPage;