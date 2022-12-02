import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { FullscreenExit } from '@material-ui/icons';
import BlockBar from './BlockBar';
import { Divider } from '@material-ui/core';
import styled from 'styled-components';
import { get } from '../../services/request';

const Blocks = () => {
	const url = `http://k8s-default-ingress-1e0a9bc43f-2084139913.ap-northeast-2.elb.amazonaws.com/api/blockAndTxList/918264e5c4f45f520bb6974ab71fe31a6c9fea70d190b8bbc0b34220c748d857/0?limit=5`;

	const [blocks, setBlocks] = useState();

	useEffect(() => {
		get(url).then(res => {
			setBlocks(res);
		});
	}, []);

	return (
		<>
			<Title>
				<Typography variant="h6">BLOCKS</Typography>
				<FullscreenExit />
			</Title>
			<Divider />

			<Content>
				{blocks.map(block => (
					<BlockBar key={block.blocknum} block={block} />
				))}
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

export default Blocks;
