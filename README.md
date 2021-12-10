# Instrucciones para instalar el proyecto

## api (backend)

* Moverse a la raiz del proyecto dentro de `/api` y correr los siguientes comandos.

* `composer install`

* Configurar variables de entorno en el archivo `/api/.env`

* Recomendado utilizar `sail` para un rápido despliegue. `./vendor/bin/sail up`

* `./vendor/bin/sail artisan key:generate`

* Migraciones y datos de prueba `./vendor/bin/sail artisan migrate --seed`

## view (frontend)

* Moverse a la raiz del proyecto dentro de `/view` e instalar dependencias con `yarn install`

* Utilizar `yarn start` para iniciar el servicio.
