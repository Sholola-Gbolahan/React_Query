//1. import useQuery from react-query
import { useQuery } from "@tanstack/react-query"
import SingleItem from "./SingleItem"
import customFetch from "./utils"

const Items = ({ items }) => {
  // 2. setup an instance to store return data
  //3. useQuery need queryKey and queryFn
  const result = useQuery({
    // 4.  The unique key you provide is used internally for refetching, caching, and sharing your queries throughout your application.
    queryKey: ["task"],
    //5. A query function can be literally any function that returns a promise. The promise that is returned should either resolve the data or throw an error.
    queryFn: () => customFetch.get("/"),
  })

  console.log(result)
  return (
    <div className="items">
      {items.map((item) => {
        return <SingleItem key={item.id} item={item} />
      })}
    </div>
  )
}
export default Items
