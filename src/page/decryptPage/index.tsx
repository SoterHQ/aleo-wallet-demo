import {Tabs, TabsProps} from "antd";
import React from "react";
import "./index.css"
import DecryptTab from "./compoment/DecryptTab";

export default function DecryptPage() {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Decrypt`,
            children: <DecryptTab/>,
        }
    ];

    return (<div className={"bg"}>
        <div className={"login_card"}>
        <Tabs
            style={{width: "100%"}}
            defaultActiveKey="1"
            items={items}
            onChange={onChange}/>
        </div>
    </div>)
}