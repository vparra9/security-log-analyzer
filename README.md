# security-log-analyzer

A full-stack web application that allows users to upload `.log` or `.txt` files and analyze them for common security-related activity.

The Security Log Analyzer uses an HTML/CSS frontend, JavaScript for user interaction and communication with the backend, and a Python FastAPI backend to process uploaded log files. The backend searches the log for recognized security events and returns the results to the frontend as JSON. JavaScript then uses those results to dynamically update the analysis dashboard.

The analyzer currently identifies:

- Failed login attempts
- Successful logins
- System or application errors
- File changes
- Overall detected event activity

The goal of this project was to build a practical cybersecurity application while gaining experience with frontend development, backend development, APIs, Python, JavaScript, file processing, and dynamic web interfaces.

## Project Preview
![alt text](image-1.png)
The application provides a single dashboard where users can upload a log file, initiate analysis, and view the resulting security statistics.

## Features
- Upload `.log` and `.txt` files
- Maximum file size validation of 5 MB
- Python-based log processing
- FastAPI backend
- REST API communication between the frontend and backend
- Detection of failed login attempts
- Detection of successful login activity
- Detection of system and application errors
- Detection of file creation, modification, and deletion events
- Automatic event counting
- Event percentage calculations
- Dynamic security status messages
- Automatically generated analysis summaries
- Downloadable analysis report
- Dashboard-style user interface

# Application Architecture

The Security Log Analyzer uses a frontend/backend architecture.

The general data flow is:

```text
User Selects Log File
        |
        v
JavaScript Validates File
        |
        v
JavaScript Creates FormData
        |
        v
POST /upload/
        |
        v
Python / FastAPI Backend
        |
        v
Log File Is Read and Analyzed
        |
        v
Security Events Are Counted
        |
        v
JSON Response Returned
        |
        v
JavaScript Receives Results
        |
        v
Dashboard Is Updated
```

# Technologies Used

The Security Log Analyzer was built using a combination of frontend and backend technologies. Each technology serves a different purpose within the application.

## Frontend

### HTML5

HTML provides the structure of the application and organizes the different components of the dashboard.

The HTML interface includes:

- File upload section
- Analyze button
- Supported file format information
- Analysis result cards
- Analysis status section
- Event breakdown
- Analysis summary
- Download report button

### CSS3

CSS is used to style and organize the application's user interface.

The project uses CSS to create:

- A dashboard-style layout
- CSS Grid and Flexbox positioning
- Result cards
- Custom file upload controls
- Security status indicators
- Event category indicators
- Responsive sizing and spacing
- Custom icons and buttons

### JavaScript

JavaScript controls the interactive behavior of the frontend and communicates with the Python backend.

JavaScript is responsible for:

- Detecting when a user selects a file
- Validating the uploaded file size
- Storing the selected file
- Creating a `FormData` object
- Sending the file to the FastAPI backend using `fetch()`
- Receiving the JSON response from the backend
- Updating the result cards
- Calculating event percentages
- Updating the analysis status
- Generating the analysis summary
- Handling frontend errors

---

## Backend

### Python

Python performs the actual analysis of the uploaded log file.

After receiving a file, the backend reads its contents, separates the log into individual lines, and checks each line for supported security-related patterns.

The Python backend counts four main types of activity:

- Failed login attempts
- Successful logins
- Errors
- File changes

### FastAPI

FastAPI is used to create the backend API.

The application contains a `POST` endpoint at:

`/upload/`

This endpoint receives the log file sent by JavaScript and passes it to the Python analysis logic.

After the file has been analyzed, FastAPI returns the results to the frontend as JSON.

### Uvicorn

Uvicorn is used as the ASGI server that runs the FastAPI application during development.

### CORS Middleware

CORS middleware is enabled so that the frontend and backend can communicate while running from separate development servers.

---

# How to Use the Application

Using the Security Log Analyzer involves three main steps.

## Step 1 — Upload a Log File

Click the upload area under **Upload Log File** and select a file from your computer.

The application currently accepts:

- `.log`
- `.txt`

The maximum supported file size is **5 MB**.

When a valid file is selected, the name of the selected file appears in the upload area.
<img width="557" height="298" alt="image" src="https://github.com/user-attachments/assets/54fabf7a-d4e8-4c10-afae-23ae458bf4ef" />
