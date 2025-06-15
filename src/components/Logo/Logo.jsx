import { FaGithub } from 'react-icons/fa';
import './Logo.scss';

const Logo = () => {
  return (
    <div className="logo">
      <FaGithub className="github-icon" />
      <span className="logo-text">faeriy/tic_tac_toe_react</span>
    </div>
  );
};

export default Logo; 