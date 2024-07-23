import React from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/user/userSlice"
import {
  useGetAllNotesQuery,
  useLazyGetAllNotesQuery,
} from "../../app/services/notes"
import { toUserDateFormat } from "../../utils/toUserDateFormat"
import { Link as RouterLink } from "react-router-dom"
import NotePost from "../../components/notePost"
import { useGetAllCategoriesQuery } from "../../app/services/category"
import { Skeleton, Spacer, Spinner } from "@nextui-org/react"
import MailboxIcon from "../../components/mailbox"

const Notes = () => {
  const notes = useGetAllNotesQuery()
  const categories = useGetAllCategoriesQuery()

  if (notes.isLoading && categories.isLoading)
    return <Spinner className="h-96" size="lg" label="Notes are loading..." />

  return (
    <div className="m-5 lg:w-2/3 xl:w-1/2 w-full rounded-xl items-center flex flex-col gap-4 *
                    ">
      {notes.data && notes.data.length > 0 ? (
        notes.data.map(({ id, title, content, categoryId, createdAt }) => (
          <RouterLink to={`/notes/${id}`} className="w-full">
            <NotePost
              title={title}
              content={content}
              categoryName={
                categories.data?.find(c => c.id === categoryId)?.name ||
                "No category"
              }
              createdAt={toUserDateFormat(createdAt)}
            />
          </RouterLink>
        ))
      ) : (
        <div className="h-96 m-5 w-1/2 rounded-xl justify-center items-center flex flex-col gap-4">
          <MailboxIcon/>
          <span className="text-gray-600">Notes are empty...</span>
        </div>
      )}
    </div>
  )
}

export default Notes
