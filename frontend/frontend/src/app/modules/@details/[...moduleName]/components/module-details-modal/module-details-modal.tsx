"use client";

import React, { useState } from "react";

import Popup from "../../../../../../components/popup/popup";
import classes from "./module-details-modal.module.css";
import { modulesList } from "../../../../../../services/modules-service";
import classNames from "classnames";
import Checkbox from "../../../../../../components/checkbox/checkbox";

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
    <Popup
      className={classNames(classes.popup, "bg-teal-100")}
      overlayUrl="/modules"
    >
      <span className={classes.address}>{moduleDetails.address}</span>
      <div className={classNames(classes.name, "bg-orange-200 rounded-lg border-2 border-solid")}>Name: {moduleDetails.name}</div>
      {moduleDetails.description && <div className={classNames(classes.description, "bg-pink-200 rounded-lg border-2 border-solid")}>Description: {moduleDetails.description}</div>}
      {moduleDetails.schema && (
        <section className={classes.schemas}>
          <div className={classes.schemasSubtitle}>Module Playground</div>
          <SchemasList schemas={moduleDetails.schema} />
        </section>
      )}
    </Popup>
  );
}

function SchemasList({
  schemas
}: {
  schemas: any,
}) {
  return (
    <ul className={classes.schemasList}>
      {Object.entries(schemas).map(([schemaName, schemaValue]: [string, any]) => (
        <SchemaNameElement key={schemaName} name={schemaName}>
          <ul className={classes.inputsList}>
            {Object.entries(schemaValue.input).map(([inputName, inputType]: [string, any]) => (
              <InputElement key={inputName} name={inputName} type={inputType} defaultValue={schemaValue.default[inputName]} />
            ))}
            <OutputElement outputValue={schemaValue.output} />
          </ul>
        </SchemaNameElement>
      ))}
    </ul>
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
    <li className={classNames(classes.schemaNameElement, "bg-gray-200 rounded-lg border-2 border-solid")}>
      {name.charAt(0).toUpperCase() + name.slice(1)}

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
      htmlInputElement = <input className={classNames(classes.htmlInputElement, classes.numericalInput, "bg-yellow-200 rounded-lg")} type="number" onChange={(e) => setValue(e.target.value)} value={value} />;
      break;
    case "bool":
      htmlInputElement = <Checkbox name={name} defaultValue={defaultValue} text="" />;
      break;
    case "str":
    case "list":
    case "dict":
      htmlInputElement = <input className={classNames(classes.htmlInputElement, "bg-yellow-200 rounded-lg")} type="text" onChange={(e) => setValue(e.target.value)} value={value} />;
      break;
    case "NA":
    default:
      break;
  }

  return (
    <li className={classNames(classes.inputWrapper)}>
      <div className={classNames(classes.inputDescription, "bg-yellow-300 rounded-lg border-2 border-solid")}>
        {name}: {type}
      </div>
      <div className={classNames(classes.htmlInputElementWrapper, "bg-yellow-200 rounded-lg border-2 border-solid")}>{htmlInputElement}</div>
    </li>
  );
}

function OutputElement(outputValue: any) {
  return <li className={classNames(classes.output, "bg-purple-200 rounded-lg border-2 border-solid")}>{typeof outputValue === "object" ? "void" : outputValue}</li>;
}

function RunButton() {
  return (
    <button className={classNames(classes.runButton, "bg-green-400 rounded-lg border-2 border-solid border-black")} onClick={() => alert("Not implemented.")}>
      RUN
    </button>
  );
}
