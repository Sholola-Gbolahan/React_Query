import { useQuery } from "@tanstack/react-query"
import SingleItem from "./SingleItem"
import customFetch from "./utils"
import { useFetchTask } from "./reactQueryCustomHooks"

const Items = () => {
  const { data, isLoading, isError, error } = useFetchTask()
  if (isLoading) {
    return <p style={{ marginTop: " 1rem" }}>Loading......</p>
  }

  if (isError) {
    // 2. getting error message from axios error and display using the error properties from react-query
    return <p style={{ marginTop: " 1rem" }}>{error.message}</p>
  }

  const taskList = data.data.taskList

  return (
    <div className="items">
      {taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />
      })}
    </div>
  )
}
export default Items
