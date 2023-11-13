import React, { createContext, useContext, useReducer } from 'react';
import { ConnectWalletData } from '../model/wallet';
import {clearStorage, setLocalStorage} from '../utils/stotageUtils';

interface State {
  connectWallet: ConnectWalletData;
}

type Action = { type: 'connectWallet'; value: ConnectWalletData };

const initialState: State = {
  connectWallet: {
    type: 'Soter',
    publicKey: '',
    connected: false
  }
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'connectWallet':
      let walletData = action.value
      if (walletData.publicKey) {
        setLocalStorage("connectWallet", walletData.type );
      } else {
        clearStorage("connectWallet");
      }
      return {
        ...state,
        connectWallet: action.value,
      };
    default:
      throw new Error();
  }
}

const Context = createContext<[State, React.Dispatch<Action>] | undefined>(
  undefined
);

function useStore(): [State, React.Dispatch<Action>] {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

interface StoreProviderProps {
  children: React.ReactNode;
}

function StoreProvider({ children }: StoreProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
}

export { useStore, StoreProvider };
