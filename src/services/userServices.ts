import { emptySplitApi } from ".";
import { UserUpsertRequest } from "./types";

const userManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "api/v1/users",
    }),
    addUser: builder.mutation({
      query: (model: UserUpsertRequest) => ({
        url: `/api/v1/users`,
        method: "POST",
        body: model,
      }),
    }),
    updateUser: builder.mutation({
      query: (model: UserUpsertRequest) => ({
        url: `/api/v1/users/${model.id}`,
        method: "PUT",
        body: model,
      }),
    }),
    deleteUser: builder.mutation({
      query: (model: { id: string }) => ({
        url: `/api/v1/users/${model.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userManagementApi;
