#!/bin/bash

// COMMAND:: ./calculateChecksums.sh /path/to/directory

if [ $# -ne 1 ]; then
  echo "Usage: $0 /path/to/directory"
  exit 1
fi

directory="$1"

if [ ! -d "$directory" ]; then
  echo "Error: $directory is not a directory"
  exit 1
fi

# Calculate checksums
find "$directory" -type f -exec shasum -a 256 {} \; | awk '{print $1, substr($2, length("'"$directory"'/") + 1)}' > "$directory/SHA256SUMS"

mv SHA256SUMS "$directory"/

# Create a tarball of the directory
tar -cvzf archive.tar.gz -C "$(dirname "$directory")" "$(basename "$directory")"

echo "Checksums have been calculated, and the archive has been created as archive.tar.gz"
