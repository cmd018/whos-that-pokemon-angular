import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PokemonService } from './pokemon.service';

const ROUND_SIZE = 10;
const MAX_POKEMONS = 50;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  loading = false;
  pokemonIds:Array<number> = [];
  imageURL = "";
  pokemonName = "";
  correctAnswer = false;
  userAnswer = "";
  showImage = false;
  index = 0
  round = 1;
  points = 0;
  play = true;
  decoyNames: string[] = [];

  constructor(private pokemonService: PokemonService) {
    this.pokemonIds = this.generateRandomIds();
  }

  checkAnswer = (id: number, name: string) => {
    this.userAnswer = name;
    this.pokemonService.verifyPokemon(id, name).subscribe(res => {
      this.pokemonName = res.data.name;
      this.showImage = true;
      if(res.data.correct) {
        this.points += 1;
        this.correctAnswer = true;
      }
    })
  }

  reset = () => {
    window.location.reload();
  }

  next = () => {
    if(this.index < 9) {
      this.loading = true;
      this.showImage = false;
      this.correctAnswer = false;
      this.pokemonName = "";
      this.imageURL = "";
      this.index = this.index + 1;
      this.pokemonService.getRandomPokemon(this.pokemonIds[this.index]).subscribe({
        next: res => {
          this.decoyNames = res.data.decoyNames;
          this.imageURL = res.data.image;
        },
        error(err) {
          throw new Error(err)
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  private generateRandomIds = (): number[] => {
    const arr:number[] = [];
    while(arr.length < ROUND_SIZE){
      var r = Math.floor(Math.random() * MAX_POKEMONS) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }

  ngOnInit(): void {
    this.pokemonService.getRandomPokemon(this.pokemonIds[0]).subscribe(res => {
      this.decoyNames = res.data.decoyNames;
      this.imageURL = res.data.image;
    }, (error) => {
      throw new Error(error)
    });
  }
}
