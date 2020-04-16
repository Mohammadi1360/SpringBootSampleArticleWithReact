import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { alertActions, articleActions } from '../../_actions';
import { ArticleDialog } from '../ArticlePage/ArticleDialog';

import _ from 'lodash';

import { Button, Card, Form, Icon, Message, Modal, Radio, Segment, Table } from 'semantic-ui-react';
import { FORM_EDIT, FORM_INSERT } from '../../_constants/common.constants';
import { Menu } from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';

const defaultItem = {
  id: '',
  rfid: '',
  articleName: '',
  articleNumber: '',
  storageLocation: '',
  price: '',
};

class ArticleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 'small',
      openEditNewDialog: false,
      openConfirmation: false,
      selectedId: 0,
      formMode: FORM_INSERT,
      item: defaultItem,
    };
  }

  componentDidMount() {
    this.props.dispatch(articleActions.getAllArticles());
  }


  handleRowChange = (e, { value }) => {
    this.setState({ selectedId: value });
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
    this.props.dispatch(alertActions.clear());
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

  handleSearch = (clear) => {
    let item = {};
    if (!clear)
      item = _.pickBy(this.state.item);
    else
      this.setState({ item: defaultItem });
    this.props.dispatch(articleActions.searchArticles(this.props.items, item));
  };

  handleItemChanges = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };

    if (name === 'articleNumber' || name === 'price') {
      item[name] = Number(value);
    } else
      item[name] = value;

    this.setState({ item });
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

    const { openConfirmation, openEditNewDialog, dimmer, formMode } = this.state;

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

            <Segment inverted>
              <Form inverted>


                <Form.Group widths='equal'>
                  <Form.Input fluid label='RFID'
                              name='rfid'
                              value={this.state.item.rfid}
                              onChange={this.handleItemChanges}
                              placeholder='RFID'/>
                  <Form.Input fluid label='Article Number'
                              name='articleNumber'
                              value={this.state.item.articleNumber}
                              onChange={this.handleItemChanges}
                              placeholder='Article Number'/>
                  <Form.Input fluid label='Storage Location'
                              name='storageLocation'
                              value={this.state.item.storageLocation}
                              onChange={this.handleItemChanges}
                              placeholder='Storage Location'/>
                  <Form.Input fluid label='Price'
                              name='price'
                              value={this.state.item.price}
                              onChange={this.handleItemChanges}
                              placeholder='Price'/>
                </Form.Group>

                <Form.Group widths='equal' inline>
                  <Form.Input fluid label='Article Name'
                              name='articleName'
                              value={this.state.item.articleName}
                              onChange={this.handleItemChanges}
                              placeholder='Article Name'/>


                  <Form.Checkbox checked={true}
                                 label='Client Side'/>

                  <Button
                    primary
                    icon='delete'
                    labelPosition='right'
                    content="Clear"
                    onClick={() => {
                      this.handleSearch(true);
                    }}/>

                  <Button
                    primary
                    icon='search'
                    labelPosition='right'
                    content="Search"
                    onClick={() => {
                      this.handleSearch(false);
                    }}/>

                </Form.Group>


              </Form>
            </Segment>


            <Table celled fixed striped selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>
                  </Table.HeaderCell>

                  <Table.HeaderCell width={1}>
                    RFID
                  </Table.HeaderCell>

                  <Table.HeaderCell width={5}>
                    ARTICLE NAME
                  </Table.HeaderCell>


                  <Table.HeaderCell width={2}>
                    ARTICLE NUMBER
                  </Table.HeaderCell>

                  <Table.HeaderCell width={2}>
                    STORAGE LOCATION
                  </Table.HeaderCell>

                  <Table.HeaderCell width={2}>
                    PRICE
                  </Table.HeaderCell>

                </Table.Row>
              </Table.Header>
              <Table.Body>
                {articles.itemsAfterSearch && _.map(articles.itemsAfterSearch, ({ id, rfid, articleName, articleNumber, storageLocation, price }) => (
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
    itemsAfterSearch: state.articles.itemsAfterSearch,
    user,
    articles,
    alert: state.alert,
  };
}

const connectedArticleForm = connect(mapStateToProps)(ArticleForm);
export { connectedArticleForm as ArticleForm };
