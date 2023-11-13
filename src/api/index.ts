import {Execute, Transfer,} from "../model";
import {
    AleoTransaction, Transaction, WalletAdapterNetwork,
} from "@soterhq/aleo-wallet-adapter-base";

/**
 * 连接钱包 返回 publicKey
 * @constructor
 */
export async function connectWallet() {
    let wallet = getWallet();
    if (wallet) {
        await wallet.connect()
        return walletAddress()
    }
    return ""
}

export function walletAddress() {
    let wallet = getWallet();
    if (wallet) {
        return wallet.publicKey
    }
    return ""
}

/**
 * 解密record 返回 解密后的数据
 * @param record
 */
export async function decryptRecord(record: string): Promise<string> {
    try {
        let records = [] as string[];
        records.unshift(record);
        // @ts-ignore
        let recordData = await window.soterWallet.decrypt(records);
        console.log(recordData);
        return recordData.text;
    } catch (e) {
        console.log(e);
        return "";
    }
}

export async function sign(params: Uint8Array): Promise<any> {
    try {
        // @ts-ignore
        let signResult = await window.soterWallet.signMessage(params);
        console.log(signResult);
        return signResult.signature;
    } catch (e) {
        return "";
    }
}

export async function queryRecords(params: string): Promise<any> {
    try {
        // @ts-ignore
        let result = await window.soterWallet.requestRecords(params);
        return result.records;
    } catch (e) {
        return [];
    }
}

// TODO 待修改逻辑和参数传递
export async function transfer(publicKey: string, functionName: string, to: string, amount: number): Promise<any> {
    try {
        const aleoTransaction = Transaction.createTransaction(
            publicKey,
            WalletAdapterNetwork.Testnet,
            'credits.aleo',
            functionName,
            [to,amount],
            0 //
        );
        // @ts-ignore
        let transferRes = await window.soterWallet.requestTransaction(aleoTransaction);
        return transferRes;
    } catch (e) {
        return "";
    }
}

export async function execute(publicKey: string,programId:string, functionName: string, inputs:any[]): Promise<any> {
    try {
        const aleoTransaction = Transaction.createTransaction(
            publicKey,
            WalletAdapterNetwork.Testnet,
            programId,
            functionName,
            inputs,
            0 //
        );
        // @ts-ignore
        let executeRes = await window.soterWallet.requestTransaction(aleoTransaction);
        console.log(executeRes);
        return executeRes;
    } catch (e) {
    }
}

// 取消授权
export async function disConnectWallet(): Promise<any> {
    try {
        // @ts-ignore
        await window.soterWallet.disConnect();
        return true;
    } catch (e) {
        return false
    }
}

// 断开连接
export async function walletDisConnect() {
    console.log("准备取消链接");
    // @ts-ignore
    window.soterWallet.disConnect();
}

function getWallet() {
    let wallet = null
    // @ts-ignore
    if (window.soterWallet) {
        // @ts-ignore
        wallet = window.soterWallet;
    }
    return wallet;
}
