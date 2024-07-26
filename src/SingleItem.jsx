import { useMutation, useQueryClient } from "@tanstack/react-query"
import customFetch from "./utils"
import { useDeleteTask, useEditTask } from "./reactQueryCustomHooks"

const SingleItem = ({ item }) => {
  const { editTask } = useEditTask()

  const { deleteTask, deleteIsLoading } = useDeleteTask()

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => {
          editTask({ taskId: item.id, isDone: !item.isDone })
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
        disabled={deleteIsLoading}
        className="btn remove-btn"
        type="button"
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  )
}
export default SingleItem
