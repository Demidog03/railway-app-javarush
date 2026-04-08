# Todo API (Express + MongoDB)

API для `todos` со структурой:

```js
{ id: "uuid", text: "Todo text", status: "in-progress" | "completed" }
```

## Установка

1) Создай `.env` по примеру:

- Скопируй `.env.example` → `.env`
- Укажи `MONGODB_URI`

2) Установи зависимости:

```bash
npm i
```

3) Запусти:

```bash
npm run dev
```

## Endpoints

База URL: `/api`

- `GET /api/health` → `{ ok: true }`
- `GET /api/todos` → список todos
- `GET /api/todos/:id` → один todo
- `POST /api/todos` → создать todo (авто-`id`)
  - body: `{ "text": "Buy milk", "status": "in-progress" }` (`status` опционально)
- `PUT /api/todos/:id` → заменить todo
  - body: `{ "text": "...", "status": "completed" }`
- `PATCH /api/todos/:id` → частично обновить
  - body: `{ "text": "..." }` или `{ "status": "completed" }` или оба поля
- `DELETE /api/todos/:id` → удалить (204)

## Notes

- `id` — UUID (генерируется автоматически).
- `GET /api/todos` сортирует по `createdAt` (сначала новые).

