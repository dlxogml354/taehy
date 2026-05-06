'use client'

import { useEffect, useRef, useState } from 'react'
import { IBM_Plex_Mono } from 'next/font/google'

/* ── Font ─────────────────────────────────────────────── */
const mono = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

/* ── Constants ────────────────────────────────────────── */
const R    = 28              // sphere radius (logical px)
const W    = 64              // canvas logical width
const H    = 64              // canvas logical height
const CX   = W / 2
const CY   = H / 2
const D2R  = Math.PI / 180
const AUTO = 0.1 * D2R      // 0.1° auto Y-rotation per frame
const DAMP = 0.95            // inertia damping factor

const SEOUL_LAT =  37.5
const SEOUL_LON = 127.0

/* ── 3-D helpers ──────────────────────────────────────── */
type V3 = [number, number, number]

/** lat/lon → unit-sphere vector  (Y-up, Z toward viewer at lon=0) */
function llv(lat: number, lon: number): V3 {
  const φ = lat * D2R, λ = lon * D2R
  return [
    Math.cos(φ) * Math.sin(λ),
    -Math.sin(φ),                       // flip Y so north is screen-up
    Math.cos(φ) * Math.cos(λ),
  ]
}

function applyRotY(v: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a)
  return [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]]
}

function applyRotX(v: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]]
}

/** Apply Y-rotation then X-rotation → canvas coords + depth */
function project(v: V3, rotY: number, rotX: number) {
  const [x, y, z] = applyRotX(applyRotY(v, rotY), rotX)
  return { px: CX + x * R, py: CY + y * R, z }
}

/* ── Seoul time ───────────────────────────────────────── */
function seoulTime(): string {
  // Parse Seoul local time into a Date, then extract H/M
  const d = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
  )
  return (
    String(d.getHours()).padStart(2, '0') +
    ':' +
    String(d.getMinutes()).padStart(2, '0')
  )
}

/* ── Component ────────────────────────────────────────── */
export default function GlobeWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef(0)

  // Mutable rotation state – plain refs, no re-renders
  const rotY  = useRef(0)
  const rotX  = useRef(0.28)  // gentle downward tilt to feature Seoul
  const velY  = useRef(0)
  const velX  = useRef(0)
  const drag  = useRef(false)
  const prev  = useRef({ x: 0, y: 0 })
  const pulse = useRef(0)

  const [time,    setTime]    = useState('')
  const [visible, setVisible] = useState(false)

  /* ── clock (1 s tick) ── */
  useEffect(() => {
    setTime(seoulTime())
    const id = setInterval(() => setTime(seoulTime()), 1_000)
    return () => clearInterval(id)
  }, [])

  /* ── entrance animation: 1 s delay, 0.8 s ease ── */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1_000)
    return () => clearTimeout(t)
  }, [])

  /* ── canvas + RAF loop ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // HiDPI / Retina
    const dpr = window.devicePixelRatio || 1
    canvas.width  = W * dpr
    canvas.height = H * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const STEP = 2   // degree step per wireframe segment

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const ry = rotY.current
      const rx = rotX.current
      pulse.current += 0.04

      /* outer circle */
      ctx.beginPath()
      ctx.arc(CX, CY, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(18,37,77,0.10)'
      ctx.lineWidth   = 1
      ctx.stroke()

      /* wireframe grid */
      ctx.strokeStyle = 'rgba(18,37,77,0.05)'
      ctx.lineWidth   = 0.6

      // latitude lines: −60° −30° 0° +30° +60°
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath()
        let pen = false
        for (let lon = -180; lon <= 180; lon += STEP) {
          const p = project(llv(lat, lon), ry, rx)
          if (p.z < 0) { pen = false; continue }
          pen ? ctx.lineTo(p.px, p.py) : ctx.moveTo(p.px, p.py)
          pen = true
        }
        ctx.stroke()
      }

      // longitude lines: 0° 30° … 330°
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath()
        let pen = false
        for (let lat = -90; lat <= 90; lat += STEP) {
          const p = project(llv(lat, lon), ry, rx)
          if (p.z < 0) { pen = false; continue }
          pen ? ctx.lineTo(p.px, p.py) : ctx.moveTo(p.px, p.py)
          pen = true
        }
        ctx.stroke()
      }

      /* Seoul marker */
      const s = project(llv(SEOUL_LAT, SEOUL_LON), ry, rx)
      if (s.z >= 0) {
        const ph = (Math.sin(pulse.current) + 1) * 0.5   // 0 → 1
        const pr = 1.5 + 1.5 * ph                          // 1.5 → 3 px
        const pa = (0.5 * (1 - ph)).toFixed(3)             // 0.5 → 0

        // pulse ring
        ctx.beginPath()
        ctx.arc(s.px, s.py, pr, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(45,91,188,${pa})`
        ctx.fill()

        // core dot  r=1.5 px, fully opaque
        ctx.beginPath()
        ctx.arc(s.px, s.py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(45,91,188,1)'
        ctx.fill()
      }
    }

    function tick() {
      if (!drag.current) {
        // auto Y-rotation + inertia decay
        rotY.current += AUTO + velY.current
        rotX.current += velX.current
        velY.current *= DAMP
        velX.current *= DAMP
      }
      draw()
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  /* ── pointer handlers ── */
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drag.current = true
    prev.current = { x: e.clientX, y: e.clientY }
    canvasRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drag.current) return
    const dx = e.clientX - prev.current.x
    const dy = e.clientY - prev.current.y
    const k  = 1 / R                   // 1 px ≈ 1/R rad  (natural sphere feel)
    rotY.current += dx * k
    rotX.current += dy * k
    velY.current  = dx * k             // carry velocity for inertia
    velX.current  = dy * k
    prev.current  = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = () => { drag.current = false }

  /* ── render ── */
  return (
    <div
      className="hidden md:flex flex-col items-center absolute top-[80px] right-8 lg:right-[64px]"
      style={{
        gap:        '6px',
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0px)' : 'translateY(12px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      {/* Globe canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width:       W,
          height:      H,
          touchAction: 'none',   // prevent mobile scroll conflict
          cursor:      'grab',
          display:     'block',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />

      {/* Time + location label */}
      <div
        className={mono.className}
        style={{
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '5px',
        }}
      >
        <span style={{ fontSize: '11px', color: '#12254D', letterSpacing: '1.5px', lineHeight: 1 }}>
          {time}
        </span>
        <span style={{ fontSize: '8px',  color: '#949697', letterSpacing: '2px',   lineHeight: 1 }}>
          SEOUL, KR
        </span>
      </div>
    </div>
  )
}
