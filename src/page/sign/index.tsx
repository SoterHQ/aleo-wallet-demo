import { Button, Divider, Input, Space, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { sign } from "../../api";
import { useStore } from "../../context";
import EllipsisMiddle from "../../components/EllipsisMiddle";
import ViewMarkDown from "../../components/ViewMarkDown";

export default function Sign() {
	const [signMessage, setSignMessage] = useState("");
	const [state, dispatch] = useStore();
	const [signature, setSignature] = useState("");

	const startDec = WorkerConnect()


	function WorkerConnect() {
		return (`
###  示例代码:
~~~ js
await window.wallet.features['standard:sign'].sign("message")
~~~
          `)
	}

	function isDisabled() {
		return signMessage === "";
	}

	async function handleSign() {
		// TODO 调用钱包的转账接口  type:transfer
		let data = await sign({ message: signMessage });
		console.log(data.result);
		setSignature(data.result);
	}
	return (
		<div style={{ margin: "16px" }}>


			<h1>SIGN</h1>



			<div>
				<Input
					style={{ width: "60%", marginRight: "20px" }}
					size={"large"}
					placeholder={"Message To Sign"}
					onChange={e => {
						setSignMessage(e.target.value);
					}}
				/>

				{state.walletConnected ? (
					<Button
						size={"large"}
						type="primary"
						style={{ marginLeft: "8px" }}
						disabled={isDisabled()}
						onClick={handleSign}>
						Submit
					</Button>
				) : (
					<Button size={"large"} type="primary" disabled>
						Connect Your Wallet
					</Button>
				)}
			</div>
			<div style={{ margin: "20px 0", fontSize: "16px" }}>
				{" "}
				{signature ? (
					<p>
						signature: <span>{EllipsisMiddle({ suffixCount: 8, children: signature })}</span>
					</p>
				) : null}
			</div>


			<ViewMarkDown textContent={startDec} darkMode={false}/>
		</div>
	);
}
