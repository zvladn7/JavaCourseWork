import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ViewCrudPage from "./components/list/ViewCrudPage";
import {subjectModel} from "./model/SubjectModel";
import {loadSubject} from "./components/actions/subjects/loadSubjects";
import {observer} from "mobx-react";
import {createSubject} from "./components/actions/subjects/createSubject";

@observer
class App extends Component {
    render() {
        return (
            <div className="App" style={{padding: 0, margin: 0}}>
                <Router>
                    <Switch>
                        <Route path='/subjects' exact>
                            <ViewCrudPage
                                items={subjectModel.subjects}
                                header={'Subjects'}
                                loadItems={loadSubject}
                                createElement={(data) => createSubject(data)}
                                addInputPlaceholder={'Add new subject'}
                            />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
