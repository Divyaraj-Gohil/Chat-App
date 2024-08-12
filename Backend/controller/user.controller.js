import userMOdel from "../models/user.model.js"

export const register = async (req, res, next) => {
    try {
        const { fname, username, password, gender } = req.body
        if (!fname || !username || !password || !gender) return next('required all fields')

        const isuser = await userMOdel.findOne({ username })
        if (isuser) return next('username already exist!')
        const boy = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girl = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const user = await userMOdel.create({
            fname, username, password,
            profilephoto: gender === 'male' ? boy : girl,
            gender
        })
        res.status(201).json({
            fname: user.fname,
            username: user.username,
            profilephoto: user.profilephoto,
        })
    } catch (error) {
        return next(error)
    }
}
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username || !password) return next('Provide username and password')
        const user = await userMOdel.findOne({ username })
        if (!user) return next('Incorrect username or password')
        const compare = await user.comparepass(password)
        if (!compare) return next('Incorrect username or password')
        const token = await user.createJWT()
        //console.log(token)
        //cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
        return res.status(200).json({
            id: user._id,
            fname: user.fname,
            username: user.username,
            profilephoto: user.profilephoto,
            token: token
        })
    } catch (error) {
        return next(error)
    }
}
export const logout = (req, res, next) => {
    try {
        res.status(200).json({ message: "loged out..." })
    } catch (error) {
        next(error)
    }
}
export const getotheruser = async (req, res, next) => {
    try {
        const loggedInuserId = req.id
        const otherUser = await userMOdel.find({ _id: { $ne: loggedInuserId } }).select("-password")
        return res.status(200).json({ otherUser })
    } catch (error) {
        return res.status(400).json({ message: 'failed getotherusers' })
    }
}