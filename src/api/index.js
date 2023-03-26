export const API = {
  async getUser(userName, phone) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await response.json()

      return users.find(
      (user) => user.name === userName && user.phone === phone
    )
    } catch (error) {
      console.error(error)
    }
  },

  async getTodos() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const todos = await response.json()

      return todos
    } catch (error) {
      console.error(error)
    }
  },

  async addTodo(userId, title) {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          body: JSON.stringify({
            title,
            userId: +userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      const todo = await response.json()
      
      return todo
    } catch (error) {
      console.error(error)
    }
  }
}