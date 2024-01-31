export interface RegisterModel {
    username: string,
    email: string,
    password: FormDataEntryValue | null,
    firstName: string,
    lastName: string,
}

export interface LoginModel {
    username: FormDataEntryValue,
    password: FormDataEntryValue,   
}

export interface StudentLoginModel {
    lrn: string,
    fullName: string,
}

export interface Role {
    id: string,
    name: string,
}

export interface User {
    id: string,
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    roles: Role[],
}

export interface Strand {
    code: string,
    description: string
}

export interface Semester {
    key: string,
    name: string,
}

export interface YearLevel {
    key: string,
    name: string,
}

export interface Subject {
    id: string,
    name: string,
    room: string,
    code: string,
    type: string,
    faculty: User,
    strand: Strand,
    yearLevel: YearLevel,
    semester: Semester,
}

export interface SearchFilter {
    strand: string,
    yearLevel: string,
    semester: string,
}

export interface SubjectUpsertRequest {
    id: string,
    name: string,
    room: string,
    code: string,
    type: string,
    userId: string,
    strandCode: string,
    yearLevelKey: string,
    semesterKey: string,
}

export interface Student {
    id: string,
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    sufix: string;
    birthdate: string;
    nationality: string;
    mobileNumber: string;
    facebookUrl: string;
    lrn: string;
    gender: string;
    status: string;
    studentType: string;
    strand: Strand,
    yearLevel: YearLevel,
    semester: Semester,
}

export interface StudentUpsertRequest {
    id: string,
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    sufix: string;
    birthdate: string;
    nationality: string;
    mobileNumber: string;
    facebookUrl: string;
    lrn: string;
    gender: string;
    status: string;
    studentType: string;
    strandCode: string;
    yearLevelKey: string;
    semesterKey: string;
}

export interface UserUpsertRequest {
    id: string,
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roles: string[];
}

export interface Lecture {
    id: string;
    lectureDate: string;
    from: string;
    to: string;
    subject: Subject;
}

export interface LectureUpsertRequest {
    id: string,
    lectureDate: string;
    from: string;
    to: string;
    subjectId1: string;
}

export interface Grade {
    id: string;
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    average: number;
    remarks: string;
    fullName: string;
    subjectCode: string;
    subjectDescription: string;
    facultyName: string;
}