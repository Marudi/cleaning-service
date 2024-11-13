## Step-by-Step cPanel Deployment Guide

### 1. Database Setup
1. Log in to cPanel
2. Navigate to "MySQL® Databases"
3. Create a new database:
   - Database Name: `imaryza_db`
   - Click "Create Database"
4. Create database user:
   - Username: `imaryza_user`
   - Strong password: Generate a secure password
   - Click "Create User"
5. Add user to database:
   - Select the database and user
   - Grant "ALL PRIVILEGES"
   - Click "Add"

### 2. Domain & SSL Setup
1. Navigate to "Domains" or "Subdomains"
2. Add your domain/subdomain if not already added
3. Go to "SSL/TLS Status"
4. Install SSL certificate:
   - Use AutoSSL or install custom certificate
   - Wait for SSL to propagate

### 3. Node.js Setup
1. Go to "Setup Node.js App"
2. Create new application:
   - Application mode: Production
   - Node.js version: 18.x
   - Application root: /home/username/imaryza
   - Application URL: https://yourdomain.com
   - Application startup file: server/index.js
   - Save configuration

### 4. File Upload
1. Go to "File Manager"
2. Navigate to your application root directory
3. Upload project files:
   - Use "Upload" button or
   - Use Git Version Control:
     ```bash
     cd /home/username/imaryza
     git clone your-repository-url .
     ```

### 5. Environment Setup
1. Create `.env.production` in application root:
   ```env
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=mysql://imaryza_user:your_password@localhost:3306/imaryza_db
   CORS_ORIGIN=https://yourdomain.com
   JWT_SECRET=your_secure_jwt_secret
   STRIPE_PUBLIC_KEY=your_stripe_key
   PAYPAL_CLIENT_ID=your_paypal_id
   ```

### 6. Application Installation
1. Open Terminal in cPanel or use SSH
2. Navigate to application directory:
   ```bash
   cd /home/username/imaryza
   ```
3. Install dependencies:
   ```bash
   npm install --production
   ```
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
5. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
6. Build the application:
   ```bash
   npm run build
   ```

### 7. Application Startup
1. Make deploy script executable:
   ```bash
   chmod +x deploy.sh
   ```
2. Run deployment script:
   ```bash
   ./deploy.sh
   ```

### 8. Configure Application Entry
1. Go to "Setup Node.js App" in cPanel
2. Click on your application
3. Set up application entry point:
   - Application startup file: server/index.js
   - Environment variables: Add from .env.production
4. Set up application startup:
   ```bash
   npm run start:production
   ```

### 9. Setup Domain Routing
1. Create/edit `.htaccess` in public_html:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ /index.html [L]
   ```

### 10. Post-Deployment Tasks
1. Test application:
   - Visit https://yourdomain.com
   - Test all major functionality
   - Check API endpoints
   - Verify database connections

2. Setup Monitoring:
   - Go to "Metrics" in cPanel
   - Enable error logging
   - Set up email notifications

3. Configure Backups:
   - Go to "Backup"
   - Configure daily database backups
   - Set up file backups

4. Security Checks:
   - Verify SSL is working
   - Check security headers
   - Test rate limiting
   - Verify CORS settings

### Troubleshooting
1. Check error logs:
   - Navigate to "Errors" in cPanel
   - Review Node.js application logs
   - Check Apache error logs

2. Common issues:
   - Database connection: Verify credentials and permissions
   - 502 Bad Gateway: Check Node.js process
   - CORS errors: Verify origin settings
   - SSL issues: Check certificate status

3. Restart application:
   ```bash
   cd /home/username/imaryza
   pm2 restart all
   ```

### Maintenance
1. Regular updates:
   ```bash
   git pull
   npm install
   npm run build
   pm2 restart all
   ```

2. Monitor resources:
   - Check CPU usage
   - Monitor memory usage
   - Watch disk space
   - Review database performance

3. Backup schedule:
   - Daily database backups
   - Weekly file backups
   - Monthly full system backup

4. Security maintenance:
   - Update dependencies regularly
   - Monitor security alerts
   - Review access logs
   - Update SSL certificates