pipeline {
    agent any

    tools {nodejs "nodejs"}

    stages {
        stage('Build') {
            steps {
                sh "npm run build"
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
            junit './test-results.xml'
        }
    }
}