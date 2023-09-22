import { execSync } from 'child_process';

import * as dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.test' });

export default async function before() {
  execSync('docker compose up db --detach && yarn migration:latest ');
}
