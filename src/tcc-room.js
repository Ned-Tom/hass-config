// Room card
class tccroomcard extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  set hass(hass) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `<ha-card header="Example-card" style="background-color:">
                        <ha-icon id="alert" icon="mdi:alert-box"></ha-icon>
                        <div class="card-content"></div>
                      </ha-card>`
      this.content = this.querySelector('div')
      this.card = this.querySelector('ha-card')
    }

    const entityId = this.config.entity
    const state = hass.states[entityId]
    const stateStr = state ? state.state : 'unavailable'

    // if (typeof this.config.room_color != "undefined") {
    // if (typeof maybeObject != "undefined") {
    //   alert("GOT THERE");
    // }  


    const BGcolor = this.config.room_color

    
    switch(BGcolor){
      case 'red':
        this.card.style.backgroundColor = 'var(--google-red)'
        break;
      case 'green':
        this.card.style.backgroundColor = 'var(--google-green)'
        break;
      case 'yellow':
        this.card.style.backgroundColor = 'var(--google-yellow)'
        break;
      case 'blue':
        this.card.style.backgroundColor = 'var(--google-blue)'
        break;
      case 'violet':
        this.card.style.backgroundColor = 'var(--google-violet)'
        break;
      case 'grey':
        this.card.style.backgroundColor = 'var(--google-grey)'
        break;
      default:
        this.card.style.backgroundColor = 'var(--google-grey)'
    }



    this.content.innerHTML = `The state of ${entityId} is ${stateStr}!`
  }

  // The user supplied configuration. Throw an exception and Home Assistant
  // will render an error card.
  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity')
    }
    // if (!config.room_color) {
    //   config.room_color = 'gray'
    // }
    this.config = config
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 1
  }
}


customElements.define('tcc-room', tccroomcard)


console.log('Init roomcard')