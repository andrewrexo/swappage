'use server';
import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

export async function GET(req: NextRequest) {
  const filePath = path.join(
    process.cwd(),
    'app/.well-known/walletconnect.txt',
  );
  const fileContents = fs.readFileSync(filePath, 'utf8');
  console.log(fileContents);
  return new Response(fileContents, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
