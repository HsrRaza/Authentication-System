const asyncHandler =( requestHandler) => {
    return (req, res, next)=> {
        Promise.resolve(
            requestHandler(req, res,  next))
            .catch( (err) => next(err))
    }
}
// study purpose
function asyncHandlers(requestHandler){
    return function(req, res , next ){
        Promise.resolve(requestHandler(req, res , next ))
        .catch(function(err){
            next(err)
        })
    }
}

export {asyncHandler}