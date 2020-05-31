import React from 'react';
import { Link } from 'react-router-dom';
import './styles';

class EndpointDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            v1: {
                activity: {}
            },
            v2: {
                activity: {},
                fact: {},
                riddle: {},
                website: {}
            },
            version: 2
        };

        this.renderCard = this.renderCard.bind(this);
    }

    renderCard(name) {
        return (
            <div className="card" key={name.toLowerCase()}>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <Link to={`/documentation?v=${this.state.version}&t=${name.toLowerCase()}`}>Documentation</Link>
                </div>
            </div>
        );
    }

    render() {
        const cards = ['Activity', 'Fact', 'Riddle', 'Website']
            .map(name => this.renderCard(name));

        return (
            <div className="endpoint-demo">
                {cards}
            </div>
        );
    }
};

export default EndpointDemo;
