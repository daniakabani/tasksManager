const TasksService = require("daniakabani/services/tasks"),
  UsersService = require("daniakabani/services/users"),
  SubTasksService = require("daniakabani/services/subTasks");

exports.seed = async () => {
  const user = await UsersService.create({
    username: "dani",
    role_id: 1,
    password: "task1234",
  });
  for (let start = 1; start <= 30; start++) {
    let parentTask = await TasksService.createTask({
      title: `Parent task No ${start}`,
      description: `Here is the description for task No ${start}`,
      assigned_user: user.id,
    });
    for (let index = 1; index <= 5; index++) {
      await SubTasksService.createSubTask({
        title: `SubTask No ${start}`,
        description: `Here is the description for sub-task No ${start}`,
        assigned_user: user.id,
        parent_task: parentTask.id
      })
    }
  }
};
