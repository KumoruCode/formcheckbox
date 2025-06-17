import { Component, inject } from '@angular/core';
import { FormServiceService } from './services/form-service.service';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoInterface } from './interfaces/tipo-interface';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  private formService = inject(FormServiceService);
  private fb = inject(FormBuilder);
  public comunidades: TipoInterface[] = [];
  public number: number[] = [1, 2, 3, 4, 5];

  public form = this.fb.group({
    comunidades: this.fb.array([])
  });

  get comunidadesFormArray() {
    return this.form.get('comunidades') as FormArray;
  }

  private resetFormArray() {
    // Limpiar el FormArray actual
    while (this.comunidadesFormArray.length) {
      this.comunidadesFormArray.removeAt(0);
    }
  }

  getComunidades(number: number) {
    // Resetear el array de comunidades y el FormArray
    this.comunidades = [];
    this.resetFormArray();

    if (!number) return; // Si no hay número seleccionado, no hacer nada

    console.log(number);
    this.formService.getComunidades(number).subscribe({
      next: (comunidades) => {
        // Inicializar el atributo checked para cada comunidad
        this.comunidades = comunidades.map(comunidad => ({
          ...comunidad,
          checked: false
        }));

        // Agregar cada comunidad como un FormControl
        this.comunidades.forEach(comunidad => {
          this.comunidadesFormArray.push(new FormControl(comunidad.checked));
        });
      },
      error: (error) => {
        console.error('Error fetching comunidades:', error);
      }
    });
  }

  onCheckboxChange(event: Event, index: number) {
    const checkbox = event.target as HTMLInputElement;
    // Actualizar el estado checked del objeto comunidad
    this.comunidades[index].checked = checkbox.checked;
    console.log('Comunidad actualizada:', this.comunidades[index]);
  }

  submit() {
    // Filtrar solo las comunidades que están checked
    const selectedComunidades = this.comunidades.filter(comunidad => comunidad.checked);
    console.log('Comunidades seleccionadas:', selectedComunidades);
  }
}
