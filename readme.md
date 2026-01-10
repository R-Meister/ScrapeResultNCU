# NCU Result Scraping

**A local-only, ethical automation pipeline for accessing your own ERP data.**

This project allows students to download their result DGS (Detailed Grade Sheets) from the NCU ERP system. It uses **Playwright** to securely extract session credentials and **Python** to fetch the result PDFs sequentially.

> **⚠️ Important Disclaimer**
> 
> *   **Use Responsibly:** This tool is for accessing **your own data only**.
> *   **Rate Limiting:** Please do not remove the built-in delays.
> *   **Ethical Use:** Do not use this on accounts that are not yours. University systems are shared infrastructure; use this tool sparingly.
> *   **Privacy:** This is a **local-only** tool. No data is sent to any third-party server. Your credentials remain on your machine in the `.env` file.

---

## How It Works

1.  **Authentication (Node.js + Playwright):**
    *   Logs into the NCU ERP via a real browser.
    *   Navigates to the results page to generate a `userId`.
    *   Extracts this `userId` and saves it to a local `.env` file.
    *   *Note: If a valid secret already exists in `.env`, this step is skipped for speed.*

2.  **Data Fetching (Python):**
    *   Reads the `userId` from the `.env` file.
    *   Iterates through a specified range of session IDs.
    *   Downloads generic result PDFs (DGS) for those sessions into the `downloads/` folder.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/R-Meister/ScrapeResultNCU.git
cd ScrapeResultNCU
```

### 2. Setup Node.js (for Authentication)
Install dependencies and the Playwright browser:
```bash
npm install
npx playwright install chromium
```

### 3. Setup Python (for Downloading)
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
LOGIN_EMAIL=your_university_email
LOGIN_PASSWORD=your_erp_password
SECRET_URL=
```
*   `SECRET_URL` will be automatically populated by the script after the first successful login.

---

### 5. Setup Custom CLI (Recommended)
To run the tool conveniently from anywhere in your terminal, link the package:
```bash
npm link
```
Now you can use the `rs-ncu` command directly!

---

## Usage

### Standard Usage
```bash
rs-ncu --start 20 --end 30
```

### With Credentials (CLI)
Override `.env` credentials on the fly:
```bash
rs-ncu --rollno "your_rollno" --password "your_password" --start 20 --end 30
```

*   **--start**: The starting session ID (e.g., 20)
*   **--end**: The ending session ID (e.g., 30)
*   **--rollno** (optional): Your university roll number
*   **--password** (optional): Your ERP password

### Legacy Usage (via npm)
You can still run via npm if preferred:
```bash
npm start -- --start 20 --end 30
```

### Session Mapping
Session numbers are internal identifiers used by the ERP. Below are observed mappings:

| Academic Term | Session ID | Note |
| :--- | :--- | :--- |
| **Odd Sem 2024–2025** | `19` | Confirmed |
| **Even Sem 2024–2025** | `20` | Confirmed |
| **Odd Sem 2025–2026** | `23` | *Tentative* |

> **Note:** Always verify tentative session IDs via the ERP UI if results do not appear as expected.

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
*   Double-check your `LOGIN_EMAIL` and `LOGIN_PASSWORD` in the `.env` file.
*   If the script gets stuck, try clearing the `SECRET_URL` in `.env` to force a fresh login.

---

## 🛡️ Security
*   **No Hard-coded Secrets:** Credentials are loaded from environment variables.
*   **Local Execution:** Everything runs on your machine.
*   **Git Ignore:** `.env` and `downloads/` are ignored by git to prevent accidental leaks.