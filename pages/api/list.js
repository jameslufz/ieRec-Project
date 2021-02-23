import { member } from '../../models/users'
import dbConnect from '../../utilities/dbConnect'
dbConnect()

export default async (req,res) => {

    const   data    =   await member.find({})
    res.json(data)

}