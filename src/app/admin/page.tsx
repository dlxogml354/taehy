'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { Post, Visitor } from '@/lib/supabase'

type Tab = 'posts' | 'visitors'

// ── Helper: today's date label ──────────────────────────────────────────────
function getTodayLabel(): string {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Seoul',
  })
}

// ── Rich Text Editor ─────────────────────────────────────────────────────────
function RichTextEditor({
  initialValue,
  onChange,
  password,
}: {
  initialValue: string
  onChange: (html: string) => void
  password: string
}) {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const initialized = useRef(false)

  useEffect(() => {
    if (editorRef.current && !initialized.current) {
      editorRef.current.innerHTML = initialValue
      initialized.current = true
    }
  }, [initialValue])

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'x-admin-password': password },
      body: formData,
    })
    if (res.ok) {
      const { url } = await res.json()
      exec(
        'insertHTML',
        `<img src="${url}" style="max-width:100%;height:auto;display:block;margin:16px 0;border-radius:8px;" />`
      )
    } else {
      alert('이미지 업로드에 실패했어요.')
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="border border-[#d9d9d9] rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-[#d9d9d9] bg-[#fafafa]">
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec('bold') }}
          className="w-[32px] h-[32px] font-bold text-[14px] hover:bg-[#e8e8e8] rounded-md transition-colors flex items-center justify-center select-none"
          title="굵게 (Ctrl+B)"
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec('underline') }}
          className="w-[32px] h-[32px] underline text-[14px] hover:bg-[#e8e8e8] rounded-md transition-colors flex items-center justify-center select-none"
          title="밑줄 (Ctrl+U)"
        >
          U
        </button>
        <div className="w-px h-4 bg-[#d9d9d9] mx-1" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-3 h-[32px] text-[13px] hover:bg-[#e8e8e8] rounded-md transition-colors flex items-center gap-1 text-[#3d3e3f] disabled:opacity-50"
        >
          🖼 {uploading ? '업로드 중...' : '이미지'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder="내용을 입력하세요..."
        onInput={() => { if (editorRef.current) onChange(editorRef.current.innerHTML) }}
        className="min-h-[200px] p-4 text-[16px] text-[#3d3e3f] outline-none rich-content"
        style={{ lineHeight: '1.75', wordBreak: 'break-word' }}
      />
    </div>
  )
}

// ── Admin Page ───────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [loading, setLoading] = useState(false)

  // Posts
  const [posts, setPosts] = useState<Post[]>([])
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<Tab>('posts')

  // Create form
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  // Edit mode
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  // Visitors
  const [visitors, setVisitors] = useState<Visitor[]>([])

  const headers = useCallback(
    () => ({ 'Content-Type': 'application/json', 'x-admin-password': password }),
    [password]
  )

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
    if (valid) { setAuthed(true); setAuthError(false) }
    else setAuthError(true)
  }

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim()) return
    setSaving(true)
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        date_label: getTodayLabel(),
      }),
    })
    if (res.ok) {
      setNewTitle('')
      setNewContent('')
      await loadPosts()
    }
    setSaving(false)
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editingPost || !editTitle.trim()) return
    setSaving(true)
    const res = await fetch(`/api/admin/posts/${editingPost.id}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({ title: editTitle, content: editContent }),
    })
    if (res.ok) {
      setEditingPost(null)
      await loadPosts()
    }
    setSaving(false)
  }

  function startEdit(post: Post) {
    setEditingPost(post)
    setEditTitle(post.title)
    setEditContent(post.content)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  // ── Login ──
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="border border-[#d9d9d9] rounded-xl px-4 py-3 text-[16px] outline-none focus:border-[#12254d] transition-colors"
            autoFocus
          />
          {authError && <p className="text-red-500 text-[14px] -mt-3">비밀번호가 틀렸어요.</p>}
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

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white border-b border-[#e8e8e8] px-10 h-[64px] flex items-center justify-between sticky top-0 z-10">
        <span className="text-[20px] font-bold text-[#12254d]">taehy admin</span>
        <div className="flex gap-1 bg-[#f5f5f5] rounded-lg p-1">
          <button
            onClick={() => setTab('posts')}
            className={`px-5 py-2 rounded-md text-[14px] font-medium transition-all ${
              tab === 'posts' ? 'bg-white text-[#12254d] shadow-sm' : 'text-[#949697] hover:text-[#3d3e3f]'
            }`}
          >
            게시물
          </button>
          <button
            onClick={() => setTab('visitors')}
            className={`px-5 py-2 rounded-md text-[14px] font-medium transition-all ${
              tab === 'visitors' ? 'bg-white text-[#12254d] shadow-sm' : 'text-[#949697] hover:text-[#3d3e3f]'
            }`}
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

            {/* ── Edit Form (appears when editing) ── */}
            {editingPost ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-[#12254d]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[18px] font-bold text-[#12254d]">게시물 수정</h2>
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="text-[14px] text-[#949697] hover:text-[#3d3e3f] transition-colors"
                  >
                    취소
                  </button>
                </div>
                <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="제목"
                    className="border border-[#d9d9d9] rounded-xl px-4 py-3 text-[18px] font-bold outline-none focus:border-[#12254d] transition-colors"
                  />
                  <RichTextEditor
                    key={editingPost.id}
                    initialValue={editContent}
                    onChange={setEditContent}
                    password={password}
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={saving || !editTitle.trim()}
                      className="bg-[#12254d] text-white rounded-xl py-3 px-8 text-[16px] font-medium hover:bg-[#1a3570] transition-colors disabled:opacity-50"
                    >
                      {saving ? '저장 중...' : '수정 저장'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* ── Create Form ── */
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-[18px] font-bold text-[#1e1e1e] mb-6">새 게시물 작성</h2>
                <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="제목"
                    className="border border-[#d9d9d9] rounded-xl px-4 py-3 text-[18px] font-bold outline-none focus:border-[#12254d] transition-colors"
                  />
                  <RichTextEditor
                    key="new"
                    initialValue={newContent}
                    onChange={setNewContent}
                    password={password}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#949697]">
                      날짜: {getTodayLabel()} (자동)
                    </span>
                    <button
                      type="submit"
                      disabled={saving || !newTitle.trim()}
                      className="bg-[#12254d] text-white rounded-xl py-3 px-8 text-[16px] font-medium hover:bg-[#1a3570] transition-colors disabled:opacity-50"
                    >
                      {saving ? '저장 중...' : '게시'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Posts List ── */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#1e1e1e] mb-6">
                게시물 목록 ({posts.length})
              </h2>
              {posts.length === 0 ? (
                <p className="text-[#949697] text-[15px]">게시물이 없어요.</p>
              ) : (
                <div className="flex flex-col divide-y divide-[#f0f0f0]">
                  {posts.map((post) => (
                    <div key={post.id} className="py-5 flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-[16px] font-semibold text-[#1e1e1e] truncate">
                          {post.title}
                        </p>
                        <p className="text-[12px] text-[#949697] mt-1">{post.date_label}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleTogglePublish(post)}
                          className={`text-[13px] px-3 py-1 rounded-full border transition-colors ${
                            post.published
                              ? 'border-green-300 text-green-600 bg-green-50'
                              : 'border-[#d9d9d9] text-[#949697]'
                          }`}
                        >
                          {post.published ? '공개' : '비공개'}
                        </button>
                        <button
                          onClick={() => startEdit(post)}
                          className="text-[13px] px-3 py-1 rounded-full border border-[#12254d] text-[#12254d] hover:bg-[#f0f4ff] transition-colors"
                        >
                          수정
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
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#1e1e1e] mb-6">
                최근 방문 (최대 50건)
              </h2>
              <div className="flex flex-col divide-y divide-[#f0f0f0]">
                {visitors.slice(0, 50).map((v) => (
                  <div key={v.id} className="py-3 flex items-center justify-between gap-4 text-[13px]">
                    <span className="text-[#12254d] font-medium w-[120px] flex-shrink-0">
                      {v.page || '/'}
                    </span>
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
