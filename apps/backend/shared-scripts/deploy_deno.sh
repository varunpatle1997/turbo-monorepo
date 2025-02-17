#!/bin/bash

# NOTE: All relative paths in this script are resolved based on the directory where the script is executed,
# not where the script itself is located. Since this script will be run from the project root (e.g., "apps/backend/deno-app-1/"),
# paths referring to shared resources (like "../shared-scripts/") need to account for that by using "../" to go one level up.
# Ensure you run this script from the correct directory to avoid path resolution issues.

set -e          # Exit on error
set -o pipefail # Fail the script if any pipeline step fails

# Initialize variables
RESOURCE_GROUP=""
WEB_APP_NAME=""
OUTPUT_BINARY="dist/bundle.js"
ZIP_FILE_PATH=""

# Function to display usage
usage() {
  echo "Usage: $0 --resource-group <name> --web-app-name <name>"
  echo "Example: $0 --resource-group my-resource-group --web-app-name deno-app-1"
  exit 1
}

# Parse CLI arguments
while [[ $# -gt 0 ]]; do
  case $1 in
  --resource-group)
    RESOURCE_GROUP="$2"
    shift 2
    ;;
  --web-app-name)
    WEB_APP_NAME="$2"
    shift 2
    ;;
  *)
    echo "Unknown argument: $1"
    usage
    ;;
  esac
done

# Validate required arguments
if [[ -z "$RESOURCE_GROUP" || -z "$WEB_APP_NAME" ]]; then
  echo "Error: Missing required arguments."
  usage
fi

# Step 1: Create a zip package for the compiled app and shared startup script
echo "Creating zip package..."
mkdir -p dist
ZIP_FILE_PATH="dist/deno-app.zip"
zip -j "$ZIP_FILE_PATH" "$OUTPUT_BINARY" ../shared-scripts/setup.sh

# Step 2: Deploy the zip package using 'az webapp deploy'
echo "Deploying to Azure Web App Service..."
az webapp deploy \
  --resource-group "$RESOURCE_GROUP" \
  --name "$WEB_APP_NAME" \
  --src-path "$ZIP_FILE_PATH"

echo "Deployment completed successfully."

# Step 3: Delete ZIP file after deployment
echo "Deleting $ZIP_FILE_PATH file from dist folder..."
rm -f "$ZIP_FILE_PATH"

# Step 4: Confirm cleanup
if [ ! -f "$ZIP_FILE_PATH" ]; then
  echo "Cleanup successful: $ZIP_FILE_PATH removed."
else
  echo "Cleanup failed: $ZIP_FILE_PATH still exists."
fi
