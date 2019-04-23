import { createStore } from 'redux'

import DummyData from './data/DummyData';

const moveWidget = (widget, position) => ({
  ...widget,
  position: position
});

const widgets = (widgets = [], action) => {
  switch (action.type) {
    case 'WIDGET_MOVE': 
      return widgets.map(w => 
        w.id === action.id
          ? moveWidget(w, action.position)
          : w
      );

    default:
      return widgets;
  }
};

const cables = (state = [], action) => {
  return state;
};

const rootReducer = (state = DummyData, action) => ({
    widgets: widgets(state.widgets, action),
    cables: cables(state.cables, action)
});

// console.log('init store with:', rootReducer());
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// store.subscribe(() => console.log(store.getState()));

export default store;
