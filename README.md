
  # Página de Inicio Institucional

  This is a code bundle for Página de Inicio Institucional. The original project is available at https://www.figma.com/design/oV0j7uFDXTGP7MbnI1se6d/P%C3%A1gina-de-Inicio-Institucional.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ---

  ## 📋 Registro de Errores y Soluciones

  ### 2025-11-17 · Navegación por rutas (deep link)

  - Error observado: Al abrir enlaces directos como `http://localhost:3001/inscripcion` o `https://<dominio>/inscripcion`, el sitio cargaba la página de inicio en lugar de mostrar la sección de Inscripción.
  - Causa raíz: La app no usaba enrutamiento basado en URL. La navegación estaba implementada solo con estado interno (`onNavigate`/`currentPage`), por lo que al recargar o acceder directamente a una ruta, no existía ningún router que resolviera el path.
  - Solución aplicada:
    - Se integró `react-router-dom` y se envolvió la app con `BrowserRouter` (`src/main.tsx`).
    - Se definieron rutas en `src/App.tsx` con `Routes`/`Route` para: `/` (Inicio), `/pensum`, `/inscripcion`, `/jornada`, `/galeria`, `/contacto`.
    - Se añadió redirección desde `/inscripción` (con tilde) hacia `/inscripcion` para admitir enlaces con acento.
    - Se agregó un fallback 404 que redirige a `/` para rutas no reconocidas.
    - Se actualizó `Navbar.tsx` y `Footer.tsx` para usar `Link`/`useLocation` y reflejar el estado activo por URL.
    - Se ajustó `nginx-spa.conf` para aceptar cualquier host con `server_name _;` manteniendo `try_files` a `index.html` (comportamiento SPA correcto en producción).
  - Por qué lo soluciona: `react-router-dom` interpreta la URL y monta el componente de página correspondiente, permitiendo el acceso directo (deep linking) y la recarga en cualquier ruta. El ajuste en Nginx garantiza que cualquier solicitud a una ruta existente sirva el `index.html`, delegando al router del navegador la resolución del path.
  - Verificación: Acceder directamente a `/inscripcion`, `/pensum`, `/jornada`, `/galeria`, `/contacto` carga cada página correspondiente sin redirigir a la raíz.

  ### ✅ Errores en Botones y Enlaces

  | Error | Ubicación | Estado | Verificación |
  |-------|-----------|--------|-------------|
  | **Botones de redes sociales (footer)** - Los enlaces de Facebook, Instagram y YouTube no llevaban a ningún lado | `Footer.tsx` línea 117-119 | ✅ SOLUCIONADO | Se configuraron para leer variables de entorno desde `.env.local`. Son completamente modificables. |
  | **Botón "Revisar Requisitos en Línea"** - No tenía funcionalidad | ~~No existe~~ | ✅ ELIMINADO | Se decidió eliminar este botón durante el desarrollo. |
  | **Botón "Explorar Carrera" (Inicio)** - Redirigía a sección de fotos | `Hero.tsx` línea 86 | ✅ SOLUCIONADO | Ahora redirige correctamente a la sección "Pensum": `onClick={() => onNavigate?.('pensum')}` |
  | **Botón "Cómo Llegar" (Ubicación)** - No tenía acción asignada | `MapaUbicacion.tsx` línea 138 | ✅ SOLUCIONADO | Ahora abre Google Maps: `onClick={() => window.open('https://maps.app.goo.gl/pnGsi8zyZvKVw1297', '_blank')}` |
  | **Botón "Conoce Más"** - No estaba programado | `TechVision.tsx` línea 171 y `MotivationalSection.tsx` línea 153 | ✅ SOLUCIONADO | Redirige al Pensum: `onClick={() => onNavigate?.('pensum')}` |
  | **Botón "Ver requisitos de inscripción"** - Falta de funcionalidad | `CallToAction.tsx` línea 107 | ✅ SOLUCIONADO | Redirige a Inscripción: `onClick={() => onNavigate?.("inscripción")}` |
  | **Botones de video** - Los videos no funcionaban | `VideoSection.tsx` línea 227 | ✅ SOLUCIONADO | Se implementó carga correcta de videos con detección de duración y timeout de 5 segundos para evitar "N/A". Reproducción con: `onClick={() => setPlayingVideo(video.id)}` |

  ### ✅ Errores de Contenido

  | Error | Ubicación | Estado | Solución Aplicada |
  |-------|-----------|--------|------------------|
  | **Número de teléfono incorrecto** - El número en "Contáctanos" no era correcto | `ContactoHero.tsx`, `Footer.tsx` | ✅ SOLUCIONADO | Se configuró para leer desde variable de entorno `VITE_PHONE_CONTACT` en `.env.local`. Completamente editable. |

  ### ✅ Mejoras Implementadas

  | Mejora | Ubicación | Estado | Implementación |
  |--------|-----------|--------|-----------------|
  | **Botón WhatsApp en "Contáctanos"** - Se necesitaba botón verde para WhatsApp | `ContactoHero.tsx` línea 145 | ✅ AGREGADO | Se añadió botón verde que redirige a WhatsApp: `onClick={sendWhatsAppMessage}` usando variable `VITE_WHATSAPP_PHONE` |
  | **Plan de inscripción incompleto** - Faltaban horarios y costos | `HorariosSection.tsx`, `DuracionSection.tsx` | ✅ COMPLETADO | Se agregaron secciones con: Horarios disponibles, Costo de inscripción y Costo mensual |
  | **Protección contra traducción automática** - Google Translate ofrecía traducir | `index.html` | ✅ SOLUCIONADO | Se configuró con `lang="es"`, `translate="no"` y meta tag `<meta name="google" content="notranslate" />` |

  ### 📝 Configuración Requerida

  Para que todos los botones y enlaces funcionen correctamente, el cliente debe crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

  ```env
  # Redes Sociales
  VITE_FACEBOOK_URL=https://www.facebook.com/TuPagina
  VITE_YOUTUBE_URL=https://www.youtube.com/@TuCanal
  VITE_TIKTOK_URL=https://www.tiktok.com/@TuPerfil
  VITE_GMAIL_URL=mailto:ejemplo@umg.edu.gt

  # Información de Contacto
  VITE_PHONE_CONTACT=XXXX-XXXX
  VITE_WHATSAPP_PHONE=502XXXXXXXXXX
  ```

  > **Nota:** Sin estas variables configuradas, algunos botones no funcionarán correctamente.  

  ---

  ## Notas técnicas recientes

  - Se actualizó `.env.example` para incluir todas las claves usadas en el código: `VITE_TIKTOK_URL`, `VITE_GMAIL_URL`, `VITE_GMAIL_EMAIL`, además de las ya existentes.
  - Se extendió `src/vite-env.d.ts` para tipar `VITE_PHONE_CONTACT`, `VITE_WHATSAPP_PHONE` y `VITE_GMAIL_EMAIL`.
  - `Dockerfile`: se cambió a `npm install` cuando no existe `package-lock.json` para evitar fallos en build. Si se añade `package-lock.json`, se puede volver a `npm ci`.