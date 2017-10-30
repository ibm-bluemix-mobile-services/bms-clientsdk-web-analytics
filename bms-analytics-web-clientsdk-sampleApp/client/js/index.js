require.config({
    'paths': {
        'BMSAnalytics':'../bms-clientsdk-web-analytics/bmsanalytics',// '/Users/krishnendu/Work/bms-analytics-web-clientsdk-sampleApp/bmsanalytics',//'../../bmsanalytics',//
        'BMSRequest': '../bms-clientsdk-web-analytics/bmsrequest',//'/Users/krishnendu/Work/bms-analytics-web-clientsdk-sampleApp/bmsrequest',//../../bmsrequest',//
        'BMSClient': '../bms-clientsdk-web-analytics/bmsclient'//'/Users/krishnendu/Work/bms-analytics-web-clientsdk-sampleApp/bmsclient'////'../../bmsclient'//
    }
});

require(['BMSAnalytics'], function() { //,BMSAnalytics'BMSRequest','BMSClient'
    require(['BMSRequest','BMSClient'],function(){
        var applicationName = 'com.ibm.mfpstarterweb';
        var clientApiKey='9cf3a3f9-a303-476c-9d5d-aa388ceb4093';//'2bd5ad2a-ff2a-459c-bf0a-9d2ec90a538e';
        var bmsregion=BMSClient.REGION_US_SOUTH; // REGION_UK (for Region United Kingdom)/ REGION_SYDNEY ( for Region Sydney)
        var deviceEvents=BMSAnalytics.DeviceEvents.ALL;  //BMSAnalytics.DeviceEvents.(NONE/ LIFECYCLE /NETWORK )
        var instanceId = 'e31b1a0d-18c7-48bb-a376-39983affd262';//'authorized';
        var hasUserContext=true;

        BMSClient.initialize(BMSClient.REGION_US_SOUTH);
        //BMSAnalytics.overrideServerhost("localhost:8000");
        BMSAnalytics.initialize(applicationName,clientApiKey,hasUserContext,deviceEvents,instanceId);//.done(function(){
        console.log('Bluemix Mobile Analytics initialized');
        console.log('Sdk Targets Service instance with instanceId'+instanceId+' and clientApiKey'+clientApiKey );


        var app = {
          //initialize app
          "init": function init() {
                var buttonElement0 = document.getElementById("ping");
                var textElement0 = document.getElementById("userIdentity");
                var buttonElement1 = document.getElementById("setUsrContext");

                var buttonElement2 = document.getElementById("disableLogger");
                var buttonElement3 = document.getElementById("enableLogger");
                var buttonElement4 = document.getElementById("isEnabled");

                var buttonElement5 = document.getElementById("getLogLevel");
                var textElement1 = document.getElementById("loglevelset");
                var buttonElement6 = document.getElementById("setLogLevel");

                var textElement2 = document.getElementById("logText");
                var textElement3 = document.getElementById("logTextLevel");
                var buttonElement7 = document.getElementById("sendLog");

                var buttonElement8 = document.getElementById("enableAnalytics");
                var buttonElement9 = document.getElementById("disableAnalytics");
                var buttonElement10 = document.getElementById("sendAnalytics");

                var textElement4 = document.getElementById("analyticscustomlog");
                var buttonElement11 = document.getElementById("customLogAnalytics");

                var buttonElement12 = document.getElementById("getlogStoreSize");
                var textElement5 = document.getElementById("logStoreSize");
                var buttonElement13 = document.getElementById("setlogStoreSize");

                buttonElement0.style.display ="block";
                buttonElement1.style.display="block";
                buttonElement2.style.display ="block";
                buttonElement3.style.display="block";
                buttonElement4.style.display ="block";
                buttonElement5.style.display="block";
                buttonElement6.style.display ="block";
                buttonElement7.style.display="block";
                buttonElement8.style.display ="block";
                buttonElement9.style.display="block";
                buttonElement10.style.display ="block";
                buttonElement11.style.display="block";
                buttonElement12.style.display ="block";
                buttonElement13.style.display="block";

                BMSAnalytics.send();
                BMSAnalytics.enable();


                BMSAnalytics.Logger.setMaxLogStoreSize(10000);


                buttonElement0.addEventListener('click', app.testServerConnection, false);

                buttonElement1.addEventListener('click',app.setUserContext,false);

                buttonElement2.addEventListener('click',app.disableLogger,false);

                buttonElement3.addEventListener('click',app.enableLogger,false);

                buttonElement4.addEventListener('click',app.isEnabled,false);

                buttonElement5.addEventListener('click',app.getLogLevel,false);

                buttonElement6.addEventListener('click',app.setLogLevel,false);

                buttonElement7.addEventListener('click',app.sendLog,false);

                buttonElement8.addEventListener('click',app.enableAnalytics,false);

                buttonElement9.addEventListener('click',app.disableAnalytics,false);

                buttonElement10.addEventListener('click',app.sendAnalytics,false);

                buttonElement11.addEventListener('click',app.customLogAnalytics,false);

                buttonElement12.addEventListener('click',app.getlogStoreSize,false);

                buttonElement13.addEventListener('click',app.setlogStoreSize,false);

                var success = function(data) {
                    console.log("success", data);
                }
                var failure = function(error){
                    console.log("failure", error);
                }
                console.log(BMSRequest);



                console.log(BMSRequest);

                var request = new BMSRequest("https://www.google.com", BMSRequest.GET);
              //  var headers = {
              //      header1: "val1",
              //      header2: "val2"
              //  };
              //  request.setHeaders(headers);

                var queryParams = {
                    env_id:"ibm%3Ayp%3Aus-south"
                };

                request.setQueryParameters(queryParams);

                request.send(success, failure);
          },
          //test server connection
          "testServerConnection": function testServerConnection() {
                var titleText = document.getElementById("main_title");
                var statusText = document.getElementById("main_status");
                var infoText = document.getElementById("main_info");
                titleText.innerHTML = "Hello Bluemix Mobile Analytics";
                statusText.innerHTML = "Connecting to Server...";
                infoText.innerHTML = "";
                console.log('testServerConnection');
                BMSAnalytics.log({'customLog':'testServerConnection1'});
                var promise=BMSAnalytics.send();

                promise.then(function(result) {
                  statusText.innerHTML = "Connection Successful...";
                  console.log(result); // "Stuff worked!"
                }, function(err) {
                  statusText.innerHTML = "Connection Failed ....";
                  console.log(err); // Error: "It broke"
                });
                setTimeout(function(){
                    statusText.innerHTML = "";
                }, 2000);
          },

          "setUserContext": function setUserContext() {
                var titleText = document.getElementById("main_title");
                var statusText = document.getElementById("main_status");
                var infoText = document.getElementById("main_info");

                titleText.innerHTML = "Hello Bluemix Mobile Analytics";
                infoText.innerHTML = "";
                BMSAnalytics.setUserIdentity(document.getElementById("userIdentity").value);
                BMSAnalytics.send();
                statusText.innerHTML = "User Identity Set..with userId "+document.getElementById("userIdentity").value;
                setTimeout(function(){
                    statusText.innerHTML = "";
                }, 2000);
          },

          "disableLogger": function disableLogger() {
                var titleText = document.getElementById("main_title");
                var statusText = document.getElementById("main_status");
                var infoText = document.getElementById("main_info");

                statusText.innerHTML = "Log Capturing is disabled...";
                infoText.innerHTML = "";
                console.log('disableLogger');
                BMSAnalytics.Logger.capture(false);
                setTimeout(function(){
                    statusText.innerHTML = "";
                }, 2000);
          },

          "enableLogger": function enableLogger() {
                var titleText = document.getElementById("main_title");
                var statusText = document.getElementById("main_status");
                var infoText = document.getElementById("main_info");
                statusText.innerHTML = "Logs Capturing is enabled...";
                infoText.innerHTML = "";
                console.log('enableLogger');
                BMSAnalytics.Logger.capture(true);
                setTimeout(function(){
                    statusText.innerHTML = "";
                }, 2000);
          },

          "isEnabled":function isEnabled() {
                var titleText = document.getElementById("main_title");
                var statusText = document.getElementById("main_status");
                var infoText = document.getElementById("main_info");
                statusText.innerHTML = "Check if Log Capturing enabled... ";
                infoText.innerHTML = "";


                if(BMSAnalytics.Logger.isStoringLogs() )
                {
                   //setTimeout(function(){
                    statusText.innerHTML = "Log Capturing is enabled... ";
                    //}, 2000);
                }
                else
                {
                    //setTimeout(function(){
                    statusText.innerHTML = "Log Capturing is disabled... ";
                    //}, 2000);
                }

                setTimeout(function(){
                    statusText.innerHTML = "";
                }, 2000);
          },

          "getLogLevel":function()  {
    
          },

          "setLogLevel":function() {
                var titleText = document.getElementById("main_title");
                var statusText = document.getElementById("main_status");
                var infoText = document.getElementById("main_info");

                var ll=document.getElementById("loglevelset").value;

                if(ll=="TRACE" || ll=="trace")
                {
                   BMSAnalytics.Logger.setLogLevel('trace');
                }
                else if(ll=="DEBUG" || ll=="debug")
                {
                    BMSAnalytics.Logger.setLogLevel('debug');
                }
                else if(ll=="INFO" || ll=="info")
                {
                    BMSAnalytics.Logger.setLogLevel('info');
                }
                else if(ll=="WARN" || ll=="warn")
                {
                    BMSAnalytics.Logger.setLogLevel('warn');
                }
                else if(ll=="ERROR" || ll=="error")
                {
                    BMSAnalytics.Logger.setLogLevel('error');
                }
                else if(ll=="FATAL" || ll=="fatal")
                {
                    BMSAnalytics.Logger.setLogLevel('fatal');
                }
                else
                {
                    statusText.innerHTML = "Log Level not valid";
                }

                statusText.innerHTML ="Setting Logging Level "+document.getElementById("loglevelset").value;
                //BMSAnalytics.Logger.setLogLevel(document.getElementById("loglevelset").value);

                setTimeout(function(){
                    statusText.innerHTML = "";
                }, 2000);
          },

          "sendLog": function sendLog() {
    
          },

          "enableAnalytics":function enableAnalytics() {
    
          },

          "disableAnalytics":function disableAnalytics() {
                var titleText = document.getElementById("main_title");
                var statusText = document.getElementById("main_status");
                var infoText = document.getElementById("main_info");

                statusText.innerHTML = "Disabling Analytics Log Storage ...";
                infoText.innerHTML = "";

                BMSAnalytics.disable();

                setTimeout(function(){
                    statusText.innerHTML = " Analytics Log Storage Disabled...";
                }, 2000);


                setTimeout(function(){
                    statusText.innerHTML = "";
                }, 2000);
          },

           "sendAnalytics":function sendAnalytics() {
                var titleText = document.getElementById("main_title");
                var statusText = document.getElementById("main_status");
                var infoText = document.getElementById("main_info");

                statusText.innerHTML = "Sending Analytics Logs  ...";
                infoText.innerHTML = "";

                BMSAnalytics.send();

                setTimeout(function(){
                    statusText.innerHTML = " Analytics Log Sent. ";
                }, 2000);


                setTimeout(function(){
                    statusText.innerHTML = "";
                }, 2000);
          },

          "customLogAnalytics":function customLogAnalytics() {
    
          },

          "getlogStoreSize":function getlogStoreSize() {
                var titleText = document.getElementById("main_title");
                var statusText = document.getElementById("main_status");
                var infoText = document.getElementById("main_info");

                statusText.innerHTML = "Max Size of Log Store"+BMSAnalytics.Logger.getMaxLogStoreSize();
                infoText.innerHTML = "";

                setTimeout(function(){
                    statusText.innerHTML = "";
                }, 2000);
          },

          "setlogStoreSize":function setlogStoreSize() {
    
          }

        }

        app.init();

           
    });
});
