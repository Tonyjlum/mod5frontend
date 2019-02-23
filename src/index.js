import React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'



const reducer = (state = {test: "testing redux", logged_in: "no", events: []}, action) => {
  switch(action.type) {
    case "ADD_EVENTS":
      return {...state, events: action.payload}
    default:
      return state
  }

}

const store = createStore(reducer)

store.subscribe(() => {
  console.log('the new state is', store.getState())
  console.log('----------');
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
