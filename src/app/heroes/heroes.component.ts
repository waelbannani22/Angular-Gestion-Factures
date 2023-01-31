import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
onClick(_t5: Hero) {
console.log(_t5.name)
}
OnSelect(_t5: Hero) {

console.log(_t5.name);
}


  hero = HEROES;
selectedHero: any;
  

}
