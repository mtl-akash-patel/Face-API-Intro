// Constant strings used for the REST calls
const detectUri = uriBase + "detect";
const faceListUri = uriBase + "facelists/";
const findSimilarsUri = uriBase + "findsimilars";
const addFaceUri = "/persistedFaces";

const POST = "POST";
const PUT = "PUT";
const GET = "GET";


function addFaceToFaceList() {
  var faceListName = $("#inputFaceListName").val();
  var sourceImageUrl = $("#inputImage").val();
  var userData = "url: " + sourceImageUrl;
  var requestUri = faceListUri + faceListName + addFaceUri;

  document.querySelector("#sourceImage").src = sourceImageUrl;

  var requestParams = {
    "faceListId": faceListName,
    "userData": userData
  };

  var requestBody = {
    "url": sourceImageUrl
  };

  sendRequest(requestUri, POST, requestBody, requestParams);
}

function createFaceList() {
  var faceListName = $("#inputFaceListName").val();
  var requestUri = faceListUri + faceListName;

  var requestParams = {
    "faceListId": faceListName
  };

  var requestBody = {
    "name": faceListName
  };

  sendRequest(requestUri, PUT, requestBody, requestParams);
}

function detectFaceFromUrl() {
  var requestParams = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise"
  };

  // Display the image.
  var sourceImageUrl = $("#inputImage").val();
  document.querySelector("#sourceImage").src = sourceImageUrl;

  var requestBody = {
    "url": sourceImageUrl
  };

  sendRequest(detectUri, POST, requestBody, requestParams);
};

function findSimilarFaces() {
  var faceId = $("#inputFaceId").val();
  var faceListName = $("#inputFaceListName").val();

  // Display the image.
  var sourceImageUrl = $("#inputImage").val();
  document.querySelector("#sourceImage").src = sourceImageUrl;

  var requestBody = {
    "faceId": faceId,
    "faceListId": faceListName
  };

  sendRequest(findSimilarsUri, POST, requestBody);
}

function getFaceList() {
  var faceListName = $("#inputFaceListName").val();
  var requestUri = faceListUri + faceListName;

  var requestParams = {
    "faceListId": faceListName
  };

  var requestBody;
  sendRequest(requestUri, GET, requestBody, requestParams);
}

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
      data: JSON.stringify(requestBody)
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