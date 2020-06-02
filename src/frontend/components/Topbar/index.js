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
      <div className="topbar row justify-content-between">
        <div className="topbar-item column justify-content-center">
            <Link to="/">Bored API</Link>
        </div>
        <div className="row">
            <div className="topbar-item column justify-content-center">
                <Link to="/docs">Documentation</Link>
            </div>
            <div className="topbar-item column justify-content-center">
                <Link to="/contributing">Contributing</Link>
            </div>
        </div>
      </div>
    );
  }
};

export default Topbar;
