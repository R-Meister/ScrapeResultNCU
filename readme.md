# NCU ERP Automation

**A local-only, ethical automation pipeline for interacting with the NCU ERP system.**

This project automates various student interactions with the NCU ERP, such as downloading result DGS (Detailed Grade Sheets) and performing Semester Registration. It uses **Playwright** to securely handle authentication and navigation, and **Python** for data fetching tasks like downloading results.

> **⚠️ Important Disclaimer**
> 
> *   **Use Responsibly:** This tool is for accessing **your own data only**.
> *   **Rate Limiting:** Please do not remove the built-in delays.
> *   **Ethical Use:** Do not use this on accounts that are not yours. University systems are shared infrastructure; use this tool sparingly.
> *   **Privacy:** This is a **local-only** tool. No data is sent to any third-party server. Your credentials remain on your machine in the `.env` file.

---

## Features

### 1. Semester Registration (`sr-ncu`)
Automatically performs the semester registration process.
*   **Command:** `sr-ncu`
*   **Functionality:** Logs in, navigates to the semester registration page, checks for backlogs, and submits the registration if no backlogs are found.

### 2. Result Scraping (`rs-ncu`)
Downloads generic result PDFs (Detailed Grade Sheets) for specified sessions.
*   **Command:** `rs-ncu`
*   **Functionality:** Authenticates using Playwright to get a session secret, then uses Python to iterate through session IDs and download results.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/R-Meister/ScrapeResultNCU.git
cd ScrapeResultNCU
```

### 2. Setup Node.js (for Automation)
Install dependencies and the Playwright browser:
```bash
npm install
npx playwright install chromium
```

### 3. Setup Python (for Result Downloading)
Create a virtual environment and install dependencies:
```bash
cd python
python3 -m venv venv
source venv/bin/activate  
# On Windows use: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 4. Configuration
Create a `.env` file in the project root with your credentials:
```env
LOGIN_ROLLNO=your_university_rollno
LOGIN_PASSWORD=your_erp_password
SECRET_URL=
```
*   `SECRET_URL` will be automatically populated by the script after the first successful login.

### 5. Setup Custom CLI (Recommended)
To run the tools conveniently from anywhere in your terminal, link the package:
```bash
npm link
```
Now you can use the commands `sr-ncu` and `rs-ncu` directly!

---

## Usage

### 1. Semester Registration
Run the registration script:
```bash
sr-ncu
```

**With Credentials (CLI Override):**
```bash
sr-ncu --rollno "your_rollno" --password "your_password"
```

### 2. Result Scraping
Run the result scraper for a range of session IDs:
```bash
rs-ncu --start 20 --end 30
```

**With Credentials (CLI Override):**
```bash
rs-ncu --rollno "your_rollno" --password "your_password" --start 20 --end 30
```

#### CLI Options
*   **--start**: The starting session ID (e.g., 20)
*   **--end**: The ending session ID (e.g., 30)
*   **--rollno** (optional): Your university roll number
*   **--password** (optional): Your ERP password

### Session Mapping
Session numbers are internal identifiers used by the ERP. Below are observed mappings:

| Academic Term | Session ID | Note |
| :--- | :--- | :--- |
| **Odd Sem 2024–2025** | `19` | Confirmed |
| **Even Sem 2024–2025** | `20` | Confirmed |
| **Odd Sem 2025–2026** | `23` | Confirmed |

> **Note:** Always verify session IDs via the ERP UI if results do not appear as expected.

---

## Troubleshooting

### Playwright Errors
If the browser fails to launch, ensure dependencies are installed:
```bash
npx playwright install chromium
```

### Python Errors
If modules are missing, ensure your virtual environment is active:
```bash
source python/venv/bin/activate
pip install -r python/requirements.txt
```

### Login Issues
*   Double-check your `LOGIN_ROLLNO` and `LOGIN_PASSWORD` in the `.env` file.
*   If the script gets stuck, try clearing the `SECRET_URL` in `.env` to force a fresh login.

---

## 🛡️ Security
*   **No Hard-coded Secrets:** Credentials are loaded from environment variables.
*   **Local Execution:** Everything runs on your machine.
*   **Git Ignore:** `.env` and `downloads/` are ignored by git to prevent accidental leaks.