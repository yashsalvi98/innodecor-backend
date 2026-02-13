# Innodecor Creations - Backend Server

Backend API for handling contact form submissions and sending emails.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Gmail App Password

To send emails via Gmail, you need to create an App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Select **Security** from the left menu
3. Under "Signing in to Google," select **2-Step Verification** (enable it if not already)
4. At the bottom, select **App passwords**
5. Select app: **Mail**
6. Select device: **Other (Custom name)** - enter "Innodecor Website"
7. Click **Generate**
8. Copy the 16-character password (you'll use this in .env file)

### 3. Create .env File

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your details:

```env
PORT=5000

# Your Gmail address
EMAIL_USER=your-email@gmail.com

# The App Password you generated (16 characters, no spaces)
EMAIL_PASS=abcd efgh ijkl mnop

# Email where you want to receive contact form submissions
RECIPIENT_EMAIL=your-email@gmail.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 4. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on: http://localhost:5000

### 5. Test the API

Test if server is running:
```bash
curl http://localhost:5000/api/health
```

## API Endpoints

### POST /api/contact

Submit contact form data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "service": "Interior Design",
  "message": "I need help with my home interior"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully."
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Failed to send message. Please try again."
}
```

## Email Features

When a contact form is submitted:

1. **Admin Email** - You receive a formatted email with:
   - Contact details (name, email, phone)
   - Selected service
   - Customer message
   - Action reminder (respond within 24 hours)

2. **Customer Auto-Reply** - Customer receives:
   - Thank you message
   - Confirmation of their submission
   - Your contact details
   - Expected response time (24 hours)

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular Gmail password
- Ensure 2-Step Verification is enabled on your Google account
- Check that EMAIL_USER and EMAIL_PASS are correct in .env

### "Connection timeout" error
- Check your internet connection
- Some networks block SMTP ports - try a different network
- Verify Gmail SMTP is not blocked by firewall

### Emails not received
- Check spam/junk folder
- Verify RECIPIENT_EMAIL is correct in .env
- Check server logs for errors: `npm run dev`

## Production Deployment

### Environment Variables for Production

Set these on your hosting platform (Heroku, Vercel, Railway, etc.):

```
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
FRONTEND_URL=https://your-domain.com
NODE_ENV=production
```

### Recommended Hosting Platforms

- **Railway** - Easy deployment, free tier available
- **Render** - Free tier with auto-deploy from GitHub
- **Heroku** - Popular choice, easy setup
- **DigitalOcean** - More control, affordable

## Security Notes

- Never commit `.env` file to Git
- Use App Passwords, not regular Gmail passwords
- Keep EMAIL_PASS secure
- Enable CORS only for your frontend domain in production
- Consider rate limiting for production use

## Support

For issues or questions, contact the development team.
