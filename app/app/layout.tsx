export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-screen w-screen bg-black px-28 py-4 text-white">
      {children}
    </div>
  )
}
