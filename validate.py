import os

# Define the root directory to search
root_dir = "D:/upayanmazumder/Healthcare Dashboard/qwik"

# Function to search for duplicate keys
def search_duplicate_key(key, directory):
    for subdir, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.js') or file.endswith('.ts'):
                file_path = os.path.join(subdir, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    for i, line in enumerate(lines):
                        if line.count(f'"{key}"') > 1:
                            print(f"Duplicate '{key}' found in {file_path} on line {i + 1}")

# Search for 'action' key
search_duplicate_key('action', root_dir)
