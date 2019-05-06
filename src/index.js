import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import Firebase, { FirebaseContext } from './components/firebase'
import App from './components/app'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseContext.Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
