import React from 'react';
import axios from 'axios';
import './styles';

const modalDuration = 2500;
const defaultState = {
    activity: {
        activity: {value: '', isValid: true},
        type: {value: 'recreational', isValid: true},
        participants: {value: '1', isValid: true},
    },
    fact: {
        fact: {value: '', isValid: true},
        source: {value: '', isValid: true},
    },
    riddle: {
        question: {value: '', isValid: true},
        answer: {value: '', isValid: true},
        source: {value: '', isValid: true},
    },
    website: {
        url: {value: '', isValid: true},
        description: {value: '', isValid: true},
    },
    modal: {
        visible: false,
        message: ''
    }
};

class ContributingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;

        this.showModal = this.showModal.bind(this);
        this.validateChanges = this.validateChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.generateActivityCard = this.generateActivityCard.bind(this);
        this.generateFactCard = this.generateFactCard.bind(this);
        this.generateRiddleCard = this.generateRiddleCard.bind(this);
        this.generateWebsiteCard = this.generateWebsiteCard.bind(this);
    }

    showModal(message) {
        this.setState({modal: {visible: true, message}});

        setTimeout(() => {
            this.setState(defaultState);
        }, modalDuration);
    }

    validateChanges(type) {
        if (!type || !this.state[type]) return;

        const state = this.state;
        const validate = {
            activity: type === 'activity',
            fact: type === 'fact',
            riddle: type === 'riddle',
            website: type === 'website',
        };
        const {activity, fact, riddle, website} = state;
        let isValid = true;

        if (validate.activity) {
            state.activity.activity.isValid = !!activity.activity.value;

            isValid &= state.activity.activity.isValid;
        }
        else if (validate.fact) {
            state.fact.fact.isValid = !!fact.fact.value;
            state.fact.source.isValid = !!fact.source.value;

            isValid &= state.fact.fact.isValid && state.fact.source.isValid;
        }
        else if (validate.riddle) {
            state.riddle.question.isValid = !!riddle.question.value;
            state.riddle.answer.isValid = !!riddle.answer.value;
            state.riddle.source.isValid = !!riddle.source.value;

            isValid &= state.riddle.question.isValid && state.riddle.answer.isValid && state.riddle.source.isValid;
        }
        else if (validate.website) {
            state.website.url.isValid = !!website.url.value;
            state.website.description.isValid = !!website.description.value;

            isValid &= state.website.url.isValid && state.website.description.isValid;
        }

        this.setState(state);
        return isValid;
    }

    handleChange(event, type) {
        if (!type || !this.state[type] || !event.target || !event.target.name) return;

        const state = this.state;
        state[type][event.target.name].value = event.target.value;

        this.setState(state);
    }

    submitChanges(event, type) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.validateChanges(type)) return;
        if (!this.state[type]) return;

        const suggestion = {[type]: Object.entries(this.state[type]).map(field => {
            const [name, data] = field;

            return {[name]: data.value};
        }).reduce((p, n) => {
            return Object.assign(p, n);
        }, {})};

        axios.post('/api/v2/suggestions', suggestion).then(res => {
            if (!res || !res.data || res.data.error) {
                this.showModal('There was an error submitting suggestion');
                return;
            }

            this.showModal('Succesfully submitted suggestion!')
        });
    }

    generateActivityCard() {
        const {activity} = this.state.activity;

        return (
            <div className="carousel-item active">
                <div className="activity-card row row-center tall">
                    <div className="column column-between">
                        <h3>Activity</h3>
                        <form className="needs-validation" onSubmit={(event) => this.submitChanges(event, 'activity')} noValidate>
                            <div className="form-group needs-validation">
                                <label>Name</label>
                                <input className={`form-control${activity.isValid ? '' : ' is-invalid'}`} name="activity" type="text" placeholder="Brainstorm an interesting activity" required onChange={(event) => this.handleChange(event, 'activity')}/>
                                <div className="invalid-feedback">
                                    <small>Please provide an activity</small>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select className="form-control" name="type" defaultValue="recreational" onChange={(event) => this.handleChange(event, 'activity')}>
                                    <option value="charity">Charity</option>
                                    <option value="cooking">Cooking</option>
                                    <option value="music">Music</option>
                                    <option value="diy">DIY</option>
                                    <option value="education">Education</option>
                                    <option value="social">Social</option>
                                    <option value="busywork">Busywork</option>
                                    <option value="recreational">Recreational</option>
                                    <option value="relaxation">Relaxation</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Participants</label>
                                <input className="form-control" name="participants" type="number" min="1" defaultValue="1" required onChange={(event) => this.handleChange(event, 'activity')}/>
                            </div>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    generateFactCard() {
        const {fact, source} = this.state.fact;

        return (
            <div className="carousel-item">
                <div className="fact-card row row-center tall">
                    <div className="column column-between">
                        <h3>Fact</h3>
                        <form className="needs-validation" onSubmit={(event) => this.submitChanges(event, 'fact')} noValidate>
                            <div className="form-group needs-validation">
                                <label>Name</label>
                                <input className={`form-control${fact.isValid ? '' : ' is-invalid'}`} name="fact" type="text" placeholder="The Spanish national anthem has no words" required onChange={(event) => this.handleChange(event, 'fact')}/>
                                <div className="invalid-feedback">
                                    <small>Please provide a fact</small>
                                </div>
                            </div>
                            <div className="form-group needs-validation">
                                <label>Name</label>
                                <input className={`form-control${source.isValid ? '' : ' is-invalid'}`} name="source" type="text" placeholder="https://thefactsite.com" required onChange={(event) => this.handleChange(event, 'fact')}/>
                                <div className="invalid-feedback">
                                    <small>Please provide the URL source for the fact</small>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    generateRiddleCard() {
        const {question, answer, source} = this.state.riddle;

        return (
            <div className="carousel-item">
                <div className="riddle-card row row-center tall">
                    <div className="column column-between">
                        <h3>Riddle</h3>
                        <form className="needs-validation" onSubmit={(event) => this.submitChanges(event, 'riddle')} noValidate>
                            <div className="form-group needs-validation">
                                <label>Question</label>
                                <input className={`form-control${question.isValid ? '' : ' is-invalid'}`} name="question" type="text" placeholder="What goes up when rain comes down?" required onChange={(event) => this.handleChange(event, 'riddle')}/>
                                <div className="invalid-feedback">
                                    <small>Please provide a question</small>
                                </div>
                            </div>
                            <div className="form-group needs-validation">
                                <label>Answer</label>
                                <input className={`form-control${answer.isValid ? '' : ' is-invalid'}`} name="answer" type="text" placeholder="Umbrellas" required onChange={(event) => this.handleChange(event, 'riddle')}/>
                                <div className="invalid-feedback">
                                    <small>Please provide an answer</small>
                                </div>
                            </div>
                            <div className="form-group needs-validation">
                                <label>Source</label>
                                <input className={`form-control${source.isValid ? '' : ' is-invalid'}`} name="source" type="text" placeholder="https://riddles.com" required onChange={(event) => this.handleChange(event, 'riddle')}/>
                                <div className="invalid-feedback">
                                    <small>Please provide the URL source for the riddle</small>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    generateWebsiteCard() {
        const {url, description} = this.state.website;

        return (
            <div className="carousel-item">
                <div className="website-card row row-center tall">
                    <div className="column column-between">
                        <h3>Website</h3>
                        <form className="needs-validation" onSubmit={(event) => this.submitChanges(event, 'website')} noValidate>
                        <div className="form-group needs-validation">
                                <label>URL</label>
                                <input className={`form-control${url.isValid ? '' : ' is-invalid'}`} name="url" type="text" placeholder="http://eelslap.com/" required onChange={(event) => this.handleChange(event, 'website')}/>
                                <div className="invalid-feedback">
                                    <small>Please provide the website URL</small>
                                </div>
                            </div>
                            <div className="form-group needs-validation">
                                <label>Description</label>
                                <input className={`form-control${description.isValid ? '' : ' is-invalid'}`} name="description" type="text" placeholder="The chance of a lifetime to slap someone in the face with an eel" required onChange={(event) => this.handleChange(event, 'website')}/>
                                <div className="invalid-feedback">
                                    <small>Please provide a description</small>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="contributing-page">
                <div className="header-section">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Contributing</h3>
                            <p className="card-text">The Bored API currently uses a database of activity, fact, riddle, and website entries dictated by JSON files of static data in the projects Github. These collections have steadily grown over the past few years due to user feedback and active community support, but there are still many more entries we can add to this growing list. If you have a great idea for something that should be in the API, please submit your suggestion below.</p>
                        </div>
                    </div>
                </div>

                <div className="contributing-section">
                    <div id="contribution-carousel" className={`carousel slide${this.state.modal.visible ? ' showing-modal' : ''}`} data-interval="false" data-keyboard="true" data-wrap="false" data-touch="true">
                        <div className="submission-modal column column-center">
                            <div className="submission-modal-box">
                                <p>{this.state.modal.message}</p>
                            </div>
                        </div>

                        <ol className="carousel-indicators">
                            <li className="active" data-target="#contribution-carousel" data-slide-to="0"></li>
                            <li data-target="#contribution-carousel" data-slide-to="1"></li>
                            <li data-target="#contribution-carousel" data-slide-to="2"></li>
                            <li data-target="#contribution-carousel" data-slide-to="3"></li>
                        </ol>

                        <div className="carousel-inner">
                            {this.generateActivityCard()}
                            {this.generateFactCard()}
                            {this.generateRiddleCard()}
                            {this.generateWebsiteCard()}

                            <a className="carousel-control-prev" href="#contribution-carousel" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>

                            <a className="carousel-control-next" href="#contribution-carousel" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ContributingPage;
