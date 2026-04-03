import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const valid = password === process.env.ADMIN_PASSWORD
  return NextResponse.json({ valid })
}
