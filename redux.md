## Manage State in a React App Using Redux
[Redux Docs](https://redux.js.org/introduction)

[D.Abramov Videos](https://egghead.io/series/getting-started-with-redux)

[Redux Primer](https://redux.js.org/)

## Redux Concepts
> Redux architecture revolves around a strict unidirectional data flow.

When the React app boots, it creates a store: then...

1. When a user triggers an event, for example by clicking a button, the component calls an action creator.
  2. The action creator function might do things like make HTTP calls and then dispatch actions.
  3. Every time an action is dispatched, it goes to the reducer.
  4. The reducer takes the current state, an action, and returns a state.
  5. Redux makes updates the store with this new state.
  6. Whenever the store is updated, it notifies components.
  7. Then components re-render.

### Store contains all of: 
#### The state:
> A car: the state includes accelerate f(x), speed, lights bool
State: a single object containing all the data for an application
#### Action Creators
A function that performs tasks and dispatches actions
#### Action
An object with a type property and additional data
#### Reducer
Takes the current state and an action and returns a new state

```
<submit> calls an Action Creator createItem(item)
Action Creator dispatches an action: notifying the store it has started to create an item

The reducer sees that the current state’s creating property is false so it creates a new state to creating:true

State changes: components get notified - spinner starts up and a new action creator -> actionsis called to fetch data
```

Creating a Store:
index.js
```js
import { createStore, combineReducers } from 'redux';
import todosReducer from './todosReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
  todosReducer,
  usersReducer
})

export default () => createStore(rootReducer)
```

Connecting React:

`npm install --save react-redux`

```js
const mapStateToProps = state => ({
  things: state.things.all,
})

export default connect(mapStateToProps)(SomeComponent)
```

Provider: make the store available to all container components in the application without passing it explicitly
```js
import React from 'react'
import ReactDOM from 'react-dom'
import store from './reducers/counter_reducer'
import Counter from './components/App'
import {Provider} from 'react-redux'


ReactDOM.render( 
  ,
  document.getElementById('container'))
```
