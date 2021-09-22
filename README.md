# Access Control NodeJS and MongoDB
Simple CRUD with Access Control using NodeJS, MongoDB and JWT running in Docker and Kubernetes Environment

### 1. JSON Web Token Implementation
![alt text](https://github.com/masardon/access_control-node-devops/blob/main/images/jwt_arch.jpg "JWT Implementation")

### 2. NodeJS and MongoDB Architecture with Authentication and Authorization
![alt text](https://github.com/masardon/access_control-node-devops/blob/main/images/nodejs_arch.jpg "AA Architecture")

### 3. How to RUN
* Using Kubectl
~~~~
- kubectl apply -f kube/
~~~~

* Using Docker and Swarm
~~~~
- docker stack deploy --compose-file docker-compose.yaml ac-node-devops
~~~~

### 4. How to Access
~~~~
- API Server Port : 8001
- Base URL : http://[yourIPAddress]:8001
- MongoDB Port : 27017
~~~~

### 5. Admin User	
~~~~
- Username : adminadd
- Password : adminpass
~~~~
