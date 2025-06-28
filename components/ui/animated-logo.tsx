"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
}

export function AnimatedLogo({ size = "md", className, onClick }: AnimatedLogoProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)

    if (onClick) {
      onClick()
    } else {
      router.push("/")
    }
  }

  return (
    <div
      className={`
        relative cursor-pointer select-none
        ${sizeClasses[size]}
        ${className}
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 背景光晕 */}
      <div
        className={`
        absolute inset-0 rounded-lg
        bg-gradient-to-br from-blue-400/20 via-sky-500/20 to-blue-600/20
        transition-all duration-500 ease-out
        ${isHovered ? "scale-150 opacity-100 blur-sm" : "scale-100 opacity-0"}
      `}
      />

      {/* 主要logo容器 */}
      <div
        className={`
        relative w-full h-full rounded-lg overflow-hidden
        bg-gradient-to-br from-white via-blue-50 to-sky-100
        shadow-lg hover:shadow-xl
        border border-blue-200/50
        transition-all duration-300 ease-out
        ${isHovered ? "scale-105 shadow-blue-200/50" : "scale-100"}
        ${isClicked ? "animate-pulse scale-95" : ""}
      `}
      >
        {/* 光效扫过动画 */}
        <div
          className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
          transform -skew-x-12 transition-transform duration-1000
          ${isHovered ? "translate-x-full" : "-translate-x-full"}
        `}
        />

        {/* Logo图片 */}
        <div
          className={`
          relative w-full h-full flex items-center justify-center
          transition-transform duration-300
          ${isClicked ? "rotate-12" : "rotate-0"}
        `}
        >
          <Image
            src="/images/jinlan-logo-animated.png"
            alt="锦澜家居"
            width={size === "lg" ? 64 : size === "md" ? 48 : 32}
            height={size === "lg" ? 64 : size === "md" ? 48 : 32}
            className="object-contain filter drop-shadow-sm"
            priority
          />
        </div>

        {/* 内部光晕 */}
        <div
          className={`
          absolute inset-2 rounded-md
          bg-gradient-to-br from-blue-400/10 to-transparent
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        />
      </div>

      {/* 点击波纹效果 */}
      {isClicked && <div className="absolute inset-0 rounded-lg border-2 border-blue-400 animate-ping opacity-75" />}
    </div>
  )
}
