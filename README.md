# 🚀 aprendeSwift

[![Version](https://img.shields.io/badge/version-1.5.0-blue.svg)](https://github.com/9alvaro0/swiftly/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/9alvaro0/swiftly/pulls)

**aprendeSwift** es una plataforma moderna y completa para publicar y descubrir posts y tutoriales sobre **Swift** y **SwiftUI**. Diseñada específicamente para la comunidad de desarrolladores iOS hispanohablantes, ofrece una experiencia de usuario excepcional con características avanzadas de gestión de contenido, engagement social y herramientas profesionales para autores.

🌐 **[Demo en vivo](https://aprendeswift.dev)** | 📖 **[Documentación](docs/)** | 🗺️ **[Roadmap](docs/ROADMAP.md)**

---

## ✨ Características Principales

### 📝 **Sistema de Contenido Avanzado**
- Editor de posts/tutoriales con markdown y syntax highlighting
- Gestión completa de borradores y publicación
- Sistema de tags y categorización
- Niveles de dificultad (Beginner, Intermediate, Advanced)
- Posts relacionados automáticos
- Tiempo de lectura y contador de palabras

### 👥 **Gestión de Usuarios**
- Autenticación completa (email/password, Google, GitHub)
- Sistema de roles (admin, editor, author, user, guest)
- Perfiles personalizables con estadísticas
- Dashboard para autores con métricas

### 💬 **Engagement y Social**
- Sistema de comentarios anidados con moderación
- Likes en posts y comentarios
- Social sharing con analytics detallados
- Newsletter con SendGrid integration
- Tracking de vistas únicas

### 🎨 **UI/UX Moderna**
- Diseño responsive mobile-first
- Tema oscuro optimizado para código
- Animaciones suaves con Framer Motion
- Loading states y skeleton screens
- Vista grid/lista toggleable

### 🔧 **Panel de Administración**
- Dashboard con estadísticas completas
- Gestión de usuarios con roles
- Moderación de contenido
- Gestión de newsletter y suscriptores
- Generación de SEO con IA (OpenAI)

### 🚀 **Developer Experience**
- TypeScript strict mode en todo el proyecto
- GitHub Project Management profesional
- CI/CD con GitHub Actions
- Templates para issues y PRs
- Documentación exhaustiva

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Estado**: Zustand
- **Animaciones**: Framer Motion

### Backend
- **Base de datos**: Firebase Firestore
- **Autenticación**: Firebase Auth
- **Storage**: Firebase Storage
- **Email**: SendGrid API
- **IA**: OpenAI API

### DevOps
- **Hosting**: Firebase App Hosting
- **CI/CD**: GitHub Actions
- **Monitoreo**: Firebase Analytics
- **SEO**: Sitemap dinámico, RSS/Atom feeds

---

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Cuenta de Firebase
- Cuenta de SendGrid (para emails)
- API key de OpenAI (opcional)

### Configuración Local

1. **Clona el repositorio**
```bash
git clone https://github.com/9alvaro0/swiftly.git
cd swiftly
```

2. **Instala las dependencias**
```bash
npm install
# o
yarn install
```

3. **Configura las variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# SendGrid
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
SENDGRID_ADMIN_EMAIL=

# OpenAI (opcional)
OPENAI_API_KEY=
```

4. **Ejecuta el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

## 📁 Estructura del Proyecto

```
swiftly/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componentes React
│   ├── services/         # Lógica de negocio
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Estado global (Zustand)
│   ├── types/           # TypeScript types
│   └── utils/           # Utilidades
├── docs/                # Documentación
├── firebase/            # Configuración Firebase
├── public/              # Assets públicos
└── .github/             # GitHub Actions y templates
```

Ver [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) para más detalles.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. **Fork** el repositorio
2. Crea una **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** tus cambios (`git commit -m 'feat: add amazing feature'`)
4. **Push** a la branch (`git push origin feature/amazing-feature`)
5. Abre un **Pull Request**

### Convenciones de Código
- Usa TypeScript strict mode
- Sigue las reglas de ESLint
- Escribe commits descriptivos
- Añade tests cuando sea posible

### Templates Disponibles
- 🐛 [Bug Report](.github/ISSUE_TEMPLATE/bug_report.yml)
- ✨ [Feature Request](.github/ISSUE_TEMPLATE/feature_request.yml)
- ⚡ [Enhancement](.github/ISSUE_TEMPLATE/enhancement.yml)

---

## 📋 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
npm run knip         # Detectar código muerto
npm run deploy       # Deploy a Firebase
```

---

## 🚀 Deployment

### Firebase App Hosting

1. **Configura Firebase**
```bash
firebase init hosting
```

2. **Build y deploy**
```bash
npm run build
firebase deploy
```

### Variables de Entorno en Producción
Asegúrate de configurar todas las variables de entorno en tu servicio de hosting.

---

## 📊 Roadmap

### 🎯 Próximas Características (v2.0)
- [ ] 📝 Editor avanzado con vista previa en tiempo real
- [ ] 🔍 Búsqueda técnica inteligente en contenido y código
- [ ] 💬 Comentarios con markdown y syntax highlighting
- [ ] ⚡ Optimizaciones de performance y lazy loading
- [ ] 📱 PWA para lectura offline

Ver el [ROADMAP completo](docs/ROADMAP.md) para más detalles.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más información.

---

## 👥 Equipo

- **Owner**: [@9alvaro0](https://github.com/9alvaro0)
- **Desarrollo**: AI Assistant (Claude)
- **Comunidad**: [Contribuidores](https://github.com/9alvaro0/swiftly/graphs/contributors)

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework increíble
- [Vercel](https://vercel.com/) por la inspiración
- [Firebase](https://firebase.google.com/) por el backend robusto
- La comunidad Swift hispanohablante ❤️

---

## 📞 Contacto

- **Website**: [aprendeswift.dev](https://aprendeswift.dev)
- **GitHub**: [github.com/9alvaro0/swiftly](https://github.com/9alvaro0/swiftly)
- **Email**: contact@aprendeswift.dev
- **Twitter**: [@aprendeswift](https://x.com/aprendeswift)

---

> Hecho con ❤️ para la comunidad Swift por [@9alvaro0](https://github.com/9alvaro0)

🤖 Generated with [Claude Code](https://claude.ai/code)