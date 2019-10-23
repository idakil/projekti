const {check, param} = require('express-validator')

exports.validate = (method) =>{
    switch(method){
        case 'newRestaurant':{
            return [
                check('restaurant_name', 'Restaurant name missing').exists(),
                check('restaurant_address', 'Restaurant address missing').exists(),
                check('zipcode', 'Zip code invalid').isNumeric().isLength({min: 5}),
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
                param('id', 'Id is empty or is not numeric').isNumeric()
            ]
        }
        case 'validateSearchReviews':{
            return [
                check('searchBy', 'Column with given parameter not found').isIn(reviewsColumns)
            ]
        }
        case 'reviewBody':{
            return[
                check('restaurant_id', 'Restaurant id invalid').isNumeric(),
                check('stars', 'Star rating invalid').isInt({min: 1, max:5}),
                check('review', 'Review empty').isLength({min: 1}),
                check('userName', 'Username missing').exists()
            ]
        }
        }
    }

    let reviewsColumns = ['id', 'restaurant_id', 'stars', 'review', 'userName']