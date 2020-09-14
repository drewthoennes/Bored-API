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
        stage('SonarQube') {
            steps {
                sh "npm run scan"
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