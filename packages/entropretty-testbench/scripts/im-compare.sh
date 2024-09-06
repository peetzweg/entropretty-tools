#!/bin/bash

# https://legacy.imagemagick.org/Usage/compare/#compare

imageA=$1
imageB=$2

echo "AE: Absolute Error"
compare -metric AE $imageA $imageB NULL:

echo "AE10: Absolute Error 10% Fuzz"
compare -metric AE -fuzz 10% $imageA $imageB NULL:

echo "MAE: Mean Absolute Error"
compare -metric MAE $imageA $imageB null: 2>&1

echo "MSE: Mean Squared Error"
compare -metric MSE $imageA $imageB null: 2>&1

echo "RSME: Root Mean Squared Error"
compare -metric RMSE $imageA $imageB null: 2>&1
