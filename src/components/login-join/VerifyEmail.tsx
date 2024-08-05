'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UserContext } from './UserContext'; // Import your UserContext

interface TokenType {
    token: string;
}

const VerifyEmail: React.FC<TokenType> = ({ token }) => {
    const router = useRouter();
    const context = useContext(UserContext); // Access UserContext
    const [isValid, setIsValid] = useState<boolean | null>(null); // Track validity
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [errorMessage, setErrorMessage] = useState(''); // Store error message
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    // Ensure context is available
    if (!context) {
        throw new Error('UserContext is undefined. Please ensure you are within a UserProvider.');
    }
    const { setUser } = context; // Destructure setUser from context

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.post(`http://localhost:3000/api/true-register/${token}`); // API endpoint
                console.log(response);
                const isRegistrationSuccessful = response.data.message === '회원가입이 완료되었습니다.';
                console.log()
                setIsValid(isRegistrationSuccessful); // Set validity based on API response
                setIsModalOpen(true); // Open the modal

                if (isRegistrationSuccessful) {
                    // Update user context with response data
                    // setUser({
                    //     displayName: response.data.user.display_name, // Adjust as per your response structure
                    //     email: response.data.user.email, // Adjust as per your response structure
                    // });

                    // Redirect after a short delay
                    setTimeout(() => {
                        router.push('/'); // Redirect to the main page
                    }, 2000); // Delay for 2 seconds
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                setIsValid(false); // Set to false if there's an error
                setErrorMessage('Token verification failed. Please try again.'); // Handle error message
                setIsModalOpen(true); // Open the modal to show the error message
            } finally {
                setIsLoading(false); // Set loading to false once the request is complete
            }
        };

        if (token) {
            verifyToken(); // Call verifyToken if a token is present
        }
    }, [token, router, setUser]);

    // Show loading state while verifying the token
    if (isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}> {/* Show the modal based on modal state */}
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle className={`font-['Cafe24Moyamoya-Face-v1.0'] text-center text-3xl`}>
                        {isValid === null ? 'Loading...' : isValid ? 'Welcome!' : 'Invalid Token'}
                    </DialogTitle>
                </DialogHeader>
                <div>
                    {isValid === null ? (
                        <p>로딩중...</p>
                    ) : isValid ? (
                        <p>회원가입이 완료되었습니다! <br/> 웹사이트의 여러가지 기능들을 즐겨 보세요.</p>
                    ) : (
                        <p>{errorMessage || '죄송합니다. 이 링크는 더 이상 유효하지 않습니다.'}</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default VerifyEmail;

