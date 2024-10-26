# Requisitos previos
1. Composer
2. PHP 8.1 o más
3. Motor DB (MySQL, MariaDB o PostgreSQL)

# Instalación

1. acceder al archivo usando cd listar-tareas-backend
2. composer install
3. renombra .env.example a .env
4. instalar toda dependencia y migracion de passport por medio del codigo php artisan passport:install
5. aceptar el proceso de correr todas las migraciones.
6. luego nos dara la opcion de crear automaticamente la base da datos, vamos a aceptar nuevamente esta opcion.
7. seguido de esto vamos a aceptar la creacion del "personal access" y el "password grant".
8. corremos los seeders del programa por medio del codigo php artisan db:seed y asi poder crear los valores por defecto para la tabla companies.
9. por ultimo corremos el comando php artisan serve para poder acceder a nuestra aplicacion.
