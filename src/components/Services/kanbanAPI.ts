import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const URL = "http://localhost:9000";

export const kanbanAPI = createApi({
  reducerPath: "kanbanApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getKanbans: builder.query<any, void>({
      query: () => `/kanban/kanbans`,
    }),
    createKanban: builder.mutation<any, any>({
      query: (payload) => ({
        method: "POST",
        url: "kanban/createkanban",
        body: payload,
      }),
    }),
    getKanbanTasks: builder.query({
      query: (id) => `/kanban/kanbantasks/${id}`,
    }),
  }),
});

export const {
  useGetKanbansQuery,
  useGetKanbanTasksQuery,
  useCreateKanbanMutation,
} = kanbanAPI;
