import os
import time
import requests
from dotenv import load_dotenv

# Load env vars
load_dotenv()

USER_ID = os.getenv("SECRET_URL")  # extracted userId
BASE_URL = "https://uatapi.ncuindia.edu/api/myapp/Examination/GetDGS"

if not USER_ID:
    raise RuntimeError("SECRET_URL (userId) not found in .env")

# ---- CONFIG ----
SESSION_START = 20
SESSION_END = 30
DELAY_SECONDS = 3
TIMEOUT = 15
DOWNLOAD_DIR = "downloads"
# ----------------

os.makedirs(DOWNLOAD_DIR, exist_ok=True)

downloaded_sessions = []


def try_session(session: int) -> bool:
    params = {
        "userId": USER_ID,
        "session": session
    }

    print(f"🔎 Checking session {session}...")

    resp = requests.get(
        BASE_URL,
        params=params,
        stream=True,
        timeout=TIMEOUT
    )

    content_type = resp.headers.get("Content-Type", "")

    # JSON response → no file
    if "application/json" in content_type:
        return False

    # File response
    if "application/pdf" in content_type or "octet-stream" in content_type:
        filename = f"DGS_session_{session}.pdf"
        path = os.path.join(DOWNLOAD_DIR, filename)

        with open(path, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)

        print(f"✅ Downloaded: {path}")
        downloaded_sessions.append(session)
        return True

    return False


def main():
    for session in range(SESSION_START, SESSION_END + 1):
        try:
            try_session(session)
        except Exception as e:
            print(f"⚠️ Error on session {session}: {e}")

        time.sleep(DELAY_SECONDS)

    if downloaded_sessions:
        print("\n🎉 Download complete")
        print("📄 Sessions downloaded:", downloaded_sessions)
    else:
        print("\n❌ No files found in given range")


if __name__ == "__main__":
    main()
