//import(s)
import React from 'react';

// static data
// --None--

// type
type FeatureProps = {
  title: string,
  description: string,
  children? : React.ReactNode
  className?: string
}

// Helper components fn (function(s))
// --None--


// Main fn
export const Feature: React.FC<FeatureProps> = ({title, description, children=null, className=""}) => {
    // Create a react component with typescript that takes in path to an image, title, description, and a path to possible images to the description
    return (
      <div className={`flex ${className}`}>
        <div className=" text-center ">
        { children &&

          <div className='flex justify-center'>
            {children}
          </div>
      }
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }
