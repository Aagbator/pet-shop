// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPetImageResponse, IPetPayload, IPet } from '../model/pet.interface';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  petUrl = environment.apiUrl + 'pet';

  constructor(private http: HttpClient) {}

  createPet(petPayload: IPetPayload): Observable<IPet> {
    return this.http.post<IPet>(`${this.petUrl}`, petPayload);
  }

  uploadPetImage(petId: number, formData: FormData): Observable<IPetImageResponse> {
    return this.http.post<IPetImageResponse>(`${this.petUrl}/${petId}/uploadImage`, formData);
  }

  getPetsByStatus(status: string): Observable<IPet[]> {
    return this.http.get<IPet[]>(`${this.petUrl}/findByStatus?status=${status}`);
  }
}
