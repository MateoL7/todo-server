## Entrega ToDO Server With Users And Tags

**Autor:** Mateo Loaiza

## Obtener todos los _todo_ de un _user_

```
GET http://localhost:3000/users/id/todos
```

## Añadir un _todo_

```
POST http://localhost:3000/todos/
{
  text: "nuevo todo"
}
```

## Modificar TODA la información de un _todo_, y a su vez, AÑADIR o QUITAR sus _tags_

```
PUT http://localhost:3000/todos/:ID
{
    "user_id": 1,
        "title": "Todo 1 nuevo",
        "description": "Todo 1 description",
        "done": false,
        "tags": [
            {"id": 1},
            {"id":3}
        ]
}
```

## Borrado de un _todo_

```
DELETE http://localhost:3000/todos/:ID
```

## Obtener los _users_

```
GET http://localhost:3000/users/
```

## Agregar un _user_

```
POST http://localhost:3000/users/
{
    "username": "Mateo",
    "password":"123",
    "name": "Teo",
    "email": "gmail.com"
}
```

## Modificar la información de un _user_

```
PUT http://localhost:3000/users/:ID
{
    "username": "Mateo nuevo",
    "password":"123",
    "name": "Teo",
    "email": "gmail.com"
}
```
