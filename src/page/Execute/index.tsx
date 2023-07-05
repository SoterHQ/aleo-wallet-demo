import { Button, Card, Input, InputNumber, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useStore } from "../../context";
import { execute, transfer } from "../../api";
import ViewMarkDown from "../../components/ViewMarkDown";

export default function Execute() {
	const [executeData, setExecuteData] = useState({
		programID: "",
		functionName: "",
		inputs: ""
	});
	const [state, dispatch] = useStore();
	function isDisabled() {
		return executeData.programID === "" || executeData.functionName === "" || executeData.inputs === "";
	}

	const startDec = WorkerConnect()


	function WorkerConnect() {
		return (`

### 示例代码： 
~~~ js
await window.wallet.features['standard:execute'].execute(params)
~~~
          `)
	}

	async function handleTransfer() {
		// TODO 调用钱包的转账接口  type:transfer
		let data = await execute(executeData);
		data && message.success("转账已经发送");
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
					value={executeData.inputs}
					placeholder={"Inputs (Input arguments separated by a newline)"}
					onChange={e => {
						setExecuteData({
							...executeData,
							inputs: e.target.value,
						});
					}}
				/>
				<div style={{ width: "60%", marginTop: "16px", textAlign: "center" }}>
					{state.walletConnected ? (
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
			<ViewMarkDown textContent={startDec} darkMode={false}/>
		</div>
	);
}
