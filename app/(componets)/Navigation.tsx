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

  const state = useSelector((state: RootState) => state.timer)
  const { timePresets } = state

  const dispatch: AppDispatch = useDispatch()

  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      session: timePresets.session,
      break: timePresets.break,
    },
  })

  return (
    <div className="z-50 flex w-full flex-col items-center justify-between text-black md:flex-row">
      <div>
        <svg
          width="89"
          height="73"
          viewBox="0 0 89 73"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.93 56V38.09H0.81V35H16.92V38.09H10.77V56H6.93ZM20.0405 62.6L23.4905 55.01H22.5905L16.8005 41.12H20.9705L25.1405 51.59L29.4905 41.12H33.5705L24.1205 62.6H20.0405ZM36.0809 56V41.12H39.4709L39.8009 43.13C40.2809 42.41 40.9109 41.84 41.6909 41.42C42.4909 40.98 43.4109 40.76 44.4509 40.76C46.7509 40.76 48.3809 41.65 49.3409 43.43C49.8809 42.61 50.6009 41.96 51.5009 41.48C52.4209 41 53.4209 40.76 54.5009 40.76C56.4409 40.76 57.9309 41.34 58.9709 42.5C60.0109 43.66 60.5309 45.36 60.5309 47.6V56H56.6909V47.96C56.6909 46.68 56.4409 45.7 55.9409 45.02C55.4609 44.34 54.7109 44 53.6909 44C52.6509 44 51.8109 44.38 51.1709 45.14C50.5509 45.9 50.2409 46.96 50.2409 48.32V56H46.4009V47.96C46.4009 46.68 46.1509 45.7 45.6509 45.02C45.1509 44.34 44.3809 44 43.3409 44C42.3209 44 41.4909 44.38 40.8509 45.14C40.2309 45.9 39.9209 46.96 39.9209 48.32V56H36.0809ZM64.1766 56V41.12H67.5966L67.9566 43.91C68.4966 42.95 69.2266 42.19 70.1466 41.63C71.0866 41.05 72.1866 40.76 73.4466 40.76V44.81H72.3666C71.5266 44.81 70.7766 44.94 70.1166 45.2C69.4566 45.46 68.9366 45.91 68.5566 46.55C68.1966 47.19 68.0166 48.08 68.0166 49.22V56H64.1766Z"
            fill="white"
          />
          <path
            d="M81.72 56.392C80.4133 56.392 79.3307 55.9813 78.472 55.16C77.6507 54.3387 77.24 53.3493 77.24 52.192C77.24 50.9973 77.6507 49.9893 78.472 49.168C79.3307 48.3467 80.4133 47.936 81.72 47.936C83.0267 47.936 84.0907 48.3467 84.912 49.168C85.7707 49.9893 86.2 50.9973 86.2 52.192C86.2 53.3493 85.7707 54.3387 84.912 55.16C84.0907 55.9813 83.0267 56.392 81.72 56.392Z"
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
                        defaultValue={timePresets?.session}
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
                    name="session"
                    render={({ field: { ref, ...restField } }) => (
                      <NumberInput
                        className="w-44 text-black focus:outline-[#5BFFA7]"
                        defaultValue={timePresets?.break}
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
