import { createStore } from 'redux'

import DummyData from './DummyData';

const widgets = (state = [], action) => {
  return state;
};

const connections = (state = [], action) => {
return state;
};

const rootReducer = (state = DummyData, action) => ({
    widgets: widgets(state.widgets, action),
    connections: connections(state.connections, action)
});

console.log('init store with:', rootReducer());
const store = createStore(rootReducer);

store.subscribe(() => console.log(store.getState()));

export default store;
