import React, { useState, useEffect } from 'react';
import * as SCROLL_TOP from '@/assets/data/top.json';
import Lottie from "lottie-react";

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <div onClick={scrollToTop} className={`z-50 fixed w-12 h-12 overflow-hidden rounded-full bottom-5 md:bottom-12 right-5 border-[1px] border-primary select-none cursor-pointer bg-white`}>
                    <div className='h-full w-full rotate-180'>
                        <Lottie animationData={SCROLL_TOP} loop={true} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScrollToTopButton;
