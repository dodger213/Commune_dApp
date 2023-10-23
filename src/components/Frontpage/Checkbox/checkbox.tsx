import React, { useState } from 'react';

import classes from './checkbox.module.css';


export default function Checkbox({
    name,
    text,
    defaultValue,
}) {
    const [ checked, setChecked ] = useState(!!defaultValue);

    return (
        <label className={classes.container}>
            {text}
            <input
                className={classes.input}
                type="checkbox"
                name={name}
                checked={checked}
                onClick={() => setChecked(state => !state)}
            />
            <div className={classes.checkmark}></div>
        </label>
    );
}