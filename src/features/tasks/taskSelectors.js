import { createSelector } from "@reduxjs/toolkit";

const selectItems = (state) => state.tasks;

const sortByCreation = createSelector(selectItems, (tasks) =>
  [...tasks].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
);

const sortByEndDate = createSelector(selectItems, (tasks) =>
  [...tasks].sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
);

const sortByStatus = createSelector(selectItems, (tasks) => {
  const releasedTasksArray = [...tasks].filter((task) => task.status === 99);
  const arrayToSortByDate = [...tasks].filter((task) => task.status !== 99);
  const arraySortedById = arrayToSortByDate.sort(
    (a, b) => new Date(a.endDate) - new Date(b.endDate)
  );
  return [ ...arraySortedById, ...releasedTasksArray];
});

export { sortByCreation, sortByEndDate, sortByStatus };
