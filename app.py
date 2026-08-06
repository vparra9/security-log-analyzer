from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Initialize web application, all routes, settings, and endpoints link back to this app variable
app = FastAPI()

# Tells backend to allow connections from frontend browser
app.add_middleware (
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Tells app when a user sends a POST request and will execute function below it
@app.post("/upload/")
async def catch_file(log_file: UploadFile = File(...)):
    # Reads file contents
    contents = await log_file.read()
    log_text = contents.decode("utf-8") # Decodes into a readable text string

    # Splits the text blocks into separate lines
    lines = log_text.splitlines()

    # Initialize specialized counters
    failed_logins = 0
    errors = 0
    successful_logins = 0
    file_changes = 0

    # Loop through every line in the file
    for line in lines:
        # Make everything uppercase so spelling is matched
        clean_line=line.upper()

        # Count Failed Logins (Potential Brute Force)
        if "FAILED PASSWORD" in clean_line or "LOGIN FAILED" in clean_line or "AUTHENTICATION FAILURE" in clean_line:
            failed_logins += 1
        
        # Count Successful Logins
        elif "ACCEPTED PASSWORD" in clean_line or "LOGIN SUCCESSFUL" in clean_line or "SESSION OPENED" in clean_line:
            successful_logins += 1
        
        # Count File Changes
        if "CREATED" in clean_line or "MODIFIED" in clean_line or "DELETED" in clean_line:
            file_changes += 1
        
        # Count General Errors
        if "ERROR" in clean_line or "CRITICAL" in clean_line or "EXCEPTION" in clean_line:
            errors += 1

    # Return results back to Java
    return {
        "status": "success",
        "filename": log_file.filename,
        "failed_logins": failed_logins,
        "successful_logins": successful_logins,
        "errors": errors,
        "file_changes": file_changes
    }

# Launch server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
