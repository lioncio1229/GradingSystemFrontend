
export type RegisterModel = {
    username: string,
    email: string,
    password: FormDataEntryValue | null,
    firstName: string,
    lastName: string,
}

export type LoginModel = {
    username: FormDataEntryValue,
    password: FormDataEntryValue,   
}

export type FacultyType = {
    id: string,
    username: string,
    firstName: string,
    lastName: string   
}

export type Strand = {
    code: string,
    description: string
}

export type Semester = {
    key: string,
    name: string,
}

export type YearLevel = {
    key: string,
    name: string,
}

export type Subject = {
    id: string,
    name: string,
    room: string,
    code: string,
    type: string,
    faculty: FacultyType,
    strand: Strand,
    yearLevel: YearLevel,
    semester: Semester,
}

export type SearchFilter = {
    strand: string,
    yearLevel: string,
    semester: string,
}

export type SubjectUpsertSchema = {
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

export interface StudentUpsertSchema {
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
  