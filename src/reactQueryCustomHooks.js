import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import customFetch from "./utils"
import { toast } from "react-toastify"

//GET ALL TASK HOOKS
export const useFetchTask = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["task"],
    queryFn: () => customFetch.get("/"),
  })
  return { isLoading, data, isError, error }
}

//-----------------------//--------//----------------     +

//EDIT TASK HOOKS
export const useEditTask = () => {
  const queryClient = useQueryClient()
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) =>
      customFetch.patch(`/${taskId}`, { isDone }),
    // 1. Getting task update on edit success
    onSuccess: () => {
      // This generated updated list immediately on change success
      queryClient.invalidateQueries({ queryKey: ["task"] })
    },
  })

  return { editTask }
}

// ---------//-----------// ----------------------

//DELETE TASK HOOK
export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteTask, isLoading: deleteIsLoading } = useMutation({
    // Passing the required Id to query
    mutationFn: (taskId) => customFetch.delete(`/${taskId}`),
    // 1. Getting task update on edit success
    onSuccess: () => {
      // This generated updated list immediately on change success
      queryClient.invalidateQueries({ queryKey: ["task"] })
    },
  })
  return { deleteTask, deleteIsLoading }
}

//CREATE TASK HOOK

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const { mutate: createTask, isLoading: CREATEisLoading } = useMutation({
    //.6 Argument to accept value when function is called
    mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] }),
        toast.success("Task Added")
    },

    onError: (error) => {
      toast.error(error.response.data.msg)
    },
  })

  return { createTask, CREATEisLoading }
}
