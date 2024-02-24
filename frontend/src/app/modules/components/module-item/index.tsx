import Image from 'next/image';
import BasicImage from '../../../../../public/img/frontpage/blockchain-1.png';
import Card from "../../../components/atoms/card";

type ModuleItemPropsType = {
    title: string;
    group: string;
    imageLink: string;
    logoLink: string;
}


const ModuleItem = ( { title, group, imageLink, logoLink } : ModuleItemPropsType ) => {

    return (
        <Card className="p-[20px]">
            <p className="text-[#0e0e0e] text-[12px]">
                {title}
            </p>
            <div className="mt-[30px]">
                <Image src={BasicImage} className='w-[350px] h-[250px]' width={500} height={400} alt=''/>
            </div>
            <div className="mt-[20px]">
                <p className='text-[50px] text-center'>👁</p>
            </div>
        </Card>
    )

}


export default ModuleItem;