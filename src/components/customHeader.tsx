import React from "react";
import {theme, Typography} from "antd";
import {Header} from "./layout";
import {WalletMultiButton} from "@soterhq/aleo-wallet-adapter-reactui";

export default function CustomHeader() {
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
        <WalletMultiButton/>
    </Header>)
}