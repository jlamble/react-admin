import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ActionCheck from 'material-ui-icons/CheckCircle';
import AlertError from 'material-ui-icons/ErrorOutline';
import { DeleteController } from 'ra-core';

import Header from '../layout/Header';
import DefaultActions from './DeleteActions';
import RecordTitle from '../layout/RecordTitle';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
    },
    buttonDelete: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: theme.palette.error.main,
            },
        },
    },
    iconPaddingStyle: {
        paddingRight: '0.5em',
    },
});

const sanitizeRestProps = ({
    actions,
    className,
    classes,
    crudGetOne,
    crudDelete,
    title,
    id,
    data,
    isLoading,
    hasCreate,
    hasDelete,
    hasEdit,
    hasShow,
    hasList,
    resource,
    translate,
    match,
    location,
    history,
    options,
    locale,
    permissions,
    ...rest
}) => rest;

const DeleteView = ({
    actions = <DefaultActions />,
    basePath,
    classes = {},
    className,
    data,
    defaultTitle,
    goBack,
    handleSubmit,
    hasEdit,
    hasList,
    hasShow,
    isLoading,
    title,
    translate,
    ...rest
}) => (
    <div className={className} {...sanitizeRestProps(rest)}>
        <Card style={{ opacity: isLoading ? 0.8 : 1 }}>
            <Header
                title={
                    <RecordTitle
                        title={title}
                        record={data}
                        defaultTitle={defaultTitle}
                    />
                }
                actions={actions}
                actionProps={{
                    basePath,
                    data,
                    hasEdit,
                    hasList,
                    hasShow,
                }}
            />
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Typography>
                        {translate('ra.message.are_you_sure')}
                    </Typography>
                </CardContent>
                <Toolbar disableGutters={true}>
                    <Button
                        variant="raised"
                        type="submit"
                        className={`${classes.button} ${classes.buttonDelete}`}
                    >
                        <ActionCheck className={classes.iconPaddingStyle} />
                        {translate('ra.action.delete')}
                    </Button>
                    &nbsp;
                    <Button
                        variant="raised"
                        onClick={goBack}
                        className={classes.button}
                    >
                        <AlertError className={classes.iconPaddingStyle} />
                        {translate('ra.action.cancel')}
                    </Button>
                </Toolbar>
            </form>
        </Card>
    </div>
);
/**
 * Page component for the Delete view
 * 
 * Can be used either directly inside a `<Resource>`, or to define
 * a custom Delete view.
 *
 * Here are all the props accepted by the `<Delete>`component:
 *
 * - title
 * - actions
 * 
 * Both expect an element for value.
 * 
 * @example
 *     import { Admin, Resource, Delete } from 'react-admin';
 *     import { PostList } from '../posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" list={PostList} remove={Delete} />
 *         </Admin>
 *     );
 *
 * @example
 *     import PostDeleteActions from './DeleteActions';
 *     const PostDeleteTitle = ({ record }) => (
 *         <span>
 *             {record ? `Delete post ${record.title}` : ''}
 *         </span>
 *     ));
 *     const PostDelete = (props) =>
 *         <Delete
 *             title={<PostDeleteTitle />}
 *             actions={<PostDeleteActions />}
 *         />;
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" list={PostList} remove={PostDelete} />
 *         </Admin>
 *     );
 */
const Delete = props => (
    <DeleteController {...props}>
        {controllerProps => <DeleteView {...props} {...controllerProps} />}
    </DeleteController>
);

Delete.propTypes = {
    actions: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    hasCreate: PropTypes.bool,
    hasDelete: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    hasList: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
};

export default withStyles(styles)(Delete);