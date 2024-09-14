import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../reduxSlices/store";
import { filteredTask } from "../reduxSlices/TaskSlice";
import { useState } from "react";
import { Task } from "../types";
import { ascDueDateValues, ascPriorityValues, createPriorityQueue, dscDueDateValues, dscPriorityValues } from "../utils/PriorityQueue";

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const tasks = useSelector((state: RootState) => state.tasks.value);
  const dispatch = useDispatch();
  const handleSearch = () => {
    const filter = tasks.filter((value) =>
      value.title?.toLowerCase()?.includes(searchValue?.toLowerCase())
    );
    dispatch(filteredTask(filter));
  };

  const getValue = (a:Task,b:Task,value:string)=>{
    if(value === "Priority (High to Low)"){
      return ascPriorityValues(a,b)
    }else if(value === "Priority (Low to High)"){
      return dscPriorityValues(a,b)
    }else if(value === "DueDate (High to Low)"){
      return dscDueDateValues(a,b)
    }else{
      return ascDueDateValues(a,b)
    }
  }

  const handleChange = (value: string) => {
  const taskQueue = createPriorityQueue(
      
      (a:Task,b:Task)  =>getValue(a,b,value)
    )

    tasks.forEach((task) => taskQueue.enqueue(task));

    const sortedTasks: Task[] = [];
    while (!taskQueue.isEmpty()) {
      const task = taskQueue.dequeue();
      if (task) {
        sortedTasks.push(task);
      }
    }
    dispatch(filteredTask(sortedTasks))
  };

  return (
    <div className="flex justify-between items-center shadow-2xl p-4 rounded-lg bg-slate-400">
      <img
        className="w-20"
        src="https://cdn.dribbble.com/users/111709/screenshots/2032133/media/94bcf225589742d4ffed61a8295517ef.jpg?resize=400x300&vertical=center"
      />
      <span className="flex items-center gap-2 p-2 border border-black bg-white rounded-lg">
        <input
          placeholder="search by title"
          type="text"
          className="focus:outline-none"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IoSearchOutline
          onClick={handleSearch}
          className="text-3xl cursor-pointer"
        />
      </span>
      <select
        onChange={(e) => handleChange(e.target.value)}
        className="p-2 focus:outline-none rounded-md border border-black"
      >
        <option value="">Sort By:</option>
        {[
          "Priority (High to Low)",
          "Priority (Low to High)",
          "DueDate (High to Low)",
          "DueDate (Low to High)",
        ].map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>

      <Link to={"/create-task"}>
        <button className="bg-blue-500 px-4 py-3 text-white font-bold hover:bg-blue-700 transition duration-200 cursor-pointer rounded-lg">
          Create Task
        </button>
      </Link>
    </div>
  );
};

export default Header;
