import JWT from 'jsonwebtoken'

const Authenticated = (req, res, next) => {
    try {
        // const token = req.cookies?.token
        const header = req.headers.authorization
        if (!header) return res.status(401).json({ message: 'header not got' })
        const token = header.split(' ')[1]
        if (!token) return res.status(401).json({ message: 'un-authorised' })
        const verify = JWT.verify(token, process.env.JWT_Key)
        if (!verify) return res.status(400).json({ message: 'token not matched' })
        req.id = verify.userId
        next()
    } catch (error) {
        return res.status(401).json({ message: 'user not authorised' })
    }
}
export default Authenticated