import os
import cv2
import numpy as np
import matplotlib.pyplot as plt

def estimate_line_width_percentage(image_path):
    # Read the image in grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    height, width = img.shape

    # Apply edge detection
    edges = cv2.Canny(img, 100, 200)

    # Create a structuring element
    kernel = np.ones((3,3), np.uint8)

    # Perform dilation until most edges are gone
    line_width = 0
    original_edge_pixels = np.sum(edges > 0)
    current_edge_pixels = original_edge_pixels

    while current_edge_pixels > original_edge_pixels * 0.1:  # Stop when 90% of edges are gone
        edges = cv2.dilate(edges, kernel, iterations=1)
        line_width += 1
        current_edge_pixels = np.sum(edges > 0)

    # Calculate the average of image width and height
    average_dimension = (height + width) / 2

    # Calculate line width as a percentage of average dimension
    line_width_percentage = (line_width / average_dimension) * 100

    return line_width_percentage, img, edges

def check_line_widths(folder_path, min_width_percentage):
    results = []
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif')):
            file_path = os.path.join(folder_path, filename)
            try:
                line_width_percentage, original_img, edge_img = estimate_line_width_percentage(file_path)
                meets_requirement = line_width_percentage >= min_width_percentage
                results.append((filename, line_width_percentage, meets_requirement, original_img, edge_img))
            except Exception as e:
                print(f"Error processing {filename}: {e}")

    return results

def display_images(results, output_folder):
    for filename, line_width_percentage, meets_requirement, original_img, edge_img in results:
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6))

        ax1.imshow(original_img, cmap='gray')
        ax1.set_title('Original Image')
        ax1.axis('off')

        ax2.imshow(edge_img, cmap='gray')
        ax2.set_title('Edge Detected Image')
        ax2.axis('off')

        plt.suptitle(f"{filename}\nLine Width: {line_width_percentage:.2f}% of canvas size\n{'Meets' if meets_requirement else 'Does not meet'} requirement")

        output_path = os.path.join(output_folder, f"{os.path.splitext(filename)[0]}_comparison.png")
        plt.savefig(output_path)
        plt.close()

def main(folder_path, min_width_percentage, output_folder):
    results = check_line_widths(folder_path, min_width_percentage)

    os.makedirs(output_folder, exist_ok=True)
    display_images(results, output_folder)

    print(f"Checking images for minimum line width of {min_width_percentage:.2f}% of canvas size:")
    all_meet_requirement = True
    for filename, line_width_percentage, meets_requirement, _, _ in results:
        status = "Meets" if meets_requirement else "Does not meet"
        print(f"{filename}: Estimated line width = {line_width_percentage:.2f}% of canvas size. {status} requirement.")
        if not meets_requirement:
            all_meet_requirement = False

    if all_meet_requirement:
        print(f"\nAll images meet the minimum line width requirement of {min_width_percentage:.2f}% of canvas size.")
    else:
        print(f"\nNot all images meet the minimum line width requirement of {min_width_percentage:.2f}% of canvas size.")

    print(f"\nComparison images have been saved in the folder: {output_folder}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 4:
        print("Usage: python check_line_width_percentage.py <image_folder> <min_line_width_percentage> <output_folder>")
        sys.exit(1)

    folder_path = sys.argv[1]
    min_width_percentage = float(sys.argv[2])
    output_folder = sys.argv[3]
    main(folder_path, min_width_percentage, output_folder)