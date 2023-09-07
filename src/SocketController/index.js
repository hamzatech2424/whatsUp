import io from 'socket.io-client';
import AuthController from '../Controllers/authController'
import ReduxDispatchController from '../Controllers/reduxDispatchController';
import { BASE_URL } from '../proxy';

let count = 0;
class SocketController {


    constructor() {
        this.socket = null;
        count++;
        // console.log(`### DANGER #### Socket Constructor calling ${count}`)
        // global.socket = null;
        this.socketConnected = false;

        const onConnection = () => {
            console.log(`Socket Connected!`)
            this.socketConnected = true;
            this.socket.on("onMessage", (res) => {
                console.log(`@=>onMessage:`, res)
                if (res.query.conversation) {
                    ReduxDispatchController.Conversations.setSingleConversations(res.query.conversation)
                    ReduxDispatchController.Conversations.setSingleConversationMessage(res.query.msg)
                }
                else {
                    console.log(res.query)
                    ReduxDispatchController.Conversations.setSingleConversationMessage(res.query.msg)
                    ReduxDispatchController.Conversations.setLastMessage(res.query.conversationId, res.query.msg)
                }
            })
            this.socket.on("isUserOnline", (res) => {
                console.log(`@=>isUserOnline:`, res)
                if (res.query) {
                    ReduxDispatchController.Contacts.setContactOnLine(res.query)
                }
            })
            // MyBroadcastEventsManager.onConnection(global.socket);
        }

        const onDisconnect = () => {
            if (this.socket) {
                // this.socket.removeAllListeners("onLiveStatusChangedToOnline");
            }
            // MyBroadcastEventsManager.onDisconnect();
        }


        this.init = () => {
            const userId = AuthController.currentUser()._id
            console.log(`Initializing Socket Connection`)
            // this.socket = io(`https://nj-chat.herokuapp.com/`, {
            this.socket = io(BASE_URL, {
                query: { uid: userId },
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: Infinity
            }) // atamuhiuldin connected
            this.socket.on("connect", () => {
                onConnection();

            })

            this.socket.on('connect_error', (error) => {
                console.log('CONNECT: ERROR');
                onDisconnect()
                this.socket.connect();
                this.socketConnected = false;
                console.log(error, 'errrrrrrrrrrrrrr');
            });

            this.socket.on('connect_timeout', (timeout) => {
                console.log('CONNECT: TIMEOUT');
                onDisconnect()
                this.socket.connect();
                console.log(timeout);
                this.socketConnected = false;
            });

            this.socket.on('disconnect', (reason) => {
                console.log(`Disconnected: ${reason}`)
                onDisconnect()
                this.socketConnected = false;
                if (reason === 'io server disconnect') {
                    // the disconnection was initiated by the server, you need to reconnect manually
                    console.log("Requesting Connection...")
                    this.socket.connect();
                }
                // else the socket will automatically try to reconnect
            });

            this.socket.on('reconnect', (attemptNumber) => {
                console.log('SOCKET: RECONNECTED');
                console.log(attemptNumber);
                this.socketConnected = false;
            });

            this.socket.on('reconnect_attempt', (attemptNumber) => {
                console.log('RECONNECT ATTEMPTS');
                this.socketConnected = false;
                console.log(attemptNumber);
            });

            this.socket.on('reconnecting', (attemptNumber) => {
                console.log('RECONNECTING...');
                this.socketConnected = false;
            });

            this.socket.on('reconnect_error', (error) => {
                onDisconnect()
                console.log('RECONNECT ERROR');
                this.socketConnected = false;
            });


        }

        this.emit = (type, payload, _ack = (ack) => false) => {
            if (this.socketConnected && this.socket) {
                this.socket.emit(type, payload, _ack)
            } else {
                console.log(`System offline :SocketController`)
            }
        }

        this.destroy = () => {
            if (this.socket) {
                this.socket.disconnect();
                this.socket = null;
            }
        }

    }
}
const MySocketController = new SocketController();
export default MySocketController;