import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Grade } from '../grade.service';
import { GradeService } from '../grade.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonButton,
    IonInput,
    FormsModule, CommonModule
  ],
})
export class HomePage implements OnInit {

  grades$!: Observable<Grade[]>;
  newNameName: string = '';
  newLastName: string = '';
  newNumberName: string = '';
  newEmailName: string = '';
  newDammName: string = '';
  newOcaName: string = '';
  newMateName: string = '';
  newPmpName: string = '';
  newM3dName: string = '';


  //almacenes temporales para las variables que se van a editarr
  editingGradeId: string | null = null;
  editedNameName: string = '';
  editedLastName: string = '';
  editedNumberName: string = '';
  editedEmailName: string = '';
  editedDammName: string = '';
  editedOcaName: string = '';
  editedMateName: string = '';
  editedPmpName: string = '';
  editedM3dName: string = '';

  constructor(private gradeService: GradeService, private router: Router, private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadGrades();
  }

  loadGrades() {
    this.grades$ = this.gradeService.getGrades();
  }

  addGrade() {
    const name = this.newNameName.trim();
    const last = this.newLastName.trim();
    const number = this.newNumberName.trim();
    const email = this.newEmailName.trim();
    const damm = this.newDammName.trim();
    const oca = this.newOcaName.trim();
    const mate = this.newMateName.trim();
    const pmp = this.newPmpName.trim();
    const m3d = this.newM3dName.trim();


    if (!name) {
      alert('El nombre del estudiante es obligatorio');
      return;
    }

    if (!last) {
      alert('El apellido del alumno es obligatorio');
      return;
    }

    if (!number) {
      alert('La matrícula del alumno es obligatoria');
      return;
    }

    if (!email) {
      alert('El correo del alumno es obligatorio');
      return;
    }

    if (!damm) {
      alert('Esta calificación es obligatoria');
      return;
    }

    if (!oca) {
      alert('Esta calificación es obligatoria');
      return;
    }

    if (!mate) {
      alert('Esta calificación es obligatoria');
      return;
    }

    if (!pmp) {
      alert('Esta calificación es obligatoria');
      return;
    }

    if (!m3d) {
      alert('Esta calificación es obligatoria');
      return;
    }


    const newGrade: Grade = { name, last, number, email, damm, oca, mate, pmp, m3d };

    this.gradeService.addGrade(newGrade)
      .then(() => {
        console.log('Calificaciones agregadas');
        this.newNameName = '';
        this.newLastName = '';
        this.newNumberName = '';
        this.newEmailName = '';
        this.newDammName = '';
        this.newOcaName = '';
        this.newMateName = '';
        this.newPmpName = '';
        this.newM3dName = '';
      })
      .catch((err: unknown) => console.error('Error al agregar calificaciones:', err));
  }

  deleteGrade(id: string) {
    this.gradeService.deleteGrade(id)
      .then(() => console.log('Calificaciones eliminadas'))
      .catch((err: unknown) => console.error('Error al eliminar las calificaciones:', err));
  }

  //edicion de tareas inicia

  startEdit(grade: Grade) {
    this.editingGradeId = grade.id!;
    this.editedNameName = grade.name;
    this.editedLastName = grade.last;
    this.editedNumberName = grade.number;
    this.editedEmailName = grade.email;
    this.editedDammName = grade.damm;
    this.editedOcaName = grade.oca;
    this.editedMateName = grade.mate;
    this.editedPmpName = grade.pmp;
    this.editedM3dName = grade.m3d;
  }

  //guardar los cambios de la edicion

  saveEdit(gradeId: string) {
    const name = this.editedNameName.trim();
    const last = this.editedLastName.trim();
    const number = this.editedNumberName.trim();
    const email = this.editedEmailName.trim();
    const damm = this.editedDammName.trim();
    const oca = this.editedOcaName.trim();
    const mate = this.editedMateName.trim();
    const pmp = this.editedPmpName.trim();
    const m3d = this.editedM3dName.trim();

    if (!name) {
      alert('El nombre del estudiante es obligatorio');
      return;
    }

    if (!last) {
      alert('El apellido del alumno es obligatorio');
      return;
    }

    if (!number) {
      alert('La matrícula del alumno es obligatoria');
      return;
    }

    if (!email) {
      alert('El correo del alumno es obligatorio');
      return;
    }

    if (!damm) {
      alert('Esta calificación es obligatoria');
      return;
    }

    if (!oca) {
      alert('Esta calificación es obligatoria');
      return;
    }

    if (!mate) {
      alert('Esta calificación es obligatoria');
      return;
    }

    if (!pmp) {
      alert('Esta calificación es obligatoria');
      return;
    }

    if (!m3d) {
      alert('Esta calificación es obligatoria');
      return;
    }

    this.gradeService.updateGrade(gradeId, { name, last, number, email, damm, oca, mate, pmp, m3d })
      .then(() => {
        console.log('Producto actualizado');
        this.editingGradeId = null;    // Terminamos la edición
        this.editedNameName = '';     // Limpiamos el campo de edición
        this.editedLastName = '';
        this.editedNumberName = '';
        this.editedEmailName = '';
        this.editedDammName = '';
        this.editedOcaName = '';
        this.editedMateName = '';
        this.editedPmpName = '';
        this.editedM3dName = '';
      })
      .catch((err: unknown) => console.error('Error al actualizar las calificacions:', err));
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo cerrar sesión. Inténtalo de nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}