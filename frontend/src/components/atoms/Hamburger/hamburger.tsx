import React from 'react';
import Link from "next/link"
import { GhostNavbar } from "react-hamburger-menus";
import "react-hamburger-menus/dist/style.css";
import modules from '../../../../modules.json';

const HamburgerModal: React.FC = () => {
  // function rgba(arg0: number, arg1: number, arg2: number): import("csstype").Property.BackgroundColor | undefined {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <GhostNavbar
      styles={{
        navigationButton: {
          borderRadius: "5px",
          width: "2vw",
          height: "2vw",
          backgroundColor: "rgb(59 130 246)",
        },
        navigationBackground: {
          opacity: 0.95,
          backgroundColor: ' SteelBlue',
        },
        navigation: { fontFamily: 'Arial, Helvetica, sans-serif' },
      }}
      floatButtonY={1}
      floatButtonX={0.1}
    >
      <ul>
        {
          modules.map((item, key) => (
            <li key={key}><Link href={item.url} className='text-black'><p className="text-4xl font-extrabold text-gray-900 dark:text-blue">{item.name}</p></Link></li>
          ))
        }
      </ul>
    </GhostNavbar>
  );
};

export default HamburgerModal;
