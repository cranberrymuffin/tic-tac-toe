# WebRTC Multiplayer Tic-Tac-Toe

What if you could play a game online with a friend, peer-to-peer, without needing a backend server? Just two players connected directly through the magic of WebRTC and PeerJS. This guide explores how this was accomplished in Tic-Tac-Toe.

## Peer-to-Peer: No Servers, No Problem

WebRTC is used to establish a direct connection between two players (the host and the guest). Here’s how it plays a crucial role:

- **Peer-to-peer connection**: Instead of sending requests to a server to fetch or update the game state, WebRTC establishes a direct connection between two browsers.
- **Low-latency communication**: This is ideal for real-time applications like games. WebRTC's data channel enables **bi-directional communication**, allowing players to send game moves instantly.

For example, when a player makes a move, that move is transmitted via the **data channel** to the opponent, who updates their board state in real-time.

Most multiplayer games rely on a server to shuttle messages back and forth. WebRTC **skips the middleman**, letting two players connect **directly** and exchange data **instantly**, eliminating the need for an expensive backend.

## PeerJS: Making WebRTC Easy

WebRTC is powerful, but setting it up manually can be a headache. **Enter PeerJS**, a library that simplifies WebRTC connections. Instead of dealing with complex connection details, PeerJS assigns each player a **unique ID**. One player shares their ID, the other connects, and boom—game on.

### Step 1: Creating a Peer Instance

Each player needs to create a **Peer** instance:

```js
const peer = new Peer();
```

The `Peer` object takes some time to set up. Once created, we must wait for the `peer.on('open', ...)` event handler to ensure that the `Peer` object has been **fully initialized**.

```js
peer.on('open', id => {
  console.log('Peer connected with ID:', id);
});
```

### Step 2: Hosting the Game

One player's `Peer` object will act as a **host**. After the **open** event handler is triggered, the host can share their **Peer ID** with the other player. Once the client connects, the **host's** `peer.on('connection', ...)` event will be triggered.

```js
peer.on('connection', conn => {
  console.log('New connection established!');

  conn.on('data', data => {
    console.log('Received:', data);
  });
});
```

### Step 3: Joining a Game

The other player (client) connects to the host using the **host's Peer ID**:

```js
const conn = peer.connect(hostPeerId);
```

Since the `connect` method takes some time to establish the connection, we listen for the `conn.on("open", ...)` event to ensure it's fully set up:

```js
conn.on('open', () => {
  console.log('Connected to host!');
});
```

### Step 4: Sending and Receiving Data

Both the **host** and the **client** should subscribe to the `conn.on("data", ...)` event handler to receive messages:

```js
conn.on('data', data => {
  console.log('Received:', data);
});
```

They can also send data using `conn.send()`:

```js
conn.send({ move: 'X', position: [0, 1] });
```

## Conclusion

By leveraging **WebRTC** and **PeerJS**, we've created a **serverless** multiplayer Tic-Tac-Toe game with real-time communication. No backend, no problem—just **peer-to-peer gaming** at its finest!
