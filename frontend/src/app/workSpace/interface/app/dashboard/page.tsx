"use client";

import React from "react";
import { useSearchParams } from 'next/navigation'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { EditOutlined, FontSizeOutlined, HomeOutlined } from "@ant-design/icons";
import { modulesList } from "../../../../../services/modules-service";
import { SchemasList } from "@/app/modules/components/module-tile/modal";
import classes from "./modal.module.css";
import Image from "next/image";

const ModulePage = () => {

    const search = useSearchParams();

    const moduleName = search.get('modulename');

    const onChange = (key: string) => {
        console.log(key);
    };

    const moduleDetails = modulesList.find((module) => module.name === moduleName);

    if (!moduleDetails) {
        return null;
    }


    const AddressComponent = <>
        <div className={"flex dark:text-white justify-between"}>
            <div className="flex items-center justify-center">
                <strong style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}>
                    Address:
                </strong>
                {moduleDetails.address}
            </div>
            {moduleDetails.image_url && <Image src={moduleDetails.image_url} alt="image" width={60} height={60} />}
        </div>
        {moduleDetails.schema && (
            <section className={classes.schemas} style={{ marginBottom: "0.3rem" }}>
                <div
                    className={classes.schemasSubtitle}
                    style={{ marginBottom: "0.3rem", marginTop: "0.5rem" }}
                >
                    <strong style={{ fontSize: "1.1rem", marginRight: "0.3rem" }}>
                        Module Playground
                    </strong>
                </div>
                <SchemasList schemas={moduleDetails.schema} />
            </section>
        )}
    </>

    const NameComponent = <>
        <div className={"flex dark:text-white justify-between"}>
            <div className="flex items-center justify-center">
                <strong style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}>
                    Name:
                </strong>
                {moduleDetails.name}
            </div>
            {moduleDetails.image_url && <Image src={moduleDetails.image_url} alt="image" width={60} height={60} />}

        </div>
        {moduleDetails.schema && (
            <section className={classes.schemas} style={{ marginBottom: "0.3rem" }}>
                <div
                    className={classes.schemasSubtitle}
                    style={{ marginBottom: "0.3rem", marginTop: "0.5rem" }}
                >
                    <strong style={{ fontSize: "1.1rem", marginRight: "0.3rem" }}>
                        Module Playground
                    </strong>
                </div>
                <SchemasList schemas={moduleDetails.schema} />
            </section>
        )}
    </>

    const DescriptionComponent = <>
        <div
            className={"flex dark:text-white justify-between"}
        >
            Description: {moduleDetails.description}
            {moduleDetails.image_url && <Image src={moduleDetails.image_url} alt="image" width={60} height={60} />}

        </div>
        {moduleDetails.schema && (
            <section className={classes.schemas} style={{ marginBottom: "0.3rem" }}>
                <div
                    className={classes.schemasSubtitle}
                    style={{ marginBottom: "0.3rem", marginTop: "0.5rem" }}
                >
                    <strong style={{ fontSize: "1.1rem", marginRight: "0.3rem" }}>
                        Module Playground
                    </strong>
                </div>
                <SchemasList schemas={moduleDetails.schema} />
            </section>
        )}</>

    const items: TabsProps['items'] = [
        { key: '1', label: 'Address', children: AddressComponent, icon: <HomeOutlined />, className: 'dark:text-white', },
        { key: '2', label: 'Name', children: NameComponent, icon: <FontSizeOutlined />, className: 'dark:text-white' },
        { key: '3', label: 'Description', children: DescriptionComponent, icon: <EditOutlined />, className: 'dark:text-white' },
    ];

    return (
        <div className="w-[80%] mx-auto mt-6">
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
            />
        </div>
    );
};

export default ModulePage;;
