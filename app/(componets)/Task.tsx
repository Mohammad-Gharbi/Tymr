"use client"

import { useDispatch } from "react-redux"
import { AppDispatch } from "@/app/redux/store/store"
import { useForm } from "react-hook-form"
import { deleteTask, editTask } from "@/app/redux/features/timerSlice"
import { Checkbox } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
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

export function Task({
  id,
  name,
  checked,
}: {
  id: string
  name: string
  checked: boolean
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const dispatch: AppDispatch = useDispatch()

  const { handleSubmit, register } = useForm({
    defaultValues: {
      task: "",
    },
  })

  return (
    <div className="mt-2 flex h-8 w-80 flex-row items-center justify-between rounded-lg bg-[#4A6958]/50 p-1 px-4 text-base font-medium">
      <div className=" flex flex-row items-center justify-start  ">
        <Checkbox
          onChange={() =>
            dispatch(
              editTask({
                id: id,
                name: name,
                checked: !checked,
              })
            )
          }
          colorScheme="green"
          isChecked={checked}
        >
          {name}
        </Checkbox>
      </div>

      <Menu>
        <MenuButton>
          <button className="flex flex-col items-center justify-center">
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
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => dispatch(deleteTask({ id }))}>
            <div className="text-black">Delete</div>
          </MenuItem>
          <MenuItem>
            <button className="text-black" onClick={onOpen}>
              Edit
            </button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader className="text-black">Edit Task</ModalHeader>
                <ModalCloseButton />
                <form
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      editTask({
                        id: id,
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
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
