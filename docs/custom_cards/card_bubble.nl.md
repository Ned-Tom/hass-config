---
hide:
  - toc
---
# Ronde knop kaart

Een simpele ronde actie knop kaart.

![Bubble preview.png](/images/Bubble%20preview-light.png#only-light)
![Bubble preview.png](/images/Bubble%20preview-dark.png#only-dark)

???+ note "TeDoen"
    - [x] Basis kaart
    - [x] Thema intergratie
    - [ ] Kleur variable
    - [ ] Melding icoon
    - [ ] Lamp teller melding
    - [ ] PopUp

## Voorbeeld:

```yaml
 - type: 'custom:button-card'
   template: card_bubble
   entity: group.all_lights
   icon: mdi:all-inclusive
   name: Alle lampen
```
