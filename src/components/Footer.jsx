import { Link } from 'react-router-dom';

import { FaTelegram, FaGithub } from 'react-icons/fa';
import { BsLinkedin, BsDiscord } from 'react-icons/bs';
import { ImBlogger2 } from 'react-icons/im';
import { FaCat } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__left-side">
            <div className="footer__logo">
              <Link to="/" className="footer__logo-link">
                <ImBlogger2 />
                <FaCat />
              </Link>
              <Link to="/" className="footer__logo-link">
                BLOG
              </Link>
            </div>
            <p className="footer__sub-title">
              © 2023 BUBLOG™, all rights reserved
            </p>
          </div>
          <div className="footer__contacts">
            <a
              href="tg://resolve?domain=@bizoru82"
              className="footer__contact-link"
            >
              <FaTelegram className="footer__contact-icon" />
            </a>
            <a
              href="https://github.com/YuraMakhnitko?tab=repositories"
              target="_blank"
              className="footer__contact-link"
            >
              <FaGithub className="footer__contact-icon" />
            </a>
            <a
              href="http://linkedin.com/in/yuriy-makhnitko-253115259"
              target="_blank"
              className="footer__contact-link"
            >
              <BsLinkedin className="footer__contact-icon" />
            </a>

            <a href="Dzindzia(Юра)#1681" className="footer__contact-link">
              <BsDiscord className="footer__contact-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
