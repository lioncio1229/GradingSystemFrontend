import { SearchFilter } from "./types";
import { emptySplitApi } from ".";
import { SubjectUpsertRequest } from "./types";

const subjectManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: (searchFilter: SearchFilter) =>
        `/api/v1/lectures?Strand=${searchFilter.strand}&YearLevel=${searchFilter.yearLevel}&Semester=${searchFilter.semester}`,
    }),
    addSubject: builder.mutation({
      query: (model: SubjectUpsertRequest) => ({
        url: `/api/v1/lectures`,
        method: "POST",
        body: model,
      }),
    }),
    updateSubject: builder.mutation({
      query: (model: SubjectUpsertRequest) => ({
        url: `/api/v1/lectures/${model.id}`,
        method: "PUT",
        body: model,
      }),
    }),
    deleteSubject: builder.mutation({
      query: (model: { id: string }) => ({
        url: `/api/v1/lectures/${model.id}`,
        method: "DELETE"
      })
    })
  }),
});

export const {
  useGetAllSubjectsQuery,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectManagementApi;
