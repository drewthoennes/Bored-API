import React from 'react';
import './styles';

import EndpointDemo from '@f/components/EndpointDemo';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="landing-page">
                <div className="header-section">
                    <div className="column column-center">
                        <div className="row row-center">
                            <h2>The Bored API</h2>
                        </div>
                        <div className="row row-center">
                            <h5>Fighting boredom one query at a time</h5>
                        </div>
                    </div>
                </div>

                <div className="about-section row row-between">
                    <div className="column column-start">
                        <h5>A RESTful API</h5>
                        <p>The Bored API is an entirely RESTful API, making it easy to quickly understand and being a great introduction to RESTful APIs for beginners.<br/><br/>API versioning is done through the URL for ease of use and understanding.</p>
                    </div>
                    <div className="column column-start">
                        <h5>Free to Use</h5>
                        <p>Using this API has always been free and will always be free. There are no API keys, rather endpoints can just be queried to get back data.</p>
                    </div>
                    <div className="column column-start">
                        <h5>Open Source</h5>
                        <p>All code for this project is hosted publically on Github, making this project a good learning tool and introduction to APIs and web development. All possible API responses can also be found on the Github repository.</p>
                    </div>
                </div>

                <div className="endpoint-demo-section"><EndpointDemo/></div>
            </div>
        );
    }
};

export default LandingPage;
