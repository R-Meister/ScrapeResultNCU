#!/usr/bin/env node
import { runAuth } from './playwright/run.js';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import minimist from 'minimist';

dotenv.config();

const args = minimist(process.argv.slice(2));

async function main() {
    // 1. Handle Credentials
    if (args.rollno) {
        process.env.LOGIN_ROLLNO = args.rollno;
    }
    if (args.password) {
        process.env.LOGIN_PASSWORD = args.password;
    }

    if (args.rollno || args.password) {
        // If credentials are provided via CLI, force login attempt even if secret exists
        // because the user might be trying to switch accounts or refresh credentials.
        // However, the original runAuth logic skips if secret exists.
        // We can either set process.env.SECRET_URL = '' or a new flag.
        // Let's rely on runAuth logic, but maybe we should clear secret if new creds provided?
        // For now, let's just proceed. The runAuth check is:
        // if (secretAlreadyExists() && !process.env.FORCE_LOGIN)

        // OPTIONAL: Force login if credentials are explicitly passed
        process.env.FORCE_LOGIN = 'true';
    }

    console.log("🔒 Authenticating...");
    await runAuth();

    // 2. Run Python Script
    const pythonArgs = ['python/fetch_results.py'];
    if (args.start) {
        pythonArgs.push('--start', args.start);
    }
    if (args.end) {
        pythonArgs.push('--end', args.end);
    }

    console.log(`🐍 Starting Python script with args: ${pythonArgs.join(' ')}`);

    const pythonProcess = spawn('python3', pythonArgs, { stdio: 'inherit' });

    pythonProcess.on('close', (code) => {
        console.log(`python process exited with code ${code}`);
        process.exit(code);
    });
}

main();
