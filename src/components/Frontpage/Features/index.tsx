import React from 'react'; // importing FunctionComponent


// const FeatureList  = [
//     {
//       title: 'Easy to Use',
//       description: (
//         <>
//           Docusaurus was designed from the ground up to be easily installed and
//           used to get your website up and running quickly.
//         </>
//       ),
//     },
//     {
//       title: 'Focus on What Matters',
      
//       description: (
//         <>
//           Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
//           ahead and move your docs into the <code>docs</code> directory.
//         </>
//       ),
//     },
//     {
//       title: 'Powered by React',
  
//       description: (
//         <>
//           Extend or customize your website layout by reusing React. Docusaurus can
//           be extended while reusing the same header and footer.
//         </>
//       ),
//     },
//   ];

type FeatureProps = {
  title: string,
  description: string,
  children? : React.ReactNode
  className?: string
}

// Create a react component with typescript that takes in path to an image, title, description, and a path to possible images to the discritption
export const Feature: React.FC<FeatureProps> = ({title, description, children=null, className=""}) => {
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


/** */