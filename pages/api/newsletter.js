import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    const data = {
      email_address: email,
      status: 'subscribed',
    };
    try {
      const response = await axios.post(
        `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
        data,
        {
          auth: {
            username: 'apikey',
            password: process.env.MAILCHIMP_API_KEY,
          },
        }
        );
      res.status(200).json({ message: `Thank you for subscribing!` });
    } catch (error) {
      const errorMessage = error.response.data.title;
      if (errorMessage === 'Member Exists') {
        res.status(400).json({ message: `You're already subscribed to our newsletter.` });
      } else {
        res.status(400).json({ message: 'An error occurred, please try again.' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}