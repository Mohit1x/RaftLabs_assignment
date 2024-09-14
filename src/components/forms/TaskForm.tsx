import { useForm, SubmitHandler } from "react-hook-form";
import { Task } from "../../types";
import { addTask, editTask } from "../../reduxSlices/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { RootState } from "../../reduxSlices/store";
import { useEffect } from "react";

type prop = {
  isEditPage?: boolean;
};

const TaskForm = ({ isEditPage }: prop) => {
  const { id } = useParams();
  console.log(id);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const date = new Date().toISOString().split("T")[0];
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Task>();
  const tasks = useSelector((state: RootState) => state.tasks.value);

  useEffect(() => {
    if (isEditPage) {
      const update = tasks.find((task) => task.id === parseInt(id || ""));
      reset({ ...update });
    }
  }, [id, isEditPage, reset, tasks]);

  const onSubmit: SubmitHandler<Task> = (data) => {
    if (isEditPage) {
      dispatch(editTask({ ...data, id: parseInt(id || "") }));
    } else {
      dispatch(
        addTask({
          ...data,
          dueDate: data.dueDate.toString(),
          status: "in-progress",
          id: new Date().getTime(),
        })
      );
    }

    navigation("/");

    toast.success(isEditPage ? "Task Updated!" : "Task Creadted!");
  };

  return (
    <form className="grid grid-col-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1 className="font-bold text-3xl">
          {isEditPage ? "Update Task" : "Create Task"}
        </h1>
        <p className="text-sm text-neutral-600 ml-1">
          {isEditPage ? "Update your Task" : "create a new task"}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <label className="label">
          Title
          <input
            className="input"
            type="text"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </label>
        <label className="label">
          DueDate
          <input
            className="input"
            type="date"
            min={date}
            {...register("dueDate", { required: "Due Date is required" })}
          />
          {errors.dueDate && (
            <span className="text-red-500">{errors.dueDate.message}</span>
          )}
        </label>
      </div>
      <label className="label">
        Priority
        <select
          className="input"
          {...register("priority", { required: "Priority is required" })}
        >
          <option className="text-md" value={""}>
            Select any one priority
          </option>
          {["Low", "Medium", "High"].map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.priority && (
          <span className="text-red-500">{errors.priority.message}</span>
        )}
      </label>
      {isEditPage && (
        <label className="label">
          Status
          <select
            className="input"
            {...register("status", { required: "Status is required" })}
          >
            <option className="text-md" value={""}>
              Update Status
            </option>
            {["in-progress", "completed"].map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <span className="text-red-500">{errors.status.message}</span>
          )}
        </label>
      )}
      <label className="label">
        Description
        <textarea
          className="input"
          rows={5}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <button
        type="submit"
        className="justify-end py-2 px-4 w-fit bg-blue-500 hover:bg-blue-700 rounded-md text-white font-bold"
      >
        {isEditPage ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default TaskForm;
