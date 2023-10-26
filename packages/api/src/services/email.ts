import AWS from 'aws-sdk';

interface Email {
  to: string;
  subject: string;
  message: string;
}

export default async function send(email: Email) {
  const ses = new AWS.SES({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || ''
  });

  const params = {
    Destination: {
      ToAddresses: [email.to]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: email.message
        },
        Text: {
          Charset: 'UTF-8',
          Data: email.message
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: email.subject
      }
    },
    Source: process.env.FROM || 'ingrid.pacheco2015@gmail.com' 
  };

  try {
    await ses.sendEmail(params).promise();
    console.log("Params do email.ts", params)
  } catch (error) {
    console.log("Erro do email.ts", error);
    throw new Error((error as Error).message);
  }
}


