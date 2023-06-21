
## Ejecución del proyecto
* git clone repo
* npm i -g serverless
* npm i
* npx kill-port 9324 (si tenemos otro/s proceso/s en este puerto)
* npm start
* Ejecutamos el siguiente endpoint de tipo POST con postman 
```git
curl --location 'http://localhost:4000/dev/sender-queue/' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j'
```
* Resultado desde consola (QueueSendMessage y  QueueReceiveMessage)
![Index app](./doc/senderReceiver.png)

## Comandos
* Iniciar solo servicio elasticmq
```cmd
npm run queue-start
```
* Iniciar solo servicio serverless-offline
```cmd
npm run serverless-offline
```
* Iniciar el servicio de elasticmq y serverless
```cmd
npm start
```

## Doc SNS

