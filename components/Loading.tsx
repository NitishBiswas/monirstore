import React from 'react';
import * as LOADING from '@/assets/data/loading.json';
import Lottie from "lottie-react";

const Loading = () => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 h-[100vh] w-[100vw] flex justify-center items-center z-[10000000000]'>
            <div className='h-[100vh] w-[100vw] fixed top-0 bottom-0 left-0 right-0 z-[10000] flex justify-center items-center bg-white/50 backdrop-blur-sm'>
                <div className='h-[240px] md:h-[340px] w-[240px] md:w-[340px]'>
                    <Lottie animationData={LOADING} loop={true} />
                </div>
            </div>
        </div>
    )
}

export default Loading