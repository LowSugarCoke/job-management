## Starting the Application

### Creating a Python Virtual Environment

1. **Create the virtual environment:**
   ```bash
   python -m venv backend-env
   ```

2. **Activate the virtual environment:**

   - **On Linux or macOS:**
     ```bash
     source backend-env/bin/activate
     ```
   - **On Windows:**
     ```bash
     .\backend-env\Scripts\activate
     ```

3. **Install the project dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

**Command:**
```bash
uvicorn app.main:app --reload
```
Access the application at [http://127.0.0.1:8000](http://127.0.0.1:8000).
Access the API documentation at [http://localhost:8000/docs](http://localhost:8000/docs)

## Running Tests
**Command:**
```bash
pytest
```


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
docker run -p 8000:80 {id}/{name}
```
Ensure to replace `{id}` with your Docker ID and `{name}` with the name of the image you built.
Access the application at [http://127.0.0.1:8000](http://127.0.0.1:8000).