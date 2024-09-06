import os
import sys
import imagehash
from PIL import Image
import heapq
from itertools import combinations

def compute_perceptual_hash(image_path):
    try:
        img = Image.open(image_path)
        return imagehash.phash(img)
    except IOError as e:
        print(f"Error opening image file {image_path}: {e}")
        return None

def compare_images(folder_path):
    image_hashes = {}
    image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]

    # Compute hashes for all images
    for image_file in image_files:
        image_path = os.path.join(folder_path, image_file)
        hash_value = compute_perceptual_hash(image_path)
        if hash_value is not None:
            image_hashes[image_file] = hash_value

    # Compare all pairs of images
    similarities = []
    for (img1, hash1), (img2, hash2) in combinations(image_hashes.items(), 2):
        distance = hash1 - hash2
        similarity = 1 - (distance / 64)  # Normalize to [0, 1] range
        similarities.append((similarity, img1, img2))

    # Get the 10 most similar pairs
    top_10_pairs = heapq.nlargest(10, similarities)

    return top_10_pairs

def main():
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <folder_path>")
        sys.exit(1)

    folder_path = sys.argv[1]

    if not os.path.isdir(folder_path):
        print("The provided path is not a valid directory.")
        sys.exit(1)

    top_10_pairs = compare_images(folder_path)

    print("\nTop 10 most similar image pairs:")
    for similarity, img1, img2 in top_10_pairs:
        print(f"{folder_path}{img1} and {folder_path}{img2}: Similarity = {similarity:.4f}")

if __name__ == "__main__":
    main()