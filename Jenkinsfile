pipeline {
    agent any

    tools {nodejs "nodejs"}

    stages {
        stage('Build') {
            steps {
                sh "npm run build"
            }
        }
        stage('Test') {
            steps {
                sh "npm run test"
            }
        }
    }
}