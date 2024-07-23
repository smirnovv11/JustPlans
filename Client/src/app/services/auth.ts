import { User } from "../types";
import { api } from "./api";

type ResponseLoginData = User & { token: string }

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, {
            login: string,
            password: string
        }>({
            query: userData => ({
                method: 'POST',
                url: '/user/login',
                body: userData
            })
        }),
        register: builder.mutation<ResponseLoginData, {
            login: string,
            password: string,
            email: string
        }>({
            query: userData => ({
                method: 'POST',
                url: '/user/register',
                body: userData
            })
        }),
        getCurrentUser: builder.query<ResponseLoginData, void>({
            query: () => ({
                method: 'get',
                url: '/user'
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetCurrentUserQuery,
    useLazyGetCurrentUserQuery
} = authApi;

export const { endpoints: { login, register, getCurrentUser } } = authApi;
