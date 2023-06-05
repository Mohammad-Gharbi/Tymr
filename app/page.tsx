"use client"

import { Navigation } from "./(componets)/Navigation"
import { Timer } from "./(componets)/Timer"
import { ChakraProvider } from "@chakra-ui/react"

export default function App() {
  return (
    <>
      <ChakraProvider>
        <div className="relative">
          <Navigation />
          <Timer />
          <div
            className="fixed bottom-0 -z-50 aspect-square w-[100rem] animate-pulse-slow rounded-full bg-[#5BFFA7]/20 blur-[1000px]"
            style={{
              transform: "translateX(-12%) translateY(80%) translateZ(0px)",
            }}
          ></div>
        </div>
      </ChakraProvider>
    </>
  )
}
