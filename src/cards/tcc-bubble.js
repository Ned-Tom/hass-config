// Room card
class tccbubblecard extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  set hass(hass) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `
        <ha-card style="padding:5px;
        background-color: transparent;
          box-shadow: none;">
          <div class="button" style="
          padding:8px;
          border-radius: 50%;
          background-color: var(--card-background-color);
          box-shadow: var(--ha-card-box-shadow);
          width: 60px;
          height: 60px;
          padding: 0;
          margin: 0 auto;">
            <ha-icon style="display:block; text-algin: center;" id="tcc-bc-icon" icon="mdi:alert-box"></ha-icon>
          </div>
          <p style="width:100%; text-align: center;" class="tcc-bc-name">name</p>
        </ha-card>`
      this.name = this.querySelector('.tcc-bc-name')
      this.icon = this.querySelector('#tcc-bc-icon')
    }

    const entityId = this.config.entity
    const state = hass.states[entityId]
    const stateStr = state ? state.state : 'unavailable'

    this.name.innerHTML = this.config.name
    // this.name.innerHTML = hass.state_attr(entityId,'friendly_name')
    this.icon.setAttribute("icon", this.config.icon)
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity')
    }
    // if (!config.name) {
    //   // config.name = hass.states[config.entity].attributes.friendly_name
    //   config.name = "Hello Name"
    // }

    this.config = config
  }

  getCardSize() {
    return 1
  }
}