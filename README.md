Node.js Chat Application

This is a simple terminal-based chat application built with pure Node.js, without any additional packages or libraries.
This application uses the net and readline modules to create a basic chat server and client, allowing multiple users to connect,
chat, and see messages sent by other users in real time.

Features

	•	Multi-user support: Multiple clients can connect to the server simultaneously.
	•	Real-time messaging: Messages from one user are broadcast to all connected users.
	•	Unique IDs: Each user is assigned a unique ID upon connection.
	•	Connection notifications: Users are notified when a new client joins or a user disconnects.
	•	Server-side handling: Error handling and graceful client disconnection.

Getting Started

Prerequisites

	•	Node.js (v14+)

Setup and Run

	1.	Clone or download the project files.
	2.	Navigate to the project directory:
 
 Run the server:
	•	Open a terminal and start the server with:
 
 Run the client:
	•	Open another terminal (or multiple terminals for multiple clients).
	•	Start the client with:

 How It Works

	•	Server:
	•	Listens on a specified IP and port.
	•	Assigns each connecting client a unique ID and broadcasts a connection message to other clients.
	•	Relays incoming messages from any client to all others.
	•	Notifies clients when a user disconnects.
	•	Client:
	•	Connects to the server and receives a unique ID.
	•	Reads user input, sends it to the server, and displays incoming messages from other clients.
	•	Utilizes readline for user input and net for server communication.

 Potential Enhancements

	•	Add usernames or nicknames for each client.
	•	Implement message encryption for secure communication.
	•	Support additional commands (e.g., private messaging, server commands).
	•	Add a command to list currently connected users.
