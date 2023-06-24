const express = require("express");
const https = require("https")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())
app.use(morgan("tiny"))
app.use(express.static(path.join(__dirname, "dist")))

let PORT = 5000
let URL = "https://api.opentopodata.org/v1/aster30m?locations="
function get_args() {
    let args = process.argv.slice(2)
    const nextArg = () => {
        let arg = args[0]
        args = args.slice(1)
        return arg
    }
    if (args.length > 0) {
        while (args.length > 0) {
            if (nextArg() === "-p") {
                PORT = parseInt(nextArg())
            }

            if (nextArg() === "-u") {
                URL = nextArg()
            }
        }
    }
}

app.get('/api/', async function (request, response) {
    const location = request.query.location;
    let url = `${URL}${location}`;

    https.get(url, resp => {
        let data = "";
        resp.on("data", chunk =>{
            data += chunk;
        })

        resp.on("end", () => {
            let parsed = JSON.parse(data)
            response.json(parsed)
        })
    })
})


get_args()

app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`))
