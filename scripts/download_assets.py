import os
import urllib.request

base_url = "https://synara-hero-redesign.opulent-automation.pages.dev"
workspace_dir = "/Users/jose/Frontaixpt(VO)"

assets_to_download = [
    ("/transparent-logo.png", "public/transparent-logo.png"),
    ("/favicon.svg", "public/favicon.svg"),
    ("/services/web-design-cell.png", "public/services/web-design-cell.png"),
    ("/assets/index-DvamM3aB.css", "synara-clone/synara.css")
]

# Generate mountain frames from 0001 to 0067
for i in range(1, 68):
    frame_name = f"frame_{i:04d}.webp"
    assets_to_download.append((f"/mountain-frames/{frame_name}", f"public/mountain-frames/{frame_name}"))

import ssl

# Disable SSL verification checks
ssl_context = ssl._create_unverified_context()

def download_file(url_path, local_path):
    full_url = base_url + url_path
    full_local_path = os.path.join(workspace_dir, local_path)
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(full_local_path), exist_ok=True)
    
    print(f"Downloading {full_url} -> {full_local_path}...")
    try:
        req = urllib.request.Request(
            full_url, 
            headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, context=ssl_context) as response:
            with open(full_local_path, "wb") as f:
                f.write(response.read())
    except Exception as e:
        print(f"Error downloading {full_url}: {e}")

if __name__ == "__main__":
    for url_path, local_path in assets_to_download:
        download_file(url_path, local_path)
    print("Download completed!")
