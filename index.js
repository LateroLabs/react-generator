#!/usr/bin/env node

var program = require('commander');
var shell = require('shelljs');
var chalk = require('chalk');

program
  .arguments('<filename>')
  .action(function(filename) {
    console.log(chalk.bold.blue('Creating project:', filename));
    var child = shell.exec(`react-native init ${filename}`, {async:true}, function(code, stdout, stderr) {
      //Enter React-Native Project
      shell.cd(filename);

      // make webpack folder
      console.log(chalk.bold.blue('Creating webpack folders and files...'));
      shell.mkdir("./web")
      shell.mkdir("-p", ["./web/public", "./web/webpack" ])
      shell.touch(["./web/dev-server.js", "./web/public/index.html","./web/webpack/loaders.js", "web/webpack/config.js"])

      // make App folder
      console.log(chalk.bold.yellow('Creating App folders and files...'));
      shell.mkdir("./App")
      shell.mkdir("-p", ["./App/Shared", "./App/Web"])

      // make shared folders and files
      shell.mkdir("-p", ["./App/Shared/Actions", "./App/Shared/Api", "./App/Shared/Reducers","./App/Shared/Sagas", "./App/Shared/Styles"])
      shell.touch(["./App/Shared/Actions/Creators.js", "./App/Shared/Actions/Types.js", "./App/Shared/Api/api.js", "./App/Shared/Styles/styles.css"])

      // make web folders and files
      console.log(chalk.bold.blue('Creating Web folders and files...'));
      shell.mkdir("-p", ["./App/Web/Components", "./App/Web/Reducers", "./App/Web/Sagas","./App/Web/Store", "./App/Web/Utils" ])
      shell.touch(["./App/Web/Root.js", "./App/Web/Routes.js", "./App/Web/App.jsx", "./App/Web/Reducers/index.js", "./App/Web/Sagas/index.js", "./App/Web/Store/Store.js"])

      // SED WEBPACK
      console.log(chalk.bold.yellow('Filling in webpack files...'));
      shell.sed("-i", /.*/, "var webpack = require('webpack');\nvar WebpackDevServer=require('webpack-dev-server');\nvar util = require('util');\n \nvar configPath = process.argv[2] || './webpack/config';\nvar config = require(configPath);\n \n\nvar port = '8080';\nvar host = 'localhost';\n\nvar server = new WebpackDevServer(\n\t webpack(config),\n\t config.devServer\n);\nserver.listen(port, host, function (err) {\n\t  if (err) { console.log(err); }\n\tvar url = util.format('http://%s:%d', host, port);\n\t  console.log('Webpack server listening at %s', url);\n});\n", "./web/dev-server.js")
      shell.sed("-i", /.*/, "<!DOCTYPE html>\n<html lang='en'>\n<head>\n\t<meta charset='UTF-8'>\n\t<meta name='viewport' content='width=device-width, initial-scale=1.0'/>\n\t<title>React App</title>\n</head>\n<body>\n\t<div id='app'></div>\n\t<script src='./bundle.js'type='text/javascript'></script>\n</body>\n</html>\n", "./web/public/index.html")
      shell.sed("-i", /.*/, "var loaders = [\n\t{\n\t\ttest: /\.jsx\?\$/,\n\t\texclude:/(node_modules|bower_components)/,\n\t\tloaders: ['react-hot',\n\t\t'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'],\n\t},\n\t{\n\t\ttest: /\.css$/,\n\t\tloader: 'style-loader!css-loader'\n\t},\n\t{\n\t\ttest: /\\.woff(2)\?(\\?v=[0-9]\\.[0-9]\\.[0-9])\?\$/,\n\t\tloader: 'url-loader?limit=10000&mimetype=application/font-woff'\n\t},\n\t{\n\t\ttest: /\\.(ttf|eot|svg)(\\?v=[0-9]\\.[0-9]\\.[0-9])\?\$/,\n\t\tloader: 'file-loader'\n\t}\n];\n\nmodule.exports = loaders;\n", "./web/webpack/loaders.js")
      shell.sed("-i", /.*/,"var webpack = require('webpack');\nvar path = require('path');\nvar loaders = require('./loaders');\n\nmodule.exports = {\n\tcontext: path.join(__dirname, '../../App/Web'),\n\tentry: [\n\t\t'webpack-dev-server/client\?http://0.0.0.0:8080 ',\n\t\t'webpack/hot/only-dev-server',\n\t\t'babel-polyfill',\n\t\t'./App.jsx'\n\t],\n\tdevtool: process.env.WEBPACK_DEVTOOL || 'source-map',\n\toutput: {\n\t\tpath: path.join(__dirname, 'public'),\n\t\tfilename: 'bundle.js'\n\t},\n\tresolve: {\n\t\textensions: ['', '.js', '.jsx']\n\t},\n\tmodule: {\n\t\tloaders: loaders\n\t},\n\tdevServer: {\n\t\tcontentBase: path.resolve('./web/public'),\n\t\tnoInfo: true,\n\t\thot: true,\n\t\tinline: true,\n\t\thistoryApiFallback: true\n\t\t},\n\tplugins: [\n\t\tnew webpack.NoErrorsPlugin(),\n\t\tnew webpack.HotModuleReplacementPlugin(),\n\t\tnew webpack.ProvidePlugin({\n\t\t\t'R': 'ramda'\n\t\t})\n\t],\n};\n", "./web/webpack/config.js")

      // SED SHARED
      console.log(chalk.bold.blue('Filling in Shared files...'));
      shell.sed("-i", /.*/, "import Types from './Types'\n\nconst createAction = (type, params = null) => ({ type, ...params });", "./App/Shared/Actions/Creators.js")
      shell.sed("-i", /.*/, "const types = {};\n\nexport default types;\n", "./App/Shared/Actions/Types.js")
      shell.sed("-i", /.*/, "import axios from 'axios';\n\nexport const createApi = (server, token = null) => {\n\n\tconst client = axios.create({\n\t\tbaseURL: server,\n\t\theaders: {\n\t\t\t'Accept': 'application/vnd.scheduler.v1',\n\t\t\t'Cache-Control': 'no-cache',\n\t\t\t'Content-Type': 'application/json',\n\t\t\t'Authorization': \`Token token=\"${token}\"\`\n\t\t},\n\t\ttimeout: 10000\n\t});\n\treturn {};\n};\n", "./App/Shared/Api/api.js")

      // SED WEB
      console.log(chalk.bold.yellow('Filling in Web files...'));
      shell.sed("-i", /.*/, "import {combineReducers} from 'redux';\nimport {reducer as formReducer} from 'redux-form';\n\nexport default combineReducers({\n\tform: formReducer\n});\n", "./App/Web/Reducers/index.js")
      shell.sed("-i", /.*/, "import {take, fork} from 'redux-saga/effects';\n\nexport default (api) => {\n\n\tfunction* root() {\n\t\tyield [\n\n  \t\t];\n}\n\treturn root;\n};", "./App/Web/Sagas/index.js")
      shell.sed("-i", /.*/, "import {createStore, applyMiddleware, compose} from 'redux'\nimport rootReducer from '../Reducers'\n\nimport createSagaMiddleware, {END} from 'redux-saga'\n\nconst sagaMiddleware = createSagaMiddleware();\n\nexport const configureStore = (api) => {\n\tconst store = createStore(\n\t\trootReducer,\n\t\tcompose (\n\t\t\tapplyMiddleware(sagaMiddleware)\n\t\t)\n\t);\n\tstore.runSaga = sagaMiddleware.run;\n\tstore.close = () => store.dispatch(END);\n\treturn store;\n};\n", "./App/Web/Store/Store.js")
      shell.sed("-i", /.*/, "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport { configureStore } from './Store/Store';\nimport { Provider } from 'react-redux';\nimport { Router, browserHistory }  from 'react-router';\nimport { createApi } from '../Shared/Api/api';\nimport sagas from './Sagas/';\nimport { Routes } from './Routes';\n\nconst api = createApi('http://localhost:3000');\nconst store = configureStore(api);\nstore.runSaga(sagas(api));\n\nReactDOM.render(\n\t<Provider store={store}>\n\t\t\n\t\t\t<Router history={browserHistory}>{Routes(store)}</Router>\n\t\t\n\t</Provider>,\n\n\tdocument.getElementById('app')\n);\n", "./App/Web/App.jsx")
      shell.sed("-i", /.*/, "import React from 'react';\nimport {connect} from 'react-redux';\nimport * as actions from '../Shared/Actions/Creators';\nimport { Link } from 'react-router';\n\nclass Root extends React.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t}\n\trender() {\n\t\t\treturn <h1> App Loaded </h1>;\n\t}\n}\n\nexport default connect()(Root);\n", "./App/Web/Root.js")
      shell.sed("-i", /.*/, "import React from 'react';\nimport { Route, Link } from 'react-router';\n\nimport Root from './Root';\nimport * as actions from '../Shared/Actions/Creators';\n\nexport const Routes = (store) => {\n\treturn (\n\t\t<div>\n\t\t\t<Route path='/' name='root' component={Root}>\n\t\t\t</Route>\n\t\t</div>\n\t);\n};\n", "./App/Web/Routes.js")

      // SET UP PACKAGE json
      console.log(chalk.bold.blue('Installing Base Packages...'));
        // install base packages
      shell.exec("npm i -S redux react-redux react-router redux-saga redux-form axios react-dom")
      shell.exec("npm i -D webpack babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-react babel-preset-stage-0 css-loader file-loader react-hot-loader style-loader url-loader webpack-dev-server")
        // add react-native and webpack commands to package.json
      shell.sed("-i","\"start\": \"node node_modules/react-native/local-cli/cli.js start\"", "\"web:start\": \"NODE_ENV=development node ./web/dev-server ./webpack/config \",\n\t\"native:start\": \"node node_modules/react-native/local-cli/cli.js start\"", "./package.json")
      console.log(chalk.bold.green('Finished!'));
    });
  })
  .parse(process.argv);
