// Grab HTML elements
const logInput = document.getElementById('logInput');
const uploadText = document.getElementById('uploadText');

// When user selects file
logInput.addEventListener('change', function(){
    // Check if file was selected
    if (this.files && this.files[0]) {
        const file = this.files[0];

    // 5 MB limit on files
    const maxSizeBytes =  5 * 1024 * 1024;

    if (file.size > maxSizeBytes) {
        // Error message
        uploadText.innerText = "File is too large. Must be under 5 MB.";
        uploadText.style.color = "red";
        this.value = ""; //Resets input so file over 5 mb is removed
        return;
    }

    // If file size is fine, filename is displayed
    uploadText.innerText = `${file.name}`;
    uploadText.style.color = "#28a745";
    }
});

/* Shows user it grabbed file*/


/* Checks if over 5mb and blocks if it is*/
