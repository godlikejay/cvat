import React from 'react';
import { connect } from 'react-redux';

import CreateModelPageComponent from '../../components/create-model-page/create-model-page';
import { createModelAsync } from '../../actions/models-actions';
import {
    ModelFiles,
    CombinedState,
} from '../../reducers/interfaces';

interface StateToProps {
    isAdmin: boolean;
    modelCreatingError: any;
    modelCreatingStatus: string;
}

interface DispatchToProps {
    createModel(name: string, files: ModelFiles, global: boolean): void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { models} = state;

    return {
        isAdmin: state.auth.user.isAdmin,
        modelCreatingError: models.creatingError,
        modelCreatingStatus: models.creatingStatus,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        createModel(name: string, files: ModelFiles, global: boolean) {
            dispatch(createModelAsync(name, files, global));
        },
    };
}

function CreateModelPageContainer(props: StateToProps & DispatchToProps) {
    return (
        <CreateModelPageComponent
            isAdmin={props.isAdmin}
            modelCreatingError={props.modelCreatingError ? props.modelCreatingError.toString() : ''}
            modelCreatingStatus={props.modelCreatingStatus}
            createModel={props.createModel}
        />
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateModelPageContainer);
