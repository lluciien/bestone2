"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Star, Flower2, Sparkles, Camera, X, Book, Briefcase, Stethoscope } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AudioPlayer } from "@/components/AudioPlayer"
import { MouseFollower } from "@/components/MouseFollower"
import { FloatingFlowers } from "@/components/FloatingFlowers"
import localFont from "next/font/local"

// 使用自定义字体
const smileySans = localFont({
  src: "../public/SmileySans-Oblique.otf.woff2",
  variable: "--font-smiley-sans",
})

function getInterestDescription(interest: string): string {
  switch (interest) {
    case "诗歌阅读":
      return "每日早晨晨读诗歌选集，热爱文学"
    case "园艺培育":
      return "喜欢养护盆栽，尤其是一盆铃兰花"
    case "后勤协助":
      return "主动参与后勤，帮助其他干员"
    case "医疗学习":
      return "学习源石技艺，旁听华法琳的讲座"
    default:
      return "探索新的爱好和体验"
  }
}

export default function LinlanProfile() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    "/11.png",
    "/2.png",
    "/3.png",
  ]

  const stats = [
    { label: "收藏", value: "127", icon: Heart },
    { label: "作品", value: "36", icon: Camera },
    { label: "喜欢", value: "892", icon: Star },
  ]

  const interests = [
    { name: "诗歌阅读", icon: Book, color: "bg-amber-50" },
    { name: "园艺培育", icon: Flower2, color: "bg-amber-50" },
    { name: "后勤协助", icon: Briefcase, color: "bg-amber-50" },
    { name: "医疗学习", icon: Stethoscope, color: "bg-amber-50" },
  ]

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 p-4 md:p-8 ${smileySans.variable} font-sans text-amber-800`}
    >
      <MouseFollower />
      <FloatingFlowers />

      <AudioPlayer src="https://music.163.com/song/media/outer/url?id=516497142.mp3" autoplay={true} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl"
      >
        <Card className="overflow-hidden border-amber-200 bg-white/90 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
              <motion.div whileHover={{ scale: 1.05 }} className="group relative h-56 w-56 shrink-0">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 opacity-75 blur group-hover:opacity-100" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white">
                  <img
                    src="/0.png"
                    alt="铃兰"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </motion.div>

              <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left space-y-4">
                <div className="space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-4xl font-bold text-transparent"
                  >
                    铃兰
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-amber-700"
                  >
                    "铃兰轻曳，沐光而生；九尾藏锋，暗夜愈明"
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap justify-center gap-2 md:justify-start"
                >
                  <Badge className="bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-700 hover:from-amber-300 hover:to-yellow-300">
                    <Heart className="mr-1 h-3 w-3" /> 温柔可爱
                  </Badge>
                  <Badge className="bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-700 hover:from-amber-300 hover:to-yellow-300">
                    <Star className="mr-1 h-3 w-3" /> 充满活力
                  </Badge>
                  <Badge className="bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-700 hover:from-amber-300 hover:to-yellow-300">
                    <Sparkles className="mr-1 h-3 w-3" /> 开朗阳光
                  </Badge>
                </motion.div>

                <div className="grid grid-cols-3 gap-4 w-full">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex flex-col items-center rounded-xl bg-amber-50 p-3 shadow-sm"
                    >
                      <stat.icon className="mb-1 h-4 w-4 text-amber-500" />
                      <span className="text-lg font-semibold text-amber-700">{stat.value}</span>
                      <span className="text-xs text-amber-600">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-amber-50 rounded-lg p-4 w-full"
                >
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">关于我</h3>
                  <p className="text-amber-700">
                    "罗德岛干员丽萨……啊不对，是铃兰，干员铃兰！是我自己挑的代号喔，今天开始正式作为干员行动，请多指教！"
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="my-8 flex items-center">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
              <Flower2 className="mx-4 text-amber-400" />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
            >
              {images.map((image, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`铃兰照片 ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-sm font-medium">点击查看大图</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <h2 className="mb-6 text-center text-2xl font-semibold text-amber-800">兴趣爱好</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.4)" }}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 p-4 shadow-md transition-all duration-300 hover:from-amber-200 hover:to-yellow-200"
                  >
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-300 opacity-20 transition-transform duration-300 group-hover:scale-150" />
                    <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-white sm:mb-0 sm:mr-4">
                        <interest.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-amber-800">{interest.name}</h3>
                        <p className="mt-1 text-sm text-amber-600">{getInterestDescription(interest.name)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </CardContent>
        </Card>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl border-none bg-black/90 p-0">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="关闭图片预览"
            >
              <X className="h-4 w-4" />
            </button>
            {selectedImage && (
              <img src={selectedImage || "/placeholder.svg"} alt="大图预览" className="h-full w-full object-contain" />
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  )
}

