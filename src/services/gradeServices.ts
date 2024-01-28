import { emptySplitApi } from ".";
import { Grade } from "./types";

const gradeManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getGradesBySubject: builder.query({
      query: (model: { subjectId: string }) =>
        `/api/v1/grades/subject/${model.subjectId}`,
    }),
    updateGrade: builder.mutation({
      query: (model: Grade) => ({
        url: `/api/v1/grades/${model.id}`,
        method: "PUT",
        body: model,
      }),
    }),
  }),
});

export const {
  useGetGradesBySubjectQuery,
  useUpdateGradeMutation,
} = gradeManagementApi;
