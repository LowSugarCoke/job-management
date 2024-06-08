## Frontend Setup


### Prerequisites
Ensure you have the following installed:
- **Node.js 20.x** or later: [Download Node.js](https://nodejs.org/en/download/)
- **npm**: Usually included with Node.js.


### Installing Dependencies
**Command:**

```bash
npm install
```

### Running the Application
**Command:**

```bash
npm start
```

You can view the app by navigating to [http://localhost:3000](http://localhost:3000) in your browser.

## Working with Docker

### Building the Docker Image

**Command:**

```bash
docker build -t {id}/{name} .
```

Replace `{id}` with your Docker ID and `{name}` with your desired image name.

### Running the Docker Container

**Command:**

```bash
docker run -p 3000:80 {id}/{name}
```

Replace `{id}` with your Docker ID and `{name}` with the name of the image you built.
You can view the app by navigating to [http://localhost:3000](http://localhost:3000) in your browser.
