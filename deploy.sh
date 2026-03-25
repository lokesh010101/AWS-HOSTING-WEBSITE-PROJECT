#!/bin/bash
# ─────────────────────────────────────────────
#  Deploy CineReview to AWS EC2 via SSH
#  Usage: bash deploy.sh
# ─────────────────────────────────────────────

EC2_USER="ubuntu"
EC2_HOST="YOUR_EC2_PUBLIC_IP"
KEY_PATH="~/.ssh/your-key.pem"
REMOTE_DIR="/var/www/cinereview"

echo "🚀 Deploying CineReview to EC2..."

# Copy website files to EC2
scp -i $KEY_PATH -r index.html review.html error.html style.css script.js \
  $EC2_USER@$EC2_HOST:$REMOTE_DIR

# Copy nginx config
scp -i $KEY_PATH nginx/nginx.conf \
  $EC2_USER@$EC2_HOST:/etc/nginx/sites-available/cinereview

# Reload nginx
ssh -i $KEY_PATH $EC2_USER@$EC2_HOST "sudo nginx -t && sudo systemctl reload nginx"

echo "✅ Deployment complete!"
echo "🌍 Visit: http://$EC2_HOST"
