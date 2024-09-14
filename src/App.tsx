import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskForm from "./components/forms/TaskForm";
import HomePage from "./pages/HomePage";
import AllTasks from "./components/AllTasks";
import EditForm from "./components/forms/EditForm";
import { Toaster } from "sonner";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          path: "/",
          element: <AllTasks />,
        },
        {
          path: "/create-task",
          element: <TaskForm />,
        },
        {
          path: "/edit-task/:id",
          element: <EditForm />,
        },
      ],
    },
  ]);
  return (
    <div>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
