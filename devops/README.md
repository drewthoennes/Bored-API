# DevOps Setups

## Start SonarQube
1. Make sure you have docker and docker-compose installed.

docker run -d --name sonarqube -p 9000:9000 sonarqube:lts

2. Go to `localhost:9000`

Login with 
```
username: admin
password: admin
```

3. Create new project called `bored-api` and generate a token named `bored-api`. Add the token to your environment variables.

```bash
export SONAR_TOKEN=<sonar-token>
```

4. Scan your project
```bash
npm run scan
```

## Start Jenkins

1. Run jenkins

```bash
docker run -p 8080:8080 -p 50000:50000 jenkins
```

2. 