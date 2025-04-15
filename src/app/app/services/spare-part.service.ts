import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SparePart {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class SparePartService {
  private storageKey = 'spareParts';
  private parts: SparePart[] = [
    { id: 1, name: 'Brake Pad', price: 150, image: 'assets/part1.jpg' },
    { id: 2, name: 'Oil Filter', price: 50, image: 'assets/part2.jpg' }
  ];

  constructor() {
    const storedParts = localStorage.getItem(this.storageKey);
    if (storedParts) {
      this.parts = JSON.parse(storedParts);
    } else {
      this.saveParts();
    }
  }

  getSpareParts(): Observable<SparePart[]> {
    return of(this.parts);
  }

  addSparePart(part: Partial<SparePart>): Observable<boolean> {
    const newPart: SparePart = {
      id: new Date().getTime(),
      name: part.name || '',
      price: part.price || 0,
      image: part.image || 'assets/default-part.jpg'
    };
    this.parts.push(newPart);
    this.saveParts();
    return of(true);
  }

  editSparePart(updatedPart: SparePart): Observable<boolean> {
    const index = this.parts.findIndex(p => p.id === updatedPart.id);
    if (index > -1) {
      this.parts[index] = updatedPart;
      this.saveParts();
      return of(true);
    }
    return of(false);
  }

  deleteSparePart(partId: number): Observable<boolean> {
    this.parts = this.parts.filter(p => p.id !== partId);
    this.saveParts();
    return of(true);
  }

  private saveParts(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.parts));
  }
}
