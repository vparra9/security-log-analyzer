// Grab HTML elements
const logInput = document.getElementById('logInput');
const uploadText = document.getElementById('uploadText');
const analyzeButton = document.getElementById('analyzeBtn');

const failedLoginCount = document.getElementById('failedLoginCount');
const errorCount = document.getElementById('errorCount');
const successfulLoginCount = document.getElementById('successfulLoginCount');
const fileChangeCount = document.getElementById('fileChangeCount');

const analysisTitle = document.getElementById('analysisTitle');
const analysisMessage = document.getElementById('analysisMessage');
const analysisStatus = document.getElementById("analysisStatus");

const failedPercent = document.getElementById("failedPercent");
const errorPercent = document.getElementById("errorPercent");
const successPercent = document.getElementById("successPercent");
const filePercent = document.getElementById("filePercent");

const summaryText = document.getElementById("summaryText");

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

        // Update stats cards
        failedLoginCount.textContent = data.failed_logins;
        errorCount.textContent = data.errors;
        successfulLoginCount.textContent = data.successful_logins;    
        fileChangeCount.textContent = data.file_changes;

        //Calculate Total Events
        const totalEvents = data.failed_logins + data.errors + data.successful_logins + data.file_changes;

        //Calculate Percentages
        if (totalEvents > 0) {
            const failedPercentage = Math.round((data.failed_logins / totalEvents) * 100);

            const errorPercentage = Math.round((data.errors / totalEvents) * 100);

            const successPercentage = Math.round((data.successful_logins / totalEvents) * 100);

            const filePercentage = Math.round((data.file_changes / totalEvents) * 100);

            //Update percentage text
            failedPercent.textContent = failedPercentage;
            errorPercent.textContent = errorPercentage;
            successPercent.textContent = successPercentage;
            filePercent.textContent = filePercentage;

        } else {
            //If no events were found
            failedPercent.textContent = 0;
            errorPercent.textContent = 0;
            successPercent.textContent = 0;
            filePercent.textContent = 0;
        }

        //Update summary
        if (totalEvents === 0) {
            summaryText.textContent = "No recognized security activity was detected in this log file.";
        }

        else if (data.failed_logins === 0 && data.errors === 0) {
            summaryText.textContent = 
                `The log contains ${totalEvents} detected events.` +
                `Normal activity was found, including ` +
                `${data.successful_logins} successful logins and ` +
                `${data.file_changes} file changes.` +
                `No suspicious activity was detected.`;
        }

        else {
            summaryText.textContent = 
            `The log contains ${totalEvents} detected events. ` +
            `${data.failed_logins} failed login attempts, ` +
            `${data.errors} errors, ` +
            `${data.successful_logins} successful logins, and ` +
            `${data.file_changes} file changes were detected.`;
        }
    })
        
        // Update analysis status
        if (data.failed_logins > 0 || data.errors > 0) {

            // Threats found
            analysisTitle.textContent = "Threats Detected";

            analysisMessage.textContent = "Potential Security issues were found.";

            analysisStatus.style.backgroundColor = "#FFF4E5";
            analysisStatus.style.border = "1px solid orange";
        }

        else if (data.successful_logins > 0 || data.file_changes > 0) {

            // Activity found, but nothing suspicious
            analysisTitle.textContent = "Analysis Complete";

            analysisMessage.textContent = "Activity was detected, but no suspicious login attempts or system errors were found.";

            analysisStatus.style.backgroundColor = "#EEF4FF";
            analysisStatus.style.border = "1px solid #5B7CFA";
        }

        else {

            //Nothing meaningful detected
            analysisTitle.textContent = "System Healthy";
            analysisMessage.textContent = "No suspicious activity was detected."
            analysisStatus.style.backgroundColor = "#EAF9EE";
            analysisStatus.style.border = "1px solid #28a745";
        }
    }) 
    .catch(error => {
        console.error("Connection failed:", error);
        alert("Cannot connect to Python. Is your server running?");
    })
    .finally(() => {
        analyzeButton.disabled = false;
});

