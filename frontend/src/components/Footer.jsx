import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#333333',
      color: '#ffffff',
      padding: '2rem 0',
      fontSize: '14px',
    },
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
    },
    heading: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
    },
    socialIcons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
    },
    icon: {
      width: '24px',
      height: '24px',
      fill: '#ffffff',
    },
    copyright: {
      marginTop: '2rem',
      textAlign: 'center',
      borderTop: '1px solid #555555',
      paddingTop: '1rem',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div>
            <h2 style={styles.heading}>About Us</h2>
            <p>We are a company dedicated to providing excellent services and products to our customers.</p>
          </div>
          <div>
            <h2 style={styles.heading}>Quick Links</h2>
            <ul style={styles.list}>
              <li><a href="#" style={styles.link}>Home</a></li>
              <li><a href="#" style={styles.link}>Products</a></li>
              <li><a href="#" style={styles.link}>Services</a></li>
              <li><a href="#" style={styles.link}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h2 style={styles.heading}>Contact Us</h2>
            <p>123 Main St, Anytown, USA 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@example.com</p>
          </div>
          <div>
            <h2 style={styles.heading}>Follow Us</h2>
            <div style={styles.socialIcons}>
              <a href="#" aria-label="Facebook">
                <svg style={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </a>
              <a href="#" aria-label="X (formerly Twitter)">
                <svg style={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg style={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div style={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;