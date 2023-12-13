# Instrucciones de Uso de la API #

1. Clonar repo
2. npm install
3. npm start

Asegúrate de tener el archivo .env en la carpeta y el servidor en ejecución en http://localhost:3000 antes de probar las siguientes rutas. Puedes usar herramientas como Thunder Client, Postman o cURL para interactuar con la API.
Nombre de la base de datos en postgres = usertest

Ejemplo del archivo .env:
```
DB_USER = " "
DB_PASSWORD = " "
DB_HOST = localhost
PORT = 3000
```

Tech Stack:
* Express
* Postgresql
* Sequelize
* Nodemon
* JsonWebToken < para el manejo de inicio de sesion
* BCrypt < para hashear contraseñas
* Joi < para validar el input del la base de datos

## Rutas del Modelo User ##

### 1. Crear un Usuario ###
Ruta: POST http://localhost:3000/user
Descripción: Crea un nuevo usuario en la base de datos.
Cuerpo (JSON):
```
{
  "username": "nombre_usuario",
  "email": "correo@dominio.com",
  "password": "contraseña_segura",
  "type": "Parents",
  "nombre": "Nombre",
  "apellidoPaterno": "ApellidoPaterno",
  "apellidoMaterno": "ApellidoMaterno",
  "complete": false,
  "validate": false,
  "state": true
}
```

#### Respuesta Esperada (Ejemplo): ####
```
{
  "id": "12345-abcde-67890-fghij",
  "username": "nombre_usuario",
  "email": "correo@dominio.com",
  "type": "Parents",
  "nombre": "Nombre",
  "apellidoPaterno": "ApellidoPaterno",
  "apellidoMaterno": "ApellidoMaterno",
  "complete": false,
  "validate": false,
  "state": true
}
```


### 2. Obtener Todos los Usuarios ###
Ruta: GET http://localhost:3000/user
Descripción: Obtiene todos los usuarios activos en la base de datos.
Respuesta Esperada (Ejemplo):
```
[
  {
    "id": "12345-abcde-67890-fghij",
    "username": "nombre_usuario",
    "email": "correo@dominio.com",
    "type": "Parents",
    "nombre": "Nombre",
    "apellidoPaterno": "ApellidoPaterno",
    "apellidoMaterno": "ApellidoMaterno",
    "complete": false,
    "validate": false,
    "state": true
  },
  // Otros usuarios...
]
```

### 3. Obtener Usuario por ID ###
Ruta: GET http://localhost:3000/user/:id
Descripción: Obtiene los detalles de un usuario específico por su ID.
Respuesta Esperada (Ejemplo):
```
{
  "id": "12345-abcde-67890-fghij",
  "username": "nombre_usuario",
  "email": "correo@dominio.com",
  "type": "Parents",
  "nombre": "Nombre",
  "apellidoPaterno": "ApellidoPaterno",
  "apellidoMaterno": "ApellidoMaterno",
  "complete": false,
  "validate": false,
  "state": true
}
```

### 4. Actualizar Usuario por ID ###
Ruta: PUT http://localhost:3000/user/:id
Descripción: Actualiza los detalles de un usuario específico por su ID.
Cuerpo (JSON): (Enviar solo los campos que deseas actualizar)
```
{
  "type": "Admin",
  "complete": true
}
```

#### Respuesta Esperada (Ejemplo): ####
```
{
  "id": "12345-abcde-67890-fghij",
  "username": "nombre_usuario",
  "email": "correo@dominio.com",
  "type": "Admin",
  "nombre": "Nombre",
  "apellidoPaterno": "ApellidoPaterno",
  "apellidoMaterno": "ApellidoMaterno",
  "complete": true,
  "validate": false,
  "state": true
}
```


### 5. Eliminar Usuario por ID (Eliminación Lógica) ###
Ruta: PUT http://localhost:3000/user/:id
Descripción: Realiza una eliminación lógica (inactiva) de un usuario por su ID.
Respuesta Esperada:

```
{
  "message": "Usuario eliminado exitosamente"
}
```
## Rutas del Modelo Estudiante ##

### 1. Crear un Estudiante ###
Ruta: POST http://localhost:3000/estudiantes
Descripción: Crea un nuevo estudiante en la base de datos.
Cuerpo (JSON):
```
{
  "idDocumento": 110112,
  "nombres": "andres j",
  "apellidoPat": "caicedo",
  "apellidoMat": "cabrera",
  "Nacionalidad": "colombiano",
  "fechNac": "1990-05-15",
  "sexo": "masculino",
  "peso": 75,
  "estatura": 175,
  "alergias": "no",
  "grupoSanguineo": "b positivo",
  "contactoEmerg": 6243427,
  "fotoPerfil": "url",
  "fotoDocumento": "url",
  "state": true
}
```

#### Respuesta Esperada (Ejemplo): ####
```
{
  "id": "5c4154ef-2f1a-4946-bbef-fdb23c9f5ece",
  "idDocumento": 110112,
  "nombres": "andres j",
  "apellidoPat": "caicedo",
  "apellidoMat": "cabrera",
  "Nacionalidad": "colombiano",
  "fechNac": "1990-05-15T00:00:00.000Z",
  "sexo": "masculino",
  "peso": 75,
  "estatura": 175,
  "alergias": "no",
  "grupoSanguineo": "b positivo",
  "contactoEmerg": 6243427,
  "fotoPerfil": "url",
  "fotoDocumento": "url",
  "state": true
}
```


### 2. Obtener Todos los Estudiantes ###
Ruta: GET http://localhost:3000/estudiantes
Descripción: Obtiene todos los estudaintes activos en la base de datos.
Respuesta Esperada (Ejemplo):
```
[
  {
  "id": "5c4154ef-2f1a-4946-bbef-fdb23c9f5ece",
  "idDocumento": 110112,
  "nombres": "andres j",
  "apellidoPat": "caicedo",
  "apellidoMat": "cabrera",
  "Nacionalidad": "colombiano",
  "fechNac": "1990-05-15T00:00:00.000Z",
  "sexo": "masculino",
  "peso": 75,
  "estatura": 175,
  "alergias": "no",
  "grupoSanguineo": "b positivo",
  "contactoEmerg": 6243427,
  "fotoPerfil": "url",
  "fotoDocumento": "url",
  "state": true
},
  // Otros usuarios...
]
```

### 3. Obtener Estudiante por ID ###
Ruta: GET http://localhost:3000/estudiantes/:id
Descripción: Obtiene los detalles de un estudiante específico por su ID.
Respuesta Esperada (Ejemplo):
```
{
  "id": "5c4154ef-2f1a-4946-bbef-fdb23c9f5ece",
  "idDocumento": 110112,
  "nombres": "andres j",
  "apellidoPat": "caicedo",
  "apellidoMat": "cabrera",
  "Nacionalidad": "colombiano",
  "fechNac": "1990-05-15T00:00:00.000Z",
  "sexo": "masculino",
  "peso": 75,
  "estatura": 175,
  "alergias": "no",
  "grupoSanguineo": "b positivo",
  "contactoEmerg": 6243427,
  "fotoPerfil": "url",
  "fotoDocumento": "url",
  "state": true
}
```

### 4. Actualizar Estudiante por ID ###
Ruta: PUT http://localhost:3000/estudiantes/:id
Descripción: Actualiza los detalles de un estudiante específico por su ID.
Cuerpo (JSON): (Enviar solo los campos que deseas actualizar)
```
{
   "nombres": "andres jose",
}
```

#### Respuesta Esperada (Ejemplo): ####
```
{
  "id": "5c4154ef-2f1a-4946-bbef-fdb23c9f5ece",
  "idDocumento": 110112,
  "nombres": "andres jose",
  "apellidoPat": "caicedo",
  "apellidoMat": "cabrera",
  "Nacionalidad": "colombiano",
  "fechNac": "1990-05-15T00:00:00.000Z",
  "sexo": "masculino",
  "peso": 75,
  "estatura": 175,
  "alergias": "no",
  "grupoSanguineo": "b positivo",
  "contactoEmerg": 6243427,
  "fotoPerfil": "url",
  "fotoDocumento": "url",
  "state": true
}
```


### 5. Eliminar Estudiante por ID (Eliminación Lógica) ###
Ruta: DELETE http://localhost:3000/estudiantes/:id
Descripción: Realiza una eliminación lógica (inactiva) de un estudiante por su ID.
Respuesta Esperada:

```
{
  "message": "Estudiante eliminado exitosamente"
}
```

