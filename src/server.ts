import { createServer } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.get("/api/todos", () => ({
        todos: [
            {
                id: '1',
                title: 'Проверить задачи в джире',
                priority: 0,
                category: 'работа',
                done: false,
            },
            {
                id: '2',
                title: 'Написать Васе че там с API',
                priority: 1,
                category: 'работа',
                done: false,
            },
            {
                id: '3',
                title: 'Собрать шкаф',
                priority: 2,
                category: 'дом',
                done: false,
            }
        ]
      }))

      let newId = 4
      this.post("/api/reminders", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        attrs.id = `${newId++}`
        return { todos: attrs, message: 'Задача добавлена' }
      })
    },
  })

  return server
}