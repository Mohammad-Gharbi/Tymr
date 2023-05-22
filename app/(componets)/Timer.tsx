"use client"

import { useDispatch, useSelector } from "react-redux"
import { Task } from "./Task"
import { useEffect, useRef, useState } from "react"
import { AppDispatch, RootState } from "@/app/redux/store/store"
import {
  setIsTimerOn,
  addTask,
  setTimerType,
  setRemainingTime,
} from "@/app/redux/features/timerSlice"
import { motion } from "framer-motion"
import * as Popover from "@radix-ui/react-popover"
import { Cross2Icon } from "@radix-ui/react-icons"
import { v4 as uuidv4 } from "uuid"
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"

export function Timer() {
  const taskName = useRef<HTMLInputElement>(null)

  const state = useSelector((state: RootState) => state.timer)
  const { isTimerOn, remainingTime, currentState, timePresets, tasks } = state
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (isTimerOn === false) return
    const interval = setInterval(() => {
      dispatch(setRemainingTime(remainingTime - 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [remainingTime, isTimerOn, currentState, dispatch])

  useEffect(() => {
    dispatch(
      setRemainingTime(
        (currentState === "session"
          ? timePresets?.session
          : timePresets?.break) *
          60 *
          1000
      )
    )
  }, [timePresets, currentState, dispatch])

  return (
    <div className="z-50 mt-8 flex flex-col items-center justify-between">
      {/* Session & Break Buttons */}
      <div className="items center flex w-96 flex-row justify-between">
        <button
          onClick={() => {
            dispatch(setTimerType("session"))
            setRemainingTime(timePresets?.session * 60 * 1000)
            dispatch(setIsTimerOn(false))
          }}
          className={`h-11 w-44 rounded-lg bg-[#464646]/40 text-xl font-medium ${
            currentState === "session" ? "text-[#5BFFA7]/80" : "text-white/80"
          } shadow-inner transition-all ease-in-out hover:bg-[#646464]/40 hover:text-[#5BFFA7]/80`}
        >
          Session
        </button>
        <button
          onClick={() => {
            dispatch(setTimerType("break"))
            setRemainingTime(timePresets?.break * 60 * 1000)
            dispatch(setIsTimerOn(false))
          }}
          className={`h-11 w-44 rounded-lg bg-[#464646]/40 text-xl font-medium ${
            currentState === "break" ? "text-[#5BFFA7]/80" : "text-white/80"
          } shadow-inner transition-all ease-in-out hover:bg-[#646464]/40 hover:text-[#5BFFA7]/80`}
        >
          Break
        </button>
      </div>
      {/* Countdown Timer */}
      <div className="mt-8">
        <CircularProgress
          color="green.400"
          trackColor="gray.100"
          value={
            (remainingTime * 100) /
            ((currentState === "session"
              ? timePresets?.session
              : timePresets?.break) *
              60 *
              1000)
          }
          capIsRound
          thickness="8px"
          size="256px"
        >
          <CircularProgressLabel>
            <div className="w-64 text-center text-4xl font-bold text-white">
              {remainingTime ? Math.floor(remainingTime / 60 / 1000) : ""} :{" "}
              {remainingTime
                ? (remainingTime / 1000) % 60 < 10
                  ? `0${(remainingTime / 1000) % 60}`
                  : `${(remainingTime / 1000) % 60}`
                : ""}
            </div>
          </CircularProgressLabel>
        </CircularProgress>
      </div>
      {/* Tasks */}
      <div className="z-50 mt-8">
        <div className="flex w-96 flex-row items-center justify-between border-b border-[#5BFFA7] border-opacity-80 text-lg text-white">
          <div>Tasks</div>
          <Popover.Root>
            <Popover.Trigger asChild>
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
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-50 w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]"
                sideOffset={5}
              >
                <div className="flex flex-col gap-2.5">
                  <p className="text-mauve12 mb-2.5 text-[15px] font-medium leading-[19px]">
                    Add Task
                  </p>
                  <fieldset className="flex items-center gap-5">
                    <label
                      className="text-violet11 w-[75px] text-[13px]"
                      htmlFor="name"
                    >
                      Task Name
                    </label>
                    <input
                      className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                      id="name"
                      type="text"
                      placeholder="Enter Task Name"
                      ref={taskName}
                    />
                  </fieldset>
                  <button
                    onClick={() =>
                      dispatch(
                        addTask({
                          id: uuidv4(),
                          name: taskName.current?.value,
                          checked: false,
                        })
                      )
                    }
                  >
                    Add
                  </button>
                </div>
                <Popover.Close
                  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full outline-none focus:shadow-[0_0_0_2px]"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </Popover.Close>
                <Popover.Arrow className="fill-white" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
        <div className="mb-12 flex w-96 flex-col items-center overflow-y-scroll">
          {tasks.map((task: any) => (
            <Task
              key={task.id}
              id={task.id}
              name={task.name}
              checked={task.checked}
            />
          ))}
        </div>
      </div>
      {/* Start & Pause Button */}
      <div>
        <div className="relative  flex w-96 flex-row items-center justify-center">
          {isTimerOn ? (
            <div className="flex w-40 flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: -20 }}
                transition={{
                  duration: 0.1,
                  ease: "linear",
                }}
                onClick={() => dispatch(setIsTimerOn(!isTimerOn))}
                className=" z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#00FF75] transition-all ease-in-out hover:bg-[#0bb65b]"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16667 3.66663H5.5V18.3333H9.16667V3.66663Z"
                    fill="black"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.5 3.66663H12.8333V18.3333H16.5V3.66663Z"
                    fill="black"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 20 }}
                transition={{
                  duration: 0.1,
                  ease: "linear",
                }}
                onClick={() => {
                  dispatch(setIsTimerOn(false))
                  dispatch(
                    setRemainingTime(
                      (currentState === "session"
                        ? timePresets?.session
                        : timePresets?.break) *
                        1000 *
                        60
                    )
                  )
                }}
                className=" z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#00FF75] transition-all ease-in-out hover:bg-[#0bb65b]"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="black"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="black"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          ) : (
            <div className="flex w-14 flex-row items-center justify-between">
              <div
                onClick={() => dispatch(setIsTimerOn(!isTimerOn))}
                className="z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#00FF75] transition-all ease-in-out hover:bg-[#0bb65b]"
              >
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
