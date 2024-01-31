import { SearchFilter } from "./types";
import { emptySplitApi } from ".";
import { SubjectUpsertRequest } from "./types";

const subjectManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: (searchFilter: SearchFilter) =>
        `/api/v1/subjects?Strand=${searchFilter.strand}&YearLevel=${searchFilter.yearLevel}&Semester=${searchFilter.semester}`,
    }),
    getAllSubjectsTrigger: builder.mutation({
      query: (searchFilter: SearchFilter) =>
        `/api/v1/subjects?Strand=${searchFilter.strand}&YearLevel=${searchFilter.yearLevel}&Semester=${searchFilter.semester}`,
    }),
    getSubjectsByFaculty: builder.mutation({
      query: (mode: { facultyId: string }) =>
        `api/v1/subjects/faculty?userId=${mode.facultyId}`
    }),
    addSubject: builder.mutation({
      query: (model: SubjectUpsertRequest) => ({
        url: `/api/v1/subjects`,
        method: "POST",
        body: model,
      }),
    }),
    updateSubject: builder.mutation({
      query: (model: SubjectUpsertRequest) => ({
        url: `/api/v1/subjects/${model.id}`,
        method: "PUT",
        body: model,
      }),
    }),
    deleteSubject: builder.mutation({
      query: (model: { id: string }) => ({
        url: `/api/v1/subjects/${model.id}`,
        method: "DELETE"
      })
    })
  }),
});

export const {
  useGetAllSubjectsQuery,
  useGetAllSubjectsTriggerMutation,
  useGetSubjectsByFacultyMutation,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectManagementApi;
