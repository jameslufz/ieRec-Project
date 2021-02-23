import { Schema } from 'mongoose'
import { member } from '../../models/users'

import dbConnect from '../../utilities/dbConnect'
dbConnect().then(() => console.log("Database Connected !"))

import { hash } from 'bcrypt'

export default async (req, res) => {
    
    switch (req.method) {
        case 'GET'  :
            res.status(200).json({message :   "You were not allowed access this page."})

        break
        case 'POST'  :

            const   { username, password, con_password, first_name, last_name, accept_pvc } =   req.body

            switch (req.method) {
                case 'GET':
                    return  res.status(403).json({ message: "You were not allowed to access this page." })
                    break;

                case 'POST':

                    if(!username || !password || !con_password || !first_name || !last_name) return res.json({ message: "ต้องการข้อมูลทุกช่อง กรุณากรอกให้ครบ" })
                    if(con_password != password) return res.json({ message: "รหัสผ่านไม่ตรงกัน" }) 
                    if(!accept_pvc) return res.json({ message: "กรุณายอมรับข้อตกลงและเงื่อนไข" })

                    const   d   =   new Date()
                    const   now =   d.getFullYear() + '-' +
                                    (d.getMonth() + 1) + '-' +
                                    d.getDate() + ' ' +
                                    d.getHours() + ':' + d.getMinutes()
                                    
                    const   existUser   =   await member.find({username})
                    if(existUser.length >   0)
                    {
                        return res.json({ message : `ชื่อผู้ใช้ ${username} มีอยู่แล้ว` })
                    }
                    else
                    {
                        hash(password,10, async (err,hashed) => {
    
                            const   insertData  =   await member.create({
                                _id         :   Math.floor(Math.random() * 9000000) + 1000000,
                                username,
                                password    :   hashed,
                                first_name,
                                last_name,
                                join_date   :   now
                            })
                            if(insertData) {
                                return res.json({ message : "สมัครสมาชิกสำเร็จ" })
                            }
    
                        })
                    }

                    break;
            
                default:
                    break;
            }
            
        break

        default :   console.log(req.method)
    }

}