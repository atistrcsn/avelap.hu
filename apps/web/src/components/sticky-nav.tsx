import { cn } from "@/utils"
import { FC, useEffect, useState } from "react"

export type StickyNavProps = {
  height: number
  children?: React.ReactNode
}

export const StickyNav: FC<StickyNavProps> = ({ height, children }) => {
  const [nav, setNav] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  })

  const handleScroll = () => {
    window.scrollY > height ? !nav && setNav(true) : nav && setNav(false)
  }

  return (
    <div
      className={cn({
        nav: true,
        scrollNav: nav,
      })}
    >
      {children}
    </div>
  )
}
