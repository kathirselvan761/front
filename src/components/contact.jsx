import React, { useState, useEffect } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    'https://image.made-in-china.com/2f0j00iYzcWNGaRVgE/Supply-of-South-American-Polyester-Embroidered-Bed-Covers.jpg',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1920&h=1080&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const getApiUrl = () => {
    const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
    const hostname = window.location.hostname;
    if (isDevelopment) {
      return (hostname === 'localhost' || hostname === '127.0.0.1')
        ? 'http://localhost:5000/api/contact'
        : `http://${hostname}:5000/api/contact`;
    }
    return '/api/contact';
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      alert(result.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      alert(`Error sending message: ${error.message}`);
    }
  };

  return (
    <div className="contact-container">
      <div className="background-wrapper">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`background-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="background-overlay" />
      </div>

      <div className="main-content">
        <div className="content-wrapper">
          {/* <div className="heart-section">
            <div className="heart-container">
              <div className="heart heart-1"></div>
              <div className="heart heart-2"></div>
              <div className="heart heart-3"></div>
            </div>
          </div> */}

          <div className="slogan-section">
            <h1 className="main-title animate-fadeInUp">Nothing</h1>
            <p className="subtitle animate-fadeInUp animation-delay-300">"Crafting Dreams into Reality, One Stitch at a Time"</p>
          </div>

          <div className="coming-soon-section animate-fadeInUp animation-delay-600">
            <h2 className="coming-soon-title">Coming Soon</h2>
            <p className="coming-soon-description">
              Our bed and pillow covers store is launching soon! Experience luxury comfort with our premium embroidered collection.
            </p>
          </div>

          <div className="contact-form animate-fadeInUp animation-delay-900">
            <h3 className="form-title">Get in Touch</h3>
            <p className="form-description">Have questions about our bed and pillow covers? We'd love to hear from you!</p>
            <form onSubmit={handleSubmit} className="form-fields">
              <input 
                name="name" 
                type="text" 
                placeholder="Your Name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="form-input" 
              />
              <input 
                name="email" 
                type="email" 
                placeholder="Your Email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="form-input" 
              />
              <textarea 
                name="message" 
                placeholder="Your Message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="4" 
                required 
                className="form-textarea" 
              />
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>

          <div className="footer animate-fadeInUp animation-delay-1200">
            <p className="footer-text">© 2025 Nothing - All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;