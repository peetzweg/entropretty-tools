import { useEffect, useRef } from "react"

export const useOnScrollLeft = (
  fn: () => void,
  options = { scrollLeft: 125 },
) => {
  const ticking = useRef<boolean>(false)
  useEffect(() => {
    const onScroll = () => {
      const scrollLeft = getScrollLeftY()

      if (scrollLeft < options.scrollLeft) {
        if (!ticking.current) {
          ticking.current = true
          window.requestAnimationFrame(() => {
            fn()
            ticking.current = false
          })
        }
      }
    }
    const getScrollLeftY = () => {
      const scrollY =
        document.documentElement.scrollHeight -
        window.innerHeight -
        window.scrollY
      return scrollY
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  })
}
