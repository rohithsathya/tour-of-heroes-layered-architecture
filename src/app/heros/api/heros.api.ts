import { Injectable } from "@angular/core";
import  {HttpClient } from '@angular/common/http';
import { Hero } from "../models/hero";
import { Observable, of } from "rxjs";

@Injectable({providedIn:'root'})
export class HerosAPI{
    //API endpoint to hit, we are not using this as we will not be making actual api call
    private readonly API = '/api/heros';

    //Local dummy data, acting as Database
    private herosDB:Hero[] = [
        {id:1,name:'Captain America',yearCreated:'1941'},
        {id:2,name:'Black Panther',yearCreated:'1966'},
    ];

    constructor(private http : HttpClient){}

    getHeros():Observable<Hero[]>{
        return of([...this.herosDB]) ;// return dummy data
        //return this.http.get<Hero[]>(this.API);
    }

    createHero(hero:Hero):Observable<Hero>{
        hero.id = Date.now();//generate a unique id for the object
        this.herosDB.push(hero);//push the newly created object to master list
        return this.mockNetworkCall(hero);//mocking the network call by adding delay of 1 sec and returning the newly added hero object
        //return this.http.post(this.API,hero); //e.g. network call
    }
    updateHero(heroToUpdate:Hero):Observable<Hero>{
        const index = this.herosDB.findIndex((hero)=> hero.id == heroToUpdate.id); // find the index of hero to be updated
        this.herosDB[index] = heroToUpdate; //update the old object with new updated object
        return this.mockNetworkCall(heroToUpdate);//mocking the network call by adding delay of 1 sec and returning the new list
        //return this.http.put(`${this.API}/${heroToUpdate.id}`,hero); //e.g. network call
    }

    removeHero(heroToRemove:Hero):Observable<Hero>{
        const index = this.herosDB.findIndex((hero)=> hero.id == heroToRemove.id); // find the index of hero to be removed
        this.herosDB.splice(index,1); //remove the old object
        return this.mockNetworkCall(heroToRemove);//mocking the network call by adding delay of 1 sec and returning the new list
        //return this.http.delete(`${this.API}/${heroToUpdate.id}`); //e.g. network call
    }

    //mocking the network call by adding delay of 1 sec and returning the passed value
    mockNetworkCall(valueToReturn:any):Observable<any>{
        return Observable.create(observer => {
            setTimeout(()=>{
                observer.next(valueToReturn);
                observer.complete();
            },1000); //adding 1 sec delay
        })
    }
}