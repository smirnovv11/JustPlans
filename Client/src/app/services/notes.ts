import { Notes } from "../types";
import { api } from "./api";

export const notesApi = api.injectEndpoints({
    endpoints: builder => ({
        createNote: builder.mutation<Notes, {
            categoryId: string,
            title: string,
            content: string
        }>({
            query: noteData => ({
                url: '/notes',
                method: 'POST',
                body: noteData
            })
        }),
        deleteNote: builder.mutation<{count: number}, string>({
            query: noteId => ({
                url: `/notes/${noteId}`,
                method: 'DELETE'
            })
        }),
        updateNote: builder.mutation<{count: number}, {
            categoryId: string,
            title: string,
            content: string,
            noteId: string
        }>({
            query: noteData => ({
                url: `/notes/${noteData.noteId}`,
                method: 'PUT',
                body: noteData
            })
        }),
        getAllNotes: builder.query<Notes[], void>({
            query: () => ({
                url: `/notes`,
                method: 'GET'
            })
        }),
        getNoteById: builder.query<Notes, string>({
            query: (noteId) => ({
                url: `/notes/${noteId}`,
                method: 'GET'
            })
        }),
    })
})

export const {
    useCreateNoteMutation,
    useDeleteNoteMutation,
    useUpdateNoteMutation,
    useGetNoteByIdQuery,
    useGetAllNotesQuery,
    useLazyGetAllNotesQuery,
    useLazyGetNoteByIdQuery
} = notesApi

export const { endpoints: { createNote, deleteNote, updateNote, getById, getAll }} = notesApi