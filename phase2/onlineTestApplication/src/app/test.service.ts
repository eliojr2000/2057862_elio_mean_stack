import { Injectable } from '@angular/core';
import questions from '../assets/questions.json';

export class Question
{
  constructor(public number: number, public question: string, public a: string, public b: string, public c: string, public d: string, public correct: string){}
}


@Injectable({
  providedIn: 'root'
})

export class TestService
{

  questionsCorrect: number = 0;
  totalQuestions: number = 0;
  questions: Array<Question>= [];

  constructor()
  {
    Object.keys(questions).forEach(q =>
      {
        this.addQuestion(questions[q]);
      })
  }

  addQuestion(input: any)
  {
    var q = new Question(input.number, input.question, input.a, input.b, input.c, input.d, input.correct);
    this.questions.push(q);
    this.totalQuestions = this.totalQuestions + 1;
  }
}
