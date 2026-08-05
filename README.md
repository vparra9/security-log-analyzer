# security-log-analyzer

# Files:
- index.html 
  - the webpage
  - contains: upload button, analyze button, results section, statistics card, recent events list
- style.css
  - controls: colors, cards, buttons, layout, animations
- script.js
  - Handles everything on the webpage
  - Example: detect when user uploads a file, send the file to python, receive the results, display
- app.py
  - Receive the uploaded log file
  - read every line
  - count failed logins
  - count successful logins
  - detect suspicious activity
  - return results to JavaScript
- requirements.txt
  - Lists Python packages needed
- sample_logs/
  - Store fake log files for testing

# Version 1 Goals:
  - Upload a .txt log file
  - Analyze the file with Python
  - Display: failed logins, successful logins, errors, file changes
  - Show a warning if there are 3 or more failed logins in a row
  - Show a list of recent events
