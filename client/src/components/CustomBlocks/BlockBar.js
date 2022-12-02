import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';
import { get } from '../../services/request';

const BlockBar = ({ block }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState();
	const { blocknum, txcount, datahash } = block;
	const txhash = block.txhash;

	const url = `http://k8s-default-ingress-1e0a9bc43f-2084139913.ap-northeast-2.elb.amazonaws.com/api/transaction/918264e5c4f45f520bb6974ab71fe31a6c9fea70d190b8bbc0b34220c748d857/`;

	const handleToggle = () => {
		let expandData = [];
		for (let hash of txhash) {
			get(url + hash).then(res => expandData.push(res.row.write_set[1].set));
		}
		setData(expandData);
		setIsOpen(prev => !prev);
	};

	return (
		<>
			<Bar onClick={handleToggle} isOpen={isOpen}>
				<Helmet isOpen={isOpen} />
				<Label gap={16}>
					<div variant="h1">Block No {blocknum}</div>
					<Divider orientation="vertical" flexItem />
					<div>Tx : {txcount}</div>
				</Label>
				{isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
			</Bar>

			<DropDownContainer isOpen={isOpen}>
				<HashContainer>
					<Label gap={56}>
						<div>Data Hash</div>
						<Value>{datahash}</Value>
					</Label>
					<Label gap={56}>
						<div>Prev Hash</div>
						<Value>{datahash}</Value>
					</Label>
				</HashContainer>

				<TransactionTitle>Transactions</TransactionTitle>

				{data.map(data => {
					let { key, value } = data;
					const type = key.split('/')[0] === 'ct' ? 'ctg' : key.split('/')[0];
					value = JSON.parse(value);
					let arr = [];
					for (let property in value) {
						arr.push(`${[property]} : ${value[property]}`);
					}
					return (
						<TransactionCard>
							<Label gap={79}>
								<div>type</div>
								<Value>{type}</Value>
							</Label>

							<Label gap={71}>
								<div>Value</div>
								<TransactionValueContainer>
									{arr.map(value => (
										<Value>{value}</Value>
									))}
								</TransactionValueContainer>
							</Label>
						</TransactionCard>
					);
				})}
			</DropDownContainer>
		</>
	);
};

const Bar = styled.div`
	padding: 14px 26px 14px 36px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	margin-bottom: ${({ isOpen }) => (isOpen ? '0px' : '12px')};
	position: relative;
	border-bottom-right-radius: ${({ isOpen }) => (isOpen ? '0px' : '8px')};
	border-bottom-left-radius: ${({ isOpen }) => (isOpen ? '0px' : '8px')};
	cursor: pointer;
`;

const Label = styled.div`
	display: flex;
	gap: ${({ gap }) => `${gap}px`};
	font-size: 14px;
	font-weight: 500;
`;

const Value = styled.div`
	color: rgba(0, 0, 0, 0.6);
`;

const Helmet = styled.div`
	width: 8px;
	height: 100%;
	border-top-left-radius: 8px;
	border-bottom-left-radius: ${({ isOpen }) => (isOpen ? '0px' : '8px')};
	background-color: rgba(24, 32, 97, 1);
	position: absolute;
	left: 0;
`;

const DropDownContainer = styled.div`
	display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
	background-color: rgba(250, 250, 250, 1);
	margin-bottom: ${({ isOpen }) => (isOpen ? '12px' : '0px')};
	padding-bottom: 26px;
`;

const HashContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 24px 29px;
`;

const TransactionTitle = styled.div`
	width: 100%;
	padding: 9px 29px;
	margin-top: 24px;
	font-size: 16px;
	font-weight: 500;
	line-height: 24px;
	color: rgba(0, 0, 0, 0.6);
	background-color: #eeeeee;
`;

const TransactionValueContainer = styled.div`
	width: 100%;
	padding: 12px;
	border-radius: 6px;
	background-color: #eeeeee;
`;

const TransactionCard = styled.div`
	background-color: rgba(245, 245, 245, 1);
	border: 1px solid rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	margin: 26px 29px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export default BlockBar;
