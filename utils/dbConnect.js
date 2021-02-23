import mongoose from 'mongoose'

const   dbConnect   =   async ()    =>  {

    const   db  =   await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_SECRET,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

}

export default dbConnect