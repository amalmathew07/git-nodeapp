var request = require('request');
var geoCodeAddress = (argv,callback) => {
    var encodedAddr = encodeURIComponent(argv.a);
request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}&key=AIzaSyBSwoE8vJ8M531zVd0UiC9XfxqM5YJFIX8`,
    json:true
}, (error,response,body) => {
  
    if (error) {
        callback("Error Detected");
    } else {
    //console.log(`Body: ${body}`);
    //console.log(response);
    callback(undefined, {
        address : body.results[0].formatted_address,
        lattitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
    });
    }
                // `Address: ${body.results[0].formatted_address}`
})
}
