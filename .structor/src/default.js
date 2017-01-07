import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import PageForDesk from './PageForDesk.js';
import {getRealPathName} from './constants.js';
import configureStore from '../app/store.js';

class PageContainer extends React.Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

let store;
let routeConfig = [];

const render = () => {

	ReactDOM.render(
		<Provider store={store}>
			<Router history={browserHistory} routes={routeConfig}/>
		</Provider>,
		document.getElementById('content')
	);

};

window.__createPageDesk = function () {

	store = configureStore();

	window.__switchToPath = function (pagePath) {
		browserHistory.push(getRealPathName(pagePath));
	};

	let childRoutes = [];
	if (window.__pages && window.__pages.length > 0) {
		childRoutes = window.__pages.map((page, idex) => {
			return {path: page.pagePath, component: PageForDesk}
		});
		childRoutes.push({path: '*', component: PageForDesk});
	} else {
		console.warn('Please check project model, pages were not found.');
	}

	routeConfig = [
		{
			path: '/',
			component: PageContainer,
			indexRoute: {component: PageForDesk},
			childRoutes: childRoutes
		}
	];

	render();

	window.pageReadyState = 'initialized';

};

if (module.hot) {
	// modules.hot.accept does not accept dynamic dependencies,
	// have to be constants at compile-time
	module.hot.accept(['./PageForDesk.js'], () => {
		render();
	});
}

window.pageReadyState = 'ready';

