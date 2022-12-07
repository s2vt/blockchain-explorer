import { get } from '../../services/request';
import { connect } from 'react-redux';

export const getDataAction = data => ({
	type: 'get',
	payload: data
});

export const getData = data => dispatch =>
	get(
		'http://k8s-default-ingress-1e0a9bc43f-2084139913.ap-northeast-2.elb.amazonaws.com/api/blockAndTxList/918264e5c4f45f520bb6974ab71fe31a6c9fea70d190b8bbc0b34220c748d857/0?limit=5',
		{}
	)
		.then(({ data }) => {
			dispatch(getDataAction(data));
		})
		.catch(error => {
			// eslint-disable-next-line no-console
			console.error(error);
		});

const searchBlockList = async channel => {
	let query = `from=${new Date(this.state.from).toString()}&&to=${new Date(
		this.state.to
	).toString()}`;
	for (let i = 0; i < this.state.orgs.length; i++) {
		query += `&&orgs=${this.state.orgs[i]}`;
	}
	let channelhash = this.props.currentChannel;
	if (channel !== undefined) {
		channelhash = channel;
	}
	await this.props.getBlockListSearch(channelhash, query);
};
