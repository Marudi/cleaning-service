## Production Deployment Instructions

### Prerequisites
1. cPanel access with Node.js support
2. MySQL database
3. SSL certificate installed
4. Node.js version 18+ installed

### Database Setup
1. Create a new MySQL database in cPanel
2. Create a database user and assign permissions
3. Note down the database credentials

### Deployment Steps
1. Upload files to cPanel using File Manager or Git
2. Create `.env.production` with proper credentials
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
5. Build the application:
   ```bash
   npm run build
   ```
6. Start the application:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Post-Deployment
1. Set up SSL redirects
2. Configure cron jobs for backups
3. Test all functionality
4. Monitor error logs

### Maintenance
- Regular database backups
- Monitor server resources
- Check error logs
- Update dependencies regularly