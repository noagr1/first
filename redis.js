const express = require('express');
const redis = require('ioredis');

const app = express();
const port = 3000;

const client = redis.createClient({host:'redis-12429.c267.us-east-1-4.ec2.cloud.redislabs.com',port:12429,username:'default',password:'password1234'});


client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.log('Redis error: ', err);
});

app.get('/', (req, res) => {
    // Example usage of Redis client
    client.set('visits', 0);
    client.get('visits', (err, visits) => {
        res.send('Number of visits is ' + visits);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});