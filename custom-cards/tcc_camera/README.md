# TCC_Camera

a Live camera cart whit options.

## ToDo:

- [x] Basic Card
- [x] Theme intergration
- [x] show recording state
- [x] custom name variable
- [x] Show trigger / motion state #Whit some help of @AndyVR

## Configuration:

| Variable                    | Default      | Required | Notes                                         |
| --------------------------- | ------------ | -------- | --------------------------------------------- |
| camera_motion               |              | yest     | Binary sensor for motion detection            |
| camera_title                | frendly_name | no       | Path of the left button                       |
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