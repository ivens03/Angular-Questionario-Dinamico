import { Component, OnInit } from '@angular/core';
import quiz_hxh from "../../../assets/data/quiz_hxh.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  
  title: string = "";
  questions: any;
  questionSelected: any = null; // Inicialize questionSelected como null

  answers: string[] = [];
  answerSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (quiz_hxh) {
      this.finished = false;
      this.title = quiz_hxh.title;
      this.questions = quiz_hxh.questions;

      if (this.questions.length > 0) { // Verifica se há pelo menos uma pergunta
        this.questionSelected = this.questions[this.questionIndex];
        this.questionMaxIndex = this.questions.length;
      }
    }
  }

  playerChose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true;
      this.answerSelected = quiz_hxh.results[finalAnswer as keyof typeof quiz_hxh.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length 
      ){
        return previous
      } else {
        return current
      }
    })
    return result
  }

}
