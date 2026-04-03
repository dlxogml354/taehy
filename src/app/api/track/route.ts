import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { page, referrer } = await req.json()
  const user_agent = req.headers.get('user-agent') || ''

  await supabase.from('visitors').insert({ page, referrer, user_agent })

  return NextResponse.json({ ok: true })
}
