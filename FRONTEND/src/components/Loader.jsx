import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Loader = () => {

    const { navigate } = useAppContext();
    
    const { nextUrl } = useParams();

    useEffect(() => {
        if(nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`)
            },8000)
        }
    }, [nextUrl]);

  return (
    <>
        <div className='h-screen flex items-center justify-center'>
            <div className="animate-spin w-24 h-24 rounded-full border-4 border-gray-300 border-t-primary"></div>
        </div>
    </>
  )
}

export default Loader