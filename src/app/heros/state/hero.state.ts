import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Hero } from "../models/hero";

@Injectable({providedIn : 'root'})
export class HerosState{

    //observable which is used to show bust/loading spinner in the component
    private updating$ = new BehaviorSubject<boolean>(false);
    //observable which holds the list of Heroes
    private heros$ = new BehaviorSubject<Hero[]>(null);

    //getter and setter for state variables
    isUpdating$(){
        return this.updating$.asObservable();
    }
    setUpdating(isUpdating:boolean){
        this.updating$.next(isUpdating);
    }
    getHeros$(){
        return this.heros$.asObservable();
    }
    setHeros(heros:Hero[]){
        this.heros$.next(heros);
    }

    //CRUD operations for Hero
    createHero(hero:Hero){
        //get the list of current heroes
        const currentHeros = this.heros$.getValue();
        //add the new hero to existing state and notify the subscribers about the sate change.
        this.heros$.next([...currentHeros,hero]);
    }
    removeHero(heroToRemove:Hero){
        //get the list of current heroes
        const currentHeros = this.heros$.getValue();
        //remove the provided hero from existing state and notify the subscribers about the sate change.
        this.heros$.next(currentHeros.filter(hero => hero.id != heroToRemove.id));
    }
    updateHero(heroToUpdate:Hero){
        //get the list of current heroes
        const currentHeros = this.heros$.getValue();
        //find the index of hero to be updated
        const indexToUpdate = currentHeros.findIndex(hero => hero.id == heroToUpdate.id);
        //update the provided hero in the current list
        currentHeros[indexToUpdate] = heroToUpdate;
        //subscribers about the sate change.
        this.heros$.next([...currentHeros]);
    }


}