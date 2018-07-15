const mongoose = require('mongoose');

var ProvinceSchema = new mongoose.Schema({
    Zip: {
        type: String,
        required : true
    },
    city : {
        type: String
    }

});


var Province = mongoose.model('Provinces',ProvinceSchema);

module.exports = {
    Province
}