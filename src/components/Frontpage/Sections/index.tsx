import React from 'react';

// static data
// --None--


// type
type SectionProps = {
    src : string,
    className? : string,
    children? : [React.ReactNode] | React.ReactNode,
    id : string
}

// Helper components fn (function(s))
// --None--

// Main fn
export const Section: React.FC<SectionProps> = ({src, className, children=null, id}) => {
    // create a component that neatly places a image and text underneath 
    return (
    <section id={id} className='pt-10'>
        <div className={`py-10 px-5`}>
            <div className={` mt-10 flex lg:flex-row flex-col items-center justify-center gap-10 ${className} rounded-lg shadow-xl`}>   
                {/* Image */}
                <div className=' flex-none lg:-mr-4 m-10 mt-20'>
                    <img src={src} className='w-[200px] h-[200px] duration-300'/>
                </div>

                {/* Text */}
                <div className=' flex-initial w-full'>
                    {
                        React.Children.map(children, (child) => {return child;})
                    }
                </div>
            </div>
        </div>
    </section>);
};