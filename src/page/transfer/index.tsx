import React, {useState} from "react";
import {Button, Input, Space, message} from "antd";
import {useStore} from "../../context";
import {transfer} from "../../api";
import ViewMarkDown from "../../components/ViewMarkDown";

export default function Transfer() {
    const [transferData, setTransferData] = useState({
        to: "",
        amount: "",
    });

    const startDec = WorkerConnect()


    function WorkerConnect() {
        return (`
### 示例代码
~~~ js
let transferData = { to: "xxx", amount: "2"}

await window.wallet.features['standard:transfer'].transfer(transferData);
~~~
          `)
    }

    const [state, dispatch] = useStore();

    function isDisabled() {
        return transferData.to === "" || transferData.amount === "";
    }

    async function handleTransfer() {
        // TODO 调用钱包的转账接口  type:transfer
        let data = await transfer(transferData);
        data && message.success("转账已经发送");
    }

    return (
        <div style={{margin: "16px"}}>
            <h1>TRANSFER</h1>
            <div style={{width: "60%"}}>
                <Input
                    size={"large"}
                    value={transferData.to}
                    placeholder={"To Address: ie aleo1kf3..."}
                    onChange={e => {
                        setTransferData({
                            ...transferData,
                            to: e.target.value,
                        });
                    }}
                />
                <div style={{marginTop: "16px"}}></div>
                <Input
                    size={"large"}
                    value={transferData.amount}
                    placeholder={"Amount (in gates): ie 20"}
                    onChange={e => {
                        setTransferData({
                            ...transferData,
                            amount: e.target.value,
                        });
                    }}
                />
                <div style={{marginTop: "16px"}}></div>
            </div>
            <div style={{width: "60%", marginTop: "16px", textAlign: "center"}}>
                {state.walletConnected ? (
                    <Button
                        size={"large"}
                        type="primary"
                        style={{marginLeft: "8px"}}
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

            <ViewMarkDown textContent={startDec} darkMode={false}/>
        </div>
    );
}
