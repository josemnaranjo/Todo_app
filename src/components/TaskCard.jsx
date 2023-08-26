import dayjs from "dayjs";
import { Link } from "react-router-dom";
import {
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaRegEye,
  FaRegClock,
  FaRegEdit,
} from "react-icons/fa";

const TaskCard = ({ task, handleChecked }) => {
  const today = dayjs();
  return (
    <div className="mt-5 drop-shadow-sm hover:drop-shadow-md">
      <div className="bg-secondary rounded-md py-3 px-4" key={task.id}>
        <div className="flex justify-around">
          <h2 className="text-xl">{task.description}</h2>
          <p className="text-lg border px-1 rounded-lg bg-destacar/20   ">
            Fecha de vencimiento: {dayjs(task.endDate).format("D-M-YYYY")}
          </p>
        </div>

        <div className="mt-2 flex justify-around">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="completed"
              onChange={(e) => handleChecked(e, task.id)}
            />
            <label htmlFor="completed">marcar completado</label>
          </div>

          <div>
            {task.status === 99 ? (
              <div className="flex items-center gap-2 bg-released px-2 rounded-md text-blanco">
                {" "}
                <FaRegCheckCircle /> <p>Liberada</p>
              </div>
            ) : dayjs(task.endDate).diff(today, "d") <= 0 ? (
              <div className="flex items-center gap-2 bg-alert px-2 rounded-md text-blanco">
                {" "}
                <FaRegTimesCircle /> <p>Vencida</p>
              </div>
            ) : dayjs(task.endDate).diff(today, "d") > 0 &&
              dayjs(task.endDate).diff(today, "d") < 10 ? (
              <div className="flex items-center gap-2 bg-amarillo px-2 rounded-md">
                <FaRegEye />
                <p>Por vencer</p>
              </div>
            ) : dayjs(task.endDate).diff(today, "d") >= 10 ? (
              <div className="flex items-center gap-2 bg-ontime px-2 rounded-md">
                <FaRegClock />
                <p>A tiempo</p>
              </div>
            ) : null}
          </div>
          <Link
            to={`/edit-task/${task.id}`}
            className="py-1 px-2 flex justify-center items-center gap-2 bg-buttons rounded-lg hover:drop-shadow-lg text-blanco"
          >
            {" "}
            <FaRegEdit /> <p>editar</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
