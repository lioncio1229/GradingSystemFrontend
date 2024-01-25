import { emptySplitApi } from ".";

const authManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getFaculties: builder.query({
            query: () => "api/v1/users"
        }),
    })
});

export const {
    useGetFacultiesQuery,
} = authManagementApi;