# Documento certificado de APP-Agmatice Google Play

## Introducción:
Los certificados son específicos de la versión Agmatice com.indicium.agmatice.com los mismo que se encuentra activos en la tienda en versión de prueba beta abierta, (ver anexo 1), en google play console podemos ver en el anexo 3 app Agmatice 1 activa (Publicada) y 2 con estado No publicada las mismas que son versiones Alpha no activas ya que se perdieron los certificados.

## Requerimientos
> ######Importante tener instalado:
> * Java
> * Android Studio
> * Córdova
> * Ionic 3

## Arrancar en local
```
$ ionic serve
```

### Scripts
./compile.sh --> compilación de codigo (ANDROID).
./start.sh   --> Opciones de arranque.

## Certificados:
Para comenzar hay que definir que son los certificados de app los mismo son firmas del autor de la app la cual son obligatorios para subir a Google play, estos son creados junto al Apk (Anexo 2 mirar creación Apk). Estos no puedan cambiar nunca en la vida útil de la app si la firma es distinta la app no se puede actualizar, (ojo no es seguro que se no puedan sustituir las credenciales con nuevas y seguir subido actualizaciones a la misma app), en este caso no se pude subir nuevas actualizaciones sin las credenciales.

## Creación de Certificado:


## Configurar de manera correcta las rutas del ambiente:
1. En Linux fue necesario crear rutas para utilizar java sdk, muy importante instalar gradle para poder compilar.
2. Luego de ello utilizamos un comando para que el complemento de la consola de depuración que esta habilitado, se elimine antes de generar las versiones de lanzamiento:
```
  $ ionic cordova plugin rm cordova-plugin-console
```
3. En el archivo de ionic config.xml tenemos que configurar el nombre de aplicación numero de versión, el autor:
![Alt text](./img_bitbucket/1.png?raw=true "Title")

4. Generemos nuestra clave privada usando el keytoolcomando que viene con el JDK
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

###Nota :
¡Asegúrese de guardar este archivo en un lugar seguro, si lo pierde no podrá enviar actualizaciones a su aplicación!

5. Para firmar el APK sin firmar, ejecute la jarsignerherramienta que también se incluye en el JDK:

```
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name
```

la clave para compilar la misma app montada en la tienda usa la clave: agmaticeAdmin

6. Esto firma el apk en su lugar. Finalmente, necesitamos ejecutar la herramienta de alineación de zip para optimizar el APK. La zipalignherramienta se puede encontrar en /path/to/Android/sdk/build-tools/VERSION/zipalign. 
Por ejemplo, en OS X con Android Studio instalado, zipalignestá en

```
~/Library/Android/sdk/build-tools/VERSION/zipalign:
```

```
$ zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk
```

7. Una vez realizado estos pasos el apk se generará en la raíz, si se quiere realizar otro apk se debe cambiar de nombre

# Nota:
Para mas información visitar la pagina oficial de ionic leer detalladamente no omitir ningún paso:
https://ionicframework.com/docs/v1/guide/publishing.html
Importante!
Donde se encuentras las credenciales a usarse ahora para la app activa están en la carpeta del proyecto Agmatice-test en la raíz con el nombre:
agmatice_test-key.keystore
no eliminar el archivo ni utilizar el comando nuevamente para crear un certificado nuevo el mismo que se encuentra en el punto 4 (keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000)
omitir este comando si se trabaja con la misma app que esta activa

* * * * * * * * * * * * * * * * * * * * * * * * * *

![Alt text](./img_bitbucket/2.png?raw=true "Title")

* * * * * * * * * * * * * * * * * * * * * * * * * *

![Alt text](./img_bitbucket/3.png?raw=true "Title")

# Final
Punto final el informe no se detalla precisamente la función de los comandos para crear el certificado mas si donde se encuentra y como usarlo, el archivo de respaldo de los certificados se adjuntará al informe

# comandos importantes:
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore agmatice_test-key.keystore "platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk" agmatice_test-key

zipalign -v 4 "platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk" agmatice.apk
sudo apt-get install zipalign
```
