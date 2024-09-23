import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { IProduct } from '../../interfaces/iproduct';
import { ProductosService } from '../../services/productos.service';
import { Icategoria } from '../../interfaces/icategoria';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit{


  constructor(private fb: FormBuilder,
    private productosService: ProductosService,
    private categoriasService: CategoriasService) {}

  @Input() productoParaEditar!:IProduct;
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios
  public formUpdateProducto!: FormGroup;

  idProductoParaUpdade : number = 5;
  p_foto : ArrayBuffer | undefined = undefined;
  categorias: Icategoria[] = []  // Inicializar array categories
  productoParaUpdate: IProduct[] = []  // Inicializar array producto para update


  ngOnInit(): void {


    this.categoriasService.getCategorias().subscribe (
      (data) => {this.categorias = data; console.log(this.categorias)},
      (error) => { console.log('Error data de categorias', error)}
    );   // obtener datos de BD


    this.formUpdateProducto = this.fb.group({
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

    if (this.productoParaEditar) {
      this.formUpdateProducto.patchValue({
        p_nombre: this.productoParaEditar.p_nombre,
        p_description: this.productoParaEditar.p_description,
        p_ancho: this.productoParaEditar.p_ancho,
        p_longitud: this.productoParaEditar.p_longitud,
        p_altura: this.productoParaEditar.p_altura,
        p_peso: this.productoParaEditar.p_peso,
        p_categoria: this.productoParaEditar.p_categoria-1,
        p_foto: this.productoParaEditar.p_foto,
        p_precio_compra: this.productoParaEditar.p_precio_compra,
        p_precio_venta: this.productoParaEditar.p_precio_venta,
        p_codigo: this.productoParaEditar.p_codigo,
      });
    }

  }


    public sendUpdateDatos() {
      if (this.formUpdateProducto.valid) {
        const productoNew: IProduct = {
          p_nombre: this.formUpdateProducto.value.p_nombre,
          p_description: this.formUpdateProducto.value.p_description,
          p_categoria: this.formUpdateProducto.value.p_categoria+1,
          p_altura: this.formUpdateProducto.value.p_altura,
          p_ancho: this.formUpdateProducto.value.p_ancho,
          p_longitud: this.formUpdateProducto.value.p_longitud,
          p_peso: this.formUpdateProducto.value.p_peso,
          p_precio_venta: this.formUpdateProducto.value.p_precio_venta,
          p_precio_compra: this.formUpdateProducto.value.p_precio_compra,
          p_codigo: this.formUpdateProducto.value.p_codigo,
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
         this.formUpdateProducto.markAllAsTouched(); // Помечаем все поля как затронутые, чтобы показать ошибки
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

