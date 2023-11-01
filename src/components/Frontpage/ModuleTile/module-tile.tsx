import React from 'react';
import classNames from 'classnames';

import classes from './module-tile.module.css';

export default function ModuleTile ({
    image_url,
    name,
    address,
    description,
    attributes,
    onClick,
}) {
    return (
        <li
            className={classNames(
                classes.moduleTile,
                "shadow-xl z-40 rounded-lg border-2 border-solid shadow-md bg-teal-50"
            )}
            onClick={onClick}
        >
            <div className={classNames(classes.name, "bg-blue-100 rounded-lg border-2 border-solid")}>
                name: {name}
            </div>
            <div className={classNames(classes.address, "bg-orange-200 rounded-lg border-2 border-solid")}>
                address: {address}
            </div>
            <div className={classNames(classes.imageWrapper, "bg-green-100 rounded-lg border-2 border-solid")}>
                {image_url ? (
                    <img src={image_url} className={classNames(classes.image, "rounded-lg")}/>
                ) : (
                    "No image"
                )}
            </div>
            {description && (
                <div className={classNames(classes.description, "bg-pink-100 rounded-lg border-2 border-solid")}>
                    description: {description}
                </div>
            )}
            {attributes && (
                <div className={classes.attributes}>
                    {attributes.map(attribute => (
                        <div
                            key={attribute}
                            className={classNames(classes.attribute, "bg-yellow-300 rounded-lg border-2 border-solid")}>
                            {attribute}
                        </div>
                    ))}
                </div>
            )}
        </li>
    );
}