const headers = async (req, res, next) =>  {
    res.header('Access-Control-Allow-Origin', '*'); //1
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); //2
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, accept, Authorization'); //3

    next()
}

module.exports= headers;