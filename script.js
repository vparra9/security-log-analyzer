// Grab HTML elements
const logInput = document.getElementById('logInput');
const uploadText = document.getElementById('uploadText');
const analyzeButton = document.getElementById('analyzeBtn');
const failedLoginCount = document.getElementById('failedLoginCount');
const errorCount = document.getElementById('errorCount');
const successfulLoginCount = document.getElementById('successfulLoginCount');
const fileChangeCount = document.getElementById('fileChangeCount');

// Global container to hold the file so both functions have access
let uploadedFile = null;
/****Handles file that grabs log file *****/

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
        uploadedFile=null;
        return;
    }

    // If file size is fine, filename is displayed
    uploadText.innerText = `${file.name}`;
    uploadText.style.color = "#28a745";

    // Saves valid file to global container
    uploadedFile = file;

    }
});

/****Handle button that analyzes log files uploaded ****/

// Tells browser to listen for a click event
analyzeButton.addEventListener('click', function() {

    // Alerts user if they click analyze without uploading a file
    if(!uploadedFile) {
        alert("Please upload a valid log file.")
    return;
    }

    console.log("File is being prepared for analysis: ", uploadedFile.name);

    const formData = new FormData();
    formData.append('log_file', uploadedFile);

    fetch('https://miniature-umbrella-97q46qw79jpw39vgx-5000.app.github.dev/upload/', { 
        method: 'POST',
        body: formData
    }
)
    .then(response => {
        if (!response.ok) {
            throw new Error("Analysis request failed.");
        }

        return response.json()
    })
    .then(data => {
        console.log("Analysis results complete:", data);

        failedLoginCount.textContent = data.failed_logins;
        errorCount.textContent = data.errors;
        successfulLoginCount.textContent = data.successful_logins;    
        fileChangeCount.textContent = data.file_changes;
    }) 
    .catch(error => {
        console.error("Connection failed:", error);
        alert("Cannot connect to Python. Is your server running?");
    })
    .finally(() => {
        analyzeButton.disabled = false;
    })
});

