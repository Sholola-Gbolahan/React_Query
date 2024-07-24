import { useQuery } from "@tanstack/react-query"
import SingleItem from "./SingleItem"
import customFetch from "./utils"

const Items = () => {
  // 1. destructuring to get only required resourses needed
  const { isLoading, data } = useQuery({
    queryKey: ["task"],
    queryFn: () => customFetch.get("/"),
  })

  if (isLoading) {
    return <p style={{ marginTop: " 1rem" }}>Loading......</p>
  }
  //2. Getting taskList Array data from the query Data
  const taskList = data.data.taskList

  return (
    <div className="items">
      {/* 3.  Accessing Data  */}
      {taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />
      })}
    </div>
  )
}
export default Items
