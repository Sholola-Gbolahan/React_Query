import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import customFetch from "./utils"

const Form = () => {
  const queryClient = useQueryClient()
  const [newItemName, setNewItemName] = useState("")
  // 1. useMutation hook is used when we need to create and delete from server
  //2. involking the mutate function in order to communicate with the server
  //3 creating an alias for mutate as 'creteTask'  as javasCript didn't allow up to 10 use of the world mutate
  const {
    mutate: createTask,
    isLoading,
    error,
    isError,
  } = useMutation({
    //.6 Argument to accept value when function is called
    mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: "task" }),
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // if (!newItemName) return

    //4. involking the mutation func "createTask to submit post request to server"
    createTask(newItemName)

    setNewItemName("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />

        {/* 5.  disabling the submit button in order to prevent multiple submit when one is not done */}
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Loading" : "add task"}
        </button>
      </div>
      {isError && error.response.data.msg}
    </form>
  )
}
export default Form
