import { FaTelegram, FaGithub } from 'react-icons/fa';
import { BsLinkedin, BsDiscord } from 'react-icons/bs';
//
const ContactSkeleton = () => {
  return (
    <div className="contact-skeleton">
      <div className="contact-skeleton__contacts">
        <div className="contact-skeleton__text-block">
          <p className="contact-skeleton__text">
            {' '}
            Ooops... It seems this article doesn't have a picture... 😊{' '}
          </p>
        </div>
        <div className="contact-skeleton__icons-block">
          <a
            href="tg://resolve?domain=@bizoru82"
            className="contact-skeleton__contact-link"
          >
            <FaTelegram className="contact-skeleton__contact-icon" />
          </a>
          <a
            href="https://github.com/YuraMakhnitko?tab=repositories"
            target="_blank"
            className="contact-skeleton__contact-link"
          >
            <FaGithub className="contact-skeleton__contact-icon" />
          </a>
          <a
            href="http://linkedin.com/in/yuriy-makhnitko-253115259"
            target="_blank"
            className="contact-skeleton__contact-link"
          >
            <BsLinkedin className="contact-skeleton__contact-icon" />
          </a>

          <a
            href="Dzindzia(Юра)#1681"
            className="contact-skeleton__contact-link"
          >
            <BsDiscord className="contact-skeleton__contact-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;
