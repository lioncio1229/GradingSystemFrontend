
import { emptySplitApi } from ".";

const gradeManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getGradesBySubject: builder.query({
      query: (model: { subjectId: string }) =>
        `/api/v1/grades/subject/${model.subjectId}`,
    }),
    updateGrade: builder.mutation({
      query: (model: { gradeId: string }) => ({
        url: `/api/v1/grades/${model.gradeId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetGradesBySubjectQuery,
  useUpdateGradeMutation,
} = gradeManagementApi;
