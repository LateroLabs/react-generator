"import axios from 'axios';\n\nexport const createApi = (server, token = null) => {\n\n\tconst client = axios.create({\n\t\tbaseURL: server,\n\t\theaders: {\n\t\t\t'Accept': 'application/vnd.scheduler.v1',\n\t\t\t'Cache-Control': 'no-cache',\n\t\t\t'Content-Type': 'application/json',\n\t\t\t'Authorization': `Token token=\"${token}\"`\n\t\t},\n\t\ttimeout: 10000\n\t});\n\treturn {};\n};\n
"
