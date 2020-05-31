import React from 'react';
import {Link} from 'react-router-dom';
import './styles';

class Topbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }


  render() {
    return (
      <div className="footer row row-between">
        <div className="name-section column column-start">
            <h5>Bored API</h5>
        </div>
        <div className="resources-section column column-start">
            <h5>Resources</h5>
            <Link to="/documentation">Documentation</Link>
            <Link to="/contributing">Contributing</Link>
            <a href="https://github.com/drewthoennes/Bored-API">GitHub</a>
        </div>
        <div className="legal-section column column-start">
            <h5>Legal</h5>
            <Link to="/tos">TOS</Link>
            <Link to="/privacy">Privacy</Link>
        </div>
      </div>
    );
  }
};

export default Topbar;
