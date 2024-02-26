import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Image from "next/image";
import LogoImage from '../../../../public/gif/logo/CubesShufflingGIF.gif'
import { useRouter } from 'next/navigation';

const ProfileDropDownComponent: React.FC = () => {

    const router = useRouter()

    const handleUserProfile = () => {
        console.log('clicked');
    }

    const handleProfile = () => {
        router.push('/profile')
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className='flex flex-col' onClick={handleProfile}>
                    <span>
                        profile
                    </span>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className='flex'>
                    <span>
                        Settings
                    </span>
                </div>
            ),
        },
    ];

    return (

        <Dropdown menu={{ items }} arrow={false}>
            <a onClick={(e) => e.preventDefault()}>
                <Space className='rounded-[50%] border-2 border-[#5252e4] dark:border-[white] flex items-center justify-center p-1'>
                    <Image src={LogoImage} alt="image" width={30} height={30}
                        className="cursor-pointer" onClick={handleUserProfile} />
                </Space>
            </a>
        </Dropdown>
    );
};

export default ProfileDropDownComponent;
