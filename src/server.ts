import { Model, createServer } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      todos: Model,
    },

    routes() {
      this.get("/api/todos", (schema) => {
        // @ts-ignore
        return schema.todos.all();
      })

      this.post("/api/todos", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        attrs.done = false;
        // @ts-ignore
        return schema.todos.create(attrs);
      })

      this.post('/api/todos/check', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        // @ts-ignore
        let todo = schema.todos.find(attrs.id);
        return todo.update({ done: true });
      })

      this.post('/api/todos/uncheck', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        // @ts-ignore
        let todo = schema.todos.find(attrs.id);
        return todo.update({ done: false });
      })

      this.post('/api/todos/delete', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        // @ts-ignore
        let todo = schema.todos.find(attrs.id);
        return todo.destroy();
      })
    },
  })

  return server
}