import React, { useState } from "react";
import { useWallet } from "@soterhq/aleo-wallet-adapter-react";
import { WalletAdapterNetwork, WalletNotConnectedError } from "@soterhq/aleo-wallet-adapter-base";
import { Button, Input, InputNumber, Space, message } from "antd";
import ViewMarkDown from "../../components/ViewMarkDown";
import { AleoDeployment } from "@soterhq/aleo-wallet-adapter-base/deployment";

export default function DeployPage() {
  const [program, setProgram] = useState("")
  const [fee, setFee] = useState<string>('')
  const startDec = WorkerConnect()

  const { publicKey, requestDeploy } = useWallet();

  function WorkerConnect() {
    return (`

###  sample code：

~~~ js
 let prams = {
 
                address: publicKey!!,
                chainId: WalletAdapterNetwork.Testnet,
                program: program,
                fee: fee,
            } as AleoDeployment

await window.soterWallet.requestDeploy(prams)
~~~
          `)
  }

  async function deployProgram() {
    if (!publicKey) throw new WalletNotConnectedError();
    const regex = /^\d+(\.\d{0,6})?$/;
    const res = fee ? regex.test(fee) : true;
    if (program && res) {
      let prams = {
        address: publicKey!!,
        chainId: WalletAdapterNetwork.Testnet,
        program: program,
        fee: Number(fee),
      } as AleoDeployment
      const deployID = await requestDeploy?.(prams);
    } else {
      fee ? message.error("The fee cannot exceed 6 decimal places") : message.error('Invalid fee value');
    }


  }

  return (<div style={{ margin: "16px" }}>
    <h1>Deploy Program</h1>
    <Space direction={"vertical"} size={"large"} style={{ width: "100%" }}>
      <Input.TextArea
        value={program} rows={8} placeholder={"The full program code (in aleo instructions)"}
        onChange={(e) => {
          setProgram(e.target.value)
        }} />

      <InputNumber
        style={{ width: '20%' }}
        controls={false}
        size={"large"}
        value={fee}
        placeholder={"Fee (in microcredits)"}
        onChange={value => {
          setFee(value ? value : "")
        }}
      />
    </Space>


    <div style={{ width: "60%", marginTop: "16px", textAlign: "center" }}>
      {publicKey ? (
        <Button
          size={"large"}
          type="primary"
          style={{ marginLeft: "8px" }}
          disabled={program == ""}
          onClick={deployProgram}>
          Deploy
        </Button>
      ) : (
        <Button size={"large"} type="primary" disabled>
          Connect Your Wallet
        </Button>
      )}
    </div>

    <ViewMarkDown textContent={startDec} darkMode={false} />

  </div>)
}