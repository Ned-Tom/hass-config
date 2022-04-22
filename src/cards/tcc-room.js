// Room card
class tccroomcard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card style="padding:10px 16px">
          <div style="margin: 8px 0; color: var(--card-background-color)">
            <p class="tcc-rc-name" style="font-weight: bold;
            font-size: 16px;
            margin: 0;">name</p>
            <div class="txt"><br/></div>
          </div>
          <div class="tcc-rc-info" style="
          padding:8px;
          border-radius: var(--ha-card-border-radius);
          background-color: var(--card-background-color);
          box-shadow: var(--ha-card-box-shadow);">
            <ha-icon id="alert" icon="mdi:alert-box"></ha-icon>
            somting
          </div>
        </ha-card>`
      this.content = this.querySelector('.txt')
      this.card = this.querySelector('ha-card')
      this.name = this.querySelector('.tcc-rc-name')
      this.info = this.querySelector('.tcc-rc-info')
    }

    const entityId = this.config.entity
    const state = hass.states[entityId]
    const stateStr = state ? state.state : 'unavailable'

    this.info.innerHTML = 'hello card'
    this.name.innerHTML = this.config.room_name
    
    switch(this.config.room_color){
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

    var lights_string = "unavailable"

    if (typeof this.config.room_lights != "undefined") {
      const lights_entityId = this.config.room_lights
      const lights_num = hass.states[lights_entityId]
      lights_string = lights_num ? lights_num.state : "unavailable"
    }

    if (lights_string != "unavailable") {
      if(lights_string == 0){
        this.content.innerHTML = "All Off";
      }else if(lights_string == 1){
        this.content.innerHTML = "1 Light On";
      }else{
        this.content.innerHTML = lights_string+" Lights On";
      }
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity')
    }
    if (!config.room_name ) {
      throw new Error('You need to define an room_name')
    }

    this.config = config
  }

  getCardSize() {
    return 1
  }
}
