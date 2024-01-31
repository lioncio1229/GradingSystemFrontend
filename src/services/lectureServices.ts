import { SearchFilter } from "./types";
import { emptySplitApi } from ".";
import { LectureUpsertRequest } from "./types";

const lectureManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllLectures: builder.query({
      query: () => `/api/v1/lectures/all`
    }),
    getLectures: builder.query({
      query: (searchFilter: SearchFilter) =>
        `/api/v1/lectures?Strand=${searchFilter.strand}&YearLevel=${searchFilter.yearLevel}&Semester=${searchFilter.semester}`,
    }),
    getLecturesTrigger: builder.mutation({
      query: (searchFilter: SearchFilter) =>
        `/api/v1/lectures?Strand=${searchFilter.strand}&YearLevel=${searchFilter.yearLevel}&Semester=${searchFilter.semester}`,
    }),
    addLecture: builder.mutation({
      query: (model: LectureUpsertRequest) => ({
        url: `/api/v1/lectures`,
        method: "POST",
        body: model,
      }),
    }),
    updateLecture: builder.mutation({
      query: (model: LectureUpsertRequest) => ({
        url: `/api/v1/lectures/${model.id}`,
        method: "PUT",
        body: model,
      }),
    }),
    deleteLecture: builder.mutation({
      query: (model: { id: string }) => ({
        url: `/api/v1/lectures/${model.id}`,
        method: "DELETE"
      })
    })
  }),
});

export const {
  useGetAllLecturesQuery,
  useGetLecturesQuery,
  useGetLecturesTriggerMutation,
  useAddLectureMutation,
  useUpdateLectureMutation,
  useDeleteLectureMutation,
} = lectureManagementApi;
