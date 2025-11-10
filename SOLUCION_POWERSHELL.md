# 🔧 SOLUCIÓN: PowerShell bloquea npm

## 🚨 Problema
```
npm : No se puede cargar el archivo C:\Program Files\nodejs\npm.ps1 
porque la ejecución de scripts está deshabilitada en este sistema.
```

## ✅ SOLUCIÓN RÁPIDA (Elija una opción)

### **OPCIÓN 1: Usar CMD en lugar de PowerShell (MÁS FÁCIL) ⭐**

1. Presiona `Windows + R`
2. Escribe: `cmd`
3. Presiona Enter
4. Navega a la carpeta:
   ```bash
   cd "C:\Users\angie\OneDrive\Documentos\BlogMaria"
   ```
5. Ejecuta:
   ```bash
   npm install
   ```

**¡Esto debería funcionar sin problemas!** ✅

---

### **OPCIÓN 2: Habilitar scripts en PowerShell (TEMPORAL)**

Ejecuta este comando en PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Luego ejecuta:
```bash
npm install
```

**Nota:** Esto solo afecta a tu usuario actual, no a todo el sistema.

---

### **OPCIÓN 3: Habilitar scripts solo para esta sesión**

Ejecuta este comando en PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

Luego ejecuta:
```bash
npm install
```

**Nota:** Esto solo funciona para la ventana actual de PowerShell.

---

### **OPCIÓN 4: Ejecutar npm directamente con cmd**

En PowerShell, puedes ejecutar npm usando cmd:

```powershell
cmd /c npm install
```

---

## 🎯 RECOMENDACIÓN

**Usa la OPCIÓN 1 (CMD)** porque:
- ✅ No requiere cambiar configuraciones
- ✅ Funciona inmediatamente
- ✅ Es más seguro
- ✅ No afecta otras configuraciones del sistema

---

## 📝 PASOS DETALLADOS PARA OPCIÓN 1

1. Cierra PowerShell
2. Presiona `Windows + R`
3. Escribe: `cmd`
4. Presiona Enter
5. En CMD, escribe:
   ```bash
   cd "C:\Users\angie\OneDrive\Documentos\BlogMaria"
   ```
6. Ejecuta:
   ```bash
   npm install
   ```
7. Espera a que termine (2-3 minutos)
8. Cuando termine, ejecuta:
   ```bash
   npm run dev
   ```

---

## ✅ VERIFICACIÓN

Después de ejecutar `npm install`, deberías ver:
```
added X packages, and audited Y packages in Z seconds
```

Y cuando ejecutes `npm run dev`:
```
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:5173/
```

---

## 🆘 Si nada funciona

Ejecuta este script que creé para ti:
1. Doble clic en `instalar-dependencias.bat`
2. Este script usa CMD automáticamente
3. Te guiará paso a paso

---

## 🎉 ¡LISTO!

Una vez que `npm install` funcione, podrás continuar con el proyecto.

**Próximo paso después de instalar:**
1. Configurar Supabase (ver COMANDOS.md)
2. Ejecutar `npm run dev`
3. Abrir http://localhost:5173

