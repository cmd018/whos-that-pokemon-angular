import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export type StandardResponse = {
  description: string;
  response_type: string;
  status_code: number;
}

export type RandomPokemon = {
  data: {
    pokemonId: number;
    image: string;
    decoyNames: string[];
  }
}


export type VerifyPokemon = {
  data: {
    name: string;
    image: string;
    correct: boolean;
  }
}

export type RandomPokemonResponse = StandardResponse & RandomPokemon
export type VerifyPokemonResponse = StandardResponse & VerifyPokemon

export const BASE_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getRandomPokemon(id: number): Observable<RandomPokemonResponse> {
    return this.http.get<RandomPokemonResponse>(`${BASE_URL}/pokemon/random?id=${id}`);
  }

  verifyPokemon(pokemonId: number, name: string): Observable<VerifyPokemonResponse> {
    return this.http.post<VerifyPokemonResponse>(`${BASE_URL}/pokemon/verify`, {
      pokemonId, name
    });
  }
}
