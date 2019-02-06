const config = {
databaseUri : "mongodb://localhost:27017/eBook",
options: { 
reconnectInterval: 500, 
poolSize: 10, 
bufferMaxEntries: 0, 
connectTimeoutMS: 10000, 
socketTimeoutMS: 45000, 
useNewUrlParser: true 
 } 
}
module.exports=config