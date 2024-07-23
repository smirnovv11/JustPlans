import { Category } from "../types";
import { api } from "./api";

export const categoryApi = api.injectEndpoints({
    endpoints: builder => ({
        createCategory: builder.mutation<Category, {
            name: string
        }>({
            query: categoryData => ({
                url: '/category',
                method: 'POST',
                body: categoryData
            })
        }),
        deleteCategory: builder.mutation<{count: number}, string>({
            query: categoryId => ({
                url: `/category/${categoryId}`,
                method: 'DELETE'
            })
        }),
        getAllCategories: builder.query<Category[], void>({
            query: () => ({
                url: `/category`,
                method: 'GET'
            })
        }),
    })
})

export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery,
    useLazyGetAllCategoriesQuery
} = categoryApi

export const { endpoints: { createCategory, deleteCategory, getAllCategories }} = categoryApi