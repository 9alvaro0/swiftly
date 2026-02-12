# Auditoria de Proyecto - aprendeSwift (Swiftly)

**Fecha**: 2026-02-12
**Stack**: Next.js 15.3.0 | Firebase 11.6.0 | React 19 | Tailwind CSS v4 | OpenAI | SendGrid
**Estado**: Produccion en `aprendeswift.dev`
**Auditores**: 4 agentes especializados (Next.js, Firebase, Security, UI/UX)

---

## Resumen Ejecutivo

| Severidad | Total | Resueltos | Pendientes |
|-----------|-------|-----------|------------|
| CRITICO   | 20    | 7         | 13         |
| MEDIO     | 45    | 0         | 45         |
| LEVE      | 23    | 1         | 22         |
| **TOTAL** | **88**| **8**     | **80**     |

### Cosas bien hechas

1. Security rules de Firestore comprehensivos con RBAC y default-deny
2. Storage rules con validacion de tipo/tamano de archivo
3. Google Cloud Secret Manager para Firebase Admin credentials
4. Sanitizacion de filenames en uploads
5. Error handling centralizado con `handleFirebaseError()`
6. Transactions para toggle de likes
7. CORS correctamente restringido en produccion
8. Headers de seguridad basicos (X-Frame-Options, X-Content-Type-Options)
9. TypeScript strict mode activado
10. `.gitignore` correctamente excluye `.env*`
11. SendGrid para email (mejor que SMTP directo)
12. Validacion server-side en contact form
13. Cache prevention en rutas admin
14. External links con `rel="noopener noreferrer"`
15. Analytics `isSupported()` check para SSR

---

## CRITICOS (20)

### Seguridad / API

| ID | Issue | Archivo(s) | Estado |
|----|-------|-----------|--------|
| C-01 | ~~Admin API routes NO verifican tokens Firebase~~ - Reemplazado con `verifyAdminToken()` que usa `verifyIdToken()` + role check | `api/admin/tags`, `users`, `newsletter/route.ts` | RESUELTO |
| C-02 | ~~Admin Posts API sin autenticacion~~ - Agregado `verifyAdminToken()` al GET | `api/admin/posts/route.ts` | RESUELTO |
| C-03 | ~~Admin Tags GET sin autenticacion~~ - Agregado `verifyAdminToken()` al GET | `api/admin/tags/route.ts` | RESUELTO |
| C-04 | ~~SEO API sin auth, sin validacion~~ - Agregado `verifyAdminToken()` + validacion Zod + auth header en cliente | `api/generate-seo/route.ts`, `seoClient.ts` | RESUELTO |
| C-05 | ~~Newsletter Welcome como relay de spam~~ - Verifica suscripcion activa en Firestore + recencia <5min + rate limit | `api/newsletter/welcome/route.ts`, `middleware.ts` | RESUELTO |
| C-06 | XSS almacenado via `rehype-raw` ~~sin sanitizacion~~ + CSP tiene `unsafe-inline` y `unsafe-eval` | `PostContent.tsx`, `middleware.ts` | PARCIAL (rehype-sanitize agregado, CSP pendiente) |
| C-07 | Rate limiting en memoria NO funciona en produccion - Cloud Run multi-instancia, cada instancia tiene Map vacio | `middleware.ts` | PENDIENTE |
| C-08 | ~~`"use server"` incorrecto en API route~~ - Eliminado de generate-seo/route.ts | `api/generate-seo/route.ts` | RESUELTO |

### Firebase

| ID | Issue | Archivo(s) | Estado |
|----|-------|-----------|--------|
| C-09 | API keys Firebase hardcodeadas en source code en vez de env vars | `firebaseConfig.ts` | PENDIENTE |
| C-10 | ~~Credenciales Google App Password en `.env` en texto plano~~ - Eliminadas de .env | `.env` | RESUELTO |
| C-11 | Email admin hardcodeado en security rules - Single point of failure | `firestore.rules`, `storage.rules` | PENDIENTE |

### Next.js / Arquitectura

| ID | Issue | Archivo(s) | Estado |
|----|-------|-----------|--------|
| C-12 | CERO archivos `error.tsx` en todo el proyecto - Cualquier error crashea la pagina | Todas las rutas | PENDIENTE |
| C-13 | CERO archivos `not-found.tsx` - Paginas inexistentes devuelven HTTP 200 en vez de 404 | `posts/[slug]`, `tutorials/[slug]` | PENDIENTE |

### UI / Accesibilidad

| ID | Issue | Archivo(s) | Estado |
|----|-------|-----------|--------|
| C-14 | Modal sin focus trap, sin Escape key, sin aria-labelledby | `Modal.tsx` | PENDIENTE |
| C-15 | Select custom sin ARIA roles, sin navegacion por teclado | `Select.tsx` | PENDIENTE |
| C-16 | Mobile nav sin gestion de foco | `MobileNav.tsx` | PENDIENTE |
| C-17 | LoginForm SIN feedback de error visible al usuario | `LoginForm.tsx` | PENDIENTE |
| C-18 | RecoverForm es FAKE - Usa setTimeout, nunca llama a Firebase reset | `RecoverForm.tsx` | PENDIENTE |
| C-19 | LoginForm sin validacion client-side (ni email ni password) | `LoginForm.tsx` | PENDIENTE |
| C-20 | PostsFiltersMobile drawer sin accesibilidad (sin role, sin focus trap, sin Escape) | `PostsFiltersMobile.tsx` | PENDIENTE |

---

## MEDIOS (45)

### Seguridad

| ID | Issue | Archivo | Estado |
|----|-------|---------|--------|
| M-01 | Email HTML injection en plantillas de contacto y newsletter | `emailService.ts` | PENDIENTE |
| M-02 | CSP debilitado por `unsafe-inline` + `unsafe-eval` | `middleware.ts` | PENDIENTE |
| M-03 | Falta header HSTS (Strict-Transport-Security) | `middleware.ts` | PENDIENTE |
| M-04 | OpenAI API key potencialmente en Firestore | `ai/config.ts` | PENDIENTE |
| M-05 | `@types/uuid` en dependencies en vez de devDependencies | `package.json` | PENDIENTE |
| M-06 | Falta header `Permissions-Policy` | `middleware.ts` | PENDIENTE |
| M-07 | Email admin hardcodeado en rules (no escalable) | `firestore.rules` | PENDIENTE |

### Firebase / Data

| ID | Issue | Archivo | Estado |
|----|-------|---------|--------|
| M-08 | View increment sin auth, sin rate limit (abusable) | `firestore.rules`, `post.ts` | PENDIENTE |
| M-09 | `getAllPosts/Users/Tags` sin limit ni paginacion - Costo crece sin control | `post.ts`, `tags.ts`, `user.ts` | PENDIENTE |
| M-10 | Filtrado client-side en vez de queries indexados | `post.ts`, `user.ts` | PENDIENTE |
| M-11 | Archivo `firestore.indexes.json` VACIO - Sin composite indexes | `firestore.indexes.json` | PENDIENTE |
| M-12 | User PII completo persistido en localStorage | `authStore.ts` | PENDIENTE |
| M-13 | Logout limpia state ANTES de Firebase signOut (race condition) | `authStore.ts` | PENDIENTE |
| M-14 | `saveUser()` usa setDoc (sobreescribe todo el doc) + tipo incorrecto en stats.views | `user.ts`, `useLikes.ts` | PENDIENTE |
| M-15 | Newsletter subscribe sin auth, sin CAPTCHA, sin rate limit | `newsletter.ts` | PENDIENTE |
| M-16 | Transaction redundante alrededor de `increment()` | `post.ts` | PENDIENTE |
| M-17 | N+1 queries al popular autores de posts | `post.ts` | PENDIENTE |
| M-18 | Collection name mismatch: `newsletter` vs `newsletterSubscribers` | `firestore.rules` vs `newsletter.ts` | PENDIENTE |

### Next.js / Arquitectura

| ID | Issue | Archivo | Estado |
|----|-------|---------|--------|
| M-19 | CERO archivos `loading.tsx` - Sin feedback de navegacion | Todas las rutas | PENDIENTE |
| M-20 | Admin Dashboard fetcha TODO client-side (waterfall) | `admin/page.tsx` | PENDIENTE |
| M-21 | Admin Layout entero es `"use client"` - No permite metadata | `admin/layout.tsx` | PENDIENTE |
| M-22 | Edit Post page usa client-side fetch + muestra `null` mientras carga | `admin/posts/edit/[slug]/page.tsx` | PENDIENTE |
| M-23 | 7+ paginas publicas sin metadata SEO | `posts/`, `tutorials/`, `tags/`, `contact/`, `auth/`, `profile/` | PENDIENTE |
| M-24 | Contact page es `"use client"` innecesariamente - Bloquea metadata | `contact/page.tsx` | PENDIENTE |
| M-25 | Homepage con `force-dynamic` + `revalidate = 0` (NUNCA cachea) | `page.tsx` | PENDIENTE |
| M-26 | URL canonica incorrecta: `"tutorial"` en vez de `"tutorials"` (singular vs plural) | `metadataUtils.ts` | PENDIENTE |
| M-27 | `useSearchParams()` fuera de Suspense boundary | `admin/users/page.tsx` | PENDIENTE |
| M-28 | AuthInitializer wrappea toda la app en client boundary | `layout.tsx` | PENDIENTE |

### UI / Accesibilidad / Performance

| ID | Issue | Archivo | Estado |
|----|-------|---------|--------|
| M-29 | Input/Textarea icon buttons sin `aria-label` + sin focus ring | `Input.tsx`, `Textarea.tsx` | PENDIENTE |
| M-30 | Spinner sin `role="status"` ni texto accesible | `Spinner.tsx` | PENDIENTE |
| M-31 | Profile edit buttons sin `aria-label` (solo `title`) | `ProfileInfo.tsx`, `ProfileAvatar.tsx` | PENDIENTE |
| M-32 | Admin PostCard action buttons sin `aria-label` | `PostCard.tsx` (admin) | PENDIENTE |
| M-33 | PostImageHandler overlay buttons solo accesibles en hover (no touch) | `PostImageHandler.tsx` | PENDIENTE |
| M-34 | Admin user table no optimizada para mobile | `UserListClient.tsx` | PENDIENTE |
| M-35 | Sin `React.memo` en componentes de lista (PostCard, TutorialCard, etc.) | Multiples | PENDIENTE |
| M-36 | Sort sin `useMemo` - Recrea arrays en cada render | `PostsListClient.tsx`, `TutorialsListClient.tsx` | PENDIENTE |
| M-37 | Boton/LinkButton estilos duplicados (no compartidos) | `Button.tsx`, `LinkButton.tsx` | PENDIENTE |
| M-38 | Dos ErrorMessage components diferentes con distintas APIs | `ui/ErrorMessage.tsx` vs `contact/ErrorMessage.tsx` | PENDIENTE |
| M-39 | Idioma mezclado en admin (ES en UI publica, EN en tablas admin) | Multiples | PENDIENTE |
| M-40 | `HighlightText` regex con flag `gi` tiene bug de lastIndex - highlighting inconsistente | `HighlightText.tsx` | PENDIENTE |
| M-41 | Heading hierarchy rota (h1 -> h3 saltando h2) | `HeroSection.tsx`, `ProfileHeader.tsx` | PENDIENTE |
| M-42 | Logo alt text no descriptivo (`"Logo"`) | `Logo.tsx` | PENDIENTE |
| M-43 | TagBreadcrumbs sin structured data markup (JSON-LD) | `TagBreadcrumbs.tsx` | PENDIENTE |
| M-44 | PostCard accede a `imageUrl` potencialmente undefined | `PostCard.tsx` | PENDIENTE |
| M-45 | TagList function se llama `TagListProps` y texto dice "tutoriales" en vez de "tags" | `TagList.tsx` | PENDIENTE |

---

## LEVES (23)

| ID | Issue | Archivo | Estado |
|----|-------|---------|--------|
| L-01 | Feeds RSS/Atom/JSON con `force-static` (nunca se actualizan post-deploy) | `feed.xml/route.ts`, etc. | PENDIENTE |
| L-02 | Doble filtrado redundante de posts publicados | `FeaturedTutorials.tsx`, `LatestPosts.tsx` | PENDIENTE |
| L-03 | `<link>` tags duplicados (metadata export + JSX manual) | `layout.tsx` | PENDIENTE |
| L-04 | Meta tags de verificacion vacios (msvalidate, google-site-verification) | `layout.tsx` | PENDIENTE |
| L-05 | `AdminPostsPage` es `"use client"` sin necesidad (Suspense funciona en server) | `admin/posts/page.tsx` | PENDIENTE |
| L-06 | Nombre/heading mismatch: `NewTutorialPage` en ruta `/posts/new` | `admin/posts/new/page.tsx` | PENDIENTE |
| L-07 | `revalidateTagsPath` solo revalida admin, no paginas publicas | `revalidateTagsPath.ts` | PENDIENTE |
| L-08 | ProtectedRoute muestra flash de "No autorizado" antes de redirect | `ProtectedRoute.tsx` | PENDIENTE |
| L-09 | ~~Newsletter welcome endpoint sin rate limiting especifico~~ - Agregado rate limit 3 req/min para `/newsletter` | `middleware.ts` | RESUELTO |
| L-10 | Console.log excesivos en produccion (exponen UIDs, emails, queries) | Multiples archivos | PENDIENTE |
| L-11 | Contact form rate limiting en firestore.rules es stub (`return true`) | `firestore.rules` | PENDIENTE |
| L-12 | Delays artificiales (setTimeout 500ms-1000ms) en flujo de auth | `auth.ts` | PENDIENTE |
| L-13 | GitHub username derivado del email (incorrecto) - Deberia usar additionalUserInfo | `auth.ts` | PENDIENTE |
| L-14 | `usePosts.loadAllPosts` sin try/catch - isLoading queda true para siempre si falla | `usePosts.ts` | PENDIENTE |
| L-15 | `usePostViews` depende de objeto `user` completo (causa re-fires innecesarios) | `usePostViews.ts` | PENDIENTE |
| L-16 | `useLikes` depende de objeto `post` completo + useEffect duplicado | `useLikes.ts` | PENDIENTE |
| L-17 | `createTag()` directo exportado, bypasea validacion de API route | `tags.ts` | PENDIENTE |
| L-18 | Dev server binds a `0.0.0.0` (accesible en red local) | `package.json` | PENDIENTE |
| L-19 | `validateEmail` solo verifica que no sea vacio (nombre confuso) | `formUtils.ts` | PENDIENTE |
| L-20 | Pattern detection en middleware facilmente bypasseable (URL encoding, etc.) | `middleware.ts` | PENDIENTE |
| L-21 | Contraste de color bajo con `text-white/40`, `text-white/50` (posible fallo WCAG AA) | Global | PENDIENTE |
| L-22 | Tablas admin sin `<caption>`, TagList sin `<thead>` | Multiples admin components | PENDIENTE |
| L-23 | `StatsCard` usa `window.location.href` en vez de Next.js Link (full page reload) | `StatsCard.tsx` | PENDIENTE |

---

## Plan de Remediacion

### Fase 1 - Emergencia (HOY)
> Vulnerabilidades explotables en produccion ahora mismo

- [x] C-01, C-02, C-03: Implementar `verifyIdToken()` real en TODOS los admin API routes
- [x] C-04: Agregar auth al endpoint SEO + validacion de input con Zod
- [x] C-05: Agregar auth al endpoint newsletter welcome
- [x] C-06: Reemplazar `rehype-raw` con `rehype-sanitize` (CSP unsafe-inline/eval pendiente)
- [x] C-10: Eliminar credenciales de .env (recordar revocar App Password en Google)

### Fase 2 - Esta Semana
> Error handling, 404s, y fixes criticos de UX

- [x] C-08: Quitar `"use server"` de api/generate-seo/route.ts
- [ ] C-09: Mover Firebase config a NEXT_PUBLIC_* env vars
- [ ] C-12: Crear `error.tsx` root + en rutas con data fetching
- [ ] C-13: Crear `not-found.tsx` root + llamar `notFound()` en [slug] pages
- [ ] C-14: Modal: focus trap, Escape key, aria-labelledby
- [ ] C-15: Select: ARIA roles, keyboard navigation
- [ ] C-17, C-19: LoginForm: error feedback + validacion client-side
- [ ] C-18: RecoverForm: implementar Firebase `sendPasswordResetEmail()`
- [ ] M-26: Fix URL canonica "tutorial" -> "tutorials"

### Fase 3 - Este Sprint
> SEO, performance, y mejoras arquitectonicas

- [ ] M-02: CSP nonce-based (quitar unsafe-inline/eval)
- [ ] M-03: Agregar header HSTS
- [ ] M-06: Agregar header Permissions-Policy
- [ ] M-19: Crear `loading.tsx` en rutas principales
- [ ] M-23: Agregar metadata SEO a todas las paginas publicas
- [ ] M-24: Refactorizar Contact page (Server Component + Client form)
- [ ] M-25: Homepage ISR en vez de force-dynamic
- [ ] C-07: Rate limiting con Redis/Upstash (reemplazar Map en memoria)
- [ ] C-11: Quitar email hardcodeado de security rules, usar custom claims
- [ ] M-09, M-10, M-11: Paginacion en Firestore + crear composite indexes
- [ ] M-17: Fix N+1 queries de autores (batch fetch)

### Fase 4 - Backlog
> Mejoras incrementales de calidad

- [ ] M-01: HTML-encode inputs en email templates
- [ ] M-12: Reducir PII en localStorage (solo uid + isAuthenticated)
- [ ] M-13: Fix race condition en logout (Firebase signOut primero)
- [ ] M-14: Cambiar saveUser a updateDoc + fix tipo stats.views
- [ ] M-20, M-21, M-22: Refactorizar admin pages a Server Components
- [ ] M-28: Reestructurar AuthInitializer (no wrappear toda la app)
- [ ] M-35, M-36: React.memo en list items + useMemo en sorts
- [ ] C-16, C-20: Focus management en MobileNav y PostsFiltersMobile
- [ ] M-29-M-34: Agregar aria-labels a todos los icon buttons
- [ ] M-37-M-45: Fixes de consistencia, naming, y patterns
- [ ] L-01 a L-23: Todos los issues leves

---

## Historial de Cambios

| Fecha | Descripcion | Issues resueltos |
|-------|-------------|-----------------|
| 2026-02-12 | Auditoria inicial completa | - |
| 2026-02-12 | Fase 1 - Remediacion de emergencia: auth real en admin routes, SEO protegido con Zod, newsletter anti-spam, XSS sanitization, cleanup .env | C-01, C-02, C-03, C-04, C-05, C-06 (parcial), C-08, C-10, L-09 |

---

> **Nota**: Actualizar este documento cada vez que se resuelva un issue. Cambiar el estado de PENDIENTE a RESUELTO y agregar la fecha en el historial de cambios.
