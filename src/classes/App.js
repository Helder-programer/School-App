import { Student } from "./Student.js";
import PromptSync from "prompt-sync";
import { User } from "./User.js";
const prompt = PromptSync();


export class App {
    students = [];
    user = new User();
    
    init() {
        this.login();
        let chosenOption;
        while (chosenOption != 5) {
            chosenOption = Number(prompt('O que deseja fazer?\n1-Cadastrar Aluno\n2-Ver Alunos existentes na aplicação\n3-Alterar nota do aluno\n4-Deletar estudante\n5-Sair\n'));

            switch (chosenOption) {
                case 1: this.addStudent(); break;
                case 2: this.showStudents(); break;
                case 3: this.updateScoreFromStudent(); break;
                case 4: this.deleteStudent(); break;
                case 5: console.log('Saindo...'); break;
                default: console.log('Opção Inválida');
            }
        }
    }


    addStudent() {
        let newStudentName = prompt('Digite o nome do estudante: ').trim();
        newStudentName = newStudentName.replace(/ +/g, ' ');
        let isValidStudentName = this.validateStudentName(newStudentName);
        if (!isValidStudentName) return console.log('Nome inválido');
        console.log(this.user.getUsername());
        const newStudent = new Student(newStudentName, this.user.getUsername());
        this.students.push(newStudent);
    }

    showStudents() {
        console.log('Estudantes presentes no banco de dados:');
        this.students.forEach((currentStudent, index) => {
            console.log(`Estudante ${++index} - ${currentStudent.name}; Notas: ${currentStudent.scores.join(' | ')}; Média: ${currentStudent.average}; Responsável: ${currentStudent.owner}`);
        });
    }

    updateScoreFromStudent() {
        let studentForScoreAlteration = this.searchStudent();

        if (!!!studentForScoreAlteration) return;

        let scoreForAlteration = Number(prompt('Digite o bimestre em que deseja alterar a nota: '));
        let isValidScoreForAlteration = scoreForAlteration >= 1 && scoreForAlteration <= 4;
        if (!isValidScoreForAlteration) return console.log('Bimestre inválido!');

        let newScore = Number(prompt('Nova nota: '));
        let isValidNewScore = newScore >= 0 && newScore <= 10;
        if (!isValidNewScore) return console.log('Nota inválida!');

        studentForScoreAlteration.scores[--scoreForAlteration] = newScore;

        this.calculateStudentAverage();

    }

    searchStudent() {
        let nameToStudentSearch = prompt('Digite o nome do estudante que deseja procurar: ');
        let searchedStudent = this.students.find(currentStudent => {
            return currentStudent.name == nameToStudentSearch;
        });

        if (!!searchedStudent) return searchedStudent;
        return console.log('Estudante não encontrado!');
    }

    deleteStudent() {
        let studentToDelete = this.searchStudent();
        if (!!!studentToDelete) return;

        let newStudentsArray = this.students.filter(currentStudent => {
            return currentStudent != studentToDelete;
        });

        this.students = newStudentsArray;
        console.log(`Estudante ${studentToDelete.name} Deletado com Sucesso!`);
    }

    validateStudentName(studentName) {
        let repeatName = false;
        this.students.forEach(currentStudent => {
            if (currentStudent.name == studentName) repeatName = true;
        });
        if (repeatName) return false;
        if (studentName == '') return false;
        return true;
    }

    calculateStudentAverage() {
        this.students.forEach(currentStudent => {
            let sumScores = 0;
            let studentAverage = 0;
            currentStudent.scores.forEach(currentScore => {
                sumScores += currentScore;
            });
            studentAverage = sumScores / 4;
            currentStudent.average = studentAverage.toFixed(2);
        });
    }

    login() {
        let userIsAuthenticated = false;
        while (!userIsAuthenticated) {
            let username = prompt('Usuário: ');
            let password = prompt('Senha: ');
            userIsAuthenticated = this.authenticateUser(username, password);
        }
    }

    authenticateUser(username, password) {
        let isAuthenticated = username == 'helder' && password == '12345';
        if (isAuthenticated) {
            console.log('Login realizado com sucesso!'); 
            this.user = new User(username, password);
            return true;
        }
        console.log('Usuário e/ou senha estão incorretos');
        return false;
    }
}