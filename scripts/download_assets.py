"""Download the locally hosted photo assets from Wikimedia Commons.
Run: npm run assets:download
Please keep the attribution and license notes in public/images/SOURCES.md.
"""
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1] / "public" / "images"
ROOT.mkdir(parents=True, exist_ok=True)
ASSETS = {
    "batik-cloth.jpg": "https://commons.wikimedia.org/wiki/Special:FilePath/Batik%20Indonesia.jpg",
    "batik-canting.jpg": "https://commons.wikimedia.org/wiki/Special:FilePath/Using%20canting%20to%20create%20batik%20%2810684550014%29.jpg",
    "batik-artisan.jpg": "https://commons.wikimedia.org/wiki/Special:FilePath/Batik%20Artisan%20Applying%20Wax%20with%20Canting%20in%20Trusmi%20Cirebon%20Indonesia.jpg",
    "canting-tools.jpg": "https://commons.wikimedia.org/wiki/Special:FilePath/Batik%20Making%20Tools.jpg",
    "batik-drawing.jpg": "https://commons.wikimedia.org/wiki/Special:FilePath/Batik%20Artisan%20Drawing%20Wax%20with%20Canting%20in%20Trusmi%20Cirebon%20Indonesia.jpg",
}
for filename, url in ASSETS.items():
    destination = ROOT / filename
    try:
        request = Request(url, headers={"User-Agent": "RagamBatikEducationalProject/1.0"})
        with urlopen(request, timeout=45) as response:
            content = response.read()
        if not content.startswith(b"\xff\xd8\xff"):
            raise ValueError("File yang diterima bukan JPEG yang valid.")
        destination.write_bytes(content)
        print(f"OK  {filename} ({len(content) // 1024} KB)")
    except Exception as exc:
        print(f"GAGAL {filename}: {exc}")
        print("Coba lagi saat koneksi internet tersedia, lalu jalankan npm run assets:download")
