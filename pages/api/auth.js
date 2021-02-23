import { verify } from "jsonwebtoken"

export default async (req,res) => {
    
    const   tokenAuth  =   req.headers.authorization
    try
    {
        await verify(tokenAuth,process.env.NEXT_PUBLIC_JWT_SECRET)
        console.log("Logged in")
        return res.status(200).json({ message: "Identified !",identify: true })
    }
    catch(error)
    {
        console.log("Unlogged in")
        return res.status(401).json({ message: "User no have any token.",identify: false })
    }

}