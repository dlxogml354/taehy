'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Post, Visitor } from '@/lib/supabase'

type Tab = 'posts' | 'visitors'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [loading, setLoading] = useState(false)

  // Posts
  const [posts, setPosts] = useState<Post[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newDate, setNewDate] = useState('')
  const [saving, setSaving] = useState(false)

  // Visitors
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [tab, setTab] = useState<Tab>('posts')

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'x-admin-password': password,
  }), [password])

  const loadPosts = useCallback(async () => {
    const res = await fetch('/api/admin/posts', { headers: headers() })
    if (res.ok) setPosts(await res.json())
  }, [headers])

  const loadVisitors = useCallback(async () => {
    const res = await fetch('/api/admin/visitors', { headers: headers() })
    if (res.ok) setVisitors(await res.json())
  }, [headers])

  useEffect(() => {
    if (authed) {
      loadPosts()
      loadVisitors()
    }
  }, [authed, loadPosts, loadVisitors])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    const { valid } = await res.json()
    setLoading(false)
    if (valid) {
      setAuthed(true)
      setAuthError(false)
    } else {
      setAuthError(true)
    }
  }

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim()) return
    setSaving(true)
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ title: newTitle, content: newContent, date_label: newDate }),
    })
    if (res.ok) {
      setNewTitle('')
      setNewContent('')
      setNewDate('')
      await loadPosts()
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('정말 삭제할까요?')) return
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE', headers: headers() })
    await loadPosts()
  }

  async function handleTogglePublish(post: Post) {
    await fetch(`/api/admin/posts/${post.id}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({ published: !post.published }),
    })
    await loadPosts()
  }

  // Visitor stats
  const totalVisits = visitors.length
  const pageStats = visitors.reduce((acc, v) => {
    acc[v.page] = (acc[v.page] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-sm p-10 w-[400px] flex flex-col gap-6">
          <div>
            <h1 className="text-[24px] font-bold text-[#12254d] tracking-[-0.5px]">taehy admin</h1>
            <p className="text-[14px] text-[#949697] mt-1">관리자 비밀번호를 입력해주세요</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="border border-[#d9d9d9] rounded-xl px-4 py-3 text-[16px] outline-none focus:border-[#12254d] transition-colors"
            autoFocus
          />
          {authError && (
            <p className="text-red-500 text-[14px] -mt-3">비밀번호가 틀렸어요.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#12254d] text-white rounded-xl py-3 text-[16px] font-medium hover:bg-[#1a3570] transition-colors disabled:opacity-50"
          >
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white border-b border-[#e8e8e8] px-10 h-[64px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[20px] font-bold text-[#12254d]">taehy admin</span>
        </div>
        <div className="flex gap-1 bg-[#f5f5f5] rounded-lg p-1">
          <button
            onClick={() => setTab('posts')}
            className={`px-5 py-2 rounded-md text-[14px] font-medium transition-all ${tab === 'posts' ? 'bg-white text-[#12254d] shadow-sm' : 'text-[#949697] hover:text-[#3d3e3f]'}`}
          >
            게시물
          </button>
          <button
            onClick={() => setTab('visitors')}
            className={`px-5 py-2 rounded-md text-[14px] font-medium transition-all ${tab === 'visitors' ? 'bg-white text-[#12254d] shadow-sm' : 'text-[#949697] hover:text-[#3d3e3f]'}`}
          >
            방문자
          </button>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="text-[14px] text-[#949697] hover:text-[#3d3e3f] transition-colors"
        >
          로그아웃
        </button>
      </header>

      <div className="max-w-[900px] mx-auto px-6 py-10">

        {/* ── Posts Tab ── */}
        {tab === 'posts' && (
          <div className="flex flex-col gap-8">
            {/* New Post Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#1e1e1e] mb-6">새 게시물 작성</h2>
              <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="제목"
                  className="border border-[#d9d9d9] rounded-xl px-4 py-3 text-[16px] outline-none focus:border-[#12254d] transition-colors"
                />
                <textarea
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="내용"
                  rows={5}
                  className="border border-[#d9d9d9] rounded-xl px-4 py-3 text-[16px] outline-none focus:border-[#12254d] transition-colors resize-none"
                />
                <input
                  type="text"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  placeholder="날짜 (예: 2026.04.03 (Fri))"
                  className="border border-[#d9d9d9] rounded-xl px-4 py-3 text-[16px] outline-none focus:border-[#12254d] transition-colors"
                />
                <button
                  type="submit"
                  disabled={saving || !newTitle.trim()}
                  className="bg-[#12254d] text-white rounded-xl py-3 text-[16px] font-medium hover:bg-[#1a3570] transition-colors disabled:opacity-50 self-end px-8"
                >
                  {saving ? '저장 중...' : '게시'}
                </button>
              </form>
            </div>

            {/* Posts List */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#1e1e1e] mb-6">게시물 목록 ({posts.length})</h2>
              {posts.length === 0 ? (
                <p className="text-[#949697] text-[15px]">게시물이 없어요.</p>
              ) : (
                <div className="flex flex-col divide-y divide-[#f0f0f0]">
                  {posts.map(post => (
                    <div key={post.id} className="py-5 flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-[16px] font-semibold text-[#1e1e1e] truncate">{post.title}</p>
                        <p className="text-[14px] text-[#5c5e60] mt-1 line-clamp-2">{post.content}</p>
                        <p className="text-[12px] text-[#949697] mt-1">{post.date_label}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button
                          onClick={() => handleTogglePublish(post)}
                          className={`text-[13px] px-3 py-1 rounded-full border transition-colors ${post.published ? 'border-green-300 text-green-600 bg-green-50' : 'border-[#d9d9d9] text-[#949697]'}`}
                        >
                          {post.published ? '공개' : '비공개'}
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-[13px] text-red-400 hover:text-red-600 transition-colors"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Visitors Tab ── */}
        {tab === 'visitors' && (
          <div className="flex flex-col gap-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-[13px] text-[#949697] mb-1">총 방문 수</p>
                <p className="text-[40px] font-bold text-[#12254d] leading-none">{totalVisits}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-[13px] text-[#949697] mb-3">페이지별 방문</p>
                {Object.entries(pageStats)
                  .sort((a, b) => b[1] - a[1])
                  .map(([page, count]) => (
                    <div key={page} className="flex justify-between text-[14px] mb-1">
                      <span className="text-[#3d3e3f]">{page || '/'}</span>
                      <span className="font-semibold text-[#12254d]">{count}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Visitors */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#1e1e1e] mb-6">최근 방문 (최대 500건)</h2>
              <div className="flex flex-col divide-y divide-[#f0f0f0]">
                {visitors.slice(0, 50).map(v => (
                  <div key={v.id} className="py-3 flex items-center justify-between gap-4 text-[13px]">
                    <span className="text-[#12254d] font-medium w-[120px] flex-shrink-0">{v.page || '/'}</span>
                    <span className="text-[#5c5e60] flex-1 truncate">{v.user_agent}</span>
                    <span className="text-[#949697] flex-shrink-0">
                      {new Date(v.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
