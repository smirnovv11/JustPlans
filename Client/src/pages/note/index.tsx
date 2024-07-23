import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useDeleteNoteMutation,
  useGetNoteByIdQuery,
  useUpdateNoteMutation,
} from "../../app/services/notes"
import { Divider, Dropdown, input, Spinner } from "@nextui-org/react"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { isErrorType } from "../../utils/isErrorType"
import ErrorMessage from "../../components/errorMessage"
import Textarea from "../../components/textarea"
import Button from "../../components/button"
import { Paths } from "../../../paths"
import CategoryBar from "../../components/categoryBar"
import AskModal from "../../components/askModal"

const Note = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [updateNote] = useUpdateNoteMutation()
  const [deleteNote] = useDeleteNoteMutation()
  const [error, setError] = useState("")
  const { data, isLoading } = useGetNoteByIdQuery(id || "")
  const [isModal, setModal] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      categoryId: data?.categoryId || "",
      title: data?.title || "",
      content: data?.content || "",
    },
  })

  const onSubmit = async (data: {
    categoryId: string
    title: string
    content: string
  }) => {
    try {
      setError("")
      await updateNote({ ...data, noteId: id || "" }).unwrap()
      navigate(Paths.home)
    } catch (error) {
      const maybeError = isErrorType(error)

      if (maybeError) setError(error.data.error)
      else setError("Unknown error")
    }
  }

  const onDeleteNote = async () => {
    try {
      await deleteNote(id || "").unwrap()
      navigate(Paths.home)
    } catch (error) {
      const maybeError = isErrorType(error)

      if (maybeError) setError(error.data.error)
      else setError("Unknown error")
    }
  }

  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  return !isLoading ? (
    <>
      <form
        className="m-5 lg:w-2/3 xl:w-1/2 w-full rounded-xl items-center flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CategoryBar
          selected={data?.categoryId || ""}
          name="categoryId"
          control={control}
          required="Required field"
        />
        <Input
          name="title"
          size="lg"
          weight="font-bold"
          placeholder="Title"
          control={control}
          required="Required field"
        />
        <Textarea
          name="content"
          control={control}
          autoFocus={true}
          placeholder="Write some text..."
        />
        <ErrorMessage message={error} />
        <div className="flex justify-between w-full h-auto flex-col-reverse sm:flex-row sm:gap-0 gap-2">
          <Button color="danger" onClick={() => setModal(true)}>
            Delete Note
          </Button>
          <Divider className=" sm:hidden"/>
          <div className="flex sm:gap-4 flex-col gap-2 sm:flex-row">
            <Button color="primary" type="submit">
              Save changes
            </Button>
            <Button color="default" onClick={() => navigate(Paths.home)}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
      <AskModal
        setModal={setModal}
        header="Delete note"
        message="You sure you want to delete this note?"
        isOpen={isModal}
        onSubmit={onDeleteNote}
      />
    </>
  ) : (
    <Spinner className="h-96" size="lg" label="Note loading" />
  )
}

export default Note
