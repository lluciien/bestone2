"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music2, Music4, VolumeX, Volume1, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  src: string
  autoplay?: boolean
}

export function AudioPlayer({ src, autoplay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isVolumeVisible, setIsVolumeVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const volumeTimeout = useRef<NodeJS.Timeout>()

  const MusicIcon = isPlaying ? Music4 : Music2

  useEffect(() => {
    if (autoplay) {
      const playPromise = audioRef.current?.play()
      if (playPromise) {
        playPromise.catch(() => {
          // 自动播放被阻止，这是正常的
        })
      }
    }
    return () => {
      if (volumeTimeout.current) {
        clearTimeout(volumeTimeout.current)
      }
    }
  }, [autoplay])

  const togglePlay = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      await audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return
    const newVolume = value[0]
    audioRef.current.volume = newVolume
    setVolume(newVolume)
  }

  const handleVolumeIconClick = () => {
    setIsVolumeVisible(true)
    if (volumeTimeout.current) {
      clearTimeout(volumeTimeout.current)
    }
    volumeTimeout.current = setTimeout(() => {
      setIsVolumeVisible(false)
    }, 3000)
  }

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX
    if (volume < 0.5) return Volume1
    return Volume2
  }

  const VolumeIcon = getVolumeIcon()

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
    >
      <audio ref={audioRef} src={src} loop onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />

      <AnimatePresence>
        {isVolumeVisible && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mx-2 w-24">
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="z-50"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        onMouseEnter={() => {
          setIsVolumeVisible(true)
          if (volumeTimeout.current) clearTimeout(volumeTimeout.current)
        }}
        onMouseLeave={() => {
          volumeTimeout.current = setTimeout(() => setIsVolumeVisible(false), 1000)
        }}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-md transition-colors hover:bg-amber-200"
      >
        <VolumeIcon className="h-4 w-4" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all",
          isPlaying
            ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-white"
            : "bg-white/90 text-amber-600 hover:bg-amber-100",
        )}
      >
        <AnimatePresence>
          {isPlaying && (
            <>
              <motion.div
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 rounded-full bg-amber-400"
              />
              <motion.div
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.25, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                className="absolute inset-0 rounded-full bg-amber-400"
              />
            </>
          )}
        </AnimatePresence>

        <MusicIcon
          className={cn("h-5 w-5 transition-transform", isPlaying && "animate-[wiggle_1s_ease-in-out_infinite]")}
        />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-10 whitespace-nowrap rounded-full bg-black/75 px-3 py-1 text-sm text-white"
            >
              {isPlaying ? "暂停音乐" : "播放音乐"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

