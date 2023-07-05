import {Button, Input} from "antd";
import React, {useState} from "react";

export interface AleoWalletRecord {
    recordCiphertext: string
}

export default function DecryptTab() {
    const [value, setValue] = useState("")

    /**
     * 点击
     * @constructor
     */
    function OnclickDecrypt() {
        let recordData = {
            recordCiphertext: value
        } as AleoWalletRecord
        // @ts-ignore
        window.aleoereum.decrypt({record: JSON.stringify(recordData)})
    }

    return (
        <div style={{width: "100%", display: "flex"}}>
            <Input value={value} placeholder={"Cipher Text To Decrypt"} onChange={(e) => {
                console.log(e.target.value)
                setValue(e.target.value)
            }}/>
            <Button type="primary" style={{marginLeft: "8px"}} onClick={OnclickDecrypt}>Decrypt</Button>
        </div>)
}