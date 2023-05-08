import { Navigation } from "./(componets)/Navigation"

export default function App() {
  return (
    <div className="relative">
      <Navigation />
      <div
        className="animate-pulse-slow fixed bottom-0 aspect-square w-[100rem] rounded-full bg-[#5BFFA7]/20 blur-[1000px] "
        style={{
          transform: "translateX(-12%) translateY(80%) translateZ(0px)",
        }}
      ></div>
    </div>
  )
}
