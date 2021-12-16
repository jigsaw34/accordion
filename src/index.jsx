import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@material-ui/core';
import App from './containers/app/App'
import reportWebVitals from './utils/statistics/reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    {/* <CssBaseline /> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals();
