import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase, type Post } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 60

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) return []
  return data || []
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().slice(0, 180)
}

export default async function Studies() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="w-full px-4 sm:px-8 lg:px-[64px] pt-[80px] sm:pt-[120px] lg:pt-[180px] pb-8 sm:pb-10 lg:pb-[60px]">
        <h1 className="text-[#12254d] font-[900] text-[40px] leading-[48px] sm:text-[64px] sm:leading-[76px] lg:text-[96px] lg:leading-[112px] tracking-[-1.92px]">
          Studies
        </h1>
      </section>

      {/* ── Border ── */}
      <div className="w-full px-4 sm:px-8 lg:px-[64px] pb-6 sm:pb-[48px]">
        <hr className="border-0 border-t border-[#d9d9d9]" />
      </div>

      {/* ── Posts ── */}
      {posts.length === 0 ? (
        <section className="w-full px-4 sm:px-8 lg:px-[64px] pb-8 sm:pb-[48px]">
          <p className="text-[#949697] text-[15px] sm:text-[18px]">아직 게시물이 없어요.</p>
        </section>
      ) : (
        posts.map((post) => (
          <Link key={post.id} href={`/studies/${post.id}`} className="block group">
            <section className="w-full px-4 sm:px-8 lg:px-[64px] pb-8 sm:pb-[48px]">
              <div className="flex flex-col gap-[8px]">
                <h2 className="text-[#1e1e1e] font-bold text-[20px] leading-[28px] sm:text-[28px] sm:leading-[36px] lg:text-[32px] lg:leading-[40px] tracking-[-0.64px] group-hover:text-[#12254d] transition-colors">
                  {post.title}
                </h2>
                <div className="flex flex-col gap-4 sm:gap-[24px]">
                  <p className="text-[#5c5e60] font-normal text-[14px] leading-[22px] sm:text-[18px] sm:leading-[24px] tracking-[-0.36px] line-clamp-3">
                    {stripHtml(post.content)}{stripHtml(post.content).length >= 180 ? '...' : ''}
                  </p>
                  <p className="text-[#949697] font-normal text-[13px] leading-[20px] sm:text-[14px] tracking-[-0.28px]">
                    {post.date_label}
                  </p>
                </div>
              </div>
            </section>
          </Link>
        ))
      )}

      <Footer />
    </main>
  )
}
