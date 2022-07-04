export interface UserDBData {
    id: number,
    login: string,
    admin: boolean
}

export interface UserDetailData {
    name: string,
    surname: string
    date: Date
}

interface Date {
    year: string,
    month: string,
    day: string
}