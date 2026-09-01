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