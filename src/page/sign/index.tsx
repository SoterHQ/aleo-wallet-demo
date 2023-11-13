import {Button, Input} from "antd";
import {useState} from "react";
import {useStore} from "../../context";
import EllipsisMiddle from "../../components/EllipsisMiddle";
import ViewMarkDown from "../../components/ViewMarkDown";
import {useWallet} from "@soterhq/aleo-wallet-adapter-react";
import {WalletNotConnectedError} from "@soterhq/aleo-wallet-adapter-base";
import {SoterWalletAdapter} from "@soterhq/aleo-wallet-adapter-soter";

export default function Sign() {
  const [signMessage, setSignMessage] = useState("");
  const [signature, setSignature] = useState("");

  const startDec = WorkerConnect();

  const { wallet, publicKey } = useWallet();

  function WorkerConnect() {
    return `
###  sample code:
~~~ js

const message = new TextEncoder().encode(signMessage);

await window.soterWallet.signMessage(message) 
~~~
          `;
  }

  function isDisabled() {
    return signMessage === "" || signMessage.trim() === "";
  }

  async function handleSign() {
    if (!publicKey) throw new WalletNotConnectedError();

    const message = new TextEncoder().encode(signMessage);

    // let data = await sign(message);
    const signatureBytes:any = await (
      wallet?.adapter as SoterWalletAdapter
    ).signMessage(message);
    setSignature(signatureBytes.result);
  }

  return (
    <div style={{ margin: "16px" }}>
      <h1>Sign</h1>

      <div>
        <Input
          style={{ width: "60%", marginRight: "20px" }}
          size={"large"}
          placeholder={"Message To Sign"}
          onChange={e => {
            setSignMessage(e.target.value);
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
        {signature ? (
          <p>
            signature: <span>{EllipsisMiddle({ suffixCount: 8, children: signature })}</span>
          </p>
        ) : null}
      </div>

      <ViewMarkDown textContent={startDec} darkMode={false} />
    </div>
  );
}
