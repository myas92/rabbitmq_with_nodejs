#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error, connection) => {
    let count = 0
    if (error)
        throw error
    connection.createChannel((error, channel) => {
        if (error)
            throw error

        const queue = 'hello';
        channel.assertQueue(queue, {
            durable: false
        })
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            count += 1
            console.log(`[${count}] Received ${msg.content.toString()}`);
        }, {
            noAck: true
        });
    })



})