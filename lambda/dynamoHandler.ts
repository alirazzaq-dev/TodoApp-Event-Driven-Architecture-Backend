import { EventBridgeEvent, Context } from 'aws-lambda';
import { randomBytes } from 'crypto';
import * as AWS from 'aws-sdk';

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME as string;

// export type PayloadType = {
//     operationSuccessful: boolean,
//     SnsMessage?: string,
//     customerEmail?:string
// }

export const handler = async (event: EventBridgeEvent<string, any>, context: Context) => {

    console.log(JSON.stringify(event, null, 2));
    // const returningPayload: PayloadType = { operationSuccessful: true };

    try {
        //////////////  adding new Todo /////////////////////////
        if (event["detail-type"] === "addTodo") {
            console.log("detail ===>", JSON.stringify(event.detail, null, 2));
            const params = {
                TableName: TABLE_NAME,
                Item: { id: randomBytes(16).toString("hex"), ...event.detail },
            }
            await dynamoClient.put(params).promise();
        }
    } catch (error) {

        console.log("ERROR ====>", error);

    }

    try {
        //////////////  adding new Todo /////////////////////////
        if (event["detail-type"] === "deleteTodo") {
            console.log("detail ===>", JSON.stringify(event.detail, null, 2));
            const params = {
                TableName: TABLE_NAME,
                Key: {
                    id: event.detail.id
                }
            }
            await dynamoClient.delete(params).promise();
        }
    } catch (error) {

        console.log("ERROR ====>", error);

    }




    try {
        //////////////  adding new Todo /////////////////////////
        if (event["detail-type"] === "updateTodo") {
            let params: any = {
                TableName: TABLE_NAME,
                Key: {
                    id: event.detail.id
                },
                ExpressionAttributeValues: {},
                ExpressionAttributeNames: {},
                UpdateExpression: "",
                ReturnValues: "UPDATED_NEW"
            };
        
        
            let prefix = "set ";
            let attributes = Object.keys(event.detail);

            for (let i = 0; i < attributes.length; i++) {
                let attribute = attributes[i];
                if (attribute !== "id") {
                    params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
                    params["ExpressionAttributeValues"][":" + attribute] = event.detail[attribute];
                    params["ExpressionAttributeNames"]["#" + attribute] = attribute;
                    prefix = ", ";
                }
            }
            
            await dynamoClient.update(params).promise()       
         }
    } catch (error) {

        console.log("ERROR ====>", error);

    }
     

};