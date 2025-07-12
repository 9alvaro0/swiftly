# GitFlow y Estrategia de Deployment con Firebase App Hosting

## 🔄 Estructura de Ramas + App Hosting

```
master (PROD) ← release (PRE) ← develop (DEV) ← feature branches
    ↓               ↓               ↓
App Hosting     App Hosting     App Hosting
(aprende-swift-prod) (aprende-swift-pre) (aprende-swift-dev)
```

### 📋 Descripción de Ramas

| Rama | Entorno | App Hosting Backend | Auto-Deploy | URL |
|------|---------|---------------------|-------------|-----|
| `master` | **PRODUCTION** | `aprende-swift-prod` | ✅ Push → Deploy | https://aprendeswift.dev |
| `release` | **PRE-PRODUCTION** | `aprende-swift-pre` | ✅ Push → Deploy | https://aprende-swift-pre--swiftly-by-warwere.web.app |
| `develop` | **DEVELOPMENT** | `aprende-swift-dev` | ✅ Push → Deploy | https://aprende-swift-dev--swiftly-by-warwere.web.app |

## 🚀 Flujo de Trabajo

### 1. **Desarrollo de Features**
```bash
# Crear feature branch desde develop
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad

# Desarrollar y hacer commits
git add .
git commit -m "feat: nueva funcionalidad"

# Push y crear PR a develop
git push -u origin feature/nueva-funcionalidad
# Crear PR: feature/nueva-funcionalidad → develop
```

### 2. **Deploy a Desarrollo (DEV)**
```bash
# Al hacer merge del PR a develop
✅ Firebase App Hosting detecta push automáticamente
🔍 Testing en: https://aprende-swift-dev--swiftly-by-warwere.web.app
```

### 3. **Promoción a Pre-producción (PRE)**
```bash
# Cuando develop esté estable
git checkout release
git pull origin release
git merge develop
git push origin release

# O crear PR: develop → release
✅ Firebase App Hosting auto-deploy en push
🎯 Testing final en: https://aprende-swift-pre--swiftly-by-warwere.web.app
```

### 4. **Deploy a Producción (PROD)**
```bash
# Cuando pre-prod esté validado
git checkout master
git pull origin master
git merge release
git push origin master

# O crear PR: release → master
✅ Firebase App Hosting auto-deploy en push
🚀 Live en: https://aprendeswift.dev
```

## 🛡️ Branch Protection Rules

### Master Branch
- ✅ Require pull request reviews (2 reviewers)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Restrict pushes to admins only
- ✅ Require review from code owners

### Release Branch
- ✅ Require pull request reviews (1 reviewer)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date

### Develop Branch
- ✅ Require status checks to pass
- ✅ Allow force pushes for admins

## 🔧 Configuración Requerida

### 1. Firebase App Hosting Backends
```yaml
# En Firebase Console → App Hosting
aprende-swift-prod: master branch    ✅ (configurado)
aprende-swift-pre:  release branch   ✅ (configurado)
aprende-swift-dev:  develop branch   ✅ (configurado)
```

### 2. GitHub Actions (Solo CI)
```yaml
# Solo para code quality, NO para deploys
ci.yml: ✅ Linting + Type checking + Tests
```

### 3. Branch Protection (Opcional pero recomendado)
```bash
# GitHub → Settings → Branches → Add protection rule
master:  Require PR reviews + status checks
release: Require PR reviews + status checks  
develop: Require status checks
```

## 📝 Comandos Útiles

### Hotfix de Emergencia
```bash
# Desde master, para fixes críticos
git checkout master
git checkout -b hotfix/critical-fix
# Fix y test
git checkout master
git merge hotfix/critical-fix
git push origin master
# Deploy automático a PROD
```

### Sync entre ramas
```bash
# Sincronizar develop con master (después de hotfix)
git checkout develop
git merge master
git push origin develop
```

## ⚡ Firebase App Hosting - Auto Deploys

| Evento | Rama | Backend | Entorno | Deploy |
|--------|------|---------|---------|--------|
| `push` → `develop` | develop | aprende-swift-dev | DEV | ✅ Automático |
| `push` → `release` | release | aprende-swift-pre | PRE | ✅ Automático |
| `push` → `master` | master | aprende-swift-prod | PROD | ✅ Automático |

> **Nota**: App Hosting maneja todos los deploys automáticamente. GitHub Actions solo para CI/CD quality checks.

## 🎯 Beneficios

- ✅ **Separación clara** de entornos
- ✅ **Testing progresivo** (DEV → PRE → PROD)
- ✅ **Rollbacks seguros** por rama
- ✅ **CI/CD automático** en cada nivel
- ✅ **Visibilidad completa** del estado
- ✅ **Protección de producción**