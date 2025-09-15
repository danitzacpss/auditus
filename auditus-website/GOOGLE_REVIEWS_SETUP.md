# Configuración de Google Reviews

Esta guía te ayudará a configurar la integración de Google Reviews con la sección de testimonios.

## 1. Configurar Google Cloud Platform

### Habilitar APIs necesarias
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto o crea uno nuevo
3. Habilita las siguientes APIs:
   - **Places API (New)** - Para obtener reseñas
   - **Maps JavaScript API** - Para mostrar mapas (ya habilitada)

### Crear API Key
1. Ve a **APIs & Services > Credentials**
2. Haz clic en **Create Credentials > API Key**
3. Copia la API Key generada

### Restringir la API Key (Recomendado)
1. En Credentials, haz clic en tu API Key
2. En **Application restrictions**:
   - Selecciona **HTTP referrers (web sites)**
   - Agrega tu dominio: `https://tudominio.com/*`
3. En **API restrictions**:
   - Selecciona **Restrict key**
   - Selecciona: **Places API (New)** y **Maps JavaScript API**

## 2. Encontrar tu Place ID

### Método 1: Place ID Finder
1. Ve a [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Busca tu negocio
3. Copia el Place ID

### Método 2: Google My Business
1. Ve a [Google My Business](https://business.google.com/)
2. Selecciona tu negocio
3. En la URL verás algo como: `accounts.google.com/b/0/ManageAccount?hl=es&tab=XX&placeId=PLACE_ID_AQUI`

### Método 3: Usando la API
```bash
# Buscar por nombre y dirección
curl "https://places.googleapis.com/v1/places:searchText" \
  -H 'Content-Type: application/json' \
  -H 'X-Goog-Api-Key: TU_API_KEY' \
  -H 'X-Goog-FieldMask: places.id,places.displayName' \
  -d '{"textQuery":"Centro Auditus, Tu Dirección, Tu Ciudad"}'
```

## 3. Configurar Variables de Entorno

### Crear archivo .env.local
```bash
cp .env.example .env.local
```

### Editar .env.local
```bash
# Google Places API Configuration
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_GOOGLE_PLACE_ID=tu_place_id_aqui

# Opcional: Configurar cache (4 horas por defecto)
GOOGLE_REVIEWS_CACHE_TTL=14400000
```

## 4. Probar la Configuración

### Verificar que funciona
1. Ejecuta el proyecto: `npm run dev`
2. Ve a la página principal
3. La sección de testimonios debería cargar reseñas de Google

### Debug común
- **Error 403**: Verifica que tu API Key tenga permisos para Places API (New)
- **Error 400**: Verifica que tu Place ID sea correcto
- **No aparecen reseñas**: Tu negocio podría no tener reseñas públicas en Google

## 5. Límites y Cuotas

### Places API (New)
- **Gratuito**: 200 USD en créditos mensuales
- **Costo**: $17 USD por cada 1000 requests adicionales
- **Límite de requests**: Configurable en Google Cloud Console

### Optimizaciones implementadas
- **Cache local**: 4 horas por defecto
- **Fallback**: Si falla la API, muestra testimonios manuales
- **Deduplicación**: Evita llamadas concurrentes

## 6. Monitoreo

### Google Cloud Console
1. Ve a **APIs & Services > Dashboard**
2. Revisa el uso de "Places API (New)"
3. Configura alertas si es necesario

### En la aplicación
```javascript
// Ver métricas en el navegador
const cacheStatus = await service.getCacheStatus();
console.log('Cache status:', cacheStatus);
```

## 7. Personalización

### Filtros disponibles
```javascript
// En TestimonialsSection.tsx
const { hybridReviews } = useGoogleReviews({
  filters: {
    minRating: 4,        // Solo 4+ estrellas
    maxAge: 365,         // Últimos 365 días
    languages: ['es'],   // Solo español
    verified: true       // Solo verificadas
  }
});
```

### Configuración avanzada
```javascript
// Personalizar comportamiento
const config = {
  placeId: 'tu_place_id',
  apiKey: 'tu_api_key',
  cacheTTL: 3600000,     // 1 hora
  maxReviews: 20,        // Máximo 20 reseñas
  minRating: 3,          // Mínimo 3 estrellas
  languages: ['es', 'en'] // Español e inglés
};
```

## 8. Solución de Problemas

### La API no responde
1. Verifica que la API esté habilitada en Google Cloud
2. Revisa los límites de cuota
3. Confirma que el Place ID sea válido

### Las reseñas no se muestran
1. Tu negocio debe tener reseñas públicas en Google
2. Las reseñas deben cumplir con los filtros configurados
3. Verifica la configuración de cache

### Errores de CORS
Las requests se hacen desde el servidor (Next.js API routes), así que no debería haber errores de CORS.

## Contacto

Para soporte adicional, revisa:
- [Documentación de Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Google Cloud Support](https://cloud.google.com/support)