# auth-simple
### *Простой пример аутентификации/регистрации с помощью bcrypt/jwt на MongoDB/JS*
Содержание:
- [Цель проекта](https://github.com/l1msn/auth-simple/new/master?readme=1#%D1%86%D0%B5%D0%BB%D1%8C-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0)
- [Инструменты разработки](https://github.com/l1msn/auth-simple/new/master?readme=1#%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8)
  - [Стек](https://github.com/l1msn/auth-simple/new/master?readme=1#%D1%81%D1%82%D0%B5%D0%BA)
  - [Основные зависимости](https://github.com/l1msn/auth-simple/new/master?readme=1#%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B8)
- [Старт работы](https://github.com/l1msn/auth-simple/new/master?readme=1#c%D1%82%D0%B0%D1%80%D1%82-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B)
  - [C docker в контейнере](https://github.com/l1msn/auth-simple/new/master?readme=1#c-docker-%D0%B2-%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%B9%D0%BD%D0%B5%D1%80%D0%B5)
  - [Без docker на локальной машине](https://github.com/l1msn/auth-simple/new/master?readme=1#%D0%B1%D0%B5%D0%B7-docker-%D0%BD%D0%B0-%D0%BB%D0%BE%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D0%BC%D0%B0%D1%88%D0%B8%D0%BD%D0%B5)
- [Пример работы](https://github.com/l1msn/auth-simple/new/master?readme=1#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B)
 # Цель проекта
> ***Реализовать*** web-приложения для аунтетификации и регистрации пользователей с определенными правами(Admin или User).
 
> ***Аунтификация***  основывается на **jwt/bcrypt**.
> При успешной аунтетификации будет генерироваться **jwt token** для пользователя.
> В нем так же будет находиться информация о роли пользователя и следственно он будет наделен определенными правами.
 
> Данные пользователей ***хранятся в базе данные*** **MongoDB**.
> Пароли пользователей будут шифроваться и в базе данных они не будут находиться в явном виде.
 
> Так как это простой пример для **backend**, то будем использовать обычные **request** запросы через **Postman**.
> Но для получения выполнения специальных функций для Admin будем добавлять в **header** запроса 
```
Authoriaztion: "Bearer <ваш jwt token>"
```
> Если пользователь имеет права доступа Admin, то ему будут доступны некоторые дополнительные возможности - получение всех пользователей.

# Инструменты разработки
> ### Стек:
> - [Node.js](https://nodejs.org/en/)
> - [Express](http://expressjs.com)
> - [MongoDB](https://www.mongodb.com)
> - [Bootstrap](https://getbootstrap.com)
> - [Postman](https://www.postman.com)
> - [Docker](https://www.docker.com) (если Вы планируете поднимать в контейнере)
 
> ### Основные зависимости:
> - [mongoose](https://mongoosejs.com)
> - [bcrypt](https://www.npmjs.com/package/bcrypt)
> - [jwt](https://www.npmjs.com/package/jsonwebtoken)
> - ...
> - Более подробно Вы можете посмотреть в файле - [package.json](https://github.com/l1msn/auth-simple/blob/master/package.json)

# Cтарт работы
> ## **C docker в контейнере**
>
> > 1. Клонируете репозитрий с помощью командной строки или же средствами IDE
>```git
> git clone https://github.com/l1msn/auth-simple
>```
>
> > 2. Перейдите в файл [.env](https://github.com/l1msn/auth-simple/blob/master/.env) если Вам это необходимо
> >
> > Вы также можете изменить в это конфигурационном файле все, что Вам нужно для Вашей спецификации
>
> > 3. Создайте образ и запустите контейнер
> > 
> > Учтите, что у Вас должен быть запущен Docker и MongoDB
> ```js
> docker-compose up --build
> ```
> 
> > 4. В логах\консоле появяться ссылки или можете вбить их вручную
>
> > 5. Для остановки нажмите Ctrl+C и подождите

> ## **Без docker на локальной машине**
>
> Учтите, что у Вас на рабочей машине должны быть предустановлен весь необходимый стек:
> > 1. Клонируете репозитрий с помощью командной строки или же средствами IDE
>```git
> git clone https://github.com/l1msn/auth-simple
>```
>
> > 2. Перейдите в директорию проекта и проинициализируйте зависимости
>```js
> npm install
>```
> > 3. Перейдите в файл [.env](https://github.com/l1msn/auth-simple/blob/master/.env) и измените значение MONGO_HOST на 127.0.0.1
> >
> > Вы также можете изменить в это конфигурационном файле все, что Вам нужно для Вашей спецификации
>
> > 4. Запустите проект
> ```js
> node server.js
> ```
> > 5. В логах\консоле появяться ссылки или можете вбить их вручную
>
> > 6. Для остановки нажмите Ctrl+C и подождите

# Пример работы 
> 0. Исходный URL: http://localhost:<Ваш порт>
 
> 1. Пользователь переходит по адресу /auth/registration и регистрируется
>
> ![image](https://user-images.githubusercontent.com/64272568/171844057-4c7d0aeb-fb01-474a-88e0-b9f95fdb9302.png)
 
> 2. Пользователь переходит по адресу /auth/login и авторизуется
>
> ![image](https://user-images.githubusercontent.com/64272568/171845207-ca901ab8-c684-4a0a-a8ff-0c7e343025f7.png)
 
> 3. Так как наш пользователь бы зарегистрирован с ролью Admin в header запроса мы должны добавить 
```
Authoriaztion: "Bearer <ваш jwt token>"
```
> 4. И отправляем запрос на /auth/users, получаем всех пользователей
>
> ![image](https://user-images.githubusercontent.com/64272568/171846260-d586609a-2e41-4cdc-9b13-fa75396790f1.png)

### License

[BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause)

Copyright (c) 2020-present, l1msn - Sadykov Alexander
