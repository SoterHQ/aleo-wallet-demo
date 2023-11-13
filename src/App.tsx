import React, {useMemo} from 'react';
import {Layout} from 'antd';
import {useRoutes} from 'react-router';
import routes from './router';
import CustomHeader from './components/customHeader';
import MenuSlder from './components/menuSlder';
import {WalletModalProvider} from '@soterhq/aleo-wallet-adapter-reactui';
import {WalletProvider} from "@soterhq/aleo-wallet-adapter-react";
import {SoterWalletAdapter} from "@soterhq/aleo-wallet-adapter-soter";
import {DecryptPermission, WalletAdapterNetwork} from '@soterhq/aleo-wallet-adapter-base';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';

const { Header, Content, Footer, Sider } = Layout;
require("@soterhq/aleo-wallet-adapter-reactui/styles.css");

const App: React.FC = () => {
  let element = useRoutes(routes);

  const wallets = useMemo(
    () => [
      new SoterWalletAdapter({
        appName: "Soter Demo App",
      }),
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );
  return (
    <WalletProvider
      wallets={wallets as any}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Testnet}
      autoConnect
    >
      <WalletModalProvider>

        <Layout style={{ minHeight: '100vh' }}>
          <MenuSlder />
          <Layout>
            <CustomHeader />
            <Content style={{ margin: '0 16px' }}>
              {element}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Aleo Wallet Demo ©2023 Created by Aleo123</Footer>
          </Layout>
        </Layout></WalletModalProvider>
    </WalletProvider>
  );
};

export default App;
