'use client'
import React from 'react';
import LogoImage from '../../../public/gif/logo/CubesShufflingGIF.gif'
import Image from "next/image";
import { useRouter } from 'next/navigation';

const ProfilePage = () => {

    const router = useRouter()

    const handleUserProfile = () => {
        router.push('/settings/profile');
    }

    return (
        <div className='flex h-[70vh]'>
            <div className='w-[40%] bg-gray-400 dark:bg-[#212324] dark:text-white flex flex-col items-center justify-start'>
                <Image src={LogoImage} alt="image" width={400} height={400}
                    className="cursor-pointer mt-5" />
                <h1 className='mt-4'>
                    Alan Guerrero
                </h1>
                <div className='flex mt-4'>
                    <button className='gap-2 border-[rgb(229 231 235)] inline-flex cursor-pointer items-center justify-center rounded-[0.5rem] border-[1px] p-2 hover:scale-105' onClick={handleUserProfile}>
                        Edit profile
                    </button>

                    <button className='gap-2 border-[rgb(229 231 235)] inline-flex cursor-pointer items-center justify-center rounded-[0.5rem] border-[1px] p-2 ml-4 hover:scale-105'>
                        Settings
                    </button>
                </div>
            </div>

            <div className='w-[60%] mt-5 dark:text-white flex items-center justify-center'>
                This will appears user info
            </div>
        </div>
    )

}

export default ProfilePage;
