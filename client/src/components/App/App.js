/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from '../Main';
import Header from '../Header';
import LandingPage from '../View/LandingPage';
import ErrorMessage from '../ErrorMessage';
import { chartSelectors } from '../../state/redux/charts';
import { themeSelectors, themeActions } from '../../state/redux/theme';
import { authSelectors } from '../../state/redux/auth';

import Login from '../Login';

import Private from '../Route';
import { drawerOpenSelector } from '../../state/redux/core/selectors';
import { AppDrawer } from '../AppDrawer';

/* istanbul ignore next */
const styles = theme => {
	return {
		app: {
			position: 'absolute',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			'& ol, & ul': {
				listStyle: 'none'
			}
		}
	};
};

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	/* istanbul ignore next */
	updateLoadStatus = () => {
		this.setState({ loading: false });
	};

	/* istanbul ignore next */
	refreshComponent = mode => {
		this.props.changeTheme(mode);
	};

	/* istanbul ignore next */
	render() {
		const { auth } = this.props;
		const { loading } = this.state;

		if (auth && loading) {
			return <LandingPage updateLoadStatus={this.updateLoadStatus} />;
		}
		const { error } = this.props;

		return (
			<Router>
				<div>
					{auth && <Header refresh={this.refreshComponent} />}
					{auth && <AppDrawer />}
					{error && <ErrorMessage message={error} />}
					<Switch>
						<Route
							exact
							path="/login"
							render={routeprops => <Login {...routeprops} />}
						/>
						<Private path="/" render={routeprops => <Main {...routeprops} />} />
					</Switch>
				</div>
			</Router>
		);
	}
}

const { modeSelector } = themeSelectors;
const { changeTheme } = themeActions;
const { errorMessageSelector } = chartSelectors;
const { authSelector } = authSelectors;

const mapStateToProps = state => {
	return {
		error: errorMessageSelector(state),
		mode: modeSelector(state),
		auth: authSelector(state),
		drawerOpen: drawerOpenSelector(state)
	};
};

const mapDispatchToProps = { changeTheme };

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(App);
/* istanbul ignore next */
export default withStyles(styles)(connectedComponent);
