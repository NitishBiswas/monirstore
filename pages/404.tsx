import Image from "next/image";
import React from "react";
import NOT_FOUND from '@/assets/images/404.svg';
import { usePathname } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
    const pathName = usePathname();
    return (
        <div className="h-screen w-screen flex flex-col gap-[10px] justify-center items-center px-[20px]">
            <Head>
                <title>SubScout | Page Not Found</title>
            </Head>
            <Image src={NOT_FOUND} style={{ height: '70%' }} alt="not found" objectFit="contain" objectPosition="center" />
            <div>
                <h3 className="text-center">The requested URL <span className="font-semibold">{pathName}</span> was not found on this server.</h3>
                <h2 className="text-center text-gray-300">That’s all we know.</h2>
            </div>
            <Link className={`bg-primary hover:bg-white border-[1px] border-primary text-white hover:text-primary rounded-[6px] py-[10px] px-[20px] mt-[28px]`} href={"/"}>Back Home</Link>
        </div>
    )
}
