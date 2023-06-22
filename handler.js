//External
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const { SNSClient, SubscribeCommand  } = require("@aws-sdk/client-sns");
const { v4: uuidv4 } = require('uuid');
//Environment Vars
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_RANDOM_VALUE;
const SECRET_KEY = process.env.AWS_SECRET_KEY_RANDOM_VALUE;
const REGION = process.env.REGION;
const ENDPOINT = process.env.SQS_URL;
const QUEUE_URL = process.env.QUEUE_URL;



module.exports.snsSubscribeSQS = async (event) => {
  try{
    const snsClient = new SNSClient({ 
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
      region: REGION,
      endpoint: ENDPOINT, });

    const params = {
      Protocol: "lambda" /* required */,
      TopicArn: "TOPIC_ARN", //TOPIC_ARN
      Endpoint: "Queue-SendMessage-Lambda"
    };

    const data = await snsClient.send(new SubscribeCommand(params));

    console.log(data);


  }catch(e){
console.log(e);
  }
};





module.exports.sendMessage = async (event) => {
  try {

    let client = new SQSClient({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
      region: REGION,
      endpoint: ENDPOINT,
    });

    let command = new SendMessageCommand({
      QueueUrl: QUEUE_URL,
      DelaySeconds: 0,
      MessageDeduplicationId: uuidv4(),
      MessageGroupId: uuidv4(),
      MessageBody:
        "information about sending the message",
      MessageAttributes: {
        JsonObject: {
          DataType: "String",
          StringValue: "Example for sender an object inside de MessageAttributes"
      }
      }
    });

    let response = await client.send(command);

    let bodyResponse = JSON.stringify(command, null, 2)


    if (response != null) {
      console.log(bodyResponse);
      return {
        statusCode: 200,
        body: bodyResponse
          };
    } else {
      return {
          statusCode: 400,
          body: 'Bad request'
            };
    }
    
  } catch (e) {
    console.error(e);
  }
};




module.exports.receiveMessage = async (event) => {
  try{
    console.log(JSON.stringify(event.Records, null, 2));
  }catch(e){
console.log(e);
  }
};