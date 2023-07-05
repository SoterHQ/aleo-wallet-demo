import {Button, Input} from "antd";
import {useState} from "react";
import {queryRecords} from "../../api";
import {useStore} from "../../context";
import EllipsisMiddle from "../../components/EllipsisMiddle";
import ReactJson from "react-json-view";
import ViewMarkDown from "../../components/ViewMarkDown";

export default function Records() {
	const [program, setProgram] = useState("");
	const [state, dispatch] = useStore();


	const startDec = WorkerConnect()


	function WorkerConnect() {
		return (`
###  示例代码:

~~~ js
let programData = {program:"credits.aleo"}

await window.wallet.features['standard:records'].sign(programData);
~~~
          `)
	}
	const [recordList, setRecordList] = useState({});
	function isDisabled() {
		return program === "";
	}

	async function handleSign() {
		// TODO 调用钱包的转账接口  type:transfer
		let data = await queryRecords({ program: program });
		setRecordList(data.result);
	}
	return (
		<div style={{ margin: "16px" }}>
			<h1>Records</h1>

			<div>
				<Input
					style={{ width: "60%", marginRight: "20px" }}
					size={"large"}
					placeholder={"Program ID"}
					onChange={e => {
						setProgram(e.target.value);
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
				{recordList ? (
					<div>
						Records: <ReactJson src={recordList}
					displayObjectSize={false}
					displayDataTypes={false}/>
					</div>

				) : null}
			</div>
			<ViewMarkDown textContent={startDec} darkMode={false}/>

		</div>
	);
}
