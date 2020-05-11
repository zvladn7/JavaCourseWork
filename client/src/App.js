import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ViewCrudPage from "./components/list/ViewCrudPage";
import {subjectModel} from "./model/SubjectModel";
import {loadSubject} from "./components/actions/subjects/loadSubjects";
import {observer} from "mobx-react";
import {createSubject} from "./components/actions/subjects/createSubject";
import {groupModel} from "./model/GroupModel";
import {editSubjectName} from "./components/actions/subjects/editSubjectName";
import {removeSubject} from "./components/actions/subjects/removeSubject";
import {loadGroups} from "./components/actions/groups/loadGroups";
import {createGroup} from "./components/actions/groups/createGroup";
import {editGroupName} from "./components/actions/groups/editGroupName";
import {removeGroup} from "./components/actions/groups/removeGroup";

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
                                createElement={(item) => createSubject(item)}
                                editElement={(item) => editSubjectName(item)}
                                removeElement={(itemId) => removeSubject(itemId)}
                                addInputPlaceholder={'Add new subject'}
                                isItemsPresent={subjectModel.isPresent}
                            />
                        </Route>
                        <Route path='/groups' exact>
                            <ViewCrudPage
                                items={groupModel.groups}
                                header={'Groups'}
                                loadItems={loadGroups}
                                createElement={(item) => createGroup(item)}
                                editElement={(item) => editGroupName(item)}
                                removeElement={(itemId) => removeGroup(itemId)}
                                addInputPlaceholder={'Add new group'}
                                isItemsPresent={groupModel.isPresent}
                            />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
