# Documentación de templates - festivalManager/invitetomeFront

A continuación se presenta la documentación en formato Markdown, que resume y explica los cambios realizados. Los cambios se han agrupado por tipo para facilitar la comprensión y el seguimiento.

## Nuevas Funcionalidades

### Gestión de Plantillas y Editor

- **Creación y mejora del Editor de Plantillas:**  
  Se ha implementado y mejorado el componente `EditorPanel`, permitiendo la edición avanzada de campos y la integración de nuevos elementos como ubicación de recogida, logotipo y estilos personalizados.
- **Integración de Google Maps y Calendario:**  
  El componente `PreviewPanel` ahora permite mostrar ubicaciones de eventos mediante Google Maps y añadir eventos al calendario.
- **Soporte multilenguaje y traducciones:**  
  Se ha añadido soporte para múltiples idiomas en las plantillas y componentes, facilitando la internacionalización de la aplicación.
- **Gestión de logotipos:**  
  Se ha creado el componente `LogoUploader` para la carga, validación y previsualización de logotipos en los eventos y plantillas.
- **Nuevos campos en plantillas:**  
  Se han añadido campos como ubicación de recogida y detalles de contacto en las plantillas de eventos.

### Experiencia de Usuario

- **Mejoras en la navegación móvil:**  
  Se han realizado ajustes en el diseño y la disposición de los componentes para mejorar la experiencia en dispositivos móviles.
- **Accesibilidad y usabilidad:**  
  Se han actualizado iconos, etiquetas y colores para mejorar la claridad y accesibilidad de la interfaz.

## Refactorizaciones y Mejoras

- **Optimización de la gestión de estado:**  
  Se han simplificado y optimizado funciones y hooks para una mejor gestión del estado en los componentes.
- **Mejoras en el diseño y estilos:**  
  Se han actualizado estilos, fuentes y colores en las plantillas y componentes para lograr una mayor consistencia visual.

## Ejemplos de Uso

### Ejemplo: Uso del componente LogoUploader

```tsx
<LogoUploader
  logoUrl={logoUrl}
  onUpload={handleLogoUpload}
  onClear={handleLogoClear}
/>
```

Este componente permite al usuario cargar y previsualizar el logotipo de un evento, con validación de archivos y manejo de errores.

### Ejemplo: Integración de Google Maps en PreviewPanel

```tsx
<PreviewPanel eventLocation={eventLocation} showGoogleMaps={true} />
```

Permite mostrar la ubicación del evento en un mapa interactivo dentro de la previsualización de la plantilla.

---

## Conclusión

Los cambios realizados en esta rama han mejorado significativamente la funcionalidad, usabilidad y organización del proyecto. Se han añadido nuevas características orientadas a la gestión avanzada de eventos y plantillas, se ha optimizado la estructura de datos y se ha reforzado la experiencia de usuario tanto en escritorio como en dispositivos móviles.
