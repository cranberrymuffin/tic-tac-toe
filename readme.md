# WebRTC multiplayer Tic-Tac-Toe

What if you could play a game online with a friend, peer-to-peer, without needing a backend server? Just two players connected directly through the magic of WebRTC and PeerJS. We are going to explore how this was accomplished in Tic-Tac-Toe.

## Peer-to-Peer: No Servers, No Problem

WebRTC is used to establish a direct connection between two players (the host and the guest). Here’s how it plays a crucial role: Peer-to-peer connection: Instead of sending requests to a server to fetch or update the game state, WebRTC establishes a direct connection between two browsers.

This enables low-latency communication, which is ideal for real-time applications like games. WebRTC's data channel is key here. It’s a bi-directional communication channel between two peers, allowing them to send messages, like game moves, back and forth instantly. For example, when a player makes a move on their board, that move is transmitted via the data channel to the opponent, who updates their board state in real-time.

Most multiplayer games rely on a server to shuttle messages back and forth. WebRTC skips all that. It lets two playersconnect directly andexchange data instantly. That means no need for an expensive backend.

## PeerJS: Making WebRTC Easy

WebRTC is great, but setting it up can be a headache. Enter PeerJS, which simplifies everything. Instead of dealing with connection details, PeerJS assigns each player a unique ID. One player shares their ID, the other connects, and boom—game on.

### Step 1: new Peer()

Each player needs to have an instance of new Peer() to participate in PeerJs backed WebRTC. The peer object takes some time to be set up. So once a new Peer() is created, we must wait for the peer.on('open', ...) event handler to be triggered in order to guarantee the Peer object has been competely set up.

### Step 2: Hosting

One player's Peer object will act as a host. After the open Event Handler is triggered on the host peer, its code can be shared to a client to create a data channel. Once that data channel is created, the host peer's peer.on('connection', ...) event handler is triggered. The event handler will pass a ready peer js DataConnection object to the callback triggered. This DataConnection is a data channel to send and recieve messages to the connected client.

### Step 3: Joining

The other player's Peer object will connect to a host using the host's peer ID. This will be done via const conn = peer.connect(hostPeerId)conn in this code snippet is of type DataConnection. The DataConnection takes some time to set up onceconnect is called. We will listen to the DataConnection's conn.on("open", ...) event handler to be triggered to ensure the DataConnection is done being set up.

### Step 4: Sending and Recieving data

Both the host and the client should subscribe to the conn.on("data", ...) event handler. This event handler will trigger a callback and pass data recieved via the DataConnection. Both the host and the client can send data via conn.send
