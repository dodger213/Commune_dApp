import React from 'react';
import classNames from 'classnames';

import classes from './module-tile.module.css';

// yes, technically it's not a map
const indexToColorClassesMap = [
    'bg-blue-50 border-blue-400',
    'bg-green-50 border-green-400',
    'bg-yellow-100/90 border-yellow-400',
    'bg-red-100 border-red-400',
    'bg-pink-50 border-pink-400'
];

export default function ModuleTile ({
    name,
    description,
    index,
}) {
    return (
        <li className={classNames(
            classes.moduleTile,
            indexToColorClassesMap[index % indexToColorClassesMap.length],
            "shadow-xl z-40 rounded-lg border-2 border-solid shadow-md bg-blue-50 border-blue-400"
        )}>
            <span className={classes.tileName}>
                {name}
            </span>
        </li>
    );
}