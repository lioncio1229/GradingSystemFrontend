import { SearchFilter } from "./types";
import { emptySplitApi } from ".";
import { StudentUpsertRequest } from "./types";

const studentManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (searchFilter: SearchFilter) =>
        `/api/v1/students?Strand=${searchFilter.strand}&YearLevel=${searchFilter.yearLevel}&Semester=${searchFilter.semester}`,
    }),
    getStudent: builder.query({
      query: (model: { studentId: string }) =>
        `/api/v1/students/${model.studentId}`,
    }),
    addStudent: builder.mutation({
      query: (model: StudentUpsertRequest) => ({
        url: `/api/v1/students`,
        method: "POST",
        body: model,
      }),
    }),
    updateStudent: builder.mutation({
      query: (model: StudentUpsertRequest) => ({
        url: `/api/v1/students/${model.id}`,
        method: "PUT",
        body: model,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (model: { id: string }) => ({
        url: `/api/v1/students/${model.id}`,
        method: "DELETE"
      })
    })
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetStudentQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentManagementApi;
