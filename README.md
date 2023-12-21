# Instrucciones de Uso de la API

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

- Express
- Postgresql
- Sequelize
- Nodemon
- JsonWebToken < para el manejo de inicio de sesion
- BCrypt < para hashear contraseñas
- Joi < para validar el input del la base de datos

## Rutas del Modelo User

### 1. Crear un Usuario

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

#### Respuesta Esperada (Ejemplo):

```
{
  "id": "12345-abcde-67890-fghij",
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

### 2. Obtener Todos los Usuarios

Ruta: GET http://localhost:3000/user
Descripción: Obtiene todos los usuarios activos en la base de datos.
Respuesta Esperada (Ejemplo):

```
[
  {
    "id": "12345-abcde-67890-fghij",
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

### 3. Obtener Usuario por ID

Ruta: GET http://localhost:3000/user/:id
Descripción: Obtiene los detalles de un usuario específico por su ID.
Respuesta Esperada (Ejemplo):

```
{
  "id": "12345-abcde-67890-fghij",
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

### 4. Actualizar Usuario por ID

Ruta: PUT http://localhost:3000/user/:id
Descripción: Actualiza los detalles de un usuario específico por su ID.
Cuerpo (JSON): (Enviar solo los campos que deseas actualizar)

```
{
  "type": "Admin",
  "complete": true
}
```

#### Respuesta Esperada (Ejemplo):

```
{
  "id": "12345-abcde-67890-fghij",
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

### 5. Eliminar Usuario por ID (Eliminación Lógica)

Ruta: PUT http://localhost:3000/user/:id
Descripción: Realiza una eliminación lógica (inactiva) de un usuario por su ID.
Respuesta Esperada:

```
{
  "message": "Usuario eliminado exitosamente"
}
```

## Rutas del Modelo Parents

### 1. Crear un Padre

POST a: http://localhost:3001/parents

Por body:

```
{
    "idDoc":"12345678-1",
    "name":"name-1",
    "lastName":"lastname-1",
    "educationLevel":"high school-1",
    "profession":"worker-1",
    "address":"house addres 123-1",
    "jobAddress":"job address 123-1",
    "telephone":"123456789-1",
    "jobTelephone":"987654321-1",
    "contactCellphone":"911-1",
    "email":"test-1@gmail.com",
    "tutor":"false",
    "userId":"12345-abcde-67890-fghij" // <<-- id de User a relacionar
}
```

(ejemplo 2)

```
{
    "idDoc":"12345678-2",
    "name":"name 2",
    "lastName":"lastname 2",
    "educationLevel":"high school 2",
    "profession":"worker 2",
    "address":"house addres 123-2",
    "jobAddress":"jobaddress 123-2",
    "telephone":"123456788-2",
    "jobTelephone":"987654321-2",
    "contactCellphone":"911-2",
    "email":"test-2@gmail.com",
    "tutor":"true"
    "userId":"12345-abcde-67890-fghij" // <<-- id de User a relacionar
}
```

#### Respuesta Esperada ✅

```
{
  "id": "47496be7-8eb3-4e12-b39a-32a646740a23",
  "state": true,
  "idDoc":"12345678-1",
  "name":"name-1",
  "lastName":"lastname-1",
  "educationLevel":"high school-1",
  "profession":"worker-1",
  "address":"house addres 123-1",
  "jobAddress":"job address 123-1",
  "telephone":"123456789-1",
  "jobTelephone":"987654321-1",
  "contactCellphone":"911-1",
  "email":"test-1@gmail.com",
  "tutor":"false"
  "updatedAt": "2023-12-12T23:01:25.193Z",
  "createdAt": "2023-12-12T23:01:25.193Z"
}
```

### 2. Obtener todos los Padres

GET a : localhost:3001/parents

#### Respuesta Esperada ✅

(Primero realizar algunos POST para llenar la db)

```
[
  {
    "id": "47496be7-8eb3-4e12-b39a-32a646740a23",
    "idDoc": "12345678",
    "name": "name1",
    "lastName": "lastname1",
    "educationLevel": "high school",
    "profession": "worker",
    "address": "house addres 123",
    "jobAddress": "jobaddress 123",
    "telephone": "123456789",
    "jobTelephone": "987654321",
    "contactCellphone": "911",
    "email": "test@gmail.com",
    "tutor": false,
    "state": true,
    "createdAt": "2023-12-12T23:01:25.193Z",
    "updatedAt": "2023-12-12T23:01:25.193Z"
  },
  {
    "id": "75dc8813-2292-4965-b429-f27e2ea814bd",
    "idDoc": "1234567",
    "name": "name",
    "lastName": "lastname",
    "educationLevel": "high school",
    "profession": "worker",
    "address": "house addres 123",
    "jobAddress": "jobaddress 123",
    "telephone": "12345678",
    "jobTelephone": "987654321",
    "contactCellphone": "911",
    "email": "test2@gmail.com",
    "tutor": false,
    "state": true,
    "createdAt": "2023-12-12T23:03:15.276Z",
    "updatedAt": "2023-12-12T23:03:15.276Z"
  }
]
```

### 3. Obtener padre por ID

GET a localhost:3001/parents/"ID OBJETIVO"

#### Respuesta Esperada ✅

```
{
  "id": "332379ab-ed62-4ce6-9ef4-0634bacb022e",
  "idDoc": "12345678",
  "name": "name1",
  "lastName": "lastname1",
  "educationLevel": "high school",
  "profession": "worker",
  "address": "house addres 123",
  "jobAddress": "job address 123",
  "telephone": "123456789",
  "jobTelephone": "987654321",
  "contactCellphone": "911",
  "email": "test@gmail.com",
  "tutor": false,
  "state": true,
  "createdAt": "2023-12-13T01:26:33.241Z",
  "updatedAt": "2023-12-13T01:26:33.241Z"
}
```

### 4. Actualizar datos padre por ID:

PUT a: localhost:3001/parents/"ID OBJETIVO"

Por body:

```
  {
    "profession":"enginner",
    "address":"updating address"
  }
```

(Sólo son necesarios los campos a actualizar)

#### Respuesta Esperada ✅

```
{
  "id": "02aee226-ef09-4e2e-b3fd-d3df156f47c7",
  "idDoc": "12345678",
  "name": "name2",
  "lastName": "lastname2",
  "educationLevel": "high school",
  "profession": "enginner",❗
  "address": "updating address",❗
  "jobAddress": "jobaddress 123",
  "telephone": "123456788",
  "jobTelephone": "987654321",
  "contactCellphone": "911",
  "email": "test3@gmail.com",
  "tutor": false,
  "state": true,
  "createdAt": "2023-12-12T23:47:20.009Z",
  "updatedAt": "2023-12-12T23:47:42.532Z"
}
```

### 5. Borrado logico por ID

PUT a : localhost:3001/parents/delete/"ID OBJETIVO"

#### Respuesta Esperada ✅

```
{
  "message": "Parent unsubscribed successfully"
}
```

❗Luego de hacer un borrado logico, si se realiza una nueva solicitud POST repitiendo alguno de los campos que son unicos(idDoc por ejemplo) deberia devolver error de que no puede repetirse ese campo(ya que no se realizó un DELETE).


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
  "parentId":"47496be7-8eb3-4e12-b39a-32a646740a23"
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

## Rutas del Modelo Admin

### 1. Obtener padres activos

GET a: http://localhost:3001/admin/parents-Active

#### Respuesta Esperada ✅

```
[
{
  "id": "47496be7-8eb3-4e12-b39a-32a646740a23",
  "state": true,
  "idDoc":"12345678-1",
  "name":"name-1",
  "lastName":"lastname-1",
  "educationLevel":"high school-1",
  "profession":"worker-1",
  "address":"house addres 123-1",
  "jobAddress":"job address 123-1",
  "telephone":"123456789-1",
  "jobTelephone":"987654321-1",
  "contactCellphone":"911-1",
  "email":"test-1@gmail.com",
  "tutor":"false"
  "validate": true,❗
  "updatedAt": "2023-12-12T23:01:25.193Z",
  "createdAt": "2023-12-12T23:01:25.193Z"
},
{
  "id": "47496be7-8eb3-4e12-b39a-32a646740a23",
  "state": true,
  "idDoc":"12345678-1",
  "name":"name-1",
  "lastName":"lastname-1",
  "educationLevel":"high school-1",
  "profession":"worker-1",
  "address":"house addres 123-1",
  "jobAddress":"job address 123-1",
  "telephone":"123456789-1",
  "jobTelephone":"987654321-1",
  "contactCellphone":"911-1",
  "email":"test-1@gmail.com",
  "tutor":"false"
  "validate": true,❗
  "updatedAt": "2023-12-12T23:01:25.193Z",
  "createdAt": "2023-12-12T23:01:25.193Z"
}
]
```

### 2. Obtener padres Pendientes de aprobacion.

GET a : localhost:3001/admin/parents-Pending

#### Respuesta Esperada ✅

```
[
  {
    "id": "47496be7-8eb3-4e12-b39a-32a646740a23",
    "idDoc": "12345678",
    "name": "name1",
    "lastName": "lastname1",
    "educationLevel": "high school",
    "profession": "worker",
    "address": "house addres 123",
    "jobAddress": "jobaddress 123",
    "telephone": "123456789",
    "jobTelephone": "987654321",
    "contactCellphone": "911",
    "email": "test@gmail.com",
    "tutor": false,
    "validate": false,❗
    "state": true,
    "createdAt": "2023-12-12T23:01:25.193Z",
    "updatedAt": "2023-12-12T23:01:25.193Z"
  },
  {
    "id": "75dc8813-2292-4965-b429-f27e2ea814bd",
    "idDoc": "1234567",
    "name": "name",
    "lastName": "lastname",
    "educationLevel": "high school",
    "profession": "worker",
    "address": "house addres 123",
    "jobAddress": "jobaddress 123",
    "telephone": "12345678",
    "jobTelephone": "987654321",
    "contactCellphone": "911",
    "email": "test2@gmail.com",
    "tutor": false,
    "validate": false,❗
    "state": true,
    "createdAt": "2023-12-12T23:03:15.276Z",
    "updatedAt": "2023-12-12T23:03:15.276Z"
  }
]
```

### 3. Obtener detalle de un padre por su ID

GET a localhost:3001/admin/parentDetail/"ID OBJETIVO"

#### Respuesta Esperada ✅

```
{
  "id": "332379ab-ed62-4ce6-9ef4-0634bacb022e",
  "idDoc": "12345678",
  "name": "name1",
  "lastName": "lastname1",
  "educationLevel": "high school",
  "profession": "worker",
  "address": "house addres 123",
  "jobAddress": "job address 123",
  "telephone": "123456789",
  "jobTelephone": "987654321",
  "contactCellphone": "911",
  "email": "test@gmail.com",
  "tutor": false,
  "state": true,
  "createdAt": "2023-12-13T01:26:33.241Z",
  "updatedAt": "2023-12-13T01:26:33.241Z"
}
```

### 4. Aprobar datos del padre por ID:

PUT a: localhost:3001/admin/parentDetail/"ID OBJETIVO"

#### Respuesta Esperada ✅

```
{
  Parent approved successfully
}
```

🔸Se actualizara su propiedad validate a true.

### 5. Obtener estudiantes activos

GET a: http://localhost:3001/admin/students-Active

#### Respuesta Esperada ✅

```

```

### 6. Obtener estudiantes Pendientes de aprobacion.

GET a : localhost:3001/admin/students-Pending

#### Respuesta Esperada ✅

```

```

### 7. Obtener detalle de un estudiante por su ID

GET a localhost:3001/admin/studentDetail/"ID OBJETIVO"

#### Respuesta Esperada ✅

```

```

### 8. Aprobar datos del estudiante por ID:

PUT a: localhost:3001/admin/studentDetail/"ID OBJETIVO"

#### Respuesta Esperada ✅

```
{
  Student approved successfully
}
```

🔸Se actualizara su propiedad validate a true.

