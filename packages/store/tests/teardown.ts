import { execSync } from 'child_process';

export default async function after() {
  execSync('docker compose down');
}
