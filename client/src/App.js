import React, { Component } from 'react';
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
import MenuBar from "./components/MenuBar";
import {menubarModel} from "./model/MenubarModel";
import Students from "./components/students/Students";
import Marks from "./components/marks/Marks";

@observer
class App extends Component {

    selectPageOnBar() {
        switch (menubarModel.selectedPage) {
            case 'subjects':
                return <ViewCrudPage
                    items={subjectModel.subjects}
                    header={'Subjects'}
                    loadItems={loadSubject}
                    createElement={(item) => createSubject(item)}
                    editElement={(item) => editSubjectName(item)}
                    removeElement={(itemId) => removeSubject(itemId)}
                    addInputPlaceholder={'Add new subject'}
                    isItemsPresent={subjectModel.isPresent}
                />;
            case 'groups':
                return <ViewCrudPage
                    items={groupModel.groups}
                    header={'Groups'}
                    loadItems={loadGroups}
                    createElement={(item) => createGroup(item)}
                    editElement={(item) => editGroupName(item)}
                    removeElement={(itemId) => removeGroup(itemId)}
                    addInputPlaceholder={'Add new group'}
                    isItemsPresent={groupModel.isPresent}
                />;
            case 'marks':
                return <Marks/>
            case 'students':
                return <Students/>
            default:
                break;
        }
    }


    render() {
        return (
            <div className="App">
                <MenuBar/>
                {this.selectPageOnBar()}
            </div>
        );
    }
}

export default App;
