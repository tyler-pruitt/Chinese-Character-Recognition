//Your JavaScript code will go here!
window.onload = function() {
    
    loadScript('https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js');

    //var canvas = document.querySelector("canvas");

    //var signaturePad = new SignaturePad(canvas);

    /* DOCUMENTATION
    var canvas = document.querySelector("canvas");

    var signaturePad = new SignaturePad(canvas);
    
    // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
    signaturePad.toDataURL(); // save image as PNG
    signaturePad.toDataURL("image/jpeg"); // save image as JPEG
    signaturePad.toDataURL("image/svg+xml"); // save image as SVG
    
    // Draws signature image from data URL.
    // NOTE: This method does not populate internal data structure that represents drawn signature. Thus, after using #fromDataURL, #toData won't work properly.
    signaturePad.fromDataURL("data:image/png;base64,iVBORw0K...");
    
    // Returns signature image as an array of point groups
    const data = signaturePad.toData();
    
    // Draws signature image from an array of point groups
    signaturePad.fromData(data);
    
    // Clears the canvas
    signaturePad.clear();
    
    // Returns true if canvas is empty, otherwise returns false
    signaturePad.isEmpty();
    
    // Unbinds all event handlers
    signaturePad.off();
    
    // Rebinds all event handlers
    signaturePad.on();
    */

    document.getElementById("clearEntry").addEventListener("click", function () {
        signature.clear();
    });

    document.getElementById("submit").addEventListener("click", function () {
        // Fill in code here
        if (signaturePad.isEmpty() == false)
        {
            // Model recieves image here
        }

    });
}

function loadScript(url) {    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}