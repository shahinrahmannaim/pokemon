import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
 




@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<Pokemon[]> {
    // return POKEMONS;
    return this.http.get<Pokemon[]>('api/pokemon').pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,[])
    ));
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {

    return this.http.get<Pokemon>(`api/pokemon/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,undefined))

    );

  }
  addPokemon(pokemon: Pokemon):Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Pokemon>('api/pokemon',pokemon,httpOptions).pipe(
      tap((response) => console.log('Pokemon ajeute:', response)),
      catchError((error) => this.handleError(error, null))
    ) ;


  }
  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.put('api/pokemon',pokemon, httpOptions).pipe(
      tap((response) => console.log('Pokemon updated:', response)),
      catchError((error) => this.handleError(error, null))
    );
  }
  deletePokemonById(pokemonId: number):Observable<null>{
    return this.http.delete(`api/pokemon/${pokemonId}`).pipe(tap((response)=>this.log(response)),
    catchError((error) => this.handleError(error, null)))
  }
  

  private log(response: any) {
    console.table(response);

  }
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }


searchPokemonList(term: string): Observable<Pokemon[]> {
  if(term.length<=1){
    return  of([]);
  }
  
    return this.http.get<Pokemon[]>(`api/pokemon/?name=${term}`).pipe(tap((response)=>this.log(response)),
    catchError((error)=>this.handleError(error, [])));
  
  

}



  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];

  }





}
