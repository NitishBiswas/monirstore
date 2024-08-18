import React, { useEffect, useState } from 'react';
import LOGO from '@/assets/images/full-logo.svg';
import Image from 'next/image';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const route = useRouter();
    const [auth, setAuth] = useState<string | null>(null);

    useEffect(() => {
        // Check if we are running in the browser
        if (typeof window !== "undefined") {
            const storedAuth = localStorage.getItem('monir');
            setAuth(storedAuth);
        }
    }, [route]);

    if (!auth) {
        return <Loading />;
    }

    return (
        <div className='bg-white font-poppins h-screen flex flex-col'>
            <div className='w-full bg-white h-[72px] flex items-center justify-center z-[1000000] fixed inset-0'>
                <div className='w-full sm:w-[400px] px-[10px] h-full flex items-center justify-between'>
                    <Image src={LOGO} alt='logo' width={200} className='' />
                    <CustomButton title='Log Out' size='medium' color='error' onClick={() => {
                        localStorage.removeItem("monir");
                        route.push("/login");
                    }} />
                </div>
            </div>
            <div className='overflow-y-auto custom-scrollbar w-full h-full bg-[#f5f5f5] mt-[72px] flex justify-center'>{children}</div>
        </div>
    )
}

export default DashboardLayout