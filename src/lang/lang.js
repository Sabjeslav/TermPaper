const language = localStorage.getItem('lang')

if (!language) localStorage.setItem('lang', 'en')

let lang = {}

if (language === 'en') {
  lang = {
    navBar: {
      settings: 'Settings',
      theme: 'Dark theme',
      lang: 'Select language',
      exit: 'Exit',
      menu: {
        title: 'Task',
        subTitle: 'menu'
      },
      activeTasks: 'Active tasks',
      archive: 'Archive'
    },
    archive: {
      emptyMsg: `You haven't done any tasks yet`,
      done: 'Tasks done: ',
      description: 'Description',
      doneDate: 'Done',
      delete: 'Delete'
    },
    activeTasks: {
      addTask: 'Add task',
      newTask: 'New Task',
      required: `*required fields`,
      close: 'Close',
      save: 'Save',
      delete: 'Delete',
      done: 'Done',
      edit: 'Edit',
      emptyMsg: `You don't have any active tasks!`,
      description: 'Description',
      subtasks: 'Subtasks',
      creationDate: 'Creation Date',
      successMsg: 'Task successfully added',
      label: 'What do u want to do?',
      searchLabel: 'Search by name',
      modalName: 'Name*',
    }
  }
} else if (language === 'ua') {
  lang = {
    navBar: {
      settings: 'Налаштування',
      theme: 'Темна тема',
      lang: 'Оберіть мову',
      exit: 'Вийти',
      menu: {
        title: 'Меню',
        subTitle: 'задач'
      },
      activeTasks: 'Активні задачі',
      archive: 'Архів'
    },
    archive: {
      emptyMsg: `Ви ще не виконали жодної задачі`,
      done: 'Виконано задач: ',
      description: 'Опис',
      doneDate: 'Виконано: ',
      delete: 'Видалити'
    },
    activeTasks: {
      addTask: 'Додати задачу',
      newTask: 'Нова задача',
      required: `*обов'язкові поля`,
      close: 'Закрити',
      save: 'Зберегти',
      delete: 'Видалити',
      done: 'Виконано',
      edit: 'Редагувати',
      emptyMsg: `У Вас немає активних задач!`,
      description: 'Опис',
      subtasks: 'Підзадачі',
      creationDate: 'Дата додавання',
      successMsg: 'Задача успішно додана',
      label: 'Над чим ви працюєте?',
      searchLabel: 'Пошук за назвою',
      modalName: 'Назва*',
    }
  }
}

export default lang
