"import React from 'react';\nimport { Route, Link } from 'react-router';\n\nimport Root from './Root';\nimport * as actions from '../Shared/Actions/Creators';\n\nexport const Routes = (store) => {\n\treturn (\n\t\t<div>\n\t\t\t<Route path='/' name='root' component={Root}\n\t\t\t</Route>\n\t\t</div>\n\t);\n};\n
"
