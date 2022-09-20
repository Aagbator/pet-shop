import { PetService } from './../../core/services/pet.service';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { allStatus } from 'src/app/core/data';
import { Observable } from 'rxjs';
import { IPet } from 'src/app/core/model/pet.interface';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {

  allStatus: string[] = allStatus;
  selectedStatus = allStatus[0];
  pets$!: Observable<IPet[]>


  constructor(public dialog: MatDialog, private petService: PetService) { }

  onChangeStatus(status: any) {
    this.selectedStatus = status;
    this.fetchPets();
  }

  fetchPets() {
    this.pets$ = this.petService.getPetsByStatus(this.selectedStatus);
  }

  showPetDetails(pet: IPet) {
    this.dialog.open(PetDialog, {
      data: pet,
    });
  }

  ngOnInit(): void {
    this.fetchPets();
  }
}

@Component({
  selector: 'pet-dialog',
  templateUrl: 'pet-dialog.html',
})
export class PetDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IPet) {}
}
