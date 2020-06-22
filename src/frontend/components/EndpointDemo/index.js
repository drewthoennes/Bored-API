import React from 'react';
import { Link } from 'react-router-dom';
import './styles';
import api from '@f/api';
import {wait} from '@f/utils';

class EndpointDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            output: {
                jsx: '',
                loading: false
            },
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
        this.setState({output: {...this.state.output, loading: true}});

        wait(750).then(() => {
            return api.getV2Activity();
        }).then(activity => {
            const jsx = (
                <>
                    <div className="output-card-body">
                        <h4>{activity.activity}</h4>
                    </div>
                    <div className="output-card-footer">
                        <div className="tags">
                            <div className="tag">Type: {activity.type}</div>
                            <div className="tag">Participants: {activity.participants}</div>
                            <div className="tag">Price: {activity.price}</div>
                            <div className="tag">Duration: {activity.duration}</div>
                            <div className="tag">Accessibility: {activity.accessibility}</div>
                            <div className="tag">Kid Friendly: {activity.kidFriendly}</div>
                        </div>
                    </div>
                </>
            );

            this.setState({output: {jsx, loading: false}});
        }).catch(err => {
            console.log(err);
        });
    }

    loadV2Fact() {
        this.setState({output: {...this.state.output, loading: true}});

        wait(750).then(() => {
            return api.getV2Fact();
        }).then(fact => {
            const jsx = (
                <>
                    <div className="output-card-body">
                        <h4>{fact.fact}</h4>
                    </div>
                </>
            );

            this.setState({output: {jsx, loading: false}});
        }).catch(err => {
            console.log(err);
        });
    }

    loadV2Riddle() {
        this.setState({output: {...this.state.output, loading: true}});

        wait(750).then(() => {
            return api.getV2Riddle();
        }).then(riddle => {
            const jsx = (
                <>
                    <div className="output-card-body">
                        <h4>{riddle.question}</h4>
                        <h5>{riddle.answer}</h5>
                    </div>

                </>
            );

            this.setState({output: {jsx, loading: false}});
        }).catch(err => {
            console.log(err);
        });
    }

    loadV2Website() {
        this.setState({output: {...this.state.output, loading: true}});

        wait(750).then(() => {
            return api.getV2Website();
        }).then(website => {
            const jsx = (
                <>
                    <div className="output-card-body">
                        <h4><a href={website.url}>{website.url}</a></h4>
                        <h5>{website.description}</h5>
                    </div>
                </>
            );

            this.setState({output: {jsx, loading: false}});
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

        const output = this.state.output.jsx || (
            <>
                <h4>Click one of the above endpoint types to see sample responses.</h4>
            </>
        );

        return (
            <div className="endpoint-demo">
                {cards}
                <div className={`output-card column column-center${this.state.output.loading ? ' loading' : ''}`}>
                    {output}
                </div>
            </div>
        );
    }
};

export default EndpointDemo;
