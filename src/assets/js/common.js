/**
 * Fetch API Data with Authentication
 */
function getAPIData(resourcePath, requestOptions, callbackFunction) {
    requestOptions.headers = {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY
    };

    fetch(resourcePath, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            let responseElement = JSON.parse(data);
            callbackFunction(responseElement);
        })
        .catch(error => {
            alert(error.message);
            console.error('Error:', error);
        });
}

/**
 * Upload a file to the server with validation
 */
function uploadFile(resourcePath, callbackFunction, formData) {
    const request = new XMLHttpRequest();

    request.open("POST", resourcePath, true);
    request.responseType = "json"; // ✅ Ensure the response is treated as JSON

    // ✅ Show upload progress (optional)
    request.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            let percentComplete = (event.loaded / event.total) * 100;
            console.log(`Upload Progress: ${percentComplete.toFixed(2)}%`);
        }
    };

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            console.log("Raw response received:", request.response); // ✅ Log response
            console.log("Response Content-Type:", request.getResponseHeader("Content-Type")); // ✅ Log Content-Type

            if (request.status === 200) {
                if (request.response) {
                    callbackFunction(request.response); // ✅ Directly return the JSON object
                } else {
                    console.error("Error: Empty response received.");
                    alert("Error processing server response: Received an empty response.");
                }
            } else {
                console.error("Upload Failed:", request.response);
                alert("Error uploading file: " + JSON.stringify(request.response));
            }
        }
    };

    // ✅ Ensure formData contains a valid PDF file before sending
    if (!formData.has("cteFile")) {
        alert("No file found in the upload request.");
        return;
    }

    const file = formData.get("cteFile");
    if (!file || file.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        return;
    }

    request.send(formData);
}

/**
 * Store JWT Token
 */
function setJwtToken(token) {
    sessionStorage.setItem("jwt", token);
}

/**
 * Retrieve JWT Token (Fixed: Added return statement)
 */
function getJwtToken() {
    return sessionStorage.getItem("jwt");
}

/**
 * Retrieve Refresh Token
 */
function getRefreshToken() {
    return sessionStorage.getItem("refreshToken");
}
