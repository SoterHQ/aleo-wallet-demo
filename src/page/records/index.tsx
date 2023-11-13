import {Button, Input, message} from "antd";
import {useState} from "react";
import {useStore} from "../../context";
import ReactJson from "react-json-view";
import ViewMarkDown from "../../components/ViewMarkDown";
import {useWallet} from "@soterhq/aleo-wallet-adapter-react";
import {WalletNotConnectedError} from "@soterhq/aleo-wallet-adapter-base";

export default function Records() {
  const [program, setProgram] = useState("");
  const startDec = WorkerConnect()

  const { publicKey, requestRecords } = useWallet();


  function WorkerConnect() {
    return (`
###  sample code:

~~~ js
await window.soterWallet.requestRecords("credits.aleo")
~~~
          `)
  }
  const [recordList, setRecordList] = useState({});
  function isDisabled() {
    return program === "";
  }

  async function handleSign() {
    if (!publicKey) throw new WalletNotConnectedError();
    if (requestRecords) {
      const records = await requestRecords(program);
      if(records.length){
        setRecordList(records);
      }else{
        message.info('The record cannot be queried!')
      }
    }
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

        {publicKey ? (
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
              displayDataTypes={false} />
          </div>

        ) : null}
      </div>
      <ViewMarkDown textContent={startDec} darkMode={false} />

    </div>
  );
}
