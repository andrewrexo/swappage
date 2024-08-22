#!/bin/bash

# Set the base source directory for SVGs
BASE_SRC_DIR="node_modules/@web3icons/core/dist/svgs"

# Set the destination directory for the copied SVGs
DEST_DIR="public/icons"

# Create the destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Array of subdirectories to process
SUBDIRS=("networks" "tokens" "wallets")

# Function to copy SVGs from a specific subdirectory
copy_svgs() {
    local src_dir="$1"
    local style="$2"
    
    if [ -d "$src_dir/$style" ]; then
        cp "$src_dir/$style"/*.svg "$DEST_DIR"
    fi
}

# Loop through each subdirectory
for subdir in "${SUBDIRS[@]}"; do
    src_path="$BASE_SRC_DIR/$subdir"
    
    if [ -d "$src_path" ]; then
        # Copy branded SVGs
        copy_svgs "$src_path" "branded"
        
        # # Copy mono SVGs
        # copy_svgs "$src_path" "mono"
    fi
done

echo "All SVG icons have been copied to $DEST_DIR"

# Count and display the number of icons copied
ICON_COUNT=$(ls -1 "$DEST_DIR"/*.svg | wc -l)
echo "Total icons copied: $ICON_COUNT"

