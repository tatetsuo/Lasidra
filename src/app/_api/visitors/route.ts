import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "visitors.json");

function readCount(): number {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    return typeof data.count === "number" ? data.count : 0;
  } catch {
    return 0;
  }
}

function writeCount(count: number): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify({ count }, null, 2), "utf-8");
}

/** GET — retorna o contador atual */
export async function GET() {
  const count = readCount();
  return NextResponse.json({ count });
}

/** POST — incrementa o contador e retorna o novo valor */
export async function POST() {
  const current = readCount();
  const next = current + 1;
  writeCount(next);
  return NextResponse.json({ count: next });
}
