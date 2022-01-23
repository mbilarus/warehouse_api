# Сервер для складского приложения

## Запросы

### Позиции

#### Получить все позиции

"""
query {
    findAllItems(<параметр1>: <значение>, <параметр2>: <значение> ...) {
        <поле1>
        <поле2>
        ...
    }
}
"""

Возможные параметры поиска:
1. title - строка.
2. count - целое число.
3. SKU - строка.

Возможные поля:
1. id - вернется строка.
2. title - вернется строка.
3. count - вернется целое число.
4. SKU - вернется строка.

"""
query {
    findAllItems(title:"Item title", count: 1, SKU: "0000000") {
        id
        title
        count
        SKU
    }
}
"""

#### Получить одну позицию по идентификатору

"""
query {
    findItemById(<параметр1>: <значение>, <параметр2>: <значение> ...) {
        <поле1>
        <поле2>
        ...
    }
}
"""

Возможные параметры поиска:
1. id - 24-символьная строка.

Возможные поля:
1. id - вернется строка.
2. title - вернется строка.
3. count - вернется целое число.
4. SKU - вернется строка.

Пример:

"""
query {
    findItemById(id:"61e4977dedba6728097c38bf") {
        id
        title
        count
        SKU
    }
}
"""

#### Создать позицию

"""
mutation {
    createItem(<параметр1>: <значение>, <параметр2>: <значение> ...) {
        <поле1>
        <поле2>
        ...
    }
}
"""

Возможные параметры для создания позиции:
1. title - строка.
2. count - целое число.
3. SKU - строка.
> уникальный 24-символьный идентификатор генерируется автоматически mongodb.

Возможные поля:
1. id - вернется строка.
2. title - вернется строка.
3. count - вернется целое число.
4. SKU - вернется строка.

Пример:

"""
mutation {
    createItem(title:"Item title", count: 1, SKU: "0000000") {
        id
        title
        count
        SKU
    }
}
"""

