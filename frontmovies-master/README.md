# Frontend RENTALMOVIES

[Heroku Deploy](https://frontrentalmovies.herokuapp.com/)

This is the **Frontendmovies**. An application that performs actions such as:

- Register User
- Login User
- Home View for Users
- Admin View for Administrator
- Films for rent. 

 **Technologies Used** 
 - MySQL
 - Express
 - Express-Favico
 - Heroku
 - Heroku-Cli
 - ReactJS 
 - Redux 
 - Router DOM 
 - Sass 
 - Antdesign
 - Axios


## Create files and folders

 Getting Started with  **Create React App** and install dependencies:

  >npm i -y 

After...

 >npm start

## Created By;

- Jhon Jairo Linares [GitHub](https://github.com/jhonjlinaresb)
- Gor Vardayan [GitHub](https://github.com/Gor-vardanyan)
- Ignacio Merello [GitHub](https://github.com/ignaciomerello)

## Diagram

This is the diagram as it works at the User level:

[Mermaid](https://mermaidjs.github.io/)
``mermaid
graph LR
A{Register} -- Login --> B((Movies))
B --> C(Return)
B --> D(Rent)
D --> C
C --> B
``
![Diagram](https://i.ibb.co/CK6qpPK/image.png)

## For Register

#### For register you need:
- Name (String).
- Email (Example: user@mail.com).
- Password (Example: 1234!Qwer) - (From 8 to 10 characters | symbol: *?! | One capital letter).

![Register](https://i.ibb.co/mHVk4x5/image.png)

## For Login

#### For login you need:
- Email (Example: user@mail.com).
- Password (Example: 1234!Qwer).

![Login](https://i.ibb.co/3vpdWf6/image.png)

## For View Movies and Rent

##### For view movies and rent you move the scroll &:
- Click on Movie of rent.
- Click on button to rent.
- Go to user profile view.

[![Rent](https://i.gyazo.com/4ba0cdac726f5d6eb5cad01508cbd9dd.gif)](https://gyazo.com/4ba0cdac726f5d6eb5cad01508cbd9dd)

Finish!