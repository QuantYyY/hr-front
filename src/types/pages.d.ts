type applicantType = {
    id_applicant?: number,
    FIO: string,
    Passport: string,
    INN: string,
    Birthday: string,
    Gender: string,
    Address: string,
    Resume: string,
    email: string,
    id_vacancy: number
}

type vacancyType = {
    id_vacancy?: number,
    department_id: number,
    Post: string,
    Description: string
}

type departmentType = {
    id_department?: number,
    Name: string,
    Description: string,
    id_director: number,
}

type positionType = {
    id_post?: number,
    Name: string,
    Members: number,
    Salary: number,
    department_id: number,
}

type orderType = {
    id_order?: number,
    Type: string,
    Date: string,
    staff_id: number,
    post_id: number
}