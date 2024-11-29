import React from 'react';
import "../../assets/css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2>
            Review<span className="highlight">Book</span>
          </h2>
          <p>Is the best place to review a book</p>
          <p>© 2024 ReviewBook. All rights reserved by Bawantha Pasqual.</p>
        </div>

        <div className="footer-center">
          <h3>Navigation</h3>
          <ul>
            <li>Home</li>
            <li>Bestseller</li>
            <li>Category</li>
            <li>Community</li>
            <li>Blog</li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Company</h3>
          <p>Bawantha Pasqia</p>
          <p>admin@reviewbook.com</p>
          <p>1234 Green University Road</p>
          <p>Colombo, Sri Lanka</p>
          <div className="social-icons">
            <a href="#"><i className="fa fa-instagram"></i></a>
            <a href="#"><i className="fa fa-facebook"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
