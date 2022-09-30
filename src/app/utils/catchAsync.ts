//In order to get rid of multiple try-catch blocks, defined the catchAsync function
export default (fn:any) => {
    return (req:any,res:any,next:any) => {
        fn(req,res,next).catch(next)
    }
};