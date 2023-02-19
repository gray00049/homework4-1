import { useState } from 'react';

export default function Converter() {
  let [color, setColor] = useState({
    inputColor: '#78909c',
    successColor: '#78909c',
    rgbText: 'rgb(120, 144, 156)'
  });

  let changeColor = ({target}) => {
    const {value} = target;
    const rgbValue = hexToRgb(value);

    setColor(prevItem => ({...prevItem, ['inputColor']: value}));

    if (value.length < 7) {
      return;
    } else if (value.length > 7 || rgbValue == 'ошибка') {
      setColor(prevItem => ({...prevItem, ['rgbText']: 'Ошибка!', ['successColor']: '#e53935'}));
    } else {
      setColor(prevItem => ({
        ...prevItem, 
        ['successColor']: value,
        ['rgbText']: `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`
      }));
    }
  }

  return (
    <div className="converter__container" style={{ backgroundColor: color.successColor }}>
      <div className="converter__control">
        <input 
          type="text" 
          className="converter__input" 
          value={color.inputColor}
          onChange={changeColor}
        />
        <p className="converter__result">
          {color.rgbText}
        </p>
      </div>
    </div>
  )
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : 'ошибка';
}