# Quick Start - Email Form Setup

## TL;DR - Get it working in 5 minutes

### Option A: Using Resend (EASIEST)
```bash
# 1. Get API key from https://resend.com
# 2. Create .env.local file
echo "VITE_RESEND_API_KEY=your_key_here" > .env.local

# 3. Install and run
npm install
npm run dev

# 4. Go to Contact section and test!
```

### Option B: Using Gmail
```bash
# 1. Get App Password from https://myaccount.google.com/apppasswords
# 2. Create .env file
cat > .env << EOF
EMAIL_SERVICE=gmail
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_16_char_password
PORT=5000
EOF

# 3. Install and run both frontend and backend
npm install
npm run dev:full

# 4. Test the contact form!
```

## What Changed?

✅ **Updated Components:**
- `src/components/sections/ContactSection.tsx` - Now handles form state and submission
- `src/api/contact.ts` - Email sending client
- `server.js` - Node.js backend for email handling
- `package.json` - Added new dependencies

✅ **New Files:**
- `.env.example` - Environment template
- `EMAIL_SETUP.md` - Detailed setup guide
- This file

## Features

- ✅ Form validation (name, email, message required)
- ✅ Email validation
- ✅ Loading state during send
- ✅ Success/error notifications via toast
- ✅ Form clears after successful send
- ✅ Responsive design
- ✅ Accessibility support

## Test It

1. Fill the contact form with:
   - Name: Your Name
   - Email: your@email.com
   - Message: Test message

2. Click "Send Message"

3. Check your email (gohilkaushal16@email.com) for the message

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid API key" | Check your Resend key is correct in `.env.local` |
| "Port 5000 in use" | Change PORT in .env to 3000 or 5001 |
| Gmail email not sending | Use 16-char App Password, not your account password |
| Email in spam folder | Add sender to contacts |

## Environment Files Explained

- `.env.example` - Template (safe to commit)
- `.env.local` - Your local Resend key (git-ignored)
- `.env` - Your Gmail credentials (git-ignored)

See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed instructions.
