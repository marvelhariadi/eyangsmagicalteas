# How to Run the application on Docker
0. Make sure that Marvel has MongoDB with the collection running on their machine on Atlas.
1. Navigate to the project directory: `cd .../eyangsmagicalteas`
2. Build the Docker image: `docker build -t eyangsmagicalteas .`
3. Start the Docker container: `docker run -d -p 3000:3000 -e MONGODB_URI="mongodb+srv://marvelhariadi:gfbPtUhvciqCvsJR@eyangsmagicalteas.awooomk.mongodb.net/?retryWrites=true&w=majority&appName=EyangsMagicalTeas" --name eyangsmagicalteas-app eyangsmagicalteas`
4. wait 30 seconds, then run `docker logs eyangsmagicalteas-app`.
5. You should see _Server is listening on port 3000. MongoDB connected successfully_

## Access
Open your web browser and go to: http://localhost:3000

## To stop the service
`docker stop eyangsmagicalteas-app && docker rm eyangsmagicalteas-app`
