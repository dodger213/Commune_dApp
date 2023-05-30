import React from 'react';


type SectionProps = {
    title : string,
    className?: string,
    id?: string,
    children: React.ReactNode
}


export const Section : React.FC<SectionProps> =  ({title, className="", id="", children}) => {

    return(<>
        <div id={id} className={`flex flex-col justify-center items-center ${className}`}>
            <h1 className="text-4xl font-bold">{title}</h1>
            <div className="flex flex-row justify-center items-center">
                {React.Children.map(children, (child) => {
                    return(child)
                })}
            </div>
        </div>

    </>)
    
}