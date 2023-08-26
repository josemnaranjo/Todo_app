import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { createTask, updateTask } from "../app/services/tasks.js";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const TaskForm = () => {
  const [task, setTask] = useState({
    description: "",
    creationDate: "",
    endDate: "",
    status: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      const updatedTask = await updateTask(task);
      dispatch(editTask(updatedTask));
    } else {
      const newTask = await createTask({
        ...task,
        creationDate: dayjs().format("YYYY-M-D"),
      });
      dispatch(addTask({ ...newTask }));
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, []);

  return (
    <div className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-secondary border-solid rounded-lg p-6 drop-shadow-xl hover:drop-shadow-2xl"
      >
        <h1 className="text-2xl text-center text-texto">
          {" "}
          ingresa una nueva tarea
        </h1>
        <div className="mt-5 grid grid-cols-3 gap-5">
          <input
            name="description"
            placeholder="sacar la basura..."
            cols="30"
            rows="10"
            value={task.description}
            onChange={handleChange}
            className="rounded-lg text-center"
          />
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            value={task.endDate}
            className="rounded-lg text-center"
          />
          <button className="bg-buttons rounded-lg text-blanco">guardar</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
