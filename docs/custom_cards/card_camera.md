---
hide:
  - toc
---
# Camera Card

A live camera card whit options.

??? note "ToDo"
    - [x] Basic card
    - [x] Theme intergration
    - [x] show recording state
    - [x] custom name variable
    - [x] Show  motion trigger state #Whit some help of @AndyVR
    - [ ] Add screenshot

## Configuration:

| Variable                    | Default      | Required | Notes                                         |
| --------------------------- | ------------ | -------- | --------------------------------------------- |
| camera_motion               |              | yes      | Binary sensor for motion detection            |
| camera_title                | frendly_name | no       | Camera name                                   |
| camera_show_rec             | false        | no       | Shows recording state at the top right corner |
| camera_show_lastmotion_time | false        | no       | shows last motion time in info bar            |

## Sample:

```yaml
- type: 'custom:button-card'
  template: tcc_camera
  entity: "<CAMERA ENITITY>"
  variables:
      camera_motion: "binary_sensor.<MOTION SENSOR>"
      camera_image: "<SAME AS ENTITY>"
```