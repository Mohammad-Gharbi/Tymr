"use client"

import { v4 as uuidv4 } from "uuid"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/redux/store/store"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@chakra-ui/react"
import { Task } from "./Task"
import { motion } from "framer-motion"
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import {
  setIsTimerOn,
  addTask,
  setTimerType,
  setRemainingTime,
} from "@/app/redux/features/timerSlice"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react"

export function Timer() {
  const state = useSelector((state: RootState) => state.timer)
  const { isTimerOn, remainingTime, currentState, timePresets, tasks } = state

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const { handleSubmit, register } = useForm({
    defaultValues: {
      task: "",
    },
  })

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (isTimerOn === false) return
    const interval = setInterval(() => {
      if (remainingTime !== 0) {
        dispatch(setRemainingTime(remainingTime - 1000))
      } else if (remainingTime === 0) {
        dispatch(setIsTimerOn(false))
        dispatch(
          setRemainingTime(
            (currentState === "session"
              ? timePresets?.session
              : timePresets?.break) *
              60 *
              1000
          )
        )
        toast({
          title: "Time Up",
          status: "success",
          isClosable: true,
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [
    remainingTime,
    isTimerOn,
    currentState,
    dispatch,
    timePresets?.session,
    timePresets?.break,
    toast,
  ])

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
      <div className="items center flex w-[23rem] flex-row justify-between">
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
          thickness="6px"
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
      <div className="z-50 mt-8 flex  flex-col items-center justify-center">
        <div className="flex  w-[22rem] flex-row items-center justify-between border-b border-[#5BFFA7] border-opacity-80 text-lg text-white">
          <div>Tasks</div>

          <button onClick={onOpen}>
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

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className="text-black">Add Task</ModalHeader>
              <ModalCloseButton />
              <form
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    addTask({
                      id: uuidv4(),
                      name: data.task,
                      checked: false,
                    })
                  )
                })}
              >
                <ModalBody>
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div>
                      <Input
                        className="text-black"
                        placeholder="Enter Task Name"
                        {...register("task")}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="green"
                    mr={3}
                    type="submit"
                    onClick={onClose}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
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
