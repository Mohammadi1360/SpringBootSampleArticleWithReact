import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { articleActions } from '../../_actions';
import _ from 'lodash';

import {
  Table,
  Button,
  Card,
  Icon,
  Modal,
  Radio,
  Message,
} from 'semantic-ui-react';

import { articles } from '../../_reducers/articles.reducer';

class HomePage extends React.Component {
  handleChange = (e, { value }) => {
    // console.log(e.target.value);
    console.log(value);

    console.log('this.state.selectedRow');
    console.log(this.state.selectedRow);


    this.setState({ selectedRow: value });
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

  constructor(props) {
    console.log('constructor =>>');
    super(props);
    this.state = {
      column: null,
      data: articles.items,
      direction: null,
      openConfirmation: false,
      openWarning: false,
      selectedRow: -1,
    };
  }

  componentDidMount() {
    this.props.dispatch(articleActions.getAllArticles());
  }

  showConfirmationDialog = (size) => () => {
    if (this.state.selectedRow === -1) {
      this.setState({ size, openWarning: true });
    } else {
      this.setState({ size, openConfirmation: true });
    }
  };

  closeConfirmationDialog = () => {
    this.setState({ openConfirmation: false });
  };

  closeWarningDialog = () => {
    this.setState({ openWarning: false });
  };

  deleteSelectedItem = () => {
    console.log(this.state.selectedRow);
    this.props.dispatch(articleActions.deleteArticle(this.state.selectedRow));
    // this.props.dispatch(articleActions.getAllArticles());

    this.closeConfirmationDialog();
  };


  render() {
    const { user, articles } = this.props;
    const { column, data, direction, openConfirmation, openWarning, size } = this.state;

    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>{user.firstName}</h1>
        <h1>Article List</h1>

        {/*<p>You're logged in with React & JWT!!</p>*/}
        {/*<h3>Users from secure api end point:</h3>*/}
        {articles.loading && <em>Loading articles...</em>}
        {articles.error && <span className="text-danger">ERROR: {articles.error}</span>}

        <Card fluid>
          <Card.Content>


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
                        checked={this.state.selectedRow === id}
                        onChange={this.handleChange}/>

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
                    <Button icon
                            labelPosition='left'
                            positive
                            size='small'>
                      <Icon name='plus'/> Add
                    </Button>

                    <Button icon
                            labelPosition='left'
                            size='small'
                            primary>

                      <Icon name='edit'/> Edit
                    </Button>

                    <Button onClick={this.showConfirmationDialog('tiny')}
                            icon
                            labelPosition='left'
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


        <Modal size={size} open={openConfirmation} onClose={this.close}>
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

        <Modal size={size} open={openWarning} onClose={this.close}>
          <Modal.Header></Modal.Header>
          <Modal.Content>
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>Please Select one item before any action !</p>
            </Message>

          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeWarningDialog}
                    primary
                    icon='checkmark'
                    labelPosition='right'
                    content='Close'/>

          </Modal.Actions>
        </Modal>


        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('HOMEPAGE ===');
  console.log(state);

  const { articles, authentication } = state;
  const { user } = authentication;
  return {
    user,
    articles,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
