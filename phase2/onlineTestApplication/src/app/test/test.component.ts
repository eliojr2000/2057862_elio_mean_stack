import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  constructor(public ser: TestService) { }

  ngOnInit(): void { }

  onSubmit()
  {
    var nodes = document.getElementsByClassName("onlineTestQuestion");

    for (var qNumber = 0; qNumber < this.ser.totalQuestions; qNumber++)
    {
      var a = (nodes[(qNumber * 4)] as HTMLInputElement)
      var b = (nodes[(qNumber * 4) + 1] as HTMLInputElement)
      var c = (nodes[(qNumber * 4) + 2] as HTMLInputElement)
      var d = (nodes[(qNumber * 4) + 3] as HTMLInputElement)

      var chosenLetter = "";

      if (a.checked)
        chosenLetter = "a";

      if (b.checked)
        chosenLetter = "b";

      if (c.checked)
        chosenLetter = "c";

      if (d.checked)
        chosenLetter = "d";

      var e = document.getElementById((qNumber + 1) + "Choice" + chosenLetter.toUpperCase() + "Label")


      if (this.ser.questions[qNumber].correct == chosenLetter)
      {
        if (e != null)
        {
          e.innerHTML += " - Correct";
          e.style.color = "LightGreen";
        }

      }
      else
      {
        if (e != null)
        {
          e.innerHTML += " - Incorrect, correct answer is: " + this.ser.questions[qNumber].correct;
          e.style.color = "red";
        }
      }

      a.disabled = true;
      b.disabled = true;
      c.disabled = true;
      d.disabled = true;
    }
  }

  resetLabels()
  {
    for (var qNumber = 0; qNumber < this.ser.totalQuestions; qNumber++)
    {
      var a = document.getElementById((qNumber + 1) + "ChoiceALabel");
      var b = document.getElementById((qNumber + 1) + "ChoiceBLabel");
      var c = document.getElementById((qNumber + 1) + "ChoiceCLabel");
      var d = document.getElementById((qNumber + 1) + "ChoiceDLabel");

      if(a!=null && b!=null && c!=null && d!=null)
      {
        a.innerHTML = "A. " + this.ser.questions[qNumber].a;
        b.innerHTML = "B. " + this.ser.questions[qNumber].b;
        c.innerHTML = "C. " + this.ser.questions[qNumber].c;
        d.innerHTML = "D. " + this.ser.questions[qNumber].d;
      }
    }
  }

  restart()
  {
    var nodes = document.getElementsByClassName("onlineTestQuestion");

    for (var qNumber = 0; qNumber < this.ser.totalQuestions; qNumber++)
    {
      var a = (nodes[(qNumber * 4)] as HTMLInputElement)
      var b = (nodes[(qNumber * 4) + 1] as HTMLInputElement)
      var c = (nodes[(qNumber * 4) + 2] as HTMLInputElement)
      var d = (nodes[(qNumber * 4) + 3] as HTMLInputElement)

      a.disabled = false;
      b.disabled = false;
      c.disabled = false;
      d.disabled = false;
      a.checked = false;
      b.checked = false;
      c.checked = false;
      d.checked = false;

      var aElement = document.getElementById((qNumber + 1) + "ChoiceALabel");
      var bElement = document.getElementById((qNumber + 1) + "ChoiceBLabel");
      var cElement = document.getElementById((qNumber + 1) + "ChoiceCLabel");
      var dElement = document.getElementById((qNumber + 1) + "ChoiceDLabel");

      if(aElement != null && bElement != null && cElement != null && dElement != null)
      {
        aElement.style.color = "black";
        bElement.style.color = "black";
        cElement.style.color = "black";
        dElement.style.color = "black";
      }

      this.resetLabels();

    }
  }
}
