import Image from 'next/image';
import BasicImage from '../../../../../public/img/frontpage/blockchain-1.png';
import Card from "../../../components/atoms/card";
import { useRouter } from "next/navigation";

type ModuleItemPropsType = {
    title: string;
    group: string;
    imageLink: string;
    logoLink: string;
}


const ModuleItem = ( { title, group, imageLink, logoLink } : ModuleItemPropsType ) => {
	const router = useRouter()

	const onClickItemHandle = (name: string) => {
		router.push(`/modules/interface/app/dashboard?modulename=${name}`)
	};

    return (
        <Card className="p-[20px] cursor-pointer">
            <div onClick={() => onClickItemHandle(title)}>
                <p className="text-[#0e0e0e] text-[14px] break-words max-w-[350px] h-[36px]">
                    {title}
                </p>
                <div className="mt-[10px]">
                    <Image src={BasicImage} className='w-[450px] h-[350px]' width={500} height={400} alt=''/>
                </div>
                <div className="mt-[20px]">
                    <p className='text-[50px] text-center'>👁</p>
                </div>
            </div>
        </Card>
    )

}


export default ModuleItem;