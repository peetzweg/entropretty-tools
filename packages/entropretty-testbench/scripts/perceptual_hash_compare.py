import sys
import imagehash
from PIL import Image

def compare_perceptual_hash(image_path1, image_path2):
    try:
        # Open images
        img1 = Image.open(image_path1)
        img2 = Image.open(image_path2)

        # Compute perceptual hashes
        hash1 = imagehash.phash(img1)
        hash2 = imagehash.phash(img2)

        # Calculate and return the Hamming distance
        distance = hash1 - hash2
        similarity = 1 - (distance / 64)  # Normalize to [0, 1] range

        return distance, similarity

    except IOError as e:
        print(f"Error opening image file: {e}")
        return None, None

def main():
    if len(sys.argv) != 3:
        print("Usage: python perceptual_hash_compare.py <image1_path> <image2_path>")
        sys.exit(1)

    image_path1 = sys.argv[1]
    image_path2 = sys.argv[2]

    distance, similarity = compare_perceptual_hash(image_path1, image_path2)
    print(f"{similarity:.4f}")

    # if distance is not None and similarity is not None:
    #     print(f"Perceptual Hash Comparison Results:")
    #     print(f"Hamming Distance: {distance}")
    #     print(f"Similarity: {similarity:.4f}")
    #     print(f"Images are {'similar' if similarity > 0.9 else 'different'}")

if __name__ == "__main__":
    main()