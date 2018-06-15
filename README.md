# Assignments
API for adding and looking up Assignments

<b>API KEY to access API is qweqweqa123jk</b>

API Application can be brought up with below command, which will start Node server and Mongo db in a Docker Container. 
  
<b>docker-compose up </b>

Once Docker containers are running,

API will be exposed on URL http://localhost:3000/Health

Swagger UI tool for API reference and testing will be available on, 

http://localhost:3000/api-docs/

*********Please Note: Every call requires you to pass API Key as querystring. 
********+ http://localhost:3000/api/v1/Assignment?api_key=qweqweqa123jk&{other_parameters}
