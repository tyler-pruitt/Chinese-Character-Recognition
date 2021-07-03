function showFiles() {
    // An empty image element
    let demoImage = document.getElementById('idImage');
    // Read the file from the user
    let file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        demoImage.src = reader.result;
    }
    reader.readAsDataURL(file);
    //app();
}