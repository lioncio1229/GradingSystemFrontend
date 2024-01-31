import { emptySplitApi } from ".";
import { StudentUpsertRequest, StudentLoginModel } from "./types";

const studentAuthManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        registerStudent: builder.mutation({
            query: (model: StudentUpsertRequest) => ({
                url: "api/v1/studentauth/register",
                method: "POST",
                body: model,
            })
        }),
        loginStudent: builder.mutation({
            query: (model: StudentLoginModel) => ({
                url: "api/v1/studentauth/login",
                method: "POST",
                body: model,
            })
        }),
        logoutStudent: builder.mutation({
            query: () => ({
                url: "api/v1/studentauth/logout",
                method: "POST"
            })
        })
    })
});

export const {
    useRegisterStudentMutation,
    useLoginStudentMutation,
    useLogoutStudentMutation,
} = studentAuthManagementApi;