---
hide:
  - toc
---
# Camera Kaart

Een live camera kaart met opties.

??? note "TeDoen"
    - [x] Basis kaart
    - [x] Thema intergratie
    - [x] Opname status
    - [x] Aangepaste naam
    - [x] Bewegings melding weergave #Met de hulp van @AndyVR
    - [ ] Screenshtot toevoegen

## Instellingen:

| Waarde                      | Standaard    | Nodig | Notities                                            |
| --------------------------- | ------------ | ----- | --------------------------------------------------- |
| camera_motion               |              | ja    | Bewegins sensor                                     |
| camera_title                | frendly_name | nee   | Tiettel                                             |
| camera_show_rec             | false        | nee   | laat de opname status in de rechter boven hoek zien |
| camera_show_lastmotion_time | false        | nee   | laat de laatste bewegint tijd in de info balk zien  |

## Sample:

```yaml
- type: 'custom:button-card'
  template: tcc_camera
  entity: "<CAMERA ENITITY>"
  variables:
      camera_motion: "binary_sensor.<MOTION SENSOR>"
      camera_image: "<SAME AS ENTITY>"
```