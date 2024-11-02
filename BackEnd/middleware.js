const verifyAccessToken = async(req,res,next) => {
   try {
     const token = req.cookies?.refreshToken;
     console.log(token)
     next()
   } catch (error) {
    console.log(error)
   }
}

export{
    verifyAccessToken
}           