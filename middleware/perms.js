/*
* this function is writtEn to check the apis permmision allowed to the incominig client requests.
* if a request is comming from Staff and try to access the Owner things then it will reject the request.
* apis permissions is defined in a set of group in array.
*/


// list of groups defined in an array for api request validation
const scopes = {
    GRP_0   : ['OWNER'],
    ALL     : ['OWNER', 'STAFF'],
}

// to check the permission comming from the client with the defined group apis
const checkScopeLine = (scope) => {
    return (req, res, next) => {
        console.log("Fire");
        const isValid = scopes[scope].includes(req.body.role);

        if(!isValid) {
            return res.status(401).send({status:'fail', messsage:"user has no permission!"})
        }
        next();
    }
}

module.exports = checkScopeLine;