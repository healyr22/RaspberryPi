#!/bin/bash
POOL="44:65:0D:DA:E8:34"
BED="AC:63:BE:17:95:23"

sudo bash dash_detect.sh $BED 1 &
sudo bash dash_detect.sh $POOL 2,3 &