import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private gradesCollection = collection(this.firestore, 'grades');

  constructor(private firestore: Firestore) { }

  getGrades(): Observable<Grade[]> {
    return collectionData(this.gradesCollection, { idField: 'id' }) as Observable<Grade[]>;
  }

  addGrade(grade: Grade) {
    return addDoc(this.gradesCollection, grade);
  }

  updateGrade(id: string, data: Partial<Grade>) {
    const gradeDoc = doc(this.firestore, `grades/${id}`);
    return updateDoc(gradeDoc, data);
  }

  deleteGrade(id: string) {
    const gradeDoc = doc(this.firestore, `grades/${id}`);
    return deleteDoc(gradeDoc);
  }
}

export interface Grade {
  id?: string;
  name: string;
  last: string;
  number: string;
  email: string;
  damm: string;
  oca: string;
  mate: string;
  pmp: string;
  m3d: string;
}