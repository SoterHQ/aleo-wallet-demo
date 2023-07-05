import React, {useEffect, useState} from "react";
import {Dropdown, MenuProps, theme, Typography} from "antd";
import {Header} from "./layout";
import {connectWalletPlugin, walletAccount, walletConnected} from "../api";
import CustomButton from "./customButton";
import {useStore} from "../context";
import WalletDropDowm from "./WalletDropDowm";

export default function CustomHeader() {
    const [state, dispatch] = useStore()
    /**
     * 设置钱包地址
     */
    const [address, setAddress] = useState("")
    useEffect(()=>{
        connectWallet()
    },[])

    useEffect(()=>{
        // @ts-ignore
        if (window && window.wallet){
            connectWallet()
        }

    },[window])

    async function connectWallet() {
        let isConnect = walletConnected()
        console.log(isConnect)
        dispatch({type: "walletConnected", value: isConnect})
        if (isConnect) {
            setAddressData()
            return
        }
        await connectWalletPlugin()
        if (await walletConnected()) {
            dispatch({type: "walletConnected", value: true})
            setAddressData()
        } else {
            dispatch({type: "currentAddress", value: ""})
        }
    }

    async function setAddressData() {
        let account = await walletAccount()
        console.log(account)
        if (account && account.address) {
            dispatch({type: "currentAddress", value: account.address})
        }
    }

    useEffect(() => {
        if (state) {
            console.log(state.currentAddress)
            setAddress(state.currentAddress)
        }
    }, [state])

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (<Header style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        paddingRight: "8px",
    }}>
        <Typography></Typography>
        {
            address ? <WalletDropDowm text={address}/> : <CustomButton
                buttonText={"Connect Wallet"}
                onclick={()=>{

                    // @ts-ignore
                    if (!window.wallet){
                        return
                    }
                    connectWallet()
                }}/>
        }


        {/*<Button size={"large"} type="primary" onClick={connectWallet}>Connect Wallet</Button>*/}
    </Header>)
}