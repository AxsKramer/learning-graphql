# Simple project to learn GraphQL

`$ npx license mit > LICENSE && npx gitignore node && npm init -y`

`$ npm i graphql`

`$ npm i express express-graphql`

`$ npm i graphql-tools`

## DIFERENCIAS ENTRE REST Y GRAPHQL

+ Rest
Es solo una convención: Es una manera de comunicarse entre el servidor y cliente, cada uno tiene sus reglas.
+ GraphQL
Lenguaje tipado y validable: Le damos una forma de lo que recibe y lo que devolvemos. Ademas que le agrega seguridad

+ Rest
Servidor expone recursos: Los clientes se tienen que adecuarse a como están expuestos
+ GraphQL
El cliente define que recibe: Haciendo una consulta, de la estructura que define como respuesta

+ Rest
Hace overfetching: Envía más información que necesita
+ GraphQL
Envía lo necesario: Se tiene control total de las respuestas que se esperan del servidor

+ Rest
Multiples request por vista: Muy costoso en performance, básicamente es una aplicación en blanco que aún no ha cargado datos o tiene custom endpoints
+ GraphQL
Hace solo un request por vista: Enviados en un solo row

+ Rest
Documentación ajena al desarrollo: No hay un estándar por lo que depende mucho del desarrollador para mantenerla.
+ GraphQL
Documentado por definición.
Documentado por definición: Al ser un lenguaje tipado se define un schema que ya esta documentado por definiciòn

## GraphQL 
+ Es un nuevo paradigma aplicado para el intercambio de información entre diferentes aplicaciones.
+ Fue creado por Facebook en el 2015 para resolver ciertas limitaciones que en algunos casos presentaba REST.
+ Cuenta con una forma estandarizada para definir las interacciones posibles con la información, haciendo posible que la manera de escribir y usar un API sea más predecible y entendible.
+ Principales ventajas:
  + Un lenguaje agnóstico que me permite definir de una forma clara y simple los objetos y acciones del API.
  + Una validación automática de la información a ingresar.
  + Control de errores de una manera uniforme y predecible.
  + Una documentación minima autogenerada que permite saber exactamente cómo debe ser usado el API tanto a la hora de pedir y enviar información.
  + Un entorno de desarrollo amigable donde se puede probar todas las interraciones.

### Schema 
Es la base de una API en GraphQL, es el encargado de describir todos los tipos de información que va a contener.
Define qué puede pedir el cliente
Un conjunto de "Types" formas un Schema.

+ Dentro de GraphQL contamos con distintos tipos de datos escalares (Scalars):
  + String
  + Int
  + Float
  + Boolean
  + ID

+ Objects nos permiten definir entidades
```graphql
  type Curso {
    _id: ID!,
    title: String!,
    teacher: [Teacher],
    description: String!,
    topic: String
  }
```

+ Enum es un type que usamos cuando algo puede adquirir una o varias opciones, una de las cosas que podemos expresar a través de este type es:
```graphql
enum Genero {
MASCULINO
FEMENINO
}
```

+ La Inteface proporciona la capacidad de describir campos que se comparten en diferentes tipos, es la definición de campos requeridos que sabemos que todas las implementaciones se van a cumplir, si en un futuro necesitáramos que todas las implementaciones de perfil tuvieran un nuevo campo, solamente debemos agregarlo a la Interface.
```graphql
  "Al usar interface se indica el uso de interface"
  interface Perfil {
    "Para este ejemplo se setea el uso de campos obligados"
    nombre: String!
    email: String!
    edad: Int!
  }
    
  "Al usar implements se indica que usar al interface Perfil"
  type Alumno implements Perfil {
    "De igual manera tenemos que declarar los cambos que se utilizan en la interface"
    nombre: String!
    email: String!
    edad: Int!
    curso: String
  }
```

+ Union permite definir diferentes posibles tipos (o interfaces) que se esperan como resultado para diferentes tipos objetos (o entidades) si alguna de ellas cumple con la condición definida para una búsqueda.
```graphql
  union Busqueda = Amigo | Lugar | Evento | Pagina
```

### Root Type: Query
Endpoints en GraphQL
```graphql 
  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: String!): Curso
    profesor(id: String!, limite: Int): Profesor
  }
```

### Root Type: Mutation
Graphql también nos permite hacer modificaciones, y para hacerlas, tenemos un tipo especial de endpoints que se llaman Mutation.
A través de ellos vamos a poder insertar elementos, modificar elementos, borrar elementos, etc.

Un mutation va a requerir de un campo de tipo Input que son como plantillas que le van a indicar qué campos son necesarios para insertar o modificar información.

La sintaxis de una mutation queda de la siguiente manera:
```graphql 
nombreMutation(input: InputType): tipo


  type Mutation {
    agregarCurso(descripcion: String, profesorId: String): Curso
  }

  mutation{
  createCourse(input:{
		title: "Titulo 4"
    teacher: "Maestro 4"
    description: "Descripcion 4"
    topic: "Topic 4"
  }){
    _id
    title
    teacher
    description
    topic
  }
}

mutation{
  createStudent(input:{
		name: "Student 1"
  	email: "student1@mail.com"
  }){
    _id
		name,
    email
  }
}
```

### Query 
Permite ejecutar una petición al API, dentro de una query debes indicar la consulta que quieres ejecutar y los campos que deseas obtener. GraphQL te va a devolver la información que solicitaste dentro del objeto data.
```javascript
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}

```

El resultado de tu petición no se va a ejecutar de manera mágica, para ello debes definir el objeto resolvers, este objeto va a contener una propiedad del mismo nombre que la query que va a resolver o ejecutar.

```graphql
"GraphQL nos permite configurar nuestros propios tipos de datos, estos deben tener la siguientes sintaxis:"

type <Nombre del tipo> {
  propiedad: Tipo de dato
}

"Dentro de nuestros tipos de datos podemos configurar un campo de un tipo como obligatorio con el signo “!”, quedando por ejemplo:"

type Course {
  title: String!
}
```

### Variables
Para usar variables es necesario usar la forma completa de la query.
```graphql 
query <nombreQuery>(<$variable>: type = <valor por defecto>) {
	...
}

"Consulta"
query unCurso($id:Int){
  curso(id: $id) {
    titulo
  }
}
"Variable"
{
  "id": 4
}
```

### Aliases 
Es una manera de ponerle un nombre a una consulta.
Uno de los motivos de usar un alias es al momento de pedir varios recursos del mismo Type con diferente ID para que la Key (En este caso curso) no se pise o se sobre escriba (Graphql no deja que eso pase).
```graphql

nombreDelAlias: tipoDeDato(argumento: tipo) {
  datos
}

{
  cursoMasVotado: curso(id: 1) {
    titulo
    rating
  }
  cursoMasVisto: curso(id: 2) {
    titulo
    descripcion
  }
}

{
  AllCourses: getCourses{
    ...CourseFields
  }

  Course1: getCourse(id: "5cb4b8ce75f954a0585f7be2"){
    ...CourseFields
    teacher
  }

  Course2: getCourse(id: "5cb4b8ce75f954a0585f7be4"){
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
  people {
    _id
    name
  }
}
```

### Fragments
Son una manera que nos permite GraphQL en las consultas de agrupar campos para poder utilizarlos de una manera conveniente para nuestra consulta.
Nos ayudan a abstraer duplicidad de las queries en una declaración que podemos re-utilizar. Si hay que hacer cambios lo hacemos en un solo lugar (El Fragment) en lugar de hacer cambios a las demas queries una por una.
```graphql 
  {
  getCurso(id: 1) {
    ...CamposNecesarios
  }
  getCursos {
    ...CamposNecesarios
  }
}

fragment CamposNecesarios on Curso {
  titulo
  descripcion
}

  "Inline Fragments"
  {
  buscar(query: "GraphQL") {
    ... on Curso {
      titulo
    }
    ... on Profesor {
      nombre
    }
  }
}
```

### Directivas
nos permiten pedir ciertos valores de una consulta dependiendo de si una variable es true o false.

Existen 2 tipos:
+ @include incluye el campo si el argumento es true.
+ @skip omite el campo si el argumento es true. (revirtiendo la condición)
```graphql 

  "Declaramos la variable"
  {
    "conDescription": true
  }

  "Realizamos la consulta"

  query Cursos($conDescription: Boolean!) {
    cursos {
      titulo
      descripcion @include(if: $conDescription)
    }
  }
```

#### En el cliente cuando se utiliza el type union
```graphql 
{
  searchyItems(keyword "ejemplo"){
    __typename
    ...on Course {
      title
      description
    }
    ...on Monitor {
      name
      phone
    }
    ... onStudent {
      name
      email
    }
  }
}
``` 