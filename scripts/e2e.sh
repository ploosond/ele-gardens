#!/usr/bin/env bash
set -euo pipefail

BASE=${BASE_URL:-http://localhost:3001}
TMP1=/tmp/e2e_sample1.jpg
TMP2=/tmp/e2e_sample2.jpg

echo "[e2e] Downloading sample images..."
curl -s -o "$TMP1" https://res.cloudinary.com/demo/image/upload/sample.jpg
curl -s -o "$TMP2" https://res.cloudinary.com/demo/image/upload/elephants.jpg

# Register admin (idempotent if user exists)
echo "[e2e] Registering admin..."
REG_RESP=$(curl -s -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d '{"fullname":"E2E Admin","username":"e2e_admin","email":"e2e_admin@example.com","password":"password123","role":"admin"}')
TOKEN=$(echo "$REG_RESP" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

if [ -z "$TOKEN" ]; then
  echo "[e2e] Register did not return token; attempting login..."
  LOGIN_RESP=$(curl -s -X POST "$BASE/api/user/login" -H "Content-Type: application/json" -d '{"username":"e2e_admin","password":"password123"}')
  TOKEN=$(echo "$LOGIN_RESP" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
fi

if [ -z "$TOKEN" ]; then
  echo "[e2e] ERROR: could not obtain admin token. Abort. Response: $REG_RESP" >&2
  exit 1
fi

echo "[e2e] Obtained token: ${TOKEN:0:16}..."

# Create product
echo "[e2e] Creating product..."
PROD_CREATE=$(curl -s -X POST "$BASE/api/product" -H "Authorization: Bearer $TOKEN" -F "common_name=E2E Plant" -F "description_en=E2E" -F "description_de=E2EDE" -F "height=10" -F "diameter=5" -F "hardiness=0" -F "light_en=sun" -F "light_de=sonne" -F "images=@$TMP1")
PROD_ID=$(echo "$PROD_CREATE" | sed -n 's/.*"_id":"\([^"]*\)".*/\1/p')
if [ -z "$PROD_ID" ]; then echo "[e2e] Product create failed: $PROD_CREATE"; exit 1; fi
echo "[e2e] Created product id: $PROD_ID"

# Update product without new file (preserve images)
EXISTING_IMAGES=$(echo "$PROD_CREATE" | sed -n 's/.*"images":\(\[.*\]\).*/\1/p')
if [ -z "$EXISTING_IMAGES" ]; then EXISTING_IMAGES='[]'; fi

echo "[e2e] Updating product (no new file)..."
PROD_UPDATE=$(curl -s -X PUT "$BASE/api/product/$PROD_ID" -H "Authorization: Bearer $TOKEN" -F "common_name=E2E Plant Updated" -F "description_en=E2E" -F "description_de=E2EDE" -F "height=10" -F "diameter=5" -F "hardiness=0" -F "light_en=sun" -F "light_de=sonne" -F "existingImages=$EXISTING_IMAGES")

# Replace product image
echo "[e2e] Replacing product image..."
PROD_UPDATE2=$(curl -s -X PUT "$BASE/api/product/$PROD_ID" -H "Authorization: Bearer $TOKEN" -F "common_name=E2E Plant Updated" -F "description_en=E2E" -F "description_de=E2EDE" -F "height=10" -F "diameter=5" -F "hardiness=0" -F "light_en=sun" -F "light_de=sonne" -F "existingImages=$EXISTING_IMAGES" -F "images=@$TMP2")

# Create employee
echo "[e2e] Creating employee..."
EMP_CREATE=$(curl -s -X POST "$BASE/api/employee" -H "Authorization: Bearer $TOKEN" -F "firstname=E2E" -F "lastname=Employee" -F "email=e2e.employee@example.com" -F "role_en=Engineer" -F "role_de=Ingenieur" -F "department_en=R&D" -F "department_de=F&E" -F "telephone=12345" -F "profilePicture=@$TMP1")
EMP_ID=$(echo "$EMP_CREATE" | sed -n 's/.*"_id":"\([^"]*\)".*/\1/p')
if [ -z "$EMP_ID" ]; then echo "[e2e] Employee create failed: $EMP_CREATE"; exit 1; fi
echo "[e2e] Created employee id: $EMP_ID"

# Update employee without file
echo "[e2e] Updating employee (no file)..."
EMP_UPDATE1=$(curl -s -X PUT "$BASE/api/employee/$EMP_ID" -H "Authorization: Bearer $TOKEN" -F "firstname=E2E" -F "lastname=Employee" -F "email=e2e.employee@example.com" -F "role_en=Engineer" -F "role_de=Ingenieur" -F "department_en=R&D" -F "department_de=F&E" -F "telephone=54321")

# Replace employee picture
echo "[e2e] Replacing employee picture..."
EMP_UPDATE2=$(curl -s -X PUT "$BASE/api/employee/$EMP_ID" -H "Authorization: Bearer $TOKEN" -F "firstname=E2E" -F "lastname=Employee" -F "email=e2e.employee@example.com" -F "role_en=Engineer" -F "role_de=Ingenieur" -F "department_en=R&D" -F "department_de=F&E" -F "telephone=54321" -F "profilePicture=@$TMP2")

# Delete employee
echo "[e2e] Deleting employee..."
EMP_DELETE=$(curl -s -X DELETE "$BASE/api/employee/$EMP_ID" -H "Authorization: Bearer $TOKEN")

# Delete product
echo "[e2e] Deleting product..."
PROD_DELETE=$(curl -s -X DELETE "$BASE/api/product/$PROD_ID" -H "Authorization: Bearer $TOKEN")

echo "[e2e] Employee delete response: $EMP_DELETE"
echo "[e2e] Product delete response: $PROD_DELETE"

echo "[e2e] Finished successfully."
