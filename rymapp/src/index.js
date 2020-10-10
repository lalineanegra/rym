import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import history from './app/history';
import { Router } from 'react-router-dom'

import './index.css';
import Main from './app/main';

ReactDOM.render(
  <React.StrictMode>
			<Router history={history}>
					<div>
						<Main /> 
					</div>
			</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

