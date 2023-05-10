import ReactDOM from "react-dom/client"
import App from "./App.tsx";
import {QueryClientProvider, QueryClient} from "react-query";
import './index.css'

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
    <QueryClientProvider client={client}>
        <App/>
    </QueryClientProvider>
)