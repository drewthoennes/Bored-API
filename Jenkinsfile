pipeline {
    agent any

    tools {nodejs "nodejs"}

    stages {
        stage('Prepare Environment') {
            steps {
                sh "npm install"
            }
        }
        stage('Build') {
            steps {
                sh "npm run build"
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('https://sonar:9000/'){
                    sh "npm run sonar"
                }
                timeout(time:10, unit: 'MINUTES'){
                    waitForQualityGate abortPipeline: true
                }
            }   
        }
        stage('Unit Tests') {
            steps {
                echo "pass unit tests at the moment"
            }
        }
        stage('Acceptance Tests') {
            steps {
                sh "npm run test"
            }
        }
    }
    post {
        always {
            junit 'test/integration-test-results.xml'
            junit 'test/db-test-results.xml'
        }
        success {
            notifyTeams("Pipeline was successful", "SUCCESS")
        }
        failure {
            notifyTeams("Pipeline failed", "FAILURE")
        }
    }
}


def notifyTeams(msg, status) {
    office365ConnectorSend message: "${msg}", status:"${status}", webhookUrl:'${webhookUrl}' 
}