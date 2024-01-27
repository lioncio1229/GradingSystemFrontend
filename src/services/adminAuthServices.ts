import { emptySplitApi } from ".";
import { RegisterModel, LoginModel } from "./types";

const authManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (model: RegisterModel) => ({
                url: "api/v1/userauth/register",
                method: "POST",
                body: model,
            })
        }),
        login: builder.mutation({
            query: (model: LoginModel) => ({
                url: "api/v1/userauth/login",
                method: "POST",
                body: model,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "api/v1/userauth/logout",
                method: "POST"
            })
        })
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
} = authManagementApi;