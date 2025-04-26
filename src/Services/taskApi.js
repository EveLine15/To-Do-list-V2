import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001"}),
    tagTypes: ['Task'],
    endpoints: (builder) => ({

        getTasks: builder.query({
            query: () => "/tasks", 
            providesTags: ['Tasks'],
        }),

        addTask: builder.mutation({
            query: (newTask) => ({
              url: '/tasks',
              method: 'POST',
              body: newTask,
            }),
            invalidatesTags: ['Tasks'],
          }),

        updateTask: builder.mutation({
            query: ({ id, ...patch }) => ({
              url: `/tasks/${id}`,
              method: 'PATCH',
              body: patch,
            }),
            invalidatesTags: ['Tasks'],
          }),
      
          // Удалить задачу
          deleteTask: builder.mutation({
            query: (id) => ({
              url: `/tasks/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Tasks'],
          }),
    }),
});

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;