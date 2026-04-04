import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const revalidate = 60

async function getPost(id: string) {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .single()
  return data
}

export default async function StudiesContentsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) notFound()

  const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="w-full pt-[120px] pb-[64px] px-[64px]">
        <div className="max-w-[720px] mx-auto flex flex-col gap-[24px]">
          <h1 className="text-[#12254d] font-[900] text-[40px] leading-[48px] tracking-[-0.8px]">
            {post.title}
          </h1>
          <div className="flex items-center gap-[16px]">
            <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={`${BASE}/images/Profile.jpg`}
                alt="taehylee"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[#a0a8b8] font-normal text-[20px] leading-[28px] tracking-[-0.4px]">
              taehylee
            </span>
            <span className="text-[#a0a8b8] text-[20px] font-normal">|</span>
            <span className="text-[#a0a8b8] font-normal text-[20px] leading-[28px] tracking-[-0.4px]">
              {post.date_label}
            </span>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="w-full px-[64px] pb-[48px]">
        <div className="max-w-[720px] mx-auto">
          <hr className="border-0 border-t border-[#d9d9d9]" />
        </div>
      </div>

      {/* ── Content ── */}
      <article className="w-full px-[64px] pb-[120px]">
        <div
          className="max-w-[720px] mx-auto rich-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Footer />
    </main>
  )
}
