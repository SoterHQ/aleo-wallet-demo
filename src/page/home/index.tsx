import ViewMarkDown from '../../components/ViewMarkDown'
import {Typography} from "antd";


export default function Home() {
    const startDec = WorkerConnect()
    function WorkerConnect() {
        return (`    
### Connect Wallet 

~~~ js
await window.soterWallet.connect()
~~~
          `)
    }

    return (<div style={{margin: "16px"}}>
        <h1>Connect Wallet</h1>
        <Typography style={{margin: "20px 0px"}}></Typography>
        <ViewMarkDown textContent={startDec} darkMode={false}/>
    </div>)
}