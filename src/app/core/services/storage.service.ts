// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setLocalStorage(key: string, value: any) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getLocalStorage(key: string) {
    if (!key) {
      return;
    }
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : '';
  }

  clearLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

}
