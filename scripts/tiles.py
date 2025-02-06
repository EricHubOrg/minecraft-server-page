import os
import json

# Folder containing your tile images.
crops_folder = 'journeymap'

# List all PNG files.
tile_files = [f for f in os.listdir(crops_folder) if f.endswith('.png')]

coords = []
for filename in tile_files:
    name, _ = os.path.splitext(filename)
    parts = name.split(',')
    if len(parts) == 2:
        try:
            x = int(parts[0])
            y = int(parts[1])
            coords.append((x, y))
        except ValueError:
            continue

if coords:
    xs = [c[0] for c in coords]
    ys = [c[1] for c in coords]
    minX = min(xs)
    maxX = max(xs)
    minY = min(ys)
    maxY = max(ys)
    
    tileWidth = 512
    tileHeight = 512

    tiles = [{"x": x, "y": y} for x, y in coords]

    data = {
        "minX": minX,
        "maxX": maxX,
        "minY": minY,
        "maxY": maxY,
        "tileWidth": tileWidth,
        "tileHeight": tileHeight,
        "tiles": tiles
    }

    with open("tiles_bounds.json", "w") as f:
        json.dump(data, f)
    print("tiles_bounds.json created with data:")
    print(json.dumps(data, indent=2))
else:
    print("No valid tile images found in", crops_folder)
