#!/bin/bash
MAC=$1
BULBS=$2

function onClick {
    #code to be ran on click
    python /home/pi/Desktop/dash/toggle.py $BULBS
}

if [ -z "$(ifconfig | grep 'mon0')" ] # if not already up
then
    airmon-ng start wlan1
fi

START=$(date +%s);
tcpdump -l -i mon0 ether host "$MAC" | while read b; do
    END=$(date +%s);
    diff=`echo $((END-START)) | awk 'int($1%60)'` # Get time since last click.
    if [ $(($diff)) -gt 12 ] # wait more than 3 seconds after last click - tcdump has multiple outputs.
    then
        START=$(date +%s)
        onClick & # run in background
    fi
done
