import ViewMarkDown from '../../components/ViewMarkDown'
import {message, Select, Typography} from "antd";
import {useState} from "react";


export default function Home() {

    const startDec = WorkerConnect()


    function WorkerConnect() {
        return (`
### ① 准备工作


[下载钱包插件](http://10.10.169.1:8602/download/attachments/32309621/Aleo-wallet.zip?version=1&modificationDate=1688089461515&api=v2)
     
### ② Connect Wallet 

~~~ js
await window.wallet.features['standard:connect'].connect()
~~~
          `)
    }

    return (<div style={{margin: "16px"}}>
        <h1>GETTING STARTED</h1>
        <Typography style={{margin: "20px 0px"}}></Typography>
        <ViewMarkDown textContent={startDec} darkMode={false}/>
    </div>)
}