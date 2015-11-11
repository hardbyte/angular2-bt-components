import {Component} from 'angular2/angular2';
import {Markdown} from "../markdown/markdown";

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  directives: [Markdown]
})
export class HomeCmp {

  welcome: string = `

  # Welcome

  **Your** deployment of \`Angular 2 Seed\` worked perfectly!
  Click *about (above)* to get your reward!


  ## **This** is markdown

  ![Meow](http://ak-hdl.buzzfed.com/static/2014-04/enhanced/webdr03/4/16/enhanced-26552-1396642701-1.jpg)
  `;
}
