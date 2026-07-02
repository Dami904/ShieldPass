'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const YOUTUBE_ID = 'v-W-tMpxT8Y'

export function DemoVideo() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Watch the ShieldPass demo"
        className="demo-video-trigger"
      >
        <Image
          src="/demo-thumbnail.jpeg"
          alt="ShieldPass demo video thumbnail"
          width={960}
          height={540}
          className="demo-video-thumb"
          priority
        />
        <span className="demo-video-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="demo-video-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="ShieldPass demo video"
          onClick={() => setOpen(false)}
        >
          <div className="demo-video-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="demo-video-close"
              onClick={() => setOpen(false)}
              aria-label="Close video"
            >
              ✕
            </button>
            <div className="demo-video-frame">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
                title="ShieldPass demo video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
