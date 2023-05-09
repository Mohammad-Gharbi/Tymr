import { Navigation } from "./(componets)/Navigation"
import { Timer } from "./(componets)/Timer"

export default function App() {
  return (
    <div className="relative">
      <Navigation />
      <Timer />
      <div
        className="fixed bottom-0 -z-0 aspect-square w-[100rem] animate-pulse-slow rounded-full bg-[#5BFFA7]/20 blur-[1000px] "
        style={{
          transform: "translateX(-12%) translateY(80%) translateZ(0px)",
        }}
      ></div>
    </div>
  )
}
