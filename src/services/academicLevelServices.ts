import { emptySplitApi } from ".";

const authManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getStrands: builder.query({
            query: () => "api/v1/academiclevel/strands"
        }),
        getYearLevels: builder.query({
            query: () => "api/v1/academiclevel/yearlevels"
        }),
        getSemesters: builder.query({
            query: () => "api/v1/academiclevel/semesters"
        })
    })
});

export const {
    useGetStrandsQuery,
    useGetYearLevelsQuery,
    useGetSemestersQuery,
} = authManagementApi;