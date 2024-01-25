import { SearchFilter } from "./types";
import { emptySplitApi } from ".";
import { SubjectAddUpdateSchema } from "./types";

const subjectManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: (searchFilter: SearchFilter) =>
        `/api/v1/subjects?Strand=${searchFilter.strand}&YearLevel=${searchFilter.yearLevel}&Semester=${searchFilter.semester}`,
    }),
    addSubject: builder.mutation({
      query: (model: SubjectAddUpdateSchema) => ({
        url: `/api/v1/subjects`,
        method: "POST",
        body: model,
      }),
    }),
    updateSubject: builder.mutation({
      query: (model: SubjectAddUpdateSchema) => ({
        url: `/api/v1/subjects/${model.id}`,
        method: "PUT",
        body: model,
      }),
    }),
  }),
});

export const {
  useGetAllSubjectsQuery,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
} = subjectManagementApi;
