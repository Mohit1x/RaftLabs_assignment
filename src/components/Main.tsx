import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxSlices/store";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteTask } from "../reduxSlices/TaskSlice";
import { toast } from "sonner";

const Main = () => {
  const filteredTask = useSelector((state: RootState) => state.tasks.filtered);

  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
    toast.success("Task Deleted!");
  };

  return (
    <div>
      <div className="grid grid-cols-6 items-center text-center justify-center bg-blue-400">
        <p className="table-header">Title</p>
        <p className="table-header">Description</p>
        <p className="table-header">priority</p>
        <p className="table-header">Due-Date</p>
        <p className="table-header">Status</p>
        <p className="table-header">Actions</p>
      </div>
      {filteredTask?.length ? (
        <>
          {filteredTask.map((task) => (
            <div
              className="grid grid-cols-6 items-center text-center justify-center"
              key={task.id}
            >
              <p className="table-body">{task.title}</p>
              <p className="table-body truncate" title={task.description}>
                {task.description}
              </p>
              <p className="table-body">{task.priority}</p>
              <p className="table-body">{task.dueDate}</p>
              <p className="table-body">{task.status}</p>
              <p className="table-body flex items-center justify-around">
                <Link to={`/edit-task/${task.id}`}>
                  <FaEdit className="text-2xl text-blue-500 cursor-pointer transition duration-200 hover:scale-150" />
                </Link>
                <MdDelete
                  onClick={() => handleDelete(task.id)}
                  className="text-2xl text-red-500 cursor-pointer transition duration-200 hover:scale-150"
                />
              </p>
            </div>
          ))}
        </>
      ) : (
        <p className="mx-auto w-full text-center py-10 font-semibold text-2xl border border-black">
          No result found
        </p>
      )}
    </div>
  );
};

export default Main;
