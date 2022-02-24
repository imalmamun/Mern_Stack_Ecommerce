const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
// handling uncaught exception...
process.on("uncaughtException",(err)=>{
    console.log(`error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Rejection`);
    process.exit(1);
})


// config
dotenv.config({ path: "server/config/config.env"});

// connecting to database
connectDatabase(); 






const server = app.listen(process.env.PORT, ()=>{
    console.log(`We are listening from https://localhost:${process.env.PORT}`);
});

// handling database connection error.....
process.on("unhandledRejection" , err=>{
    console.log(`error: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection")
    server.close(()=>{
        process.exit(1)
    });

})