import React from 'react';
import './contact.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-segment">
          <h2><i className="fas fa-quote-left"></i></h2>
          <p>We provide the best solutions for splitting expenses among friends, family, and colleagues. Our user-friendly interface ensures that managing shared expenses is a breeze.</p>
        </div>
        <div className="footer-segment">
          <h2><i className="fas fa-quote-left"></i></h2>
          <p>Our mission is to make financial management simple and hassle-free. With our service, you can easily track and settle expenses without any confusion or disputes. </p>
          
        </div>
        <div className="footer-segment">
          <h2><i className="fas fa-quote-left"></i></h2>
          <p>Contact us for any queries or support. Our dedicated team is always here to assist you with your needs and ensure a seamless experience with our platform.</p>
        </div>
        <div className="footer-segment">
        <div style={{paddingLeft:"5rem", paddingTop:"50px"}}>
          <h2>Connect with Us</h2>
          <div className="social-media">
            <i className="fab fa-facebook-f" style={{ color: '#3b5998' }}></i>
            <i className="fab fa-instagram" style={{ color: '#e4405f' }}></i>
            <i className="fab fa-twitter" style={{ color: '#1da1f2' }}></i>
            <i className="fab fa-linkedin-in" style={{ color: '#0077b5' }}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
