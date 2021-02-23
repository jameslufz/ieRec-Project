import { Error, Schema } from 'mongoose'
import { member } from '../../models/users'
import dbConnect from '../../utilities/dbConnect'
dbConnect()
.then(() => console.log("Database Connected !"))

import { compare } from 'bcrypt'
import cookie from 'cookie'
import { sign } from 'jsonwebtoken'
import { Router } from 'next/router'

export default async (req, res) => {
    
    switch (req.method) {
        case 'GET'  :

            res.status(200).json({message :   "You were not allowed access this page."})

        break
        
        case 'POST'  :
            
            const   { username,password } =   req.body
            const   checkUser   =   await member.find({username})
            
            if(checkUser.length > 0) {
                try {
                    const   result  =   await compare(password,checkUser[0].password)
                    if(result) {
                        try {

                            // สร้าง token
                            const   token   =   await sign({
                                id          :   checkUser[0]._id,
                                name        :   checkUser[0].first_name + ' ' + checkUser[0].last_name
                            },process.env.NEXT_PUBLIC_JWT_SECRET,{ algorithm:'HS512', expiresIn:'1d' })
                            
                            // สร้าง cookie
                            res.setHeader('Set-Cookie', cookie.serialize("auth",token,{ 
                                httpOnly:   true,
                                sameSite:   'strict',
                                secure  :   process.env.NODE_ENV !== "development",
                                maxAge  :   3600 * 24,
                                path    :   '/'
                            }))

                            return res.json({ message:"เข้าสู่ระบบสำเร็จ",token })

                        } catch(err) {
                            console.log(err)
                            return res.json({message: "Error : " + err.reason})
                        }

                    } else {
                        return res.json({message:"รหัสผ่านไม่ถูกต้อง"})
                    }
                }
                catch(err) {
                    console.log(err)
                    return res.json({message: "Error : " + err.reason})
                }
            }

        break

        case 'DELETE' :

            res.setHeader('Set-Cookie', cookie.serialize("auth","",{ 
                httpOnly:   false,
                sameSite:   false,
                secure  :   false,
                maxAge  :   3600 * 0,
                path    :   '/'
            }))

            res.json({ signouted:true })

        break

        default :   console.log(req.method)
    }

}