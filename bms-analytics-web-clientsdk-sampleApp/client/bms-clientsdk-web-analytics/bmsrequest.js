var BMSRequest = function (url, method, timeout) {

    this._headers = {};
    this._queryParameters = {};
    this._url = url;
    this._method = method;
    this._timeout = timeout || 3000;
    this._responseCode='';
    this._startTime;
    this._endTime;
};

BMSRequest.GET = "GET";
BMSRequest.PUT = "PUT";
BMSRequest.POST = "POST";
BMSRequest.DELETE = "DELETE";
BMSRequest.TRACE = "TRACE";
BMSRequest.HEAD = "HEAD";
BMSRequest.OPTIONS = "OPTIONS";

function generateUUID(newSession) {
        "use strict";

        var d = new Date().getTime();
        var uuid = '';
        var generate = function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        };
        
            uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, generate);
        
        return uuid;
    };

BMSRequest.prototype = function () {

    /**
     * Set the headers for the request object
     * @param jsonObj
     */
    var setHeaders = function (jsonObj) {
        //performant Deep Clone the json object
        this._headers = JSON.parse(JSON.stringify(jsonObj));
    };

    /**
     * Return the headers object for the request object
     * @param
     * @returns {null, string}
     */
    var getHeaders = function () {
        return this._headers;
    };

    /**
     * Return the url for this request
     * @returns {string}
     */
    var getUrl = function () {
        return this._url;
    };

    /**
     * Return the HTTP method for this request
     * @returns {string}
     */
    var getMethod = function () {
        return this._method;
    };

    /**
     * Return the timeout (in ms) for this request
     * @returns {number}
     */
    var getTimeout = function () {
        return this._timeout;
    };

    /**
     * Return the queryParameters object for this request
     * @returns JSON
     */
    var getQueryParameters = function () {
        return this._queryParameters;
    };

    /**
     * Set the Query Parameters for the request object
     * @param jsonObj
     */
    var setQueryParameters = function (jsonObj) {
        //performant Deep Clone the json object

        this._queryParameters = JSON.parse(JSON.stringify(jsonObj));
    };


     


    var getResponseCode = function(){
        return this.responseCode;
    };

    /**
     * Send this resource request asynchronously.
     * @param body (Optional) The body: Either a string or an object
     * @param success The success callback that was supplied
     * @param failure The failure callback that was supplied
     */
    var send = function () {
        var buildRequest = buildJSONRequest.bind(this);
        
        var request;
        if(arguments.length == 2) {
            // Empty Body
            var Success = callbackWrap.bind(this, arguments[0]);
            var Failure = callbackWrap.bind(this, arguments[1]);

            request=buildRequest();

            $.ajax(request);

        } else if(arguments.length >= 3) {
            // Non-empty Body
            if(typeof arguments[0] == "string" || typeof arguments[0] == "object") {
                var Success = callbackWrap.bind(this, arguments[1]);
                var Failure = callbackWrap.bind(this, arguments[2]);

                request=buildRequest(arguments[0]);

                $.ajax(request);

            }
        }

        

        // var metadata = {
        //     "$path":  request.url,
        //     "$trackingid": generateUUID(),
        //     "$requestMethod": request.method,
        //     "$outboundTimestamp": this._startTime,
        //     "$inboundTimestamp": this._endTime,
        //     "$roundTripTime": this._endTime - this._startTime,
        //     "$bytesSent": request.body.length,
        //     "$responseCode":    this.responseCode        
        // };

        //  // "$responseCode": response.code(),
        //  // "$bytesReceived", response.body.length()   


        //  BMSAnalytics.log(metadata);
    };


    /**
     *
     * @param callback The Success or Failure callback
     * @param jsonResponse string : The string-form JSON response coming from the Native SDK.
     */
    var callbackWrap = function (callback, jsonResponse) {
        var response = "";
        if(jsonResponse !== ""){
            response = JSON.parse(jsonResponse);
        }
        callback && callback(response);
    };

    var buildJSONRequest = function (body) {
        var request = {};
        request._startTime= new Date().getTime();
        request.url = this.getUrl();
        request.method = this.getMethod();
        request.headers = this.getHeaders();
        request.timeout = this.getTimeout();
        request.queryParameters = this.getQueryParameters();
        request.body = "";
        //  request.success = this.responseData();
        if (typeof body === "string") {
            request.body = body;
        }
        else if (typeof body === "object") {
            request.body = JSON.stringify(body);
            if (!("Content-Type" in this._headers)) {
                request.headers["Content-Type"] = "application/json";
            }
        }
        //TODO update when Logger is complete

        // request.success = function(response)
        // {
        //     this._endTime= new Date().getTime();

        //     var metadata = {
        //     "$path":  this.url,
        //     "$trackingid": generateUUID(),
        //     "$requestMethod": this.method,
        //     "$outboundTimestamp": this._startTime,
        //     "$inboundTimestamp": this._endTime,
        //     "$roundTripTime": this._endTime - this._startTime,
        //     "$bytesSent": request.body.length,
        //     "$responseCode":    this.responseCode,
        //     "$bytesReceived": response.length        
        // };

        //  // "$responseCode": response.code(),
        //  // "$bytesReceived", response.body.length()   


        //  BMSAnalytics.log(metadata);
        // } 
        
        request.complete = function(xhr, status){
            alert(xhr.status); 
           
            this._endTime= new Date().getTime();
            this._responseCode=xhr.status;

            var metadata = {
            "$path":  this.url,
            "$trackingid": generateUUID(),
            "$requestMethod": this.method,
            "$outboundTimestamp": this._startTime,
            "$inboundTimestamp": this._endTime,
            "$roundTripTime": this._endTime - this._startTime,
            "$bytesSent": request.body.length,
            "$responseCode":    this._responseCode,
            "$bytesReceived": xhr.responseText.length        
            };
       
             BMSAnalytics.log(metadata);
        }
        console.log(" The request is: " + JSON.stringify(request));
        return request;
    };



    return {
        setHeaders: setHeaders,
        getHeaders: getHeaders,
        getUrl: getUrl,
        getMethod: getMethod,
        getTimeout: getTimeout,
        setQueryParameters: setQueryParameters,
        getQueryParameters: getQueryParameters,
        send: send
    }
}();

