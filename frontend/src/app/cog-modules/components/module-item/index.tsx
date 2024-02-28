import Image from 'next/image';
import Card from "../../../components/atoms/card";
import { useRouter } from "next/navigation";

import { IoRocketOutline } from "react-icons/io5";
import { cogDataType } from '../data/data';

type ModuleItemPropsType = {
    // id: string;
    // cardData: {
    //     title: string;
    //     emoji: string;
    //     colorFrom: string;
    //     colorTo: string;
    //     sdk: string;
    //     app_file: string;
    //     pinned: false
    // };
    data: cogDataType;
}


const ModuleItem = ({ data }: ModuleItemPropsType) => {
    const router = useRouter();
  
    const onClickItemHandle = () => {
        router.push(`https://replicate.com/${data.userName}/${data.actualName}`)
    };

    return (
        <div onClick={() => onClickItemHandle()} className="flex flex-col border-black  bg-white border-[1px] hover:cursor-pointer ">
            <div className="group-focus:ring flex-shrink-0">
                <div className="w-full h-[240px] relative">
                    <Image src={data.imagePath} layout="fill" objectFit="cover" alt="Image" />
                </div>
                <div className="flex">
                    <div className="p-3 flex flex-col justify-between">
                        <div>
                            <h4 className="inline-block group-focus:bg-black text-[22px]">
                                <span className="text-gray-400 ">{data.userName} </span>
                                <span className="text-gray-400 px-1">/</span>
                                <span className=" text-gray-700 ">{data.actualName}</span>
                            </h4>
                            <p className="text-[16px] group-focus:text-white">{data.description}</p>
                        </div>

                        {/* <div className="flex text-red-500 items-center text-center gap-x-[5px] mt-[10px]">
                                <IoRocketOutline className="w-[16px] h-[16px]"></IoRocketOutline>
                                <div className="text-[16px] text-center"> 12.7K runs</div>
                            </div> */}

                    </div>
                </div>


            </div>
        </div>
    )

}


export default ModuleItem;
