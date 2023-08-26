import axios from "axios";

const baseUrl = "http://localhost:3000/tasks";

export const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const createTask = async (content) => {
  const task = content;
  const res = await axios.post(baseUrl, task);
  return res.data;
};

export const updateTask = async (content) => {
  const task = content;
  const res = await axios.put(baseUrl + `/${task.id}`, task);
  return res.data;
};

export const markCompletedTask = async (content) => {
  const task = content;
  const res = await axios.patch(baseUrl + `/${task.id}`, task);
  return res.data;
};

// export const deleteTasksFromService = async (content) => {
//   const tasksToDelete = content.filter((task) => task.completed === true);
//   const idTasksToDelete = tasksToDelete.map((task) => task.id);
//   for (let i = 0; i < idTasksToDelete.length; i++) {
//     const taskId = idTasksToDelete[i];
//     await axios.delete(baseUrl + `/${taskId}`);
//   }
// };

export const releaseTasksFromService = async (content) => {
  const tasksToRelese = content.filter((task) => task.completed === true);
  const idTasksToUpdate = tasksToRelese.map((task) => task.id);
  for (let i = 0; i < idTasksToUpdate.length; i++) {
    const taskId = idTasksToUpdate[i];
    await axios.patch(baseUrl + `/${taskId}`, { status: 99 });
  }
};
