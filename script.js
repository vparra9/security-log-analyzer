// Grab HTML elements
const logInput = document.getElementById('logInput');
const uploadText = document.getElementById('uploadText');
const analyzeButton = document.getElementById('analyzeBtn');

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
    })
    .then(response => response.json())
    .then(data => {
        // Python's summary results will return
        console.log("Analysis results from Python:", data);

        // Displays newly calculated backend results
        alert(`Analysis done for ${data.filename}
                -Errors: ${data.errors}
                -Failed Logins: ${data.failed_logins}
                -Successful Logins: ${data.successful_logins}
                -File Changes: ${data.file_changes}`);

    })
    .catch(error => {
        console.error("Connection failed:", error);
        alert("Cannot connect to Python. Is your server running?");
    });
});

