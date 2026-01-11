#!/usr/bin/env node
import minimist from 'minimist';
import { runSemReg } from './playwright/runSemReg.js';

const args = minimist(process.argv.slice(2));

if (args.rollno) {
    process.env.LOGIN_ROLLNO = args.rollno;
}
if (args.password) {
    process.env.LOGIN_PASSWORD = args.password;
}

runSemReg();
