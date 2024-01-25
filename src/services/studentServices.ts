import { SearchFilter } from "./types";
import { emptySplitApi } from ".";
import { StudentUpsertSchema } from "./types";

const studentManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (searchFilter: SearchFilter) =>
        `/api/v1/students?Strand=${searchFilter.strand}&YearLevel=${searchFilter.yearLevel}&Semester=${searchFilter.semester}`,
    }),
    addStudent: builder.mutation({
      query: (model: StudentUpsertSchema) => ({
        url: `/api/v1/students`,
        method: "POST",
        body: model,
      }),
    }),
    updateStudent: builder.mutation({
      query: (model: StudentUpsertSchema) => ({
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
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentManagementApi;
