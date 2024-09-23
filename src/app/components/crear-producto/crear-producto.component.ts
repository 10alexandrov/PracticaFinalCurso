import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { IProduct } from '../../interfaces/iproduct';
import { ProductosService } from '../../services/productos.service';
import { response } from 'express';
import { Icategoria } from '../../interfaces/icategoria';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule,],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss'
})
export class CrearProductoComponent implements OnInit {

  constructor(private fb: FormBuilder,
             private productosService: ProductosService,
             private categoriasService: CategoriasService) {}
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios
  public formCreateProducto!: FormGroup;

  p_foto : ArrayBuffer | undefined = undefined;
  categorias: Icategoria[] = []  // Inicializar array categories


  ngOnInit(): void {


    this.categoriasService.getCategorias().subscribe (
      (data) => {this.categorias = data; console.log(this.categorias)},
      (error) => { console.log('Error data de categorias', error)}
    );   // obtener datos de BD


    this.formCreateProducto = this.fb.group({
      p_nombre: ['', [Validators.required, Validators.maxLength(50)]],
      p_description: ['', [Validators.maxLength(200)]],
      p_ancho: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
      p_longitud: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
      p_altura: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
      p_peso: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
      p_categoria: ['', Validators.required],
      p_foto: [''],
      p_precio_compra: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.min(0.01)]],
      p_precio_venta: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.min(0.01)]],
      p_codigo: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(13), Validators.minLength(13) ]],
      receiveInfo: [true]
    });

  }


    public sendDatos() {
      if (this.formCreateProducto.valid) {
        const productoNew: IProduct = {
          p_nombre: this.formCreateProducto.value.p_nombre,
          p_description: this.formCreateProducto.value.p_description,
          p_categoria: this.formCreateProducto.value.p_categoria+1,
          p_altura: this.formCreateProducto.value.p_altura,
          p_ancho: this.formCreateProducto.value.p_ancho,
          p_longitud: this.formCreateProducto.value.p_longitud,
          p_peso: this.formCreateProducto.value.p_peso,
          p_precio_venta: this.formCreateProducto.value.p_precio_venta,
          p_precio_compra: this.formCreateProducto.value.p_precio_compra,
          p_codigo: this.formCreateProducto.value.p_codigo,
          p_cantidad_entrega: 0,
          p_cantidad_enviado: 0,
          p_cantidad_reservado: 0,
          p_cantidad_almacen: 0,
          p_foto: this.p_foto,
        };
        this.productosService.createProducto(productoNew).subscribe((response) => this.volverMostrar.emit(true));
        console.log(productoNew);
      } else {
         console.log("form no es validate");
         this.formCreateProducto.markAllAsTouched(); // Помечаем все поля как затронутые, чтобы показать ошибки
        }
      }

      onFileSelected(event: any) {
        const file: File = event.target.files[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.p_foto = e.target.result;
          };

          reader.readAsDataURL(file);
        }
      }

}
