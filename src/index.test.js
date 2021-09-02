import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Footer from './components/footer/Footer';
import About from './components/About';
import PotentialError from './components/PotentialError';
jest.mock('./components/navigation/Navigation', () => 'Navigation');
jest.mock('./components/footer/Footer', () => 'Footer');

describe('', () => {
	it('should render footer component', () => {
		const tree = renderer.create(
			<BrowserRouter>
				<Route>
					<Footer />
				</Route>
			</BrowserRouter>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('', () => {
	it('should render About page', () => {
		const tree = renderer.create(
			<BrowserRouter>
				<Route>
					<About />
				</Route>
			</BrowserRouter>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});