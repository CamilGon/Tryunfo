import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    cards: [],
  };

  valSoma = () => {
    const {
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const sumAtt = 210;
    if (
      parseInt(cardAttr1, 10)
      + parseInt(cardAttr2, 10)
      + parseInt(cardAttr3, 10) <= sumAtt) {
      return true;
    }
  };

  valPoint = () => {
    const {
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const maxAttr = 90;
    if (
      parseInt(cardAttr1, 10) <= maxAttr
      && parseInt(cardAttr2, 10) <= maxAttr
      && parseInt(cardAttr3, 10) <= maxAttr) {
      return true;
    }
  };

  valN = () => {
    const {
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const miniAtt = 0;
    if (
      parseInt(cardAttr1, 10) >= miniAtt
      && parseInt(cardAttr2, 10) >= miniAtt
      && parseInt(cardAttr3, 10) >= miniAtt) {
      return true;
    }
  };

  validForm = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
    } = this.state;
    if (
      cardName.length > 0
      && cardDescription.length > 0
      && cardImage.length > 0
      && cardRare.length > 0) {
      return true;
    }
  };

  onSaveButtonClick = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      cards,
    } = this.state;
    const newObject = cards;
    const obj = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
    };
    newObject.push(obj);
    this.setState({
      cards: newObject,
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
    }, this.validTrunfo());
  };

  validTrunfo = () => {
    const { cards } = this.state;
    cards.forEach((card) => {
      if (card.cardTrunfo === true) {
        this.setState({
          hasTrunfo: true,
        });
      }
    });
  };

  onInputChange = (card) => {
    const { name, value, checked } = card.target;
    const valor = name === 'cardTrunfo' ? checked : value;
    this.setState({
      [name]: valor,
    }, () => {
      if (this.validForm() && this.valSoma()
        && this.valPoint() && this.valN()) {
        this.setState({
          isSaveButtonDisabled: false,
        });
      } else {
        this.setState({
          isSaveButtonDisabled: true,
        });
      }
    });
  };

  delCard = (event) => {
    const { cards } = this.state;
    const listcard = cards.findIndex((card) => card.cardName === event.target.name);
    const toRemove = cards.splice(listcard, 1);
    if (toRemove[0].cardTrunfo) {
      this.setState({ hasTrunfo: false });
    }
    this.setState({ ...cards });
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      cards,
    } = this.state;
    return (
      <div>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />

        { cards.map((card) => (<Card
          key={ card.cardName }
          cardName={ card.cardName }
          cardDescription={ card.cardDescription }
          cardAttr1={ card.cardAttr1 }
          cardAttr2={ card.cardAttr2 }
          cardAttr3={ card.cardAttr3 }
          cardImage={ card.cardImage }
          cardRare={ card.cardRare }
          cardTrunfo={ card.cardTrunfo }

        />)) }
        <button
          type="button"
          name={ cards.cardName }
          data-testid="delete-button"
          onClick={ this.delCard }
        >
          Excluir
        </button>
      </div>
    );
  }
}
export default App;
