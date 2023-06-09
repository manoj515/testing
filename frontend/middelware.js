const jwt=require("jsonwebtoken");
module.exports=function(req,res,next){
    try{
        const token=req.header('loo')
        if(!token){
            return res.status(404).send({Message:"No Token"})
        }
        let decode=jwt.verify(token,'keyu')
        req.user=decode.user
        next()
    }
    catch (err){
        console.log(err)
    }
}