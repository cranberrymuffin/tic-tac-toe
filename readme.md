# WebRTC Multiplayer Tic-Tac-Toe 🎮

A **serverless**, real-time **Tic-Tac-Toe** game using **WebRTC** and **PeerJS** for direct peer-to-peer communication. This project eliminates the need for a backend by enabling two players to connect directly and exchange data instantly, creating a seamless multiplayer experience.

## 🚀 Key Features:

- **Peer-to-peer gameplay** using **WebRTC** and **PeerJS**
- **Real-time data exchange** with low-latency communication
- **Single-player** mode against an **AI opponent**
- **Dynamic game state updates** with **React**
- **No server required** — fully client-side

## 🔍 How It Works:

### Peer-to-Peer: No Servers, No Problem

WebRTC facilitates a direct connection between the host and guest players, allowing them to send game moves in real-time without relying on a backend server. Here's how it works:

- **Direct connection**: WebRTC establishes a peer-to-peer connection between two browsers, bypassing the need for a centralized server.
- **Low-latency communication**: Perfect for real-time applications like games, where fast data exchange is essential.
- **Data channel**: WebRTC’s data channel allows for bi-directional communication, enabling instant transmission of game moves between players.

When one player makes a move, that move is sent via the **data channel** to the opponent, who updates their game state immediately.

### PeerJS: Simplifying WebRTC Connections

While WebRTC is powerful, managing connections manually can be complex. That's where **PeerJS** comes in. PeerJS simplifies WebRTC’s intricacies by generating a **unique ID** for each player and handling connection setup.

## 🛠️ Step-by-Step Guide:

### Step 1: Creating a Peer Instance

Each player creates a **Peer** instance using PeerJS:

```js
const peer = new Peer();
```

Once the `Peer` object is created, wait for the `open` event to ensure the peer is initialized:

```js
peer.on('open', id => {
  console.log('Peer connected with ID:', id);
});
```

### Step 2: Hosting the Game

The **host player** will share their **Peer ID** with the other player. Upon receiving a connection request, the host’s `peer.on('connection', ...)` event handler will be triggered.

```js
peer.on('connection', conn => {
  console.log('New connection established!');

  conn.on('data', data => {
    console.log('Received:', data);
  });
});
```

### Step 3: Joining the Game

The **client player** will use the host's **Peer ID** to establish a connection:

```js
const conn = peer.connect(hostPeerId);
```

Once the connection is made, the `open` event is triggered:

```js
conn.on('open', () => {
  console.log('Connected to host!');
});
```

### Step 4: Sending and Receiving Data

Both the **host** and **client** subscribe to the `conn.on('data', ...)` event handler to receive game data. They can also send data using `conn.send()`:

```js
conn.on('data', data => {
  console.log('Received:', data);
});

conn.send({ move: 'X', position: [0, 1] });
```

## 🧠 AI Mode (Single Player)

The **AI opponent** in single-player mode uses a **two-phase decision-making process**:

1. **Block Player's Winning Moves**: The AI first looks for any winning move that the player can make and blocks it. It prioritizes this step to ensure that the player does not win immediately.
2. **Build Towards a Win**: After blocking, the AI searches for opportunities to set up its own winning move. It evaluates the board for potential winning positions and prioritizes completing those setups.

This strategy ensures that the AI not only defends against the player’s moves but also actively works towards securing a victory when possible.

## Installation & Running the Game

1. Clone the repository:
2. Install dependencies:
   ```sh
   npm install && npm run dev
   ```

---

## Contributions

Contributions are welcome! Feel free to submit a pull request from your fork, or open an issue.

---

## License

This project is licensed under the MIT License. See `LICENSE` for details.
