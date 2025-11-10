# 🔧 SOLUCIÓN: npm no reconocido en Windows

## 🚨 Problema
Después de instalar Node.js, la terminal no reconoce los comandos `node` o `npm`.

## ✅ SOLUCIÓN PASO A PASO

### **PASO 1: Verificar si Node.js está instalado**

1. Abre el **Explorador de archivos**
2. Ve a: `C:\Program Files\nodejs\`
3. Si ves una carpeta con archivos como `node.exe` y `npm.cmd`, Node.js está instalado ✅
4. Si NO ves esta carpeta, Node.js no se instaló correctamente ❌

### **PASO 2: Reiniciar la Terminal (MUY IMPORTANTE)**

Después de instalar Node.js, **DEBES** cerrar y volver a abrir:
- PowerShell
- CMD (Símbolo del sistema)
- Cualquier terminal que estés usando

**¿Por qué?** Porque la terminal necesita refrescar las variables de entorno (PATH).

### **PASO 3: Verificar el PATH (Si sigue sin funcionar)**

1. Presiona `Windows + R`
2. Escribe: `sysdm.cpl` y presiona Enter
3. Ve a la pestaña **"Opciones avanzadas"**
4. Haz clic en **"Variables de entorno"**
5. En **"Variables del sistema"**, busca la variable `Path`
6. Haz clic en **"Editar"**
7. Verifica que exista esta ruta:
   ```
   C:\Program Files\nodejs\
   ```
8. Si NO está:
   - Haz clic en **"Nuevo"**
   - Agrega: `C:\Program Files\nodejs\`
   - Haz clic en **"Aceptar"** en todas las ventanas
9. **Cierra y vuelve a abrir** todas las terminales

### **PASO 4: Reinstalar Node.js (Si nada funciona)**

1. Ve a: https://nodejs.org/
2. Descarga la versión **LTS** (Long Term Support)
   - Ejemplo: v20.11.0 o superior
3. Ejecuta el instalador
4. **IMPORTANTE**: Durante la instalación, asegúrate de marcar:
   - ✅ **"Add to PATH"** (Agregar al PATH)
   - ✅ **"Install npm package manager"**
5. Completa la instalación
6. **REINICIA tu computadora** (recomendado)
7. Abre una nueva terminal y prueba:
   ```bash
   node --version
   npm --version
   ```

### **PASO 5: Probar en diferentes terminales**

A veces funciona en una terminal pero no en otra. Prueba:

1. **CMD (Símbolo del sistema)**
   - Presiona `Windows + R`
   - Escribe: `cmd`
   - Presiona Enter
   - Ejecuta: `node --version`

2. **PowerShell**
   - Presiona `Windows + X`
   - Selecciona "Windows PowerShell" o "Terminal"
   - Ejecuta: `node --version`

3. **Git Bash** (si tienes Git instalado)
   - Abre Git Bash
   - Ejecuta: `node --version`

### **PASO 6: Verificar la instalación manualmente**

Abre el Explorador de archivos y verifica que existan estos archivos:

```
C:\Program Files\nodejs\node.exe
C:\Program Files\nodejs\npm.cmd
```

Si existen, Node.js está instalado pero no está en el PATH.

---

## 🎯 VERIFICACIÓN RÁPIDA

Abre una **NUEVA** terminal y ejecuta estos comandos uno por uno:

```bash
node --version
```
**Debería mostrar:** `v20.11.0` (o similar)

```bash
npm --version
```
**Debería mostrar:** `10.2.4` (o similar)

```bash
where node
```
**Debería mostrar:** `C:\Program Files\nodejs\node.exe`

```bash
where npm
```
**Debería mostrar:** `C:\Program Files\nodejs\npm.cmd`

---

## 🆘 SI NADA FUNCIONA

### Opción 1: Usar Node Version Manager (nvm-windows)

1. Descarga nvm-windows desde: https://github.com/coreybutler/nvm-windows/releases
2. Instala `nvm-setup.exe`
3. Abre una nueva terminal y ejecuta:
   ```bash
   nvm install lts
   nvm use lts
   ```

### Opción 2: Instalar desde Chocolatey

Si tienes Chocolatey instalado:
```bash
choco install nodejs-lts
```

### Opción 3: Usar instalador alternativo

Descarga desde: https://github.com/nodejs/node/releases
Busca la versión LTS para Windows (x64)

---

## ✅ CHECKLIST

- [ ] Node.js descargado desde nodejs.org
- [ ] Instalador ejecutado como Administrador
- [ ] Opción "Add to PATH" marcada durante instalación
- [ ] Terminal cerrada y reabierta después de instalar
- [ ] Computadora reiniciada (recomendado)
- [ ] `node --version` funciona
- [ ] `npm --version` funciona

---

## 📞 COMANDOS ÚTILES

Una vez que npm funcione, ejecuta en esta carpeta:

```bash
cd "C:\Users\angie\OneDrive\Documentos\BlogMaria"
npm install
```

---

## 🎉 ¡ÉXITO!

Cuando `npm --version` funcione, podrás continuar con la instalación del proyecto.

**Próximo paso:** Ejecuta `npm install` en la carpeta del proyecto.


