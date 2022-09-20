import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { PetService } from '../../core/services/pet.service';
import { IPet } from '../../core/model/pet.interface';
import { allStatus } from 'src/app/core/data';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class CreatePetComponent implements OnInit {

  public createPetForm!: FormGroup;
  public petImageForm!: FormGroup;
  public status:string[] = allStatus;
  private petResponse!: IPet;
  @ViewChild("stepper", { static: false }) stepper!: MatStepper;

  constructor(private petService: PetService) { }

  ngOnInit(): void {
    this.createPetForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required,  Validators.minLength(4)])
    });

    this.petImageForm = new FormGroup({
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
  }

  submitCreatePet(): void {
    this.petService.createPet(this.createPetForm.value).subscribe((res: IPet) => {
      this.petResponse = res;
      this.stepper.next();
    });
  }


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.petImageForm.patchValue({
        fileSource: file
      });
    }
  }

  uploadPetImage(): void {
    const formData = new FormData();
    formData.append('file', this.petImageForm.get('fileSource')?.value);
    this.petService.uploadPetImage(this.petResponse.id, formData).subscribe(res => {
      this.stepper.next();
    })
  }
}
