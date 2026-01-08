import os
import time
import argparse
import requests
from dotenv import load_dotenv

load_dotenv()

USER_ID = os.getenv("SECRET_URL")
BASE_URL = "https://uatapi.ncuindia.edu/api/myapp/Examination/GetDGS"

if not USER_ID:
    raise RuntimeError("SECRET_URL (userId) not found in .env")

# 🔒 INTERNAL SAFETY CONFIG (DO NOT EXPOSE)
DELAY_SECONDS = 3
TIMEOUT = 15
DOWNLOAD_DIR = "downloads"

os.makedirs(DOWNLOAD_DIR, exist_ok=True)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Download DGS files for a given session range"
    )

    parser.add_argument(
        "--start",
        dest="start_session",
        type=int,
        required=True,
        help="Starting session number"
    )

    parser.add_argument(
        "--end",
        dest="end_session",
        type=int,
        required=True,
        help="Ending session number"
    )

    return parser.parse_args()



def try_session(session: int, downloaded_sessions: list):
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

    if "application/json" in content_type:
        return

    if "application/pdf" in content_type or "octet-stream" in content_type:
        filename = f"DGS_session_{session}.pdf"
        path = os.path.join(DOWNLOAD_DIR, filename)

        with open(path, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)

        print(f"✅ Downloaded: {path}")
        downloaded_sessions.append(session)


def main():
    args = parse_args()

    if args.start_session > args.end_session:
        raise ValueError("start-session must be <= end-session")

    downloaded_sessions = []

    for session in range(args.start_session, args.end_session + 1):
        try:
            try_session(session, downloaded_sessions)
        except Exception as e:
            print(f"⚠️ Error on session {session}: {e}")

        time.sleep(DELAY_SECONDS)  # 🔒 intentionally hidden

    if downloaded_sessions:
        print("\n🎉 Download complete")
        print("📄 Sessions downloaded:", downloaded_sessions)
    else:
        print("\n❌ No files found in given range")


if __name__ == "__main__":
    main()
