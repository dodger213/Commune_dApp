import React, { useEffect, useState } from 'react';

import Popup from '../Popup/popup';
import classes from './module-details-modal.module.css';
import ModulesService from '../../../services/modules-service';
import classNames from 'classnames';
import Checkbox from '../Checkbox/checkbox';


export default function ModuleDetailsModal ({
    onClose,
    moduleName,
}) {
    const [ moduleDetails, setModuleDetails ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        ModulesService.getModuleDetailsByName(moduleName).then(details => {
            setModuleDetails(details);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return null;
    }
    console.log("loading", loading, moduleDetails)
    return (
        <Popup
            className={classNames(
                classes.popup,
                'bg-teal-100'
            )}
            onClose={onClose}
        >
            <span className={classes.address}>{moduleDetails.address}</span>
            <div className={
                classNames(
                classes.name,
                'bg-orange-200 rounded-lg border-2 border-solid'
            )}>
                Name: {moduleDetails.name}
            </div>
            {moduleDetails.description && (
                <div
                    className={classNames(
                        classes.description,
                        'bg-pink-200 rounded-lg border-2 border-solid'
                    )}
                >
                    Description: {moduleDetails.description}
                </div>
            )}
            {moduleDetails.schema && (
                <section className={classes.schemas}>
                    <div className={classes.schemasSubtitle}>Module Playground</div>
                    <SchemasList
                        schemas={moduleDetails.schema}
                    />
                </section>
            )}
        </Popup>
    );
}

function SchemasList ({
    schemas,
}) {
    return (
        <ul className={classes.schemasList}>
            {Object.entries(schemas).map(([schemaName, schemaValue]: [string, any]) => (
                <li key={schemaName} className={classes.schemaElement}>
                    <SchemaNameElement
                        name={schemaName}
                    />
                    <ul className={classes.inputsList}>
                        {Object.entries(schemaValue.input).map(([inputName, inputType]: [string, any]) => (
                            <InputElement
                                name={inputName}
                                type={inputType}
                                defaultValue={schemaValue.default[inputName]}
                            />
                        ))}
                        <OutputElement
                            outputValue={schemaValue.output}
                        />
                    </ul>
                </li>
            ))}
        </ul>
    );
}

function SchemaNameElement ({
    name,
}) {
    return (
        <div className={classNames(
            classes.schemaName,
            'bg-gray-200 rounded-lg border-2 border-solid'
        )}>
            {name}
        </div>
    );
}

function InputElement ({
    name,
    type,
    defaultValue,
}) {
    const [ value, setValue ] = useState<any>(defaultValue);

    let htmlInputElement = null;
    switch (type) {
        case 'int':
        case 'float':
            htmlInputElement = (
                <input
                    className={classNames(
                        classes.htmlInputElement,
                        "bg-yellow-200 rounded-lg"
                    )}
                    type="number"
                    onChange={e => setValue(e.target.value)}
                    value={value}
                />
            );
            break;
        case 'bool':
            htmlInputElement = (
                <Checkbox
                    name={name}
                    defaultValue={defaultValue}
                    text=""
                />
            );
            break;
        case 'str':
        case 'list':
        case 'dict':
            htmlInputElement = (
                <input
                    className={classNames(
                        classes.htmlInputElement,
                        "bg-yellow-200 rounded-lg"
                    )}
                    type="text"
                    onChange={e => setValue(e.target.value)}
                    value={value}
                />
            );
            break;
        case 'NA':
        default:
            break;
    }

    return (
        <li className={classNames(
            classes.input,
            'bg-yellow-300 rounded-lg border-2 border-solid'
        )}>
            {name}: {type}
            {htmlInputElement}
        </li>
    );
}

function OutputElement (outputValue) {
    return (
        <li className={classNames(
            classes.output,
            'bg-purple-200 rounded-lg border-2 border-solid'
        )}>
            {typeof outputValue === 'object' ? 'void' : outputValue}
        </li>
    );
}