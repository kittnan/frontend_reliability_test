export interface UserForm {
    _id: string,
    employee_ID: string,
    username: string,
    password: string,
    name: string,
    email: string,
    department: string,
    section: string,
    authorize: Array<any>,
    createdBy: string,
    createdAt: Date,
    updatedAt: Date

}
