import csv

def get_unique_categories(csv_file_path):
    unique_categories = set()

    try:
        with open(csv_file_path, mode='r', newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)

            if "RecipeCategory" not in reader.fieldnames:
                print("Error: 'RecipeCategory' column not found.")
                return

            for row in reader:
                category = row["RecipeCategory"].strip()
                if category:
                    unique_categories.add(category)

        print("\nUnique Recipe Categories:")
        for category in sorted(unique_categories):
            print("-", category)

    except FileNotFoundError:
        print(f"File not found: {csv_file_path}")
    except Exception as e:
        print("An error occurred:", e)

# Example usage:
if __name__ == "__main__":
    path = input("Enter the path to your CSV file: ").strip()
    get_unique_categories(path)
