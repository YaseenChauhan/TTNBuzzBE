const JOI = require('joi');

module.exports = {
    validateParam: (schema,name) => {
        return (req,res,next) => {
            const result = JOI.validate({
                param: req['params'][name]
            },schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }
            else {
                    if(!req.value){
                        req.value = {};
                    }
                    if(!req.value['params']){
                        req.value['params'] = {};
                    }
                    req.value['params'][name]=result.value['param'];
                    next();
            }
            
        }
    },
    schemas: {
        idSchema: JOI.object().keys({
            param: JOI.string().regex(/^[0-9A-Fa-f]{24}$/).required()
        })
    }
}