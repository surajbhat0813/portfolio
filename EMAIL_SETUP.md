# Email Setup Guide

The contact form is now functional! To actually receive emails, you need to set up an email service.

## Option 1: Resend (Recommended - Easiest)

1. Sign up at [https://resend.com](https://resend.com) (free tier available)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
4. Install Resend:
   ```bash
   npm install resend
   ```
5. Update `app/api/contact/route.ts` - uncomment the Resend code and add your domain

## Option 2: Formspree (No Backend Needed)

1. Sign up at [https://formspree.io](https://formspree.io) (free tier available)
2. Create a new form and get your form endpoint
3. Update the form in `components/sections/Contact.tsx`:
   - Change the fetch URL to your Formspree endpoint
   - Example: `https://formspree.io/f/YOUR_FORM_ID`

## Option 3: SendGrid

1. Sign up at [https://sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=your_api_key_here
   ```
4. Install: `npm install @sendgrid/mail`

## Option 4: Nodemailer (Gmail/SMTP)

1. Install: `npm install nodemailer`
2. Add to `.env.local`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

## Current Status

Right now, the form validates and processes submissions, but emails are only logged to the console. Choose one of the options above to enable actual email delivery.

