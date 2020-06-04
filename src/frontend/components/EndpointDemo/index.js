import React from 'react';
import { Link } from 'react-router-dom';
import './styles';
import api from '@f/api';

class EndpointDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            output: null,
            version: '2'
        };

        this.renderCard = this.renderCard.bind(this);
        this.loadV2Activity = this.loadV2Activity.bind(this);
        this.loadV2Fact = this.loadV2Fact.bind(this);
        this.loadV2Riddle = this.loadV2Riddle.bind(this);
        this.loadV2Website = this.loadV2Website.bind(this);
    }

    renderCard(name, onClick) {
        const {version} = this.state;

        return (
            <div className="card" key={name.toLowerCase()} onClick={onClick}>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <Link to={`/docs/v${version}/${name.toLowerCase()}`}>Documentation</Link>
                </div>
            </div>
        );
    }

    loadV2Activity() {
        api.getV2Activity().then(activity => {
            this.setState({output: (
                <div className="output active column column-center">
                    <h4>{activity.activity}</h4>
                </div>
            )});
        }).catch(err => {
            console.log(err);
        });
    }

    loadV2Fact() {
        api.getV2Fact().then(fact => {
            this.setState({output: (
                <div className="output active column column-center">
                    <h4>{fact.fact}</h4>
                </div>
            )});
        }).catch(err => {
            console.log(err);
        });
    }

    loadV2Riddle() {
        api.getV2Riddle().then(riddle => {
            this.setState({output: (
                <div className="output active column column-center">
                    <h4>{riddle.question}</h4>
                    <h5>{riddle.answer}</h5>
                </div>
            )});
        }).catch(err => {
            console.log(err);
        });
    }

    loadV2Website() {
        api.getV2Website().then(website => {
            this.setState({output: (
                <div className="output active column column-center">
                    <h4><a href={website.url}>{website.url}</a></h4>
                    <h5>{website.description}</h5>
                </div>
            )});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const cards = [
            {
                name: 'Activities',
                onClick: this.loadV2Activity
            },
            {
                name: 'Facts',
                onClick: this.loadV2Fact
            },
            {
                name: 'Riddles',
                onClick: this.loadV2Riddle
            },
            {
                name: 'Websites',
                onClick: this.loadV2Website
            }
        ].map(c => this.renderCard(c.name, c.onClick));

        const output = this.state.output || (
            <div className="output">
                <h4>Click one of the above endpoint types to see sample responses.</h4>
            </div>
        );

        return (
            <div className="endpoint-demo">
                {cards}
                {output}
            </div>
        );
    }
};

export default EndpointDemo;
