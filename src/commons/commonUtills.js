const HTTP_STATUS = require("http-status");

const okResponseHandler = (result, req, res, next) => {
    try {
        addCommonResponseHanders(res);
        res.status(HTTP_STATUS.OK);
        res.json(result);
        res.end();
    } catch (error) {
        next(error)
    }
}

const addCommonResponseHanders = (res) => {
    if(!res){
        return;
    }
    // modify common response headers...
    res.removeHeader('X-Powered-By')
    // server response should always be no cache
    res.setHeader('Cache-Control', 'private', 'no-cache', 'no-store', 'must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Powered-By','The mitti')
}

const errorResponseHandler = (err, res) => {
    addCommonResponseHanders(res);
    if(typeof err === "object"){
        res.status(500).json({ message: err.message }).end()
    }else{
        res.status(500).json({message: err }).end()
    }
}

const commonUtills = () => {
    return {
        okResponseHandler: okResponseHandler,
        errorResponseHandler: errorResponseHandler
    }
}

module.exports = commonUtills()