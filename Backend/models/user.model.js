import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

const userMOdel = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilephoto: {
        type: String,
        required: true,
        default: ""
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
}, { timestamps: true })

userMOdel.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userMOdel.methods.comparepass = async function (password) {
    return await bcrypt.compare(password, this.password)

}
userMOdel.methods.createJWT = function () {
    return JWT.sign({ userId: this._id, name: this.username }, process.env.JWT_Key, { expiresIn: '1d' })
}
// PORT = 2323
// URI = 'mongodb+srv://denexammine:Qz2hfQ26WJNNa9hx@cluster0.c5jfssc.mongodb.net/'
// JWT_Key = 'hudeb#6^458#svvhh@'

export default mongoose.model('User', userMOdel)