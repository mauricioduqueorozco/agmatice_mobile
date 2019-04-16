#!/bin/sh
echo ///////////////////////////////////////////////////////////////////////////
echo // "Script by Mauricio Duque"                                            //
echo // "Commit to repository"                                                //
echo // ""                                                                    //
echo ///////////////////////////////////////////////////////////////////////////

# This script will test if you have given a leap year or not.

echo "Type commit, followed by [ENTER]:"

read commitText

git add .
git commit -m "'$commitText'"
git push
