import { createStore } from 'redux'

import DummyData from '../data/DummyData';
import DefaultEmptyState from '../data/Default';

const moveWidget = (widget, position) => ({
  ...widget,
  position: position
});

const createOrUpdateValue = (values, newValue) => {
  if (values === undefined || values.length === 0) {
    return [ newValue ];
  } else {
    return values.map(currentValue => 
      currentValue.id === newValue.id
      ? newValue // update
      : currentValue // leave as is
    );
  }
}

const updateValue = (widget, newValue) => ({
  ...widget,
  values: createOrUpdateValue(widget.values, newValue)
});

const newWidget = (widgetSchema, id) => ({
  id,
  name: widgetSchema.name,
  type: widgetSchema.type,
  position: { x: window.innerWidth /2, y: window.innerHeight / 2 }
});

const getNextId = (widgets) => widgets.length;

const widgets = (widgets = [], action) => {
  switch (action.type) {

    case 'WIDGET_ADD': 
      return [
        ...widgets,
        newWidget(action.widget, getNextId(widgets))
      ];

    case 'WIDGET_MOVE': 
      return widgets.map(w => 
        w.id === action.id
          ? moveWidget(w, action.position)
          : w
      );

    case 'WIDGET_SET_VALUE':
      return widgets.map(w =>
        w.id === action.id
          ? updateValue(w, action.value)
          : w
      );

     default:
      return widgets;
  }
};

const cables = (state = DefaultEmptyState, action) => {
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
