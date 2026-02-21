# Email Contact Form Setup Guide

Your contact form is now ready to send emails! Follow these steps to get it working:

## Option 1: Using Resend (Recommended for Simple Setup)

### Step 1: Get Resend API Key
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Go to API Keys in the dashboard
4. Copy your API key

### Step 2: Add Environment Variable
1. In your project root, create a `.env.local` file (or `.env` for development)
2. Add your Resend API key:
```
VITE_RESEND_API_KEY=your_api_key_here
```

### Step 3: Test It
- Run `npm run dev`
- Go to the Contact section and submit the form
- You should receive an email at `gohilkaushal16@email.com`

## Option 2: Using Gmail with Node.js Backend

### Step 1: Enable Gmail App Password
1. Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select Mail and Windows (or your device)
3. Generate an App Password
4. Copy the 16-character password

### Step 2: Set Up Environment Variables
1. Create a `.env` file in your project root:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_password_here
PORT=5000
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Run Frontend and Backend Together
```bash
npm run dev:full
```

This will run both:
- Frontend on `http://localhost:8080`
- Backend on `http://localhost:5000`

### Step 5: Test the Form
- Navigate to the Contact section
- Fill in the form and submit
- You'll receive two emails:
  - One to your email address (gohilkaushal16@email.com)
  - A confirmation email to the visitor

## Option 3: Deploy to Vercel/Netlify (Easiest for Production)

### Using Vercel Functions:
1. Push your code to GitHub
2. Deploy to Vercel
3. Use Resend API (Option 1) - it's built for Vercel
4. Set environment variables in Vercel dashboard

### Using Netlify Functions:
1. Push your code to GitHub
2. Deploy to Netlify
3. Use Resend API (Option 1) or set up a Netlify function
4. Set environment variables in Netlify dashboard

## Troubleshooting

### "Failed to send email"
- Check your environment variables are set correctly
- For Gmail: Make sure you used the 16-character App Password, not your regular password
- For Resend: Verify your API key is correct

### Email not received
- Check your spam folder
- For Gmail: Make sure you're sending FROM the email address configured in `.env`
- Make sure you filled all form fields with valid data

### "Port 5000 already in use"
- Change the PORT in `.env` to another number (e.g., 3000, 5001)

## File Structure
```
src/
├── api/
│   └── contact.ts          # Email sending client
├── components/
│   └── sections/
│       └── ContactSection.tsx  # Updated form component
server.js                       # Node.js backend
.env.example                    # Environment template
.env.local                      # Your local environment (git-ignored)
package.json                    # Updated with new dependencies
```

## How It Works

1. **Frontend (ContactSection.tsx)**:
   - User fills in the form
   - Form validates the data
   - Sends to backend API or Resend

2. **Backend (server.js)**:
   - Receives form data
   - Validates again
   - Sends email using Nodemailer
   - Returns success/error response

3. **Notification**:
   - Toast message shows send status
   - Form clears on success

## Important Notes

- **Gmail**: Your app password must be 16 characters (generated from App Passwords, not your regular password)
- **Resend**: Free tier includes 100 emails/day
- **Security**: Never commit `.env` file to git (it's in .gitignore)
- **Email Address**: Currently configured to send to `gohilkaushal16@email.com`

## Security Recommendations

1. Use environment variables for sensitive data (never hardcode API keys)
2. Add rate limiting to prevent spam
3. Validate email format on frontend and backend
4. Consider adding CAPTCHA for production sites
5. Keep dependencies updated

## Next Steps

1. Choose your preferred option (Resend is simplest)
2. Follow the setup steps above
3. Install dependencies: `npm install`
4. Run your application
5. Test the contact form

For more help:
- Resend docs: https://resend.com/docs
- Nodemailer docs: https://nodemailer.com/
