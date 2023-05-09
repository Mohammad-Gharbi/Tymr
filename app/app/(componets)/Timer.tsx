import { Task } from "./Task"

export function Timer() {
  return (
    <div className="z-50 mt-8 flex flex-col items-center justify-between">
      {/* Session & Break Buttons */}
      <div className="items center flex w-96 flex-row justify-between">
        <button className="h-11 w-44 rounded-lg bg-[#464646]/40 text-xl font-medium text-white/80 shadow-inner transition-all ease-in-out hover:bg-[#646464]/40 hover:text-white">
          Session
        </button>
        <button className="h-11 w-44 rounded-lg bg-[#464646]/40 text-xl font-medium text-white/80 shadow-inner transition-all ease-in-out hover:bg-[#646464]/40 hover:text-white">
          Break
        </button>
      </div>
      {/* Countdown Timer */}
      <div className="mt-8 flex h-64 w-64 flex-col items-center justify-center rounded-full border-8 border-white border-opacity-40">
        <div className="text-center text-4xl font-bold text-white">
          00 : 30 : 00
        </div>
      </div>
      {/* Tasks */}
      <div className="z-50 mt-8">
        <div className="flex w-96 flex-row items-center justify-between border-b border-[#5BFFA7] border-opacity-80 text-lg text-white">
          <div>Tasks</div>
          <button>
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 3.95833V15.0417"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.95834 9.5H15.0417"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="mb-12 flex w-96 flex-col items-center overflow-y-scroll">
          <Task />
        </div>
        {/* Start & Pause Button */}
        <div>
          <div className="relative  flex w-96 flex-row items-center justify-center">
            <div className="absolute z-0 h-14 w-14 rounded-full bg-[#5BFFA7] blur-[6rem]"></div>
            <button className="absolute z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#00FF75] transition-all ease-in-out hover:bg-[#0bb65b]">
              <svg
                width="18"
                height="22"
                viewBox="0 0 22 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.333336 2.66333C0.333336 1.081 2.08383 0.125316 3.41485 0.980973L21.0497 12.3176C22.2743 13.1049 22.2743 14.8951 21.0497 15.6824L3.41485 27.019C2.08382 27.8747 0.333336 26.919 0.333336 25.3367V2.66333Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
