const app = require("./app")
const sequelize = require("./database/db")
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server on port ${port}`)

    sequelize.authenticate()
    .then(()=>{
        console.log('Conexion a la bd')
    })
    .catch(error=>{
        console.log("error: " + error)

    })
})