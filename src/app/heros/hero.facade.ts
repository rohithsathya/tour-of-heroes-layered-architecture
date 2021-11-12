import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HerosAPI } from "./api/heros.api";
import { Hero } from "./models/hero";
import { HerosState } from "./state/hero.state";

@Injectable({providedIn:'root'})
export class HeroFacade{
    constructor(private heroAPI:HerosAPI,private herosState:HerosState){}

    isUpdating$():Observable<boolean>{
        //returns observable from state, which helps in adding loading spinner in the component.
        return this.herosState.isUpdating$();
    }
    getHeros$():Observable<Hero[]>{
        //returns observable from state, which holds the list of Heroes
        return this.herosState.getHeros$();
    }

    //call this on page/app load to initialize state with list of heroes
    loadHeros(){
        //make the api call to get the list of heros
        this.heroAPI.getHeros() //Call API(network) to get heroes list
        .subscribe(
            (heros) => this.herosState.setHeros(heros), //on success, set the sate for heros list
            (error)=> console.error(error) //on error
        );
    }

    createHero(hero:Hero){
        this.herosState.setUpdating(true); //set the state of isUpdating to true, so UI can show loading spinner
        this.heroAPI.createHero(hero) //Call API(network) to create hero
        .subscribe( 
            (addedHero)=>this.herosState.createHero(addedHero),// on success - update the state
            (error) => console.error(error), //on error -  log error
            () => this.herosState.setUpdating(false) //on complete - mark isUpdating to false, so UI can hide loading spinner
        );
    }

    updateHero(heroToUpdate:Hero){
        this.herosState.setUpdating(true); //set the state of isUpdating to true, so UI can show loading spinner
        this.heroAPI.updateHero(heroToUpdate) //Call API(network) to update hero
        .subscribe( 
            (updatedHero)=>this.herosState.updateHero(updatedHero),// on success - update the state
            (error) => console.error(error), //on error -  log error
            () => this.herosState.setUpdating(false) //on complete - mark isUpdating to false, so UI can hide loading spinner
        );
    }

    removeHero(heroToRemove:Hero){
        this.herosState.setUpdating(true); //set the state of isUpdating to true, so UI can show loading spinner
        this.heroAPI.removeHero(heroToRemove) //Call API(network) to remove hero
        .subscribe( 
            (removedHero)=>this.herosState.removeHero(removedHero),// on success - update the state
            (error) => console.error(error), //on error -  log error
            () => this.herosState.setUpdating(false) //on complete - mark isUpdating to false, so UI can hide loading spinner
        );
    }
}