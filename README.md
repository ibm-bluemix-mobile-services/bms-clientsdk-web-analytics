# bms-clientsdk-web-analytics
  Bluemix Mobile Analytics Service web SDK helps web app to connect to the IBM® Mobile Analytics for Bluemix® platform .Learn how to integrate the  Web SDK in a web application [here](https://console.ng.bluemix.net/docs/services/mobileanalytics/index.html#getting-started-with-mobile-analytics)


* By default  the analytics data capture is enabled, meaning data is passed to your Bluemix Analytics service instance. You can explicitly enable or disable persistent data capture by calling `BMSAnalytics.enable()` or `BMSAnalytics.disable()`.
 
  Note: The data collected via the analytics API and sent to the IBM Bluemix Mobile Analytics server, is then available in the UI DashBoard .

* The IBM Bluemix Mobile Analytics  API bmsanalytics provides the ability to enable, disable, and log custom events to analytics and send it to the server.
 
* The IBM Bluemix Mobile Analytics bmsanalytics was coded using the UMD pattern for javascript. This means it can be used as a separate module or used under the global context.  
  
* Following are examples of integrating the IBM Bluemix Mobile Analytics bmsanalytics as a module, using 'define', and an example of integrating the IBM Bluemix Mobile Analytics bmsanalytics on the global context.
  
  Example usage as module, using 'require':
  -----------------------------------
  
  Using module loader requirejs 

  ```Javascript
  require.config({
    'paths': {
        'BMSAnalytics': '../bms-clientsdk-web-analytics/bmsanalytics',
        'BMSRequest': '../bms-clientsdk-web-analytics/bmsrequest',
        'BMSClient': '../bms-clientsdk-web-analytics/bmsclient'
    }
  });

  require(['BMSAnalytics','BMSRequest','BMSClient'], function(BMSAnalytics) {
    var applicationName = 'com.ibm.bmsstarterweb';
    var clientApiKey='2bd5ad2a-ff2a-459c-bf0a-9d2ec90a538e';
    var bmsregion=BMSClient.REGION_US_SOUTH; // REGION_UK (for Region United Kingdom)/ REGION_SYDNEY ( for Region Sydney)
    var deviceEvents=BMSAnalytics.DeviceEvents.ALL;  //BMSAnalytics.DeviceEvents.(NONE/ LIFECYCLE /NETWORK )
    var instanceId = 'e22cf008-5c12-4662-9249-b74102c92dee';
    var hasUserContext=true;

    BMSClient.initialize(BMSClient.REGION_US_SOUTH);
    BMSAnalytics.initialize(applicationName,clientApiKey,hasUserContext,deviceEvents,instanceId);
    BMSAnalytics.send();
    
  }
  ```
  
 
## bms-analytics-web-clientsdk-sampleapp
Starter web app code  to connect with Bluemix Mobile Analytics  Service.

### IBM Bluemix Mobile Analytics Service Platform Web Sample Application
Use this sample application to get started with development of web applications.
The application uses the IBM Bluemix Mobile Analytics SDK to connect to a local or remote server.
 
**Note** 

**Getting Started**
1. To connect this App to IBM Mobile Analytics you need to have an instance of Mobile Analytics Service in Bluemix. To create your Mobile Analytics instance go [here](https://console.bluemix.net/catalog/services/mobile-analytics?env_id=ibm:yp:us-south&taxonomyNavigation=apps). After creating the instance you need to note down the `apiKey`  and  `instanceId` , which later needs to be provided for initialization of the websdk.
	* To get `apiKey` go under Service Credentials Section and then View Credential.
	* To get `instanceId` look into the url for the alphanumeric id upto /( or ?).
2. In this sample, the web-app is hosted using nodejs server. So you need node and npm preinstalled in your system. 
3. The client sdk is downloaded and kept in `client/bms-clientsdk-web-analytics` . To get the latest code download it from [here](https://github.com/ibm-bluemix-mobile-services/bms-clientsdk-web-analytics). 
4. To Initialize the web-app go to `client/js/index.js` file. Update the parameters 
	* `applicationName` is the unique id of your application that is shown in the dashboard. This applicationName unifies all the data sent from different platforms .
	* `apiKey` and `instanceId` , are the bluemix Mobile Analytics service instance specific keys noted before. 
	* `bmsregion` is the region in which service instance is created.
	* `deviceEvents` and `hasUserContext` are user requirement specific cofigurations . 
	For more information on these cofigurations visit Bluemix service instance `Getting Started` section.

5. After Configuration is done , run the server following the steps below. 
	* `cd node_server`
	* npm start
6. After the server starts , go to `http://localhost:9081/home/` to see the app UI.
