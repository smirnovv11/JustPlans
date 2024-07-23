import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import React, { useState } from "react"
import { Input } from "../../input"
import { useForm } from "react-hook-form"
import { isErrorType } from "../../../utils/isErrorType"
import { useCreateCategoryMutation, useGetAllCategoriesQuery } from "../../../app/services/category"
import ErrorMessage from "../../errorMessage"
import Button from "../../button"
import { Category } from "../../../app/types"

type Props = {
  isOpen: boolean
  setModal: (value: boolean) => void
  refetch: () => void
}

const CategoryModal = ({ isOpen, setModal, refetch }: Props) => {
  const [error, setError] = useState("")
  const [createCategory] = useCreateCategoryMutation()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (data: { name: string }) => {
    try {
      setError("")
      await createCategory(data).unwrap()
      refetch()
      setModal(false)
    } catch (error) {
      const maybeError = isErrorType(error)

      if (maybeError) setError(error.data.error)
      else setError("Unknown error")
    }
  }

  const onClose = () => setModal(false)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>New category</ModalHeader>
        <ModalBody>
          <Input placeholder="Name" name="name" control={control} required="Required field"/>
          <ErrorMessage message={error} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CategoryModal
