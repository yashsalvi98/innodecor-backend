const { validationResult } = require('express-validator');
const emailService = require('../utils/emailService');

exports.submitContact = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, service, message } = req.body;

    // Send email notification
    const emailSent = await emailService.sendContactEmail({
      name,
      email,
      phone,
      service,
      message
    });

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send email. Please try again later.'
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
};
