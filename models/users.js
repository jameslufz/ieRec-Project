import { Schema, models, model } from "mongoose"

const   userSchema  =   new Schema({
    _id         :   {type:Number},
    username    :   {
        type        :   String,
        lowercase   :   true,
        required    :   true
    },
    password    :   {
        type        :   String,
        required    :   true,
        minLength   :   6
    },
    first_name  :   {
        type        :   String,
        required    :   true
    },
    last_name   :   {
        type        :   String,
        required    :   true
    },
    join_date   :   {type: String}
})

module.exports = {
    member : models.user || model('user',userSchema)
}