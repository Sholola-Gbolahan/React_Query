import { useMutation, useQueryClient } from "@tanstack/react-query"
import customFetch from "./utils"

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient()
  const { mutate: editTask } = useMutation({
    mutationFn: (checkedValue) =>
      customFetch.patch(`/${item.id}`, { isDone: checkedValue }),
    // 1. Getting task update on edit success
    onSuccess: () => {
      // This generated updated list immediately on change success
      queryClient.invalidateQueries({ queryKey: "task" })
    },
  })

  const { mutate: deleteTask } = useMutation({
    // Passing the required Id to query
    mutationFn: () => customFetch.delete(`/${item.id}`),
    // 1. Getting task update on edit success
    onSuccess: () => {
      // This generated updated list immediately on change success
      queryClient.invalidateQueries({ queryKey: "task" })
    },
  })

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => {
          editTask(!item.isDone)
        }}
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone && "line-through",
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => deleteTask()}
      >
        delete
      </button>
    </div>
  )
}
export default SingleItem
