import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Hero } from "../../models/hero";

@Component({
    selector:'app-hero-view',
    templateUrl:'./hero-view.component.html',
    styleUrls:['./hero-view.component.scss']
})
//it is a dumb component, it is purely a presentational component, 
//it is concerned with how we get Hero data and how we manage edit/delete events
export class HeroViewComponent{

    //input - expects the data from parent.
    @Input() hero:Hero;
    //output - delegates events to parent to handle.
    @Output() onEdit = new EventEmitter<Hero>();
    @Output() onDelete = new EventEmitter<Hero>();

    constructor(){}
    onEditEvent(){
        this.onEdit.emit(this.hero);
    }
    onDeleteEvent(){
        this.onDelete.emit(this.hero);
    }

}