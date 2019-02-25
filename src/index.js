import React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

const reducer = (state = {events: [], location: [40.715280, -73.954260]}, action) => {
  switch(action.type) {
    case "ADD_EVENTS":
      return {...state, events: action.payload}
    case "ADD_CURRENT_LOCATION":
      return {...state, location: [action.payload.latitude, action.payload.longitude]}
      console.log(action.payload.latitude, action.payload.longitude)
    case "ADD_NEW_EVENT":
      return {...state, events: [...state.events, action.payload]}
    case "ADD_CONFIRM_TO_STATE":
      return {...state}
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
