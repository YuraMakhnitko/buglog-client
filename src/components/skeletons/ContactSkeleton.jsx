import { FaTelegram, FaGithub } from "react-icons/fa";
import { BsLinkedin, BsDiscord } from "react-icons/bs";
//
const ContactSkeleton = () => {
  return (
    <div className="contact-skeleton">
      <div className="contact-skeleton__contacts">
        <div className="contact-skeleton__text-block">
          <p className="contact-skeleton__text">
            {" "}
            Ooops... It sims this article has no image, so you can contact me...
            😊{" "}
          </p>
        </div>
        <div className="contact-skeleton__icons-block">
          <a href="#" className="contact-skeleton__contact-link">
            <FaTelegram className="contact-skeleton__contact-icon" />
          </a>
          <a href="#" className="contact-skeleton__contact-link">
            <FaGithub className="contact-skeleton__contact-icon" />
          </a>
          <a href="#" className="contact-skeleton__contact-link">
            <BsLinkedin className="contact-skeleton__contact-icon" />
          </a>

          <a href="#" className="contact-skeleton__contact-link">
            <BsDiscord className="contact-skeleton__contact-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;
