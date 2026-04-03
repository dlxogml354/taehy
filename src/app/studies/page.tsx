import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase, type Post } from '@/lib/supabase'

export const revalidate = 60 // re-fetch every 60 seconds

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) return []
  return data || []
}

export default async function Studies() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="w-full px-[64px] pt-[180px] pb-[60px]">
        <h1 className="text-[#12254d] font-[900] text-[96px] leading-[112px] tracking-[-1.92px]">
          Studies
        </h1>
      </section>

      {/* ── Border ── */}
      <div className="w-full px-[64px] pb-[48px]">
        <hr className="border-0 border-t border-[#d9d9d9]" />
      </div>

      {/* ── Posts ── */}
      {posts.length === 0 ? (
        <section className="w-full px-[64px] pb-[48px]">
          <p className="text-[#949697] text-[18px]">아직 게시물이 없어요.</p>
        </section>
      ) : (
        posts.map((post) => (
          <section key={post.id} className="w-full px-[64px] pb-[48px]">
            <div className="flex flex-col gap-[8px]">
              <h2 className="text-[#1e1e1e] font-bold text-[32px] leading-[40px] tracking-[-0.64px]">
                {post.title}
              </h2>
              <div className="flex flex-col gap-[24px]">
                <p className="text-[#5c5e60] font-normal text-[18px] leading-[24px] tracking-[-0.36px] whitespace-pre-line">
                  {post.content}
                </p>
                <p className="text-[#949697] font-normal text-[14px] leading-[20px] tracking-[-0.28px]">
                  {post.date_label}
                </p>
              </div>
            </div>
          </section>
        ))
      )}

      <Footer />
    </main>
  )
}
