import app from "./app";
import * as connection from "./commons/MongodbConnection";

const PORT = process.env.PORT || 4000

app.set('port', PORT)


const server = app.listen(PORT, () => {
    new connection.MongodbConnection().DbConnect();
    console.log("server is running on port http://localhost:" + PORT)
})

server.timeout = 300000;
