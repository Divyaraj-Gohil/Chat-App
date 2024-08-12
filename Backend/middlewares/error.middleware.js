const errorMiddleware = (err, req, res, next) => {
    const DefaultErr = {
        statuscode: 500,
        message: err
    }
    console.log("first", DefaultErr)
    if (err.name === 'ValidationError') {
        DefaultErr.statuscode = 400;
        DefaultErr.message = Object.values(err.errors).map(item => item.message).join()
    }
    if (err.code && err.code === 11000) {
        DefaultErr.statuscode = 400;
        DefaultErr.message = `${Object.keys(err.keyValue)} has to be unique`
    }
    res.status(DefaultErr.statuscode).json({ message: DefaultErr.message })
}
export default errorMiddleware