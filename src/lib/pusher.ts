import Pusher from 'pusher'
import PusherClient from 'pusher-js'
import { Options, validateOptions } from 'pusher-js/types/src/core/options';

export const pusherServer = new Pusher({
    appId: process.env.PUSHER_APP_ID! ,
    key: process.env.PUSHER_KEY! ,
    secret: process.env.PUSHER_SECRET! ,
    cluster: "eu",
    useTLS: true
});



// export const pusherClient = new PusherClient(process.env.PUSHER_KEY!, {
//     cluster: 'eu',
//     authEndpoint: '/api/pusher-auth',
//     authTransport: 'ajax',
//     auth: {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }, 
// }  as Options
// )
