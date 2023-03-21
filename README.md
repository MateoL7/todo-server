## Entrega ToDO Server Better Sqlite3

**Autor:** Mateo Loaiza

## Obtener todos los _todo_

```
GET http://localhost:3000/todos/
```

## Añadir un _todo_

```
POST http://localhost:3000/todos/
{
  text: "nuevo todo"
}
```

## Modificar el estado de un todo

```
PUT http://localhost:3000/todos/:ID
{
  done: true
}
```

## Borrado de un id

```
DELETE http://localhost:3000/todos/:ID
```
