"import {createStore, applyMiddleware, compose} from 'redux'\nimport rootReducer from '../Reducers'\n\nimport createSagaMiddleware, {END} from 'redux-saga'\n
\nconst sagaMiddleware = createSagaMiddleware();\n\nexport const configureStore = (api) => {\n\tconst store = createStore(\n\t\trootReducer,\n\t\tcompose (\n\t\t\tapplyMiddleware(sagaMiddleware)\n\t\t)\n\t);\n\tstore.runSaga = sagaMiddleware.run;\n\tstore.close = () => store.dispatch(END);\n\treturn store;\n};\n
"
