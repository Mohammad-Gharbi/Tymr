"use client"

import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import * as Popover from "@radix-ui/react-popover"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/redux/store/store"
import { deleteTask, editTask } from "@/app/redux/features/timerSlice"
import * as Dialog from "@radix-ui/react-dialog"
import { useRef } from "react"

export function Task({
  id,
  name,
  checked,
}: {
  id: string
  name: string
  checked: boolean
}) {
  const taskName = useRef<HTMLInputElement>(null)

  const dispatch: AppDispatch = useDispatch()

  return (
    <div className="z-50 mt-2 flex h-8 w-80 flex-row items-center justify-between rounded-lg bg-[#4A6958]/50 p-1 text-base font-medium">
      <div className=" flex flex-row items-center justify-start  ">
        <Checkbox.Root
          id="c1"
          className="mr-2 flex h-5 w-5 items-center justify-center rounded-[4px] bg-white outline-none"
          checked={checked}
        >
          <Checkbox.Indicator className="text-[#5BFFA7]">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="cursor-pointer select-none" htmlFor="c1">
          {name}
        </label>
      </div>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-50 w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]"
            sideOffset={5}
          >
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => dispatch(deleteTask({ id }))}
                className="h-12 w-24 rounded-lg bg-black font-medium text-white"
              >
                Delete
              </button>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="h-12 w-24 rounded-lg bg-black font-medium text-white">
                    Edit
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                  <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="m-0 text-[17px] font-medium text-black">
                      Edit Task
                    </Dialog.Title>
                    <div>
                      <div className="flex flex-row items-center ">
                        <div className="mr-4 flex flex-col justify-start">
                          <input
                            ref={taskName}
                            className="w-48"
                            type="text"
                            placeholder="Enter New Task Name"
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[25px] flex justify-end">
                      <Dialog.Close asChild>
                        <button
                          onClick={() =>
                            dispatch(
                              editTask({
                                id: id,
                                name: taskName.current?.value,
                              })
                            )
                          }
                          className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                        >
                          Save
                        </button>
                      </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                      >
                        <Cross2Icon />
                      </button>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
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
  )
}
