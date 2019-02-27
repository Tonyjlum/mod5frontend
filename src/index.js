import React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

//change ID back to null

const reducer = (state = {events: [], location: [40.715280, -73.954260], currentUser: {id: null, confirm_event_info: []}, userEvents: []}, action) => {
  switch(action.type) {
    case "ADD_EVENTS":
      return {...state, events: action.payload}
    case "ADD_CURRENT_LOCATION":
      return {...state, location: [action.payload.latitude, action.payload.longitude]}
    case "ADD_NEW_EVENT":
      return {...state, events: [...state.events, action.payload]}
    case "ADD_CONFIRM_TO_STATE":
      return {...state}
    case "ADD_LOGIN_ACCOUNT_TO_STORE":
      return {...state, currentUser: action.payload }
    case "REMOVE_CONFIRM_FROM_CURRENT_USER":
      function test(){
        return "Testing"
      }
      return {...state, testing: test()}
    case "REMOVE_CURRENT_USER":
      return {...state, currentUser: action.payload}
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

serviceWorker.unregister();
