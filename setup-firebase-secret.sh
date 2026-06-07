#!/bin/bash
# setup-firebase-secret.sh - Helper to encode Firebase service account and add as GitHub secret

set -e

echo "🔐 Firebase Service Account Secret Setup"
echo "========================================"
echo ""
echo "Step 1: Get your Firebase service account JSON key"
echo "  1. Go to: https://console.firebase.google.com"
echo "  2. Select project: purrvibex"
echo "  3. Settings → Service Accounts → Generate New Private Key"
echo "  4. A JSON file will download (usually named: purrvibex-*.json)"
echo ""

read -p "Enter path to your Firebase service account JSON file: " SA_FILE

if [ ! -f "$SA_FILE" ]; then
  echo "❌ File not found: $SA_FILE"
  exit 1
fi

# Encode to base64 (single line)
SA_BASE64=$(cat "$SA_FILE" | base64 -w 0)

echo ""
echo "Step 2: Add this as a GitHub secret"
echo "  1. Go to: https://github.com/XuRyCodeDao/PurrVibeX/settings/secrets/actions"
echo "  2. Click 'New repository secret'"
echo "  3. Name: FIREBASE_SERVICE_ACCOUNT"
echo "  4. Value: Paste the following (entire block):"
echo ""
echo "====== START (copy everything below this line) ======"
echo "$SA_BASE64"
echo "====== END ======"
echo ""
echo "✅ Then run your workflow again via Actions tab"

