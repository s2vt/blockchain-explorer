import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { FullscreenExit } from '@material-ui/icons';
import BlockBar from './BlockBar';
import { Divider } from '@material-ui/core';
import styled from 'styled-components';
import { get } from '../../services/request';
import { getData } from './getCustomBlockList';
import { connect } from 'react-redux';

const Blocks = ({
	blockList,
	getTransaction,
	getBlockListSearch,
	customBlockListSelector
}) => {
	const url = `/api/blockAndTxList/918264e5c4f45f520bb6974ab71fe31a6c9fea70d190b8bbc0b34220c748d857/0?limit=50`;
	const [blocks, setBlocks] = useState();
	useEffect(() => {
		get(url).then(res => {
			if (!res) {
				console.log('res없음');
			}
			if (res) {
				// console.log(res);
				// console.log(res.rows);
				setBlocks(res.rows);
			}
		});
	}, []);

	if (!blocks) return <></>;

	return (
		<>
			<Title>
				<Typography variant="h6">BLOCKS</Typography>
				<FullscreenExit />
			</Title>
			<Divider />

			<Content>
				{blocks &&
					blocks.map(block => <BlockBar key={block.blocknum} block={block} />)}
			</Content>
		</>
	);
};

const Title = styled.div`
	padding: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Content = styled.div`
	padding: 20px 25px 26px 24px;
`;
const dataSelector = state => state;

const connectedComponent = connect(state => ({
	data: dataSelector(state)
}))(Blocks);

export default Blocks;
