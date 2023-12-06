import { defineStore } from "pinia";

export const useBoardsStore = defineStore({
  id: "boards",
  state: () => ({
    boards: [],
    selectedBoard: 0,
    selectedColumn: 0,
    selectedCardTask: 0,
    draggedTask: 0,
    searchTerm: "",
    draggedCardTask: {},
  }),
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getColumns: (state) => state.boards[state.selectedBoard]?.columns,
    getCurrentBoard: (state) => state.boards[state.selectedBoard],
    getCurrentColumn: (state) =>
      state.boards[state.selectedBoard]?.columns[state.selectedColumn],
    getCardTask: (state) =>
      state.boards[state.selectedBoard]?.columns[state.selectedColumn]?.tasks[
        state.selectedCardTask
      ],
    getColumnsNames: (state) =>
      state.boards[state.selectedBoard]?.columns.map((c) => c.name),
    filteredTasks: (state) => (tasks) => {
      const result = tasks.filter((task) =>
        task.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
      return result;
    },
    getDroppedTaskCard: (state) => state.draggedCardTask,
  },
  actions: {
    changeTaskColumn(index) {
      if (!(index === this.selectedColumn)) {
        this.getCurrentBoard?.columns[index]?.tasks.push(this.getCardTask);
        this.getCurrentColumn?.tasks.splice(this.selectedCardTask, 1);
        this.selectedColumn = index;
        this.selectedCardTask = this.getCurrentColumn?.tasks.length - 1;
      }
    },
    setSearchTerm(term) {
      this.searchTerm = term;
    },
    setDraggedCardTask(taskData) {
      this.draggedCardTask = taskData;
    },
    drop(newColumnIndex) {
      if (
        this.draggedCardTask &&
        newColumnIndex !== this.draggedCardTask.columnIndex
      ) {
        const { task, columnIndex, taskIndex } = this.draggedCardTask;
        // Mover la tarea a la nueva columna
        this.getCurrentBoard.columns[newColumnIndex]?.tasks.push(task);
        // Eliminar la tarea de la columna original
        this.getCurrentBoard.columns[columnIndex]?.tasks.splice(taskIndex, 1);
      }
    },
  },
});
