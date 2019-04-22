import { createStore } from 'redux'

import DummyData from './DummyData';

const widgets = (state = DummyData, action) => {
  return state;
};

const store = createStore(widgets);

store.subscribe(() => console.log(store.getState()));

export default store;
