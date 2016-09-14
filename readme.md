
# API :sunglasses:
Type: JSON
***
##获取所有 Orders

###GET 请求 /api/orders
响应示例（列表）：
```javascript
[
    {
        id: 1,
        name: 'haha',
        drink: 'Coffie'
    },
    {
        id: 2,
        name: 'zhou',
        drink: 'Coffie'
    }
]
```

***
##添加一个 Order

###POST 请求 /api/orders
Post 示例：
```javascript
{
    name: 'James',
    drink: 'Coffie'
}
```
响应示例：
```javascript
{
    id: 3,
    name: 'James',
    drink: 'Coffie',
}
```

***
##更新一个 Order
###PUT 请求 /api/orders/<id>
PUT示例：
```javascript
{
    id: 1,
    name: 'James',
    drink: 'Coffie',
}
```
***
##删除一个 Order
###DELETE 请求 /api/orders/<id>
