import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import "react-toastify/dist/ReactToastify.css"
//1.Import queryClient and queryClientProvider from react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

//3. create an instance to store the queryClient
const queryClient = queryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  // 2. Wrap our entire application inside of the queryClient provider
  //4. pass the queryClient down using  props of client
  <QueryClientProvider client= {queryClient}>
    <App />
  </QueryClientProvider>
)
