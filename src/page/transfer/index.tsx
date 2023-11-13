import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Input, InputNumber, MenuProps, message, Select, Space } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import ViewMarkDown from '../../components/ViewMarkDown';
import { useWallet } from '@soterhq/aleo-wallet-adapter-react';
import { Transaction, WalletAdapterNetwork, WalletNotConnectedError } from '@soterhq/aleo-wallet-adapter-base';

export default function Transfer() {
	const [transferData, setTransferData] = useState({
		to: '',
		amount: '',
		fee: '',
		record: '',
		transferType: 'transfer_public',
	});

	const { publicKey, requestTransaction } = useWallet();
	// const [recordsList, setRecordsList] = useState([] as any[]);
	// const [feeRecord, setFeeRecord] = useState('');

	useEffect(() => {
		// getRecordList();
	}, []);

	// const getRecordList = async () => {
	// 	const list = await queryRecords('credits.aleo');
	// 	if (list) {
	// 		const records = list.flatMap((item: any, index: number) => {
	// 			return {
	// 				value: item.record,
	// 				label: analyzeCredits(item.record) / 1000000,
	// 			};
	// 		});
	// 		console.log(records);
	// 		setRecordsList(records);
	// 	}
	// };

	const items = [
		{
			key: '2',
			label: 'Public to Public',
			value: 'transfer_public',
		},
		{
			key: '4',
			label: 'Public to Private',
			value: 'transfer_public_to_private',
		},
		{
			key: '1',
			label: 'Private to Private',
			value: 'transfer_private',
		},
		{
			key: '3',
			label: 'Private to Public',
			value: 'transfer_private_to_public',
		},
	];
	const privateFunction = ['transfer_private', 'transfer_private_to_public'];

	const [dropdownName, setDropdownName] = useState('Public to Public');

	const onClick: MenuProps['onClick'] = ({ key }) => {
		let data = items.find((item) => item.key === key);
		setTransferData({
			...transferData,
			transferType: data ? data.value : '',
		});
		const selectedItem = items.find((item) => item && item.key === key) as any;
		if (selectedItem) {
			setDropdownName(selectedItem.label);
		}
	};

	const startDec = WorkerConnect();

	function WorkerConnect() {
		return `
### sample code
~~~ js
 const aleoTransaction = Transaction.createTransaction(
 
            'address',
            'testnet3',
            'credits.aleo',
            'public',
            [address,amount],
            0 
        );

await window.soterWallet.requestTransaction(aleoTransaction);
~~~
          `;
	}
	function isDisabled() {
		return transferData.to === '' || transferData.amount === '';
	}

	async function handleTransfer() {
		if (!publicKey) throw new WalletNotConnectedError();

		const reg = /^aleo[a-z0-9]{59}$/g;
		const regex = /^\d+(\.\d{0,6})?$/;
		const res = reg.test(transferData.to.trim());
		const resAmount = regex.test(transferData.amount);
		if (res && resAmount) {
			const inputs = privateFunction.includes(transferData.transferType)
				? [transferData.record, transferData.to, Number(transferData.amount) * 1000000 + 'u64']
				: [transferData.to, Number(transferData.amount) * 1000000 + 'u64'];
			const aleoTransaction = Transaction.createTransaction(
				publicKey,
				WalletAdapterNetwork.Testnet,
				'credits.aleo',
				transferData.transferType,
				inputs,
				Number(transferData.fee) * 1000000
			);
			console.log(inputs, 'inputs');
			console.log(aleoTransaction, 'aleoTransaction');
			if (aleoTransaction && requestTransaction) {
				await requestTransaction(aleoTransaction);
			}
		} else {
			message.error('The transfer address is incorrect');
		}
	}

	return (
		<div style={{ margin: '16px' }}>
			<h1>Transfer</h1>
			<Space direction={'vertical'} size={'large'} style={{ width: '60%' }}>
				<Dropdown menu={{ items, onClick }} placement='bottomLeft'>
					<Button
						style={{
							display: 'flex',
							alignItems: 'center',
							minWidth: '30%',
							justifyContent: 'space-between',
						}}
						size={'large'}
						onClick={(e) => e.preventDefault()}
					>
						{dropdownName}
						<DownOutlined />
					</Button>
				</Dropdown>
				<Input
					size={'large'}
					value={transferData.to}
					placeholder={'To Address: ie aleo1kf3...'}
					onChange={(e) => {
						setTransferData({
							...transferData,
							to: e.target.value,
						});
					}}
				/>
				<InputNumber
					style={{ width: '100%' }}
					controls={false}
					size={'large'}
					value={transferData.amount}
					placeholder={'Amount (in gates): ie 20'}
					onChange={(value) => {
						console.log(value);
						setTransferData({
							...transferData,
							amount: value ? value : '',
						});
					}}
				/>

				<InputNumber
					style={{ width: '100%' }}
					controls={false}
					size={'large'}
					value={transferData.fee}
					placeholder={'Fee (in microcredits)'}
					onChange={(value) => {
						setTransferData({
							...transferData,
							fee: value ? value : '',
						});
					}}
				/>

				<Input
					style={{ display: privateFunction.includes(transferData.transferType) ? 'block' : 'none' }}
					size='large'
					placeholder='Record, get from Records form'
					value={transferData.record}
					onChange={(e) => {
						setTransferData({
							...transferData,
							record: e.target.value,
						});
					}}
				/>

				<div style={{ width: '60%', textAlign: 'center' }}>
					{publicKey ? (
						<Button size={'large'} type='primary' style={{ marginLeft: '8px' }} disabled={isDisabled()} onClick={handleTransfer}>
							Submit
						</Button>
					) : (
						<Button size={'large'} type='primary' disabled>
							Connect Your Wallet
						</Button>
					)}
				</div>
			</Space>
			<ViewMarkDown textContent={startDec} darkMode={false} />
		</div>
	);
}
