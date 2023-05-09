"use client"

import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

export function Task() {
  return (
    <form>
      <div className="z-50 mt-2 flex h-8 w-80 flex-row items-center justify-start rounded-lg bg-[#4A6958]/50 p-1 text-base font-medium ">
        <Checkbox.Root
          id="c1"
          className="mr-2 flex h-5 w-5 items-center justify-center rounded-[4px] bg-white outline-none"
        >
          <Checkbox.Indicator className="text-[#5BFFA7]">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="cursor-pointer select-none" htmlFor="c1">
          Task
        </label>
      </div>
    </form>
  )
}
