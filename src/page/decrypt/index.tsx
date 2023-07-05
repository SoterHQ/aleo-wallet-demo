import "./index.css"
import {Button, Input} from "antd";
import React, {useEffect, useState} from "react";
import {useStore} from "../../context";
import {decryptRecord} from "../../api";
import {DecryptRecordData, RecordData} from "../../model";
import ReactJson from "react-json-view";
import ViewMarkDown from "../../components/ViewMarkDown";

export default function Decrypt() {
    const [cipher, setCipher] = useState("")
    const [recordData, setRecordData] = useState({} as DecryptRecordData)

    const [state, dispatch] = useStore()


    const startDec = WorkerConnect()


    function WorkerConnect() {
        return (`

###  示例代码：

~~~ js
await window.wallet.features['standard:decrypt'].decrypt(["your record"])
~~~
          `)
    }

    async function OnclickDecrypt() {
        let data = await decryptRecord(cipher)
        console.log(data)
        if (data && data.length>0) {
            setRecordData(data[0])
        } else {
            setRecordData({} as DecryptRecordData)
        }
    }

    return (<div style={{margin: "16px"}}>
        <h1>DECRYPT</h1>
        <div style={{display: "flex", width: "100%"}}>
            <Input.TextArea value={cipher} rows={3} placeholder={"Cipher Text To Decrypt"} onChange={(e) => {
                setCipher(e.target.value)
            }}/>
            <div style={{marginLeft: "16px"}}>
                {
                    state.walletConnected ?
                        <Button type="primary" style={{marginLeft: "8px"}} disabled={cipher == ""}
                                onClick={OnclickDecrypt}>Decrypt</Button> :
                        <Button type="primary" disabled>Connect Your Wallet
                        </Button>
                }
            </div>
        </div>
        {
            recordData && recordData.dyRecord ?
                <div style={{
                    width: "100%",
                    background: "white",
                    marginTop: "16px",
                    padding: "16px",
                    borderRadius: "5px"
                }}>
                    <div style={{whiteSpace:"pre-wrap",color:"green",fontWeight:"400",lineHeight:"2"}}>{recordData.dyRecord}</div>
                </div> : null
        }

        <ViewMarkDown textContent={startDec} darkMode={false}/>

    </div>)
}