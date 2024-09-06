import os
import cv2
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from itertools import combinations

def compute_features(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    sift = cv2.SIFT_create()
    keypoints, descriptors = sift.detectAndCompute(img, None)
    return descriptors

def compute_edge_histogram(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    edges = cv2.Canny(img, 100, 200)
    hist = cv2.calcHist([edges], [0], None, [256], [0, 256])
    return hist.flatten()

def compare_images(img1_features, img2_features, img1_hist, img2_hist):
    if img1_features is None or img2_features is None:
        return 0

    # Compare features
    matches = cv2.BFMatcher().knnMatch(img1_features, img2_features, k=2)
    good_matches = [m for m, n in matches if m.distance < 0.75 * n.distance]
    feature_similarity = len(good_matches) / max(len(img1_features), len(img2_features))

    # Compare edge histograms
    hist_similarity = cosine_similarity(img1_hist.reshape(1, -1), img2_hist.reshape(1, -1))[0][0]

    # Combine similarities (you can adjust weights as needed)
    combined_similarity = 0.5 * feature_similarity + 0.5 * hist_similarity

    return combined_similarity

def find_similar_pairs(image_directory, threshold):
    image_data = {}
    for filename in os.listdir(image_directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif')):
            filepath = os.path.join(image_directory, filename)
            features = compute_features(filepath)
            hist = compute_edge_histogram(filepath)
            image_data[filename] = (features, hist)

    similar_pairs = []
    for (file1, data1), (file2, data2) in combinations(image_data.items(), 2):
        similarity = compare_images(data1[0], data2[0], data1[1], data2[1])
        if similarity >= threshold:
            similar_pairs.append((file1, file2, similarity))

    return similar_pairs

def main(image_directory, threshold):
    similar_pairs = find_similar_pairs(image_directory, threshold)

    print(f"Found {len(similar_pairs)} similar pairs:")
    for file1, file2, similarity in sorted(similar_pairs, key=lambda x: x[2], reverse=True):
        print(f"{image_directory}{file1} and {image_directory}{file2}: Similarity = {similarity:.4f}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python find_similar_tattoos.py <image_directory> <similarity_threshold>")
        sys.exit(1)

    image_directory = sys.argv[1]
    threshold = float(sys.argv[2])
    main(image_directory, threshold)