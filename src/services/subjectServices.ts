import { SearchFilter } from "./types";
import { emptySplitApi } from ".";

const subjectManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: (searchFilter: SearchFilter) =>
        `/api/v1/subjects?Strand=${searchFilter.strand}&YearLevel=${searchFilter.yearLevel}&Semester=${searchFilter.semester}`,
    }),
  }),
});

export const { useGetAllSubjectsQuery } = subjectManagementApi;
