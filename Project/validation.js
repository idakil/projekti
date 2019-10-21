const {check} = require('express-validator')

exports.validate = (method) =>{
    switch(method){
        case 'newRestaurant':{
            return [
                check('restaurant_name', 'Restaurant name missing').exists(),
                check('restaurant_address', 'Restaurant address missing').exists(),
                check('zipcode', 'Zip code invalid').isNumeric().isLength({min: 3}),
                check('city', 'City is missing').exists(),
                check('link', 'Website invalid').isURL(),
                check('restaurant_desc', 'Description missing').exists(),
                check('monday', 'Monday opening hours missing').matches('[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
                check('tuesday', 'Monday opening hours missing').matches('[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
                check('wednesday', 'Monday opening hours missing').matches('[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
                check('thursday', 'Monday opening hours missing').matches('[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
                check('friday', 'Monday opening hours missing').matches('[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
                check('saturday', 'Monday opening hours missing').matches('[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
                check('sunday', 'Monday opening hours missing').matches('[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')
            ]
        }
        case 'validateId':{
            return[
                check('id', 'Id does not exist or is not numeric').isNumeric()
            ]
        }
        case 'validateSearchReviews':{
            return [
                check('searchBy', 'Column with given parameter not found').equals('username' || 'stars')
            ]
        }
        }
    }