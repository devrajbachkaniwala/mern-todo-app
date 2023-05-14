const todoApiUrl = 'http://localhost:3000';
class TodoService {
  static async getTodos() {
    const res = await fetch(`${todoApiUrl}/todos`);
    const data = await res.json();
    const todos = data.map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      isCompleted: item.isCompleted
    }));
    return todos;
  }

  static async getTodoById(todoId) {
    const res = await fetch(`${todoApiUrl}/todos/${todoId}`);
    const data = await res.json();
    const todo = {
      id: data?._id,
      title: data?.title,
      description: data?.description,
      isCompleted: data?.isCompleted
    };
    return todo;
  }

  static async addTodo(todo) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    };

    const res = await fetch(`${todoApiUrl}/todos`, options);
    const data = await res.json();
    return data;
  }

  static async updateTodoById(todoId, todo) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    };

    const res = await fetch(`${todoApiUrl}/todos/${todoId}`, options);
    if (res.status === 204) {
      return true;
    }
    return false;
  }

  static async deleteTodoById(todoId) {
    const options = {
      method: 'DELETE'
    };

    const res = await fetch(`${todoApiUrl}/todos/${todoId}`, options);
    if (res.status === 204) {
      return true;
    }
    return false;
  }
}

export { TodoService };
