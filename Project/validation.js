const {check} = require('express-validator')

exports.validate = (method) =>{
    switch(method){
        case 'newRestaurant':{
            return [
                check('name', 'Restaurant name missing').exists(),
                check('address', 'Restaurant address missing').exists(),
                check('zipcode', 'Zip code missing or invalid').isNumeric()
            ]
        }
        case 'delete':{
            return[
                check('id', 'Id does not exist').isNumeric()
            ]
        }
        }
    }