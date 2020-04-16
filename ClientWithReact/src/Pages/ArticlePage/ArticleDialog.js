import React from 'react';
import { connect } from 'react-redux';
import { articleActions } from '../../_actions';

import { Button, Form, Input, Message, Modal } from 'semantic-ui-react';

const defaultItem = {
  id: '',
  rfid: '',
  articleName: '',
  articleNumber: '',
  storageLocation: '',
  price: '',
};

class ArticleDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: defaultItem,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.item && this.state.item.id !== this.props.item.id) {
      this.setState({
        item: this.props.item,
      });
    }
  }

  handleItemChanges = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  };

  handleSaveButton = () => {
    console.log('this.state.item:');
    console.log(this.state.item);
    this.props.dispatch(articleActions.saveArticle(this.state.item));
  };

  handleCloseButton = () => {
    this.setState({ item: defaultItem });
    this.props.closeEditNewDialog();
  };

  render() {
    const { articles, dimmer, openEditNewDialog, alert } = this.props;
    let { item } = this.state;
    let errorList = [];
    try {
      errorList = JSON.parse(articles.error);
    } catch (e) {
      errorList = [];
    }

    return (
      <Modal dimmer={dimmer} open={openEditNewDialog} onClose={this.handleCloseButton}>
        <Modal.Header>
          New Article
        </Modal.Header>

        <Modal.Content>
          <Message size='tiny'
                   success={alert.type === 'alert-success'}
                   warning={alert.type === 'alert-error'}
                   negative={alert.type === 'alert-danger'}
                   hidden={!alert.type}>
            {alert.message}
          </Message>

          {item &&
          <Form>
            <Form.Field
              id='articleName'
              name='articleName'
              control={Input}
              label='Article Name'
              placeholder='Article Name'
              value={item.articleName}
              onChange={this.handleItemChanges}
              required
              error={errorList.hasOwnProperty('articleName')}
            />

            <Form.Group widths='equal'>
              <Form.Field
                id='articleNumber'
                name='articleNumber'
                control={Input}
                type="number"
                label='Article Number'
                placeholder='Article Number'
                value={item.articleNumber}
                onChange={this.handleItemChanges}
                required
                error={errorList.hasOwnProperty('articleNumber')}
              />

              <Form.Field
                id='rfid'
                name='rfid'
                control={Input}
                label='RFID'
                placeholder='RFID'
                value={item.rfid}
                onChange={this.handleItemChanges}
                required
                error={errorList.hasOwnProperty('rfid')}
              />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Field
                id='storageLocation'
                name='storageLocation'
                control={Input}
                label='Storage Location'
                placeholder='Storage Location'
                value={item.storageLocation}
                onChange={this.handleItemChanges}
                required
                error={errorList.hasOwnProperty('storageLocation')}
              />

              <Form.Field
                id='price'
                name='price'
                control={Input}
                type="number"
                label='Price'
                placeholder='Price'
                value={item.price}
                onChange={this.handleItemChanges}
                required
                error={errorList.hasOwnProperty('price')}
              />

            </Form.Group>

          </Form>
          }


        </Modal.Content>


        <Modal.Actions>
          <Button secondary onClick={this.handleCloseButton}>
            Close
          </Button>
          <Button
            primary
            icon='checkmark'
            labelPosition='right'
            content="Save"
            onClick={this.handleSaveButton}
          />
        </Modal.Actions>
      </Modal>

    );
  }
}

function mapStateToProps(state) {
  const { articles } = state;
  return {
    articles,
    item: state.articles.item,
    alert: state.alert,
  };
}

const connectedArticleDialog = connect(mapStateToProps)(ArticleDialog);
export { connectedArticleDialog as ArticleDialog };

