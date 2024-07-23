export type User = {
    id: string,
    login: string,
    email: string,
    password: string,
    categories: Category[],
    notes: Notes[]
}

export type Category = {
    id: string,
    name: string,
    user: User,
    userId: string,
    notes: Notes[]
}

export type Notes = {
    id: string,
    title: string,
    content: string,
    user: User,
    userId: string,
    category: Category,
    categoryId: string,
    createdAt: Date
}