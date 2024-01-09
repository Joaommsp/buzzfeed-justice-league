import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = '';
  answerReason: string = '';
  answerImg: string = '';
  answerBg: string = 'background-image: none;'

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  start: boolean = false;
  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);
    }
  }

  startGame() {
    this.start = true;
    let el: HTMLElement = document.getElementById('quizz_options') as HTMLElement;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  playerChoice(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResults(this.answers)
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results].title
      this.answerReason = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results].reason
      this.answerImg = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results].image
      this.answerBg = `background-image: url(${quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results].bg});

      background-repeat: no-repeat;
      background-size: cover;
      background-position: 35% 20%;
      `
      // verificar opção ganhadora
    }
  }

  async checkResults(answers: string[]) {
    // ['A', 'A', 'B', 'A']
    const result = answers.reduce((previus, current, i, arr) => {
      if (
        arr.filter((item) => item === previus).length >
        arr.filter((item) => item === current).length
      ) {
        return previus
      } else {
        return current
      }
    });

    return result

  }

}
