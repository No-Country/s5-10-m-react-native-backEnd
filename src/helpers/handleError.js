

module.exports =  handleError = (res, status, message, error) => {
    if(error){
        return res.status(status).json({status: false, message, errors: error});
    }

    return res.status(status).json({status: false, message});
}