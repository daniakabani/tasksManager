const TasksService = require("daniakabani/services/tasks"),
  UsersService = require("daniakabani/services/users"),
  faker = require("faker"),
  SubTasksService = require("daniakabani/services/subTasks");

exports.seed = async () => {
  const user = await UsersService.create({
    username: "dani",
    role_id: 1,
    password: "task1234",
  });
  await UsersService.create({
    username: "readOnly",
    role_id: 2,
    password: "read1234",
  });
  for (let start = 1; start <= 30; start++) {
    let parentTask = await TasksService.createTask({
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      assigned_user: user.id,
    });
    for (let index = 1; index <= 5; index++) {
      await SubTasksService.createSubTask({
        title: faker.company.companyName(),
        description: faker.lorem.sentence(),
        assigned_user: user.id,
        parent_task: parentTask.id,
      });
    }
  }
};
