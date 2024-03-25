
import React, { useState, useEffect } from 'react';
import { GhostNavbar, GhostButton } from "react-hamburger-menus";
import "react-hamburger-menus/dist/style.css";
import modules from '../../../../modules.json';

import Link from "next/link"

const HamburgerModal: React.FC = () => {
  // function rgba(arg0: number, arg1: number, arg2: number): import("csstype").Property.BackgroundColor | undefined {
  //   throw new Error('Function not implemented.');
  // }

  return (   

    <GhostNavbar
      styles={
        {
          navigationButton: {
            // borderRadius: "5px",
            //  width: "20px",
            //  height: "20px",  
            backgroundColor: "SteelBlue",
            // opacity: 1,
          },
          navigationBackground: {
            opacity: 0.9,
            backgroundColor: '#06b6d4',
          },
          navigation: { fontFamily: 'Arial, Helvetica, sans-serif' },
        }
      }

      floatButtonY={8}

      floatButtonX={0.1}
    >
      <ul>
        {modules.map((item, key) => (
          <li><Link href={item.url} className='text-black'><p className="text-4xl font-extrabold text-gray-900 dark:text-blue">{item.name}</p></Link></li>
        ))}
      </ul>
    </GhostNavbar>   
  );
};

export default HamburgerModal;
