# 🔒 Firebase Security Configuration Guide

## 📋 Configuración de Seguridad para aprendeSwift

### 🚨 **CRÍTICO: Implementar ANTES de Producción**

Este documento contiene las configuraciones de seguridad esenciales que deben implementarse en Firebase antes de lanzar aprendeSwift a producción.

---

## 1. 🛡️ Firestore Security Rules

### **Archivo**: `firestore.rules`
Las reglas de Firestore ya están creadas en el archivo `firestore.rules`. Para implementarlas:

1. **En Firebase Console**:
   ```bash
   # Navegar a: Firebase Console > Firestore Database > Rules
   # Copiar el contenido de firestore.rules y pegar en el editor
   # Hacer clic en "Publish"
   ```

2. **Usando Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init firestore  # Solo si no está inicializado
   firebase deploy --only firestore:rules
   ```

### **Características Implementadas**:
- ✅ **Posts**: Solo admins pueden crear/editar, lectura pública para posts publicados
- ✅ **Comments**: Usuarios autenticados pueden comentar, rate limiting incluido
- ✅ **Users**: Usuarios solo pueden ver su propio perfil
- ✅ **Tags**: Solo admins/editores pueden gestionar
- ✅ **Newsletter**: Subscripción pública, gestión admin-only
- ✅ **Contact**: Envío público, gestión admin-only

---

## 2. 🗂️ Storage Security Rules

### **Archivo**: `storage.rules`
Las reglas de Storage están en `storage.rules`. Para implementarlas:

```bash
firebase deploy --only storage
```

### **Características**:
- ✅ **Profile Images**: 5MB limit, solo el usuario propietario
- ✅ **Post Images**: 10MB limit, solo creadores de contenido
- ✅ **Temp Uploads**: 20MB limit, auto-cleanup recomendado
- ✅ **Site Assets**: Solo admins, público para lectura

---

## 3. 🔐 Configuración Manual de Admin

### **Crear Usuario Admin** (Sin Firebase Functions):

1. **Crear usuario en Firebase Console**:
   ```bash
   # Ve a: Firebase Console > Authentication > Users > Add User
   # Crear usuario con tu email y contraseña
   ```

2. **Agregar role en Firestore manualmente**:
   ```bash
   # Ve a: Firebase Console > Firestore Database > users/{uid}
   # Crear documento con:
   {
     "uid": "el_uid_del_usuario",
     "email": "tu-email@aprendeswift.dev", 
     "role": "admin",
     "name": "Tu Nombre",
     "isActive": true,
     "createdAt": "timestamp actual"
   }
   ```

### **Verificación**:
- ✅ Usuario creado en Authentication
- ✅ Documento en Firestore con role: "admin"  
- ✅ El sistema de roles funciona basado en Firestore, no custom claims

---

## 4. 🌐 Environment Variables

### **Archivo**: `.env.local` (Producción)

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_de_produccion
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=aprendeswift.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=aprendeswift-prod
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=aprendeswift-prod.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://aprendeswift.dev
NEXT_PUBLIC_SITE_NAME=aprendeSwift

# Email Service (SendGrid recomendado)
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@aprendeswift.dev

# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Security
NEXTAUTH_SECRET=tu_secret_muy_seguro_aqui
NEXTAUTH_URL=https://aprendeswift.dev
```

---

## 5. 📧 Email Service Setup

### **SendGrid Configuration**:

1. **Instalar dependencias**:
   ```bash
   npm install @sendgrid/mail
   ```

2. **Crear service**:
   ```typescript
   // src/services/email.ts
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   export async function sendWelcomeEmail(email: string, name: string) {
     const msg = {
       to: email,
       from: 'noreply@aprendeswift.dev',
       subject: '¡Bienvenido a aprendeSwift!',
       templateId: 'd-xxx', // SendGrid template ID
       dynamicTemplateData: { name }
     };
     
     await sgMail.send(msg);
   }
   ```

---

## 6. 🚦 Rate Limiting

### **Implementado en**: `src/middleware.ts`

**Límites Configurados**:
- ✅ **API General**: 100 requests/15min
- ✅ **Comments**: 10 requests/min
- ✅ **Contact**: 3 requests/min
- ✅ **Auth**: 5 requests/15min

---

## 7. 🔍 Security Headers

### **Configurado en**: `src/middleware.ts`

```typescript
// Headers de seguridad aplicados:
'X-Content-Type-Options': 'nosniff'
'X-Frame-Options': 'DENY'
'X-XSS-Protection': '1; mode=block'
'Referrer-Policy': 'strict-origin-when-cross-origin'
'Content-Security-Policy': [políticas específicas]
```

---

## 8. 📊 Monitoring & Logging

### **Configuraciones Recomendadas**:

1. **Firebase Analytics**:
   ```typescript
   // src/services/analytics.ts
   import { analytics } from '@/services/firebase/config';
   import { logEvent } from 'firebase/analytics';
   
   export function trackUserAction(action: string, params: any) {
     if (analytics) {
       logEvent(analytics, action, params);
     }
   }
   ```

2. **Error Tracking** (Sentry):
   ```bash
   npm install @sentry/nextjs
   ```

---

## 🚀 **Checklist de Implementación**

### **Pre-Producción** (CRÍTICO):
- [ ] ✅ Firestore Rules deployed
- [ ] ✅ Storage Rules deployed  
- [ ] ✅ Environment variables configuradas
- [ ] ✅ Primer admin user creado en Authentication
- [ ] ✅ Documento admin creado en Firestore users/{uid}
- [ ] ✅ Índice compuesto de Firestore creado
- [ ] ✅ Email service configurado
- [ ] ✅ Rate limiting activo
- [ ] ✅ Security headers activos

### **Post-Producción** (Recomendado):
- [ ] Error tracking configurado
- [ ] Analytics configurado
- [ ] Monitoring configurado
- [ ] Backup strategy implementada

---

## ⚠️ **Notas Importantes**

1. **Backup**: Las reglas actuales permiten lectura pública de posts publicados y comments, pero protegen drafts y datos de usuario.

2. **Rate Limiting**: Implementado a nivel de middleware. En producción, considera usar Redis para rate limiting distribuido.

3. **Custom Claims**: Requiere Firebase Functions para gestión dinámica de roles.

4. **Testing**: Prueba todas las reglas en un entorno de staging antes de production.

---

## 🆘 **Troubleshooting**

### **Error: "Permission Denied"**
- Verificar que las reglas estén deployed
- Confirmar que el usuario tenga los custom claims correctos
- Revisar la estructura de datos en Firestore

### **Error: "Rate Limit Exceeded"**
- Normal para desarrollo intensivo
- En producción, revisar patrones de uso
- Ajustar límites si es necesario

### **Error: "Email Not Sent"**
- Verificar configuración de SendGrid
- Confirmar que el dominio esté verificado
- Revisar logs de SendGrid dashboard

---

## 📞 **Contacto de Emergencia**

Si tienes problemas implementando estas configuraciones:

1. Revisar Firebase Console > Project Settings > Service Accounts
2. Verificar que las API keys sean correctas
3. Confirmar que el proyecto de Firebase sea el correcto

**¡La seguridad es CRÍTICA antes del lanzamiento!** 🔒