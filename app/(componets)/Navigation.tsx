"use client"

import { editTimer } from "@/app/redux/features/timerSlice"
import { AppDispatch, RootState } from "@/app/redux/store/store"
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
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
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"

export function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const state = useSelector((state: RootState) => state)

  const dispatch: AppDispatch = useDispatch()

  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      session: state.timePresets.session,
      break: state.timePresets.break,
    },
  })

  return (
    <div className="z-50 flex w-full flex-col items-center justify-between text-black md:flex-row">
      <div>
        <svg
          width="76"
          height="73"
          viewBox="0 0 76 73"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.64 56V44.33H0.6V41.12H2.64V39.38C2.64 37.58 3.09 36.3 3.99 35.54C4.91 34.78 6.15 34.4 7.71 34.4H9.36V37.67H8.31C7.65 37.67 7.18 37.8 6.9 38.06C6.62 38.32 6.48 38.76 6.48 39.38V41.12H9.69V44.33H6.48V56H2.64ZM12.72 56V34.4H16.56V56H12.72ZM27.6349 56.36C26.1949 56.36 24.8949 56.03 23.7349 55.37C22.5949 54.71 21.6849 53.8 21.0049 52.64C20.3449 51.46 20.0149 50.1 20.0149 48.56C20.0149 47.02 20.3549 45.67 21.0349 44.51C21.7149 43.33 22.6249 42.41 23.7649 41.75C24.9249 41.09 26.2249 40.76 27.6649 40.76C29.0849 40.76 30.3649 41.09 31.5049 41.75C32.6649 42.41 33.5749 43.33 34.2349 44.51C34.9149 45.67 35.2549 47.02 35.2549 48.56C35.2549 50.1 34.9149 51.46 34.2349 52.64C33.5749 53.8 32.6649 54.71 31.5049 55.37C30.3449 56.03 29.0549 56.36 27.6349 56.36ZM27.6349 53.03C28.6349 53.03 29.5049 52.66 30.2449 51.92C30.9849 51.16 31.3549 50.04 31.3549 48.56C31.3549 47.08 30.9849 45.97 30.2449 45.23C29.5049 44.47 28.6449 44.09 27.6649 44.09C26.6449 44.09 25.7649 44.47 25.0249 45.23C24.3049 45.97 23.9449 47.08 23.9449 48.56C23.9449 50.04 24.3049 51.16 25.0249 51.92C25.7649 52.66 26.6349 53.03 27.6349 53.03ZM41.0709 56L36.7209 41.12H40.5309L43.1109 51.83L46.1109 41.12H50.3709L53.3709 51.83L55.9809 41.12H59.7909L55.4109 56H51.4209L48.2409 44.87L45.0609 56H41.0709Z"
            fill="white"
          />
          <path
            d="M68.72 56.392C67.4133 56.392 66.3307 55.9813 65.472 55.16C64.6507 54.3387 64.24 53.3493 64.24 52.192C64.24 50.9973 64.6507 49.9893 65.472 49.168C66.3307 48.3467 67.4133 47.936 68.72 47.936C70.0267 47.936 71.0907 48.3467 71.912 49.168C72.7707 49.9893 73.2 50.9973 73.2 52.192C73.2 53.3493 72.7707 54.3387 71.912 55.16C71.0907 55.9813 70.0267 56.392 68.72 56.392Z"
            fill="#5BFFA7"
          />
        </svg>
      </div>

      <button onClick={onOpen}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.22 2H11.78C11.2496 2 10.7409 2.21071 10.3658 2.58579C9.99072 2.96086 9.78 3.46957 9.78 4V4.18C9.77964 4.53073 9.68706 4.87519 9.51154 5.17884C9.33602 5.48248 9.08374 5.73464 8.78 5.91L8.35 6.16C8.04596 6.33554 7.70108 6.42795 7.35 6.42795C6.99893 6.42795 6.65404 6.33554 6.35 6.16L6.2 6.08C5.74107 5.81526 5.19584 5.74344 4.684 5.88031C4.17217 6.01717 3.73555 6.35154 3.47 6.81L3.25 7.19C2.98526 7.64893 2.91345 8.19416 3.05031 8.706C3.18717 9.21783 3.52154 9.65445 3.98 9.92L4.13 10.02C4.43228 10.1945 4.68362 10.4451 4.85905 10.7468C5.03448 11.0486 5.1279 11.391 5.13 11.74V12.25C5.1314 12.6024 5.03965 12.949 4.86405 13.2545C4.68844 13.5601 4.43521 13.8138 4.13 13.99L3.98 14.08C3.52154 14.3456 3.18717 14.7822 3.05031 15.294C2.91345 15.8058 2.98526 16.3511 3.25 16.81L3.47 17.19C3.73555 17.6485 4.17217 17.9828 4.684 18.1197C5.19584 18.2566 5.74107 18.1847 6.2 17.92L6.35 17.84C6.65404 17.6645 6.99893 17.5721 7.35 17.5721C7.70108 17.5721 8.04596 17.6645 8.35 17.84L8.78 18.09C9.08374 18.2654 9.33602 18.5175 9.51154 18.8212C9.68706 19.1248 9.77964 19.4693 9.78 19.82V20C9.78 20.5304 9.99072 21.0391 10.3658 21.4142C10.7409 21.7893 11.2496 22 11.78 22H12.22C12.7504 22 13.2591 21.7893 13.6342 21.4142C14.0093 21.0391 14.22 20.5304 14.22 20V19.82C14.2204 19.4693 14.3129 19.1248 14.4885 18.8212C14.664 18.5175 14.9163 18.2654 15.22 18.09L15.65 17.84C15.954 17.6645 16.2989 17.5721 16.65 17.5721C17.0011 17.5721 17.346 17.6645 17.65 17.84L17.8 17.92C18.2589 18.1847 18.8042 18.2566 19.316 18.1197C19.8278 17.9828 20.2645 17.6485 20.53 17.19L20.75 16.8C21.0147 16.3411 21.0866 15.7958 20.9497 15.284C20.8128 14.7722 20.4785 14.3356 20.02 14.07L19.87 13.99C19.5648 13.8138 19.3116 13.5601 19.136 13.2545C18.9604 12.949 18.8686 12.6024 18.87 12.25V11.75C18.8686 11.3976 18.9604 11.051 19.136 10.7455C19.3116 10.4399 19.5648 10.1862 19.87 10.01L20.02 9.92C20.4785 9.65445 20.8128 9.21783 20.9497 8.706C21.0866 8.19416 21.0147 7.64893 20.75 7.19L20.53 6.81C20.2645 6.35154 19.8278 6.01717 19.316 5.88031C18.8042 5.74344 18.2589 5.81526 17.8 6.08L17.65 6.16C17.346 6.33554 17.0011 6.42795 16.65 6.42795C16.2989 6.42795 15.954 6.33554 15.65 6.16L15.22 5.91C14.9163 5.73464 14.664 5.48248 14.4885 5.17884C14.3129 4.87519 14.2204 4.53073 14.22 4.18V4C14.22 3.46957 14.0093 2.96086 13.6342 2.58579C13.2591 2.21071 12.7504 2 12.22 2Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
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
          <ModalHeader className="text-black">Settings</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={handleSubmit((data) => {
              dispatch(
                editTimer({
                  session: data.session,
                  break: data.break,
                })
              )
            })}
          >
            <ModalBody>
              <div className="font-bold text-black">Timer</div>
              <div className="flex flex-row items-center justify-between gap-2">
                <div>
                  <div className="text-lg font-medium text-black">
                    Session(min)
                  </div>

                  <Controller
                    control={control}
                    name="session"
                    render={({ field: { ref, ...restField } }) => (
                      <NumberInput
                        className="w-44 text-black focus:outline-[#5BFFA7]"
                        defaultValue={state.timePresets?.session}
                        colorScheme="green"
                        min={1}
                        {...restField}
                      >
                        <NumberInputField ref={ref} name={restField.name} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  />
                </div>
                <div>
                  <div className="text-lg font-medium text-black">
                    Break(min)
                  </div>

                  <Controller
                    control={control}
                    name="break"
                    render={({ field: { ref, ...restField } }) => (
                      <NumberInput
                        className="w-44 text-black focus:outline-[#5BFFA7]"
                        defaultValue={state.timePresets?.break}
                        min={1}
                        colorScheme="green"
                        {...restField}
                      >
                        <NumberInputField ref={ref} name={restField.name} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
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
  )
}
