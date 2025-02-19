# SalesPredictionWebApp

## Descripción
SalesPredictionWebApp es una aplicación web desarrollada con **Angular v19** y **Angular Material v19** para la gestión de ventas y predicciones de pedidos.

## Tecnologías Utilizadas
- **Angular v19**: Framework frontend para la construcción de aplicaciones web dinámicas.
- **Angular Material v19**: Biblioteca de componentes UI para mejorar la experiencia de usuario.
- **TypeScript**: Lenguaje de programación que extiende JavaScript con tipado estático.
- **SCSS/CSS**: Para la estilización y diseño responsivo.
- **HTTP Client**: Para la comunicación con servicios backend.

## Estructura del Proyecto
```
app/
│── components/                # Componentes de la aplicación
│   ├── customers-list         # Listado de clientes
│   ├── customers-orders       # Ordenes de clientes
│   ├── header                 # Encabezado de la aplicación
│   ├── new-order              # Creación de nuevas órdenes
│
│── models/                    # Modelos de datos
│   ├── customer.model.ts       # Modelo de cliente
│   ├── employee.model.ts       # Modelo de empleado
│   ├── order.model.ts          # Modelo de orden
│   ├── product.model.ts        # Modelo de producto
│   ├── shipper.model.ts        # Modelo de transportista
│
│── services/                   # Servicios para gestionar datos
│   ├── customers               # Servicio de clientes
│   ├── employees               # Servicio de empleados
│   ├── orders                  # Servicio de órdenes
│   ├── products                # Servicio de productos
│   ├── shippers                # Servicio de transportistas
assets/
│── images/                     # Almacenamiento de imagenes
```

## Instalación y Ejecución
1. **Clonar el repositorio:**
   ```
2. **Instalar dependencias:**
   ```sh
   npm install
   ```
4. **Configurar la API:**   
   ```sh
   En app/services. Configurar la url de cada controlador.
   Ejemplo:
     private apiUrl = 'http://localhost:5166/api/Customers/';
  
     constructor(private http: HttpClient) { }

     getCustomers(): Observable<{ success: boolean; message: string; data: Customer []}> {
        return this.http.get<{ success: boolean; message: string; data: Customer [] }>(this.apiUrl + 'SalesDatePrediction')
           .pipe(
           catchError(() => {
              return of({ success: false, message: 'Error Querying Customers', data: [] }); 
           })        
           );
     }
   ```
4. **Ejecutar la aplicación:**
   ```sh
   ng serve
   ```

## Características Principales
- Gestión de clientes y sus órdenes.
- Creación de nuevas ordenes.
- Paginación y filtrado con **Angular Material**.
- Uso de **modales y diálogos** para interacción con el usuario.
- Diseño responsivo y optimizado.