#!/bin/sh
echo ///////////////////////////////////////////////////////////////////////////
echo // "Script by Mauricio Duque"                                            //
echo // "Start ionic"                                                          //
echo // ""                                                                    //
echo ///////////////////////////////////////////////////////////////////////////

# This script will test if you have given a leap year or not.

echo "Choose one of those options, only numbers, followed by [ENTER]:"
echo "Choose 1 for run: ionic serve"
echo "Choose 2 for run: ionic serve -c"
echo "Choose 3 for run: ionic serve -c -l"
echo "Choose 4 for command run android"
echo "Choose 5 for create apk"

read optionCase

echo you choosed "$optionCase"

case $optionCase in
  1)
    echo "Start command"
    ionic serve
    ;;
  2)
    echo "ionic serve -c"
    ionic serve -c
    break
    ;;
  3)
    echo "ionic serve -c -l"
    ionic serve -c -l
    ;;
  4)
    ionic cordova run android --device
    ;;
  5)
    # Create APK
    echo "Build a release version apk"
    ionic cordova plugin rm cordova-plugin-console
    ionic cordova build android --release
    ;;
  *)
    echo "Sorry you didnt choose as well"
esac
