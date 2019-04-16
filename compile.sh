#!/bin/sh
echo ///////////////////////////////////////////////////////////////////////////
echo // "Script by Mauricio Duque"                                            //
echo // "Start to Compile ANDROID version for PlayStore"                      //
echo // "To be secure agmatice_test-key.keystore KEYSTORE are in root folder" //
echo ///////////////////////////////////////////////////////////////////////////

# password : agmaticeAdmin

# Verified if agmatice.apk are in root folder
apkFile="./agmatice.apk"

build_android(){
  echo "Build"
  # Create APK
  echo "Build a release version apk"
  ionic cordova plugin rm cordova-plugin-console
  ionic cordova build android --release

  # Signed APK
  echo "Add keystore"
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore agmatice_test-key.keystore "platforms/android/build/outputs/apk/android-release-unsigned.apk" agmatice_test-key

  # Zip APK
  echo "Zip version"
  ~/Library/Android/sdk/build-tools/23.0.3/zipalign -v 4 "platforms/android/build/outputs/apk/android-release-unsigned.apk" agmatice.apk
}

# Another whay to find files in shell
# [ -f ./agmatice.apk ] && echo "Found" || echo "Not found"

echo "Do you want add platform? [android/ios/not], followed by [ENTER]:"
read platform

echo you choosed "$platform"

case $platform in
  android)
    echo Start
    # Create a platform
    echo "Add platform"
    ionic cordova platform add android
    break
    ;;
  ios)
    # Create a platform
    echo "Add platform"
    ionic cordova platform add ios
    break
    ;;
  n)
    echo "OK do nothing"
    break
    ;;
  *)
    echo Sorry you didnt choose as well
    break
    ;;
esac


echo "Do you want add platform? [compile/not], followed by [ENTER]:"
read compilePlat

echo you choosed "$compilePlat"

case $compilePlat in
  compile)
    echo Start
    (build_android)
    break
    ;;
  n)
    echo Skip
    break
    ;;
  *)
    echo Sorry you didnt choose as well
    break
    ;;
esac
