import './App.css';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar.component';
import Chat from './components/Chat/Chat.component';
import Login from './components/Login/Login.component';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './stateProvider';

function App() {
	const [ { user }, dispatch ] = useStateValue();
	return (
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<div className="app_body">
					<Router>
						<Sidebar />
						<Switch>
							<Route path="/room/:roomId">
								<Chat />
							</Route>
							<Route path="/">
								<Chat />
							</Route>
						</Switch>
					</Router>
				</div>
			)}
		</div>
	);
}

export default App;
