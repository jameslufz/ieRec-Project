import { server } from '../config'

export async function AuthUser(req,res) {
    
    const   token   =   req.cookies.auth
    const   resp    =   await fetch(`${server}/api/auth`, {
        headers :   {
            authorization   :   token
        }
    })
    const   data    =   await resp.json()
    
    return  data
    
}