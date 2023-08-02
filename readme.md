# reservas_fi
 
Sistema de Reserva de Aulas de la Facultad de Ingeniería de la Universidad de Costa Rica
 
El proyecto utiliza el siguiente stack:
 
 - Angular 13.1.2
 - Java 17 (OpenJDK Implementado por Azul en Zulu Project azul/zulu-openjdk:17) 
 - Maven
 - SpringBoot 3.0
 - Docker (docker-compose)
 - nginx (nginx:alpine)
 
# Instalación
 
## requerimientos
 
Para instalar Maven en su sistema operativo siga las instrucciones en [el sitio oficial](https://maven.apache.org/install.html)
 
Posteriormente, recomendamos abrir el proyecto en un IDE con soporte para Maven (IntelliJ).
 
Para instalar Docker, recomendamos seguir las instrucciones para su plataforma en [el sitio oficial](https://docs.docker.com/get-docker/)
 
Para instalar Node y en consecuencia npm, recomendamos conseguir los binarios y seguir las instrucciones y documentación en el repositorio que se referencian desde [el sitio oficial](https://nodejs.org/en/download/)
 
Para probar que los requerimientos previos funcionan de forma apropiada, puede comprobar lo siguiente en una terminal:
 
> mvn --version
 
Retorna la información de la versión de Maven y el JVM en uso
 
> npm -version
> node --version
 
Retorna la información de la versión de NPM y Node respectivamente
 
> docker-compose -version
> docker --version
> 
Retorna la información de la versión de docker-compose y Docker respectivamente
 
## frontend
Para comenzar, navegue al directorio de **frontend** y ejecute
 
> npm install --legacy-peer-deps
 
En este punto, se descargan las dependencias del proyecto para poder empezar a trabajar en él. 
 
Para poder utilizar este frontend en un servidor web con acceso al backend debemos ejecutar
 
> ng build
 
Este comando genera los artefactos necesarios para el contenedor.
 
## backend
Navegue al directorio de **backend** y ejecute:
 
> mvn package
 
Este comando genera el artefacto (.jar) necesario para el contenedor del backend. Para probarlo, puede ejecutar
> java - jar target/backend-1.0-SNAPSHOT.jar
 
El comando debería crear el servidor de Spring en la consola. Sin embargo, probablemente reciba una excepción por CommunicationsLinkError, puesto que no hay servidor de base de datos para soportar JPA.
 
## docker-compose
Ahora que los artefactos necesarios han sido generados, puede ejecutar
 > docker-compose up
 
Ahora puede ir a [localhost:4200](http://localhost:4200/) y visitar el proyecto desde el frontend.

## Make

El repositorio incluye un Makefile. En una terminal puede ejectuar
> make up

Para iniciar los contenedores el proyecto.

Para deterner los contenedores puede ejecutar
> make down
> 

## Documentacion

### [swagger-ui backend](localhost:8080/swagger-ui/index.html)
### [frontend: manual de usuario]()
 
