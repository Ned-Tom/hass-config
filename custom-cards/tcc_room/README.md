# Card_Room

An other alternative Room card desing 

![Preview](preview-light.png)

## ToDo:

- [x] Basic Card
- [x] Theme intergration
- [x] Option to change background color
- [x] Better Theme intergration / static colors
- [ ] Translations
- [ ] more customization options

## Configuration:

| Variable          | Default       | Required | Notes                              |
| ----------------- | ------------- | -------- | ---------------------------------- |
| room_path         |               | yes      | Path to an other view              |
| room_name         |               | yes      | Room name                          |
| room_icon         | mdi:alert-box | no       | Info icon                          |
| room_color        | <color>       | no       | Custom background color *          |
| room_info         | true          | no       | Temperture sensor or other sensor  |
| room_info_stuffix | °C            | no       | Stuffix to be added after the info |
| room_lights       |               | no       | Sensor whit light on count **      |

## Sample:

```yaml
- type: custom:button-card
  template: tcc_room
  variables:
    room_path: kitchen
    room_name: Kitchen
    room_icon: mdi:fridge-outline
    room_color: red
    room_info: "sensor.temperature_18"
    room_info_stuffix: "°C"
    room_lights: sensor.kitchen_lights_on
```

*The default color is Gray you can use the folow colors that work in light and dark mode:
- gray
- red
- green
- yello
- blue
- violet

**This configuration needs an custom sensor being created in your config