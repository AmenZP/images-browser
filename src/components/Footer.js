import "./Footer.css";
import { DiGithubBadge } from "react-icons/di";
import { GiDonkey } from "react-icons/gi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container-footer">
        <div>
          <p>
            Made with love by <b>AndresPineros29</b> & <b>AmenZP</b>{" "}
            <GiDonkey className="donkey-icon" />
          </p>
        </div>
        <div>
          <a href="https://github.com/AmenZP/images-browser">
            <DiGithubBadge className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
