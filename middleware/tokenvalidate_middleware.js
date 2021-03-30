module.exports = app =>{
    app.use(function(req,res, next){
        console.log("Middleware passed");
        next();
    });
}