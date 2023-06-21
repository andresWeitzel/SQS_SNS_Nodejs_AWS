module.exports.sendMessage = async (event) => {
  const AWS = require("aws-sdk");
  const SQS = new AWS.SQS({
    accessKeyId: "local",
    secretAccessKey: "local",
    endpoint: "127.0.0.1:9324"
  });

  try {

    const queueParams = {
      Entries: [
        {
          Id: "1",
          MessageBody: "this is a message body",
        }
      ],
      QueueUrl: 'http://127.0.0.1:9324/queue/myFirstQueue'
    }

    const result = await SQS.sendMessageBatch(queueParams).promise();

    let bodyResponse = JSON.stringify(result, null, 2)

    console.log(bodyResponse);
    if(result != null){
      return {
        statusCode: 200,
        body: bodyResponse
          }
    }else{
      return {
        statusCode: 400,
        body: 'Bad request'
          }
    }
    
  } catch (e) {
    console.error(e);
  }
};




module.exports.receiveMessage = async (event) => {
  console.log(JSON.stringify(event.Records, null, 2));
};