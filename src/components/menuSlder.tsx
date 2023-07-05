import React, { useState } from "react";
import { Sider } from "./layout";
import { Menu, MenuProps } from "antd";
import {
	LaptopOutlined,
	FileProtectOutlined,
	HomeOutlined,
	InsertRowBelowOutlined,
	SwapOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem("Connect Wallet", "/", <HomeOutlined />),
	getItem("Sign", "/sign", <FileProtectOutlined />),
	getItem("Records", "/records", <FileProtectOutlined />),
	getItem("Decrypt", "/decrypt", <InsertRowBelowOutlined />),
	getItem("Transfer", "/transfer", <SwapOutlined />),
	getItem("Execute", "/execute", <LaptopOutlined />),
];

export default function MenuSlder() {
	const navigate = useNavigate();

	const [collapsed, setCollapsed] = useState(false);
	return (
		<Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
			<img src={"./logo.svg"} style={{ width: "100%", height: "70px", textAlign: "center" }} />
			<Menu
				theme="dark"
				defaultSelectedKeys={["1"]}
				mode="inline"
				items={items}
				onSelect={value => {
					navigate(value.key);
				}}
			/>
		</Sider>
	);
}
