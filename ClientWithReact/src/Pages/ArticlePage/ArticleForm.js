import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { articleActions, alertActions } from '../../_actions';
import { ArticleDialog } from '../ArticlePage/ArticleDialog';

import _ from 'lodash';

import {
  Table,
  Button,
  Card,
  Icon,
  Modal,
  Radio,
  Message,
  Image,
  Header,
  Form,
  Input,
  Select,
  TextArea,
  Grid,
} from 'semantic-ui-react';

import { articles } from '../../_reducers/articles.reducer';
import { FORM_EDIT, FORM_INSERT } from '../../_constants/common.constants';
import { default as CardHeader } from 'semantic-ui-react/dist/commonjs/views/Card/CardHeader';


class ArticleForm extends React.Component {

  constructor(props) {
    console.log('constructor =>>');
    super(props);
    this.state = {
      column: null,
      data: articles.items,
      size: 'small',
      direction: null,
      openEditNewDialog: false,
      openConfirmation: false,
      selectedId: 0,
      formMode: FORM_INSERT,
    };
  }

  componentDidMount() {
    this.props.dispatch(articleActions.getAllArticles());
  }


  handleRowChange = (e, { value }) => {
    this.setState({ selectedId: value });
  };

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  onRowClick = (rowInfo) => {
    console.log(rowInfo);
  };

  async loadCurrentItem(id) {
    this.props.dispatch(articleActions.getArticleById(id));
    console.log('here1');
  }

  showMessage = (message, type, second) => {
    if (type === 'error') {
      this.props.dispatch(alertActions.error(message));
    } else if (type === 'success') {
      this.props.dispatch(alertActions.success(message));
    }

    const timer = setTimeout(() => {
      this.props.dispatch(alertActions.clear());
    }, second * 1000);
  };

  showEditNewDialog = (dimmer, formMode) => () => {
    this.props.dispatch(alertActions.clear());

    if (formMode === FORM_EDIT && this.state.selectedId === 0) {
      this.showMessage('Please Select one item before any action !', 'error', 2);
    } else {
      let id = 0;
      (formMode === FORM_EDIT ? id = this.state.selectedId : id = 0);

      this.loadCurrentItem(id).then(() => {
        this.setState({
          dimmer,
          openEditNewDialog: true,
          formMode: formMode,
        });
      });

    }
  };

  closeEditNewDialog = () => {
    this.setState({ openEditNewDialog: false });
    this.props.dispatch(articleActions.getAllArticles());
  };


  showConfirmationDialog = (size) => () => {
    if (this.state.selectedId === 0) {
      this.showMessage('Please Select one item before any action !', 'error', 2);
    } else {
      this.setState({ size, openConfirmation: true });
    }
  };

  closeConfirmationDialog = () => {
    this.setState({ openConfirmation: false });
  };

  deleteSelectedItem = () => {
    console.log(this.state.selectedId);
    this.props.dispatch(articleActions.deleteArticle(this.state.selectedId));
    this.closeConfirmationDialog();
  };


  render() {
    const { user, articles, alert } = this.props;
    let errorList = [];

    try {
      errorList = JSON.parse(articles.error);
    } catch (e) {
      errorList = [];
    }

    const { column, item, direction, openConfirmation, openEditNewDialog, dimmer, formMode } = this.state;

    return (
      <Fragment>

        <Card fluid>
          <Message size='tiny'
                   success={alert.type === 'alert-success'}
                   warning={alert.type === 'alert-error'}
                   negative={alert.type === 'alert-danger'}
                   hidden={!alert.type}>
            {alert.message}
          </Message>

          <Card.Content>
            <Card.Header>Article List</Card.Header>


            <Table celled fixed striped selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>
                  </Table.HeaderCell>

                  <Table.HeaderCell width={1}
                                    sorted={column === 'rfid' ? direction : null}
                                    onClick={this.handleSort('rfid')}>
                    RFID
                  </Table.HeaderCell>

                  <Table.HeaderCell width={5}
                                    sorted={column === 'articleName' ? direction : null}
                                    onClick={this.handleSort('articleName')}>
                    ARTICLE NAME
                  </Table.HeaderCell>


                  <Table.HeaderCell width={2}
                                    sorted={column === 'articleNumber' ? direction : null}
                                    onClick={this.handleSort('articleNumber')}>
                    ARTICLE NUMBER
                  </Table.HeaderCell>

                  <Table.HeaderCell width={2}
                                    sorted={column === 'storageLocation' ? direction : null}
                                    onClick={this.handleSort('storageLocation')}>
                    STORAGE LOCATION
                  </Table.HeaderCell>

                  <Table.HeaderCell width={2}
                                    sorted={column === 'price' ? direction : null}
                                    onClick={this.handleSort('price')}>
                    PRISE
                  </Table.HeaderCell>

                </Table.Row>
              </Table.Header>
              <Table.Body>
                {articles.items && _.map(articles.items, ({ id, rfid, articleName, articleNumber, storageLocation, price }) => (
                  <Table.Row key={id} onClick={this.onRowClick}>
                    <Table.Cell collapsing verticalAlign='center'>
                      <Radio
                        name='radio1'
                        value={id}
                        checked={this.state.selectedId === id}
                        onChange={this.handleRowChange}/>

                    </Table.Cell>
                    <Table.Cell>{rfid}</Table.Cell>
                    <Table.Cell>{articleName}</Table.Cell>
                    <Table.Cell>{articleNumber}</Table.Cell>
                    <Table.Cell>{storageLocation}</Table.Cell>
                    <Table.Cell>{price}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan='5'>
                    <Button onClick={this.showEditNewDialog('blurring', FORM_INSERT)}
                            icon
                            labelPosition='right'
                            positive
                            size='small'>
                      <Icon name='plus'/> Add
                    </Button>

                    <Button icon onClick={this.showEditNewDialog('blurring', FORM_EDIT)}
                            labelPosition='right'
                            size='small'
                            primary>

                      <Icon name='edit'/> Edit
                    </Button>

                    <Button onClick={this.showConfirmationDialog('tiny')}
                            icon
                            labelPosition='right'
                            size='small'
                            negative>
                      <Icon name='edit'/> Delete
                    </Button>

                  </Table.HeaderCell>
                  <Table.HeaderCell/>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Card.Content>
        </Card>

        {/*openEditNewDialog**************************/}

        <ArticleDialog closeEditNewDialog={this.closeEditNewDialog}
                       openEditNewDialog={openEditNewDialog}
                       dimmer={dimmer}
                       formMode={formMode}/>

        {/*openConfirmation**************************/}

        <Modal size='small' open={openConfirmation} onClose={this.closeConfirmationDialog}>
          <Modal.Header>Delete Selected Article</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this article ? </p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeConfirmationDialog}
                    negative>
              No
            </Button>

            <Button onClick={this.deleteSelectedItem}
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Yes'/>

          </Modal.Actions>
        </Modal>

      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { articles, authentication } = state;
  const { user } = authentication;
  return {
    item: state.articles.item,
    items: state.articles.items,
    user,
    articles,
    alert: state.alert,
  };
}

const connectedArticleForm = connect(mapStateToProps)(ArticleForm);
export { connectedArticleForm as ArticleForm };
