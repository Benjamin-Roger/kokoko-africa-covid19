import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const MaterialIconButton = (props) => {


  const {icon, color, ...otherProps} = props;

  const style = color ? {...otherProps.style, color: color } : {...otherProps.style};

  
  return (
  <IconButton {...otherProps} className="focus:outline-none">
    <Icon style={style}>{icon}</Icon>
  </IconButton>
)};

export default MaterialIconButton;
