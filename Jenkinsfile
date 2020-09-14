pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('jenkins-sonarqube-token')
    }

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
        stage('SonarQube') {
            steps {
                //sh "npm run scan"
                echo "pass sonar qube at the moment"
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
    }
}