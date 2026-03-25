# 🎬 CineReview — AWS EC2 Static Website

> A movie review website built with **HTML, CSS & JavaScript**, hosted on an **AWS EC2** instance running **Nginx**.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)
![AWS EC2](https://img.shields.io/badge/AWS_EC2-Hosted-FF9900?style=flat-square&logo=amazon-aws&logoColor=white)

---

## 📌 Project Overview

**CineReview** is a static movie review website that showcases films, star ratings, and full review pages. It is deployed on an **Amazon EC2 (Ubuntu)** instance with **Nginx** as the web server — simulating a real-world production deployment.

### How it works

An EC2 instance (Ubuntu) is launched on AWS. Nginx is installed and configured to serve the static HTML/CSS/JS files from `/var/www/cinereview`. The EC2 Security Group allows HTTP traffic on **port 80**, making the site accessible via the instance's public IP.

---

## ✨ Features

- 🎥 Movie cards with genre tags, star ratings, and review previews
- 📄 Full single movie review page
- 🏆 Top Picks leaderboard
- 📱 Fully responsive — mobile & desktop
- ✨ Scroll fade-in animations
- 🚫 Custom 404 error page
- ⚙️ Nginx config included
- 🚀 Deploy script (`deploy.sh`) to push files to EC2 via SCP

---

## 🗂️ Project Structure

```
aws-ec2-movie/
├── index.html              # Homepage
├── review.html             # Single movie review page
├── error.html              # Custom 404 page
├── style.css               # All styles
├── script.js               # Scroll effects & interactions
├── nginx/
│   └── nginx.conf          # Nginx server config for EC2
├── deploy.sh               # Deploy script (SCP to EC2)
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

| Layer       | Technology                   |
|-------------|------------------------------|
| Frontend    | HTML5, CSS3, JavaScript      |
| Web Server  | Nginx                        |
| Cloud       | AWS EC2 (Ubuntu 22.04)       |
| Deployment  | SSH + SCP                    |

---

## ☁️ AWS EC2 Deployment — Step by Step

### Step 1 — Launch an EC2 Instance
1. Go to [AWS EC2 Console](https://console.aws.amazon.com/ec2/)
2. Click **"Launch Instance"**
3. Choose **Ubuntu Server 22.04 LTS** (Free Tier eligible)
4. Instance type: **t2.micro**
5. Create or select a **Key Pair** (download `.pem` file — keep it safe!)
6. Under **Security Group**, allow:
   - **SSH** — port `22` — Source: My IP
   - **HTTP** — port `80` — Source: Anywhere (0.0.0.0/0)
7. Click **"Launch Instance"**

### Step 2 — Connect to EC2 via SSH
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

### Step 3 — Install Nginx on EC2
```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 4 — Create Website Directory
```bash
sudo mkdir -p /var/www/cinereview
sudo chown -R ubuntu:ubuntu /var/www/cinereview
```

### Step 5 — Upload Website Files (from your local machine)
```bash
scp -i your-key.pem index.html review.html error.html style.css script.js \
  ubuntu@YOUR_EC2_PUBLIC_IP:/var/www/cinereview/
```

Or use the included deploy script:
```bash
# Edit deploy.sh with your EC2 IP and key path, then:
bash deploy.sh
```

### Step 6 — Configure Nginx
```bash
# Upload nginx config
scp -i your-key.pem nginx/nginx.conf ubuntu@YOUR_EC2_PUBLIC_IP:/tmp/

# On EC2: move and enable the config
sudo cp /tmp/nginx.conf /etc/nginx/sites-available/cinereview
sudo ln -s /etc/nginx/sites-available/cinereview /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7 — Visit Your Website 🎉
```
http://YOUR_EC2_PUBLIC_IP
```

---

## 🔐 Security Group Settings

| Type  | Protocol | Port | Source         |
|-------|----------|------|----------------|
| SSH   | TCP      | 22   | My IP          |
| HTTP  | TCP      | 80   | 0.0.0.0/0      |

---

## 📤 Upload to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Movie Review site on AWS EC2 + Nginx"
git remote add origin https://github.com/YOUR_USERNAME/aws-ec2-movie.git
git branch -M main
git push -u origin main
```

> ⚠️ Never push your `.pem` key file to GitHub — it's already in `.gitignore`!

---

## 🤝 Contributing

1. Fork this repo
2. Create a branch: `git checkout -b feature/add-movie`
3. Commit: `git commit -m "Add: new movie review"`
4. Push & open a Pull Request

---

## 📄 License

MIT License — free to use and modify.

---

## 👨‍💻 Author

Made with ❤️ using HTML/CSS/JS · Served via **Nginx** on **AWS EC2**

> ⭐ Star this repo if you found it helpful!
