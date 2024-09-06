# Tattoo Test Bench

## Getting Started

Install bun => https://bun.sh/
```sh
curl -fsSL https://bun.sh/install | bash
```

To install dependencies:

```bash
bun install
```

To create sample set for a script

```sh
bun cli sample --amount 50 --size 200 ./entropretty/planets.js
```

Will create a folder `samples-planets` containing 50 generated images with a random seed of the size 200 by 200 pixel.

## Image Magick



Use [Image Magick `compare`](https://imagemagick.org/Usage/compare/) to compare AE, MAE, MSE, RMSE values between all sets of two of given images

```
brew install imagemagick
```

```sh
bun cli magick ./samples-lemonjelly/*.png
```

## Python Scripts

Make sure to use a virtual environment

```bash
python3 -m venv ./myenv
```

```bash
source ./myenv/bin/activate
```

Install python submodules

```bash
pip install -r requirements.txt
```

WIP: `./scripts/*.py` are AI collaborated scripts to find similar images.

```bash
python3 ./scripts/similiar.py ./samples-planets/ 0.95
```

Ideas:

+ Match first via procedural hash, than do pixel comparison

+ don't vary seed randomly, use it like it's use in InkSpec, it's just attached with the variant number.
=> testing for ProceduralAccount/ProceduralPersonalId are different


+ make sure it works! `draw` is actually exported.

+ make sure certain functions are not used. no use of FONTS

+ Make it as hard as possible by just mutating a single bit for a whole seed. See if there are collisions in only 1 bit changes to the input.