import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import customFetch from "./utils"
import { useCreateTask } from "./reactQueryCustomHooks"

const Form = () => {
  const [newItemName, setNewItemName] = useState("")
  const { createTask, CREATEisLoading } = useCreateTask()
  const handleSubmit = (e) => {
    e.preventDefault()
    createTask(newItemName, {
      onSuccess: () => {
        setNewItemName("")
      },
    })
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
        <button type="submit" className="btn" disabled={CREATEisLoading}>
          {CREATEisLoading ? "Loading" : "add task"}
        </button>
      </div>
    </form>
  )
}
export default Form
