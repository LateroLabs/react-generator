"import React from 'react';\nimport {connect} from 'react-redux';\nimport * as actions from '../Shared/Actions/Creators';\nimport { Link } from 'react-router';\n\nclass Root extends React.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t}\n\trender() {\n\t\t\treturn <h1> App Loaded </h1>;\n\t}\n}\n\nexport default connect()(Root);\n
"
