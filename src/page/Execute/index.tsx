import {Button, Input, InputNumber, message, Space} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, {useState} from "react";
import ViewMarkDown from "../../components/ViewMarkDown";
import {useWallet} from "@soterhq/aleo-wallet-adapter-react";
import {Transaction, WalletAdapterNetwork, WalletNotConnectedError} from "@soterhq/aleo-wallet-adapter-base";

export default function Execute() {
  const { publicKey, requestTransaction } = useWallet();

  const [executeData, setExecuteData] = useState({
    programID: "",
    functionName: "",
    inputs: "",
	fee:""
  });
  function isDisabled() {
    return executeData.programID === "" || executeData.functionName === "" || executeData.inputs === "";
  }

  const startDec = WorkerConnect()

  function WorkerConnect() {
    return (`

### sample code
~~~ js
 const aleoTransaction = Transaction.createTransaction(
 
            'address',
            'testnet3',
            'credits.aleo',
            'public',
            inputs,
            0 
        );

await window.soterWallet.requestTransaction(aleoTransaction);
~~~
          `)
  }

  async function handleTransfer() {
    if (!publicKey) throw new WalletNotConnectedError();
    if (executeData.inputs && executeData.functionName && executeData.programID) {
      let inputs = executeData.inputs.split("\n")
      const aleoTransaction = Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        executeData.programID,
        executeData.functionName,
        inputs,
        Number(executeData.fee)*1000000
	);
      if (aleoTransaction && requestTransaction) {
        await requestTransaction(aleoTransaction); // TODO 处理返回的transactionID
      }
    } else {
      message.error("Complete all required fields!")
    }
  }

  return (
    <div style={{ margin: "16px" }}>
      <h1>Execute</h1>
      <Space size={[8, 16]} direction="vertical" style={{ display: "flex", width: "60%" }}>
        <Input
          size={"large"}
          value={executeData.programID}
          placeholder={"Program ID (credits.aleo)"}
          onChange={e => {
            setExecuteData({
              ...executeData,
              programID: e.target.value,
            });
          }}
        />
        <Input
          size={"large"}
          value={executeData.functionName}
          placeholder={"Function Name"}
          onChange={e => {
            setExecuteData({
              ...executeData,
              functionName: e.target.value,
            });
          }}
        />
        <TextArea
          size={"large"}
          rows={5}
          value={executeData.inputs}
          placeholder={"Inputs (Input arguments separated by a newline)"}
          onChange={e => {
            setExecuteData({
              ...executeData,
              inputs: e.target.value,
            });
          }}
        />

			<InputNumber
					style={{ width: '100%' }}
					controls={false}
					size={'large'}
					value={executeData.fee}
					placeholder={'Fee (in microcredits)'}
					onChange={(value) => {
						setExecuteData({
							...executeData,
							fee: value ? value : '',
						});
					}}
				/>

        <div style={{ width: "60%", marginTop: "16px", textAlign: "center" }}>
          {publicKey ? (
            <Button
              size={"large"}
              type="primary"
              style={{ marginLeft: "8px" }}
              disabled={isDisabled()}
              onClick={handleTransfer}>
              Submit
            </Button>
          ) : (
            <Button size={"large"} type="primary" disabled>
              Connect Your Wallet
            </Button>
          )}
        </div>
      </Space>
      <ViewMarkDown textContent={startDec} darkMode={false} />
    </div>
  );
}
