const express = require("express")
const { MongoClient } = require('mongodb')

const api = express.Router()
const app = express()

const mongo = new MongoClient(process.env.MONGO_CONNECTION_STRING);
mongo.connect()
const db = mongo.db("test")

app.get("/health", (req, res) => {
	res.json({ ok:true })
})

api.get("", (req, res) => {
	res.send(`
		<!DOCTYPE html>
		<html>
			<body>
				<h2>Hi</h2>
				<pre id="out" ></pre>
				<script>
					fetch("/api/mongo_stuff").then(r => r.json()).then((rows) => {
						document.getElementById("out").innerHTML = JSON.stringify(rows, null, 4)
					})
				</script>
			</body>
		</html>
	`)
})

api.get("/mongo_stuff", (req, res) => {
	const stuff = db.collection("stuff")
	stuff.find({})
		.toArray()
		.then((rows) => res.json(rows))
})

api.get("/wait", (req, res) => {
	setTimeout(() => {
		res.json({ hello:"world" })
	}, 1000)
})

app.use(process.env.MOUNT_PATH || "/api", api)

app.listen(process.env.PORT || 3000, () => console.log("started"))
