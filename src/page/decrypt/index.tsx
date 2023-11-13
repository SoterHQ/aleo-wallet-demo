import "./index.css"
import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { useStore } from "../../context";
import ViewMarkDown from "../../components/ViewMarkDown";
import { useWallet } from "@soterhq/aleo-wallet-adapter-react";
import { WalletNotConnectedError } from "@soterhq/aleo-wallet-adapter-base";

export default function Decrypt() {
  const [cipher, setCipher] = useState("")
  const [recordData, setRecordData] = useState("")

  const startDec = WorkerConnect()

  const { publicKey, decrypt } = useWallet();

  function WorkerConnect() {
    return (`

###  sample code:

~~~ js
await window.soterWallet.decrypt("your record")
~~~
          `)
  }

  async function OnclickDecrypt() {
    if (!publicKey) throw new WalletNotConnectedError();
    if (decrypt) {
      const decryptedPayload = await decrypt(cipher);
      if (decryptedPayload) {
        setRecordData(decryptedPayload);
      } else {
        message.info("This record does not belong to this account!")
      }
    }


  }

  return (<div style={{ margin: "16px" }}>
    <h1>Decrypt</h1>
    <div style={{ display: "flex", width: "100%" }}>
      <Input.TextArea value={cipher} rows={3} placeholder={"Cipher Text To Decrypt"} onChange={(e) => {
        setCipher(e.target.value)
      }} />
      <div style={{ marginLeft: "16px" }}>
        {
          publicKey ?
            <Button type="primary" style={{ marginLeft: "8px" }} disabled={cipher == ""}
              onClick={OnclickDecrypt}>Decrypt</Button> :
            <Button type="primary" disabled>Connect Your Wallet
            </Button>
        }
      </div>
    </div>
    {
      recordData ?
        <div style={{
          width: "100%",
          background: "white",
          marginTop: "16px",
          padding: "16px",
          borderRadius: "5px"
        }}>
          <div style={{ whiteSpace: "pre-wrap", color: "green", fontWeight: "400", lineHeight: "2" }}>{recordData}</div>
        </div> : null
    }

    <ViewMarkDown textContent={startDec} darkMode={false} />

  </div>)
}