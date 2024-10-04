import { Component, OnInit, Output, EventEmitter, Input, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { IProduct } from '../../interfaces/iproduct';
import { ProductosService } from '../../services/productos.service';
import { Icategoria } from '../../interfaces/icategoria';
import { CategoriasService } from '../../services/categorias.service';
import { IMercancia } from '../../interfaces/imercancia';
import { ProductFilterPipe } from '../../pipes/product-filter.pipe';
import { CrearFacturaNewComponent } from '../crear-factura-new/crear-factura-new.component';

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule, ProductFilterPipe, CrearFacturaNewComponent,],
  templateUrl: './crear-factura.component.html',
  styleUrl: './crear-factura.component.scss'
})
export class CrearFacturaComponent implements OnInit, AfterViewChecked {

  constructor(private fb: FormBuilder,
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private elRef: ElementRef) {}

@Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de facturas

public formCreateProducto!: FormGroup;

categorias: Icategoria[] = []  // Inicializar array categories
productos: IProduct [] = [] // Inicializar array productas
mercancias: IMercancia[] = [] // inicializar array mercancias de factura

@Input() regimenUpdate: boolean = false;


headers = {nombre: "Nombre", categoria: "Categoria", cantidad: "Cantidad en almacen", precio: "Precio venta"};


// filter

filterSearch = '';
categoriaSearch = 0;

private buttonsInitialized = false;  // Флаг для предотвращения повторной инициализации



   // Cargamos listas de productas
  ngOnInit(): void {
    this.obtenerListaProductos()

  }

   // funccion para volver con lista de facturas
  volverMostrarFacturas ($flag: boolean) {
    this.volverMostrar.emit ($flag);
  }

  // funccion para obtener la lista con todas productos
obtenerListaProductos() {
  this.productosService.getProductos().subscribe (
    (data) => {
      this.productos = data;
      this.buttonsInitialized = false; // Сбрасываем флаг для повторной инициализации после загрузки данных
    },
    (error) => { console.log('Error data de producto', error)}
  );

  this.categoriasService.getCategorias().subscribe (
    (data) => {this.categorias = data;},
    (error) => { console.log('Error data de categorias', error)}
  );   // obtener datos de BD
}

// Этот хук срабатывает каждый раз, когда происходит изменение в DOM
  ngAfterViewChecked(): void {
    if (!this.buttonsInitialized && this.productos.length > 0) { // Инициализация кнопок после рендеринга
      this.initButtons();
      this.buttonsInitialized = true; // Обновляем флаг, чтобы не повторять инициализацию
    }
  }


  // Метод для добавления обработчиков на кнопки
  initButtons(): void {
    // Получение всех кнопок с классом 'anadir' после загрузки данных
    const buttons = this.elRef.nativeElement.querySelectorAll('.btn');
    console.log (buttons);
    // Добавление обработчика событий на каждую кнопку с классом 'aaa'
    buttons.forEach((button: HTMLElement) => {
      button.addEventListener('click', (event: MouseEvent) => {
        const buttonId = Number((event.target as HTMLElement).id);
        console.log(buttonId);
        const producto = this.productos.find(producto => producto.product_id == buttonId)
        const ifMercanciaExist = this.mercancias.find(mercancia => mercancia.m_id_productos == buttonId)
        if (producto && !ifMercanciaExist) {
          const newMercancia: IMercancia = {
            m_id_productos: buttonId,
            m_nombre_producto: producto.p_nombre,
            m_precio: producto.p_precio_compra,
            m_cantidad_pedida: 1,
            m_cantidad_recogida: 0,
            m_suma_pedida: producto.p_precio_venta,
            m_suma_recogida: 0,
            m_aceptado: false,
          }

          this.mercancias = [... this.mercancias, newMercancia];
          console.log(this.mercancias);
        }
      });
    });
  }

  // volveremos datos de factura de componente crear-factura-new
  actualizarMercancias(nuevasMercancias: IMercancia[]): void
  { this.mercancias = nuevasMercancias; }

}
