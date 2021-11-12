import { Component, OnInit } from "@angular/core";
import { HeroFacade } from "../../hero.facade";
import { Hero } from "../../models/hero";

@Component({
    selector:'app-heros-list',
    templateUrl:'./heros-list.component.html',
    styleUrls:['./heros-list.component.scss']
})
//it is a smart/container component, which composes of dumb component and interacts with facade layer
export class HerosListComponent implements OnInit{

    heros:Hero[] = []; //list of hero objects
    isUpdating:boolean = false; //used for showing/hiding loading spinner

    //it just depends on facade, and will not interact with core layer like async or state services
    constructor(private heroFacade:HeroFacade){}

    ngOnInit(){
        //subscribe for isUpdating, so we can show/hide loading spinner whenever changes are happening for heros list 
        this.heroFacade.isUpdating$().subscribe(isUpdating => this.isUpdating =isUpdating, err => console.error(err));
        //subscribe for heros list, so whenever list changes, UI will be updated
        this.heroFacade.getHeros$().subscribe(heros => this.heros = heros, err => console.error(err));
        //load the Heros on page load
        this.heroFacade.loadHeros();
    }

    onAddEvent(){
        //collect the information
        let heroToAdd:Hero = {id:-1,name:'',yearCreated:''};
        heroToAdd.name = prompt("Enter Hero's Name","Hero 1");
        heroToAdd.yearCreated = prompt("Enter Hero's Debut Year","1989");
        //call create method in facade layer to add hero
        this.heroFacade.createHero(heroToAdd);
    }

    onEditEvent(hero:Hero){
        //collect the information
        hero.name = prompt("Enter Hero's Name",hero.name);
        hero.yearCreated = prompt("Enter Hero's Debut Year",hero.yearCreated);
        //call update method in facade layer to update hero
        this.heroFacade.updateHero(hero);
    }

    onDeleteEvent(hero:Hero){
        //collect the information
        let canDelete = confirm(`Are you sure you want to delete ${hero.name} ?`);
        if(canDelete){
            //call remove method in facade layer to delete hero
            this.heroFacade.removeHero(hero);
        }
       
    }
}