/* @documentation 
https://redux-toolkit.js.org/rtk-query/api/createApi
*/

// Need to use the React-specific entry point to allow generating React hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:4000';

// Define a service using a base URL and expected endpoints
export const userConnected = createApi({
    reducerPath: 'userSlice',
    baseQuery: fetchBaseQuery(baseUrl),
    endpoints: (builder) => ({
        postDataToLogin: builder.mutation({
            query: ({email, password}) => ({
                url: `${baseUrl}/v1/auth/login`,
                method: 'POST',
                body: {
                    email,
                    password,
                },
            })
        }),
    }),

});


// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { usePostDataToLoginMutation } = userConnected;