import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  completeTask,
  initTasks,
  releaseTasks,
} from "../features/tasks/taskSlice";
import {
  sortByCreation,
  sortByEndDate,
  sortByStatus,
} from "../features/tasks/taskSelectors";
import {
  markCompletedTask,
  releaseTasksFromService,
  getAll,
} from "../app/services/tasks";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import TaskCard from "./TaskCard";
import { RxPlusCircled } from "react-icons/rx";
import { FaSortAmountDownAlt } from "react-icons/fa";

const TaskList = () => {
  const [sortedOption, setSortedOption] = useState("creation");
  const dispatch = useDispatch();
  const today = dayjs().format("D-M-YYYY");
  const tasks = useSelector((state) => state.tasks);

  const tasksSorted = useSelector(sortByCreation);

  const tasksSortedByEndDate = useSelector(sortByEndDate);

  const tasksSortedByStatus = useSelector(sortByStatus);

  const handleRelese = async () => {
    dispatch(releaseTasks());
    await releaseTasksFromService(tasks);
  };

  const handleChecked = async (e, id) => {
    if (e.target.checked) {
      dispatch(completeTask({ completed: true, id }));
      await markCompletedTask({ completed: true, id });
    } else {
      dispatch(completeTask({ completed: false, id }));
      await markCompletedTask({ completed: false, id });
    }
  };

  useEffect(() => {
    getAll().then((tasks) => {
      dispatch(initTasks(tasks));
    });
  }, [dispatch]);

  return (
    <div className="text-texto my-5">
      <header className="bg-secondary rounded-lg p-5 drop-shadow-md">
        <div className="flex justify-around">
          <h1 className="text-3xl text-center">App pendientes</h1>
          <h2 className="pt-2 text-lg">{today}</h2>
          <Link
            to="/create-task"
            className="p-2 flex justify-center items-center gap-2 bg-buttons rounded-lg hover:drop-shadow-lg text-blanco"
          >
            <RxPlusCircled /> <p>agregar</p>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-9 mt-4 ">
          <button
            className=" border border-buttons bg-buttons rounded-lg py-1 hover:drop-shadow-lg hover:border-dashed text-blanco"
            onClick={handleRelese}
          >
            librar completadas
          </button>

          <div
            className="inline-flex rounded-md shadow-sm bg-buttons text-sm"
            role="group"
          >
            <button
              className="flex border border-black text-blanco text-sm px-4 py-2 rounded-l-lg hover:drop-shadow-xl hover:border-dashed"
              onClick={() => setSortedOption("creation")}
            >
              <FaSortAmountDownAlt className="mt-1 mr-1" /> por fecha de
              creacion
            </button>

            <button
              className=" flex border-t border-b text-sm px-4 py-2 hover:drop-shadow-xl hover:border-dashed border-black text-blanco"
              onClick={() => setSortedOption("endDate")}
            >
              <FaSortAmountDownAlt className="mt-1 mr-1" /> por fecha de
              vencimiento
            </button>
            <button
              className=" flex border text-sm px-4 py-2 rounded-r-lg hover:drop-shadow-xl hover:border-dashed border-black text-blanco"
              onClick={() => setSortedOption("status")}
            >
              <FaSortAmountDownAlt className="mt-1 mr-1" /> por estado
            </button>
          </div>
        </div>
      </header>

      {sortedOption === "creation" ? (
        <div>
          {tasksSorted.map((task) => (
            <TaskCard task={task} handleChecked={handleChecked} key={task.id} />
          ))}
        </div>
      ) : sortedOption === "endDate" ? (
        <div>
          {tasksSortedByEndDate.map((task) => (
            <TaskCard task={task} handleChecked={handleChecked} key={task.id} />
          ))}
        </div>
      ) : sortedOption === "status" ? (
        <div>
          {tasksSortedByStatus.map((task) => (
            <TaskCard task={task} handleChecked={handleChecked} key={task.id} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TaskList;
