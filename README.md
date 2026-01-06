# AutoMarket : 🚗 Vehicle Budget Platform

**Plataforma digital que ayuda a las personas a encontrar el vehículo que realmente pueden pagar, no solo el que les gusta.**

![Status](https://img.shields.io/badge/status-demo-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

---

## 🎯 ¿Qué Problema Resuelve?

La mayoría de las plataformas de vehículos muestran catálogos completos y esperan que el usuario sepa qué puede pagar. Esto lleva a:

- ❌ Pérdida de tiempo viendo vehículos fuera de presupuesto
- ❌ Decisiones financieras poco informadas
- ❌ Frustración en el proceso de compra
- ❌ Sobreendeudamiento

**Nuestra solución invierte el proceso:**

En lugar de preguntar *"¿qué auto quieres?"*, preguntamos:
### 👉 *"¿Qué auto puedes comprar sin comprometer tu economía?"*

---

## ✨ Características Principales

### Para Compradores:
- 💰 **Calculadora de Presupuesto Real**: Ingresa enganche, mensualidad y plazo
- 🎯 **Resultados Personalizados**: Solo vehículos que realmente puedes pagar
- 📊 **Comparador Inteligente**: Compara hasta 3 opciones lado a lado
- 📍 **Ubicación de Agencias**: Encuentra vehículos cerca de ti
- 💡 **Educación Financiera**: Entiende el costo real de tu vehículo

### Para Agencias:
- 🎯 **Leads Calificados**: Usuarios con capacidad de compra confirmada
- ⚡ **Reducción de Fricción**: Menos tiempo perdido en prospectos no viables
- 📈 **Mayor Conversión**: Usuarios llegan sabiendo qué pueden comprar
- 🔌 **Integración Sencilla**: API simple para conectar tu inventario

---

## 🚀 Demo en Vivo

**🌐 [Ver Demo](https://tu-app.vercel.app)** *(próximamente)*

> **Nota**: Esta es una versión demo con datos ficticios. La versión de producción se conectará a inventarios reales de agencias.

---

## 🏗️ Tecnologías

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Deploy**: Vercel
- **Arquitectura**: Patrón Repository/Adapter para fácil transición a producción

---

## 📦 Estructura del Proyecto

```
vehicle-budget-platform/
├── apps/
│   └── web/              # Aplicación Next.js
├── docs/                 # Documentación
├── scripts/              # Scripts de utilidad
└── README.md
```

---

## 🛠️ Instalación para Desarrollo

### Prerrequisitos:
- Node.js 18+
- npm o yarn

### Pasos:

```bash
# Clonar el repositorio
git clone https://github.com/PacoTinoco/AutoMarket.git
cd vehicle-budget-platform

# Instalar dependencias
cd apps/web
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🎨 Screenshots

*Próximamente: Calculadora de presupuesto, resultados, comparador*

---

## 📋 Roadmap

### ✅ Fase 1: Demo (Actual)
- [x] Estructura base del proyecto
- [ ] Calculadora de presupuesto funcional
- [ ] Catálogo con datos mock
- [ ] Comparador de vehículos
- [ ] Landing page profesional
- [ ] Deploy en Vercel

### 🔄 Fase 2: MVP
- [ ] Integración con API de agencias
- [ ] Sistema de leads/contacto
- [ ] Dashboard básico para agencias
- [ ] Filtros avanzados

### 🔮 Fase 3: Escalado
- [ ] App móvil nativa
- [ ] Integración con financieras
- [ ] Sistema de notificaciones
- [ ] Analytics y métricas

---

## 🤝 Para Agencias Automotrices

¿Interesado en integrar tu inventario?

**Beneficios:**
- Recibe solo leads con capacidad de compra comprobada
- Integración técnica simple (API RESTful)
- Sin costo inicial de implementación
- Aumenta tus conversiones

📧 **Contacto**: 

---

## 📄 Documentación

- [Arquitectura Técnica](./docs/ARCHITECTURE.md)
- [Guía de Integración para Agencias](./docs/INTEGRATION_GUIDE.md)
- [Modelo de Negocio](./docs/BUSINESS_MODEL.md)

---

## 🙏 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

**Tu Nombre**
- GitHub: [@PacoTinoco](https://github.com/PacoTinoco)
- LinkedIn: [tu-perfil](https://linkedin.com/in/tu-perfil)

---

## 🌟 ¿Te Gusta el Proyecto?

Si este proyecto te parece útil, considera:
- ⭐ Dar una estrella al repositorio
- 🔄 Compartirlo con otros
- 🐛 Reportar bugs o sugerir mejoras

---

**Hecho con ❤️ en México para simplificar la compra de vehículos**