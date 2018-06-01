// Constant string used for the REST calls
const detectUri = uriBase + "detect";
const faceListUri = uriBase + "facelists/";
const findSimilarsUri = uriBase + "findsimilars"
const addFaceUri = "/persistedFaces"

const POST = "POST";
const PUT = "PUT";
const GET = "GET";

function detectFaceFromUrl() {
  var requestParams = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
  };

  // Display the image.
  var sourceImageUrl = $("#inputImage").val();
  document.querySelector("#sourceImage").src = sourceImageUrl;

  var requestBody = {
    "url": sourceImageUrl
  };

  sendRequest(detectUri, POST, requestBody, requestParams);
};

function sendRequest(requestUri, requestType, requestBody, requestParams) {
  $.ajax({
      url: ((requestParams) ? requestUri + "?" + $.param(requestParams) : requestUri),

      // Request headers.
      beforeSend: function(xhrObj) {
        xhrObj.setRequestHeader("Content-Type", "application/json");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
      },

      type: requestType,

      // Request body.
      data: JSON.stringify(requestBody),
    })

    .done(function(data) {
      // Show formatted JSON on webpage.
      $("#responseTextArea").val(JSON.stringify(data, null, 2));
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
      var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
        jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;

      alert(errorString);
    });
}