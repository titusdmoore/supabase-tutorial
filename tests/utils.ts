import { execSync } from 'child_process';
import detect from 'detect-port';

export async function setupE2ETest() {
    await startSupabase();
    reseedDb();
}

async function startSupabase() {
    const port = await detect(54321);
    if (port !== 54321) {
        return;
    }
    console.warn("Supabase not detected - Starting it now...");
    execSync("pnpx supabase start");
}

function reseedDb() {
    execSync(
        "PGPASSWORD=postgres psql -U postgres -h 127.0.0.1 -p 64322 -f supabase/clear-db-data.sql",
        { stdio: "ignore" }
    );
}