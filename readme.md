# NCU Automation (Local Only)

## Purpose
Local-only automation to:
- Log into internal portal
- Extract a generated link
- Use it to fetch result data via API

## Security
- No secrets committed
- `.env` is local-only
- Automation is manual & rate-limited

## Structure
- `playwright/` → browser automation (JS)
- `python/` → API access & downloads

## Usage (planned)
1. Populate `.env`
2. Run Playwright script
3. Run Python script
