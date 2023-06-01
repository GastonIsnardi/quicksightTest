import { IAwsAccount } from "./models/awsAccount";
import express from 'express';
import { Request, Response, NextFunction } from 'express';

const AwsAccount : IAwsAccount = {
    AwsAccountId: '821680281153',
    Namespace: 'default',
    AuthorizedResourceArns: ['arn:aws:quicksight:us-east-1:821680281153:dashboard/4362c94a-a9a5-4942-a856-8ce13e2e684e'],
    AllowedDomains: ['http://localhost:3000'],
    ExperienceConfiguration: {
        Dashboard: {
            InitialDashboardId: '4362c94a-a9a5-4942-a856-8ce13e2e684e'
        }
    },
    SessionTags:[{
        Key: 'rut_user_tag',
        Value: "ssss1"
    }],
    SessionLifetimeInMinutes: 600,
}

// 61dbe920-96a3-400c-b8fa-d90cea4438f1
const AWS = require('aws-sdk');
const https = require('https');
let datas : any;
var quicksightClient = new AWS.Service({
        apiConfig: require('./quicksight-2018-04-01.min.json'),
        region: 'us-east-1',
    });




var cors = require('cors');

const app = express();

app.use(cors());

// middleware to read body, parse it and place results in req.body
app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded

app.post('/dev/getData', async(req : Request, res : Response) => {
    AwsAccount.SessionTags[0].Value = req.body.user;
    console.log(AwsAccount);
    
    


    quicksightClient.generateEmbedUrlForAnonymousUser({
        'AwsAccountId': AwsAccount.AwsAccountId,
        'Namespace' : AwsAccount.Namespace,
        'AuthorizedResourceArns': AwsAccount.AuthorizedResourceArns,
        'AllowedDomains': AwsAccount.AllowedDomains,
        'ExperienceConfiguration': AwsAccount.ExperienceConfiguration,
        'SessionTags': AwsAccount.SessionTags,
        'SessionLifetimeInMinutes': AwsAccount.SessionLifetimeInMinutes

        }, function(err: any, data: any) {
            if (err){
                return res.status(403).json({
                    ok: false,
                    err
                })
            }
            res.status(200).json({
                ok: true,
                data,
            })
    });
    return res
});


const port = 4000;

// app.get('/', (req: any, res: {
//     sendFile(arg0: string): unknown; send: (arg0: string) => void; 
// }) => {
//     res.sendFile(__dirname + "/index.html");
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


