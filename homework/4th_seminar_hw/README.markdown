## 4차 세미나 과제 Level 1

### User Table
|컬럼|Type|
|:---:|:---:|
|id|INTEGER|
|name|VARCHAR(30)|
|email|VARCHAR(50)|
|password|VARCHAR(100)|
|salt|VARCHAR(100)|

- PK : id
- FK : 없음

### Post Table
|컬럼|Type|
|:---:|:---:|
|id|INTEGER|
|author|INTEGER|
|title|VARCHAR(50)|
|contents|TEXT|
|createdAt|VARCHAR(30)|
|updatedAt|VARCHAR(30)|

- PK : id
- FK : author (User Table의 id)

### Like Table
|컬럼|Type|
|:---:|:---:|
|id|INTEGER|
|userId|INTEGER|
|postId|INTEGER|

- PK : id
- FK : userId (User Table의 id), postId (Post Table의 id)