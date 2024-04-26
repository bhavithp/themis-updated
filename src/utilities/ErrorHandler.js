export const handleErr = (err) => {
    var incomingData = {};
    var responseResult = {};
    Object.keys(err).forEach(function (key) {
        if (key === 'response') {
            // console.log("ERR KEY", err[key]);
            incomingData = err[key];
        }
        // console.log("ERR from ErrorHandler", err);
        responseResult = {
            statusCode: 504,
            errorText: err
        }
    });

    // console.log("INCOMING DATA", incomingData);

    for (const property in incomingData) {
        console.log("Property", property);
        responseResult = {
            statusCode: incomingData['data'].status_code,
            errorText: incomingData.data
        }
    }
    // console.log('ResponseResult', responseResult);
    return responseResult;
}