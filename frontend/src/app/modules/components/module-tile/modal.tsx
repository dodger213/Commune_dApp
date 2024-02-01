"use client";

import React, { useState } from "react";

import classes from "./modal.module.css";
import { modulesList } from "../../../../services/modules-service";
import classNames from "classnames";
import { Checkbox, Tag } from "antd";
import { PlayCircleOutlined } from '@ant-design/icons';

export default function ModuleDetailsModal({
    name,
}: {
    name: string,
}) {

    const moduleDetails = modulesList.find((module) => module.name === name);

    if (!moduleDetails) {
        return null;
    }

    return (
        <div
            className={classNames(classes.popup)}
            style={{ padding: '.5rem', borderRadius: '.5rem' }}
        >
            <div className="flex items-center justify-between rounded-lg" style={{
                borderLeft: '5px solid green',
                padding: '10px 0 10px 25px',
                background: '#e0ffd1',
                marginBottom: '0.5rem'
            }}>
                <span className={classes.address} style={{
                    marginBottom: '0.5rem'
                }}><strong style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>Address:</strong>{moduleDetails.address}</span>
                <span className={classes.address} style={{ marginBottom: '0.5rem', marginRight: '0.5rem' }}><strong style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>Name:</strong>{moduleDetails.name}</span>
            </div>

            {moduleDetails.description && <div className={classNames(classes.description, " rounded-lg")} style={{
                marginBottom: '0.3rem', borderLeft: '5px solid green',
                padding: '10px 0 10px 25px',
                background: '#e0ffd1'
            }}>Description: {moduleDetails.description}</div>}
            {moduleDetails.schema && (
                <section className={classes.schemas} style={{ marginBottom: '0.3rem' }}>
                    <div className={classes.schemasSubtitle} style={{ marginBottom: '0.3rem', marginTop: '0.5rem' }}><strong style={{ fontSize: '1.1rem', marginRight: '0.3rem' }}>
                        Module Playground</strong></div>
                    <SchemasList schemas={moduleDetails.schema} />
                </section>
            )}
        </div>
    );
}

function SchemasList({
    schemas
}: {
    schemas: any,
}) {


    return (
        <>
            <ul className={classes.schemasList} style={{ padding: '0' }}>
                {Object.entries(schemas).map(([schemaName, schemaValue]: [string, any]) => (
                    <SchemaNameElement key={schemaName} name={schemaName}>
                        <ul className={classes.inputsList} style={{ padding: '0.5rem', marginBottom: '0.3rem' }}>
                            {Object.entries(schemaValue.input).map(([inputName, inputType]: [string, any]) => (
                                <InputElement key={inputName} name={inputName} type={inputType} defaultValue={schemaValue.default[inputName]} />
                            ))}
                            <OutputElement outputValue={schemaValue.output} />
                        </ul>
                    </SchemaNameElement>
                ))}
            </ul>
        </>
    );
}

function SchemaNameElement({
    children,
    name,
}: {
    children: React.ReactNode,
    name: string,
}) {
    return (
        <li className={classNames(classes.schemaNameElement, "bg-gray-200 rounded-lg border-1 border-solid")} style={{ padding: '0.7rem', marginBottom: '1rem' }}>
            <h4 style={{ marginBottom: '0' }}>{name.charAt(0).toUpperCase() + name.slice(1)}</h4>
            {children}
            <RunButton />
        </li>
    );
}

function InputElement({
    name,
    type,
    defaultValue,
}: {
    name: string,
    type: string,
    defaultValue: string | number | boolean,
}) {
    const [value, setValue] = useState<any>(defaultValue ?? "");

    let htmlInputElement = null;
    switch (type) {
        case "int":
        case "float":
            htmlInputElement = <input className={classNames(classes.htmlInputElement, classes.numericalInput, "rounded-lg")} type="number"
                onChange={({ target: { value } }) => setValue(value)} value={value} style={{ padding: '8px', borderColor: '#f9df34' }} />;
            break;
        case "bool":
            htmlInputElement = <Checkbox style={{ marginBottom: '0.3rem', marginTop: '0.7rem' }} defaultChecked />;
            break;
        case "str":
        case "list":
        case "dict":
            htmlInputElement = <input className={classNames(classes.htmlInputElement, "rounded-lg")} type="text"
                onChange={({ target: { value } }) => setValue(value)} value={value} style={{ padding: '8px', borderColor: '#f9df34' }} />;
            break;
        case "NA":
        default:
            break;
    }

    return (
        <form className={classNames(classes.inputWrapper)} style={type === 'bool' ? { display: 'flex', alignItems: 'center' } : { display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <label htmlFor="" style={{ fontFamily: 'Source Code Pro !important', marginBottom: '0.3rem', marginTop: '0.7rem', marginRight: '0.5rem', fontSize: '1rem' }}>{name}: <strong>{type}</strong></label>
            {htmlInputElement}
        </form>
    );
}

function OutputElement(outputValue: any) {
    return <div className="flex items-center" style={{ marginTop: '1rem' }}><span style={{ marginRight: '0.5rem', fontFamily: 'Source Code Pro !important' }}>Result: </span><Tag className={classNames(classes.output)} color="success" style={{ padding: '0.5rem', width: '100%' }}>{typeof outputValue === "object" ? "void" : outputValue}</Tag></div>;
}

function RunButton() {
    return (
        <button
            className='bg-[#7F57EA] text-white rounded-md p-2 hover:bg-[#5829D7] w-full'
            onClick={() => alert("Not implemented.")}
        >
            <PlayCircleOutlined style={{ marginRight: '0.5rem' }} />
            RUN
        </button>
    );
}
