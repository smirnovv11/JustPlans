export const toUserDateFormat = (date?: Date) => {
    if (!date) {
        return ''
    }

    return new Date(date).toLocaleDateString()
}