import React from 'react';
import {Layout} from 'antd';
import {useRoutes} from "react-router";
import routes from "./router";
import CustomHeader from "./components/customHeader";
import MenuSlder from "./components/menuSlder";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
    let element = useRoutes(routes);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MenuSlder/>
            <Layout>
                <CustomHeader/>
                <Content style={{ margin: '0 16px' }}>

                    {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                    {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    {/*<div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>*/}
                    {/*    Bill is a cat.*/}
                    {/*</div>*/}

                    {element}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Aleo Wallet Demo ©2023 Created by Aleo123</Footer>
            </Layout>
        </Layout>
    );
};

export default App;