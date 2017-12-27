import Icon from './icon.png'
import printMe from './print.js'

export default function hello () {
  var element = document.createElement('div');
  element.innerHTML = 'Hello Webpack!!!!';
  element.classList.add('hello');

  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console';
  btn.onclick = printMe;
  element.appendChild(btn);

  document.body.appendChild(element);
}
