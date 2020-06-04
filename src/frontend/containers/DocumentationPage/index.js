import React from 'react';
import {withRouter} from 'react-router-dom';
import './styles';

import {map as pageMap} from '@f/documentation';

class DocumentationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            version: 'v2',
            type: 'activities'
        };

        this.setPageByURL = this.setPageByURL.bind(this);
        this.loadPage = this.loadPage.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setPageByURL();
    }

    componentDidUpdate() {
        // Do this to update documentation during browser history changes
        window.scrollTo(0, 0);
        this.setPageByURL();
    }

    setPageByURL() {
        const {type, version} = this.props.match.params;

        if (type && type !== this.state.type) {
            this.setState({version, type});
        }
        else if (version !== this.state.version ) {
            this.setState({version});
        }
    }

    loadPage(type) {
        this.props.history.push(`/docs/${this.state.version}/${type}`);
        window.scrollTo(0, 0);
        this.setState({type: type ? type : 'activities'});
    }

    render() {
        let navigation = ['Introduction', 'Activities', 'Facts', 'Riddles', 'Websites'].map(section => {
            return (<h5 key={section} onClick={() => this.loadPage(section.toLowerCase())}>{section}</h5>);
        });

        // Retrieve the document from the imported document map
        const page = pageMap[this.state.version][this.state.type];

        return (
            <div className="documentation-page">
                <div className="documentation-section row">
                    <div className="navigation-column column">
                        <div className="navigation-group">{navigation}
                        </div>
                    </div>
                    <div className="documentation-column">{page}</div>
                </div>
            </div>
        );
    }
};

export default withRouter(DocumentationPage);
