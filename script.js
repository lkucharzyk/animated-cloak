
 let clockStyle ={}

  if (localStorage.getItem('style') !== null){
    clockStyle = JSON.parse(localStorage.getItem('style'))
  }else{
    clockStyle = {
      faceColor : '#c29976',
      borderColor: '#800000',
      markersColor: 'black',
      lgHandsColor: '#800000',
      secHandColor: 'white'
    }
  }
  
  const colorInputs = document.querySelectorAll('input');
  colorInputs.forEach((input)=>input.addEventListener('change', changeStyle));

  function changeStyle(e){
    const input = e.target.getAttribute('id');
    const value = e.target.value;

    switch(input){
      case 'face-color':
        clockStyle.faceColor = value;
      break;  
      case 'border-color':
        clockStyle.borderColor = value;
      break;  
      case 'line-color':
        clockStyle.markersColor = value;
      break;  
      case 'large-hand-color':
        clockStyle.lgHandsColor = value;
      break;  
      case 'second-hand-color':
        clockStyle.secHandColor = value;
      break;  
    }
    localStorage.setItem('style', JSON.stringify(clockStyle))
    console.log(localStorage.getItem('style'));
  }


function cloak(){
  const now = new Date;
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  ctx.save();
  //ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); //put 0, 0 coord in ceneter
  ctx.rotate(-Math.PI / 2); // rotate - 90deg

  ctx.strokeStyle = 'black';
  ctx.fillStyle = clockStyle.faceColor;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  //face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth =14;
  ctx.strokeStyle = clockStyle.borderColor;
  ctx.arc(0, 0, 200, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  //marks
  ctx.save();
  for(let i = 0; i<12; i++){
    ctx.beginPath();
    deg = 360 / 12;
    ctx.rotate(deg * Math.PI / 180)
    ctx.strokeStyle = clockStyle.markersColor;
    ctx.moveTo(150, 0);
    ctx.lineTo(170, 0);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  for(let i = 0; i<60; i++){
    if(i % 5 === 0){
      ctx.rotate(deg * Math.PI / 180)
    }else{
      ctx.beginPath();
    deg = 360 / 60;
    ctx.strokeStyle = clockStyle.markersColor;
    ctx.rotate(deg * Math.PI / 180)
    ctx.lineWidth = 2
    ctx.moveTo(150, 0);
    ctx.lineTo(160, 0);
    ctx.stroke();
    }
  }
  ctx.restore();

  //get current time
  const hr = now.getHours() %12
  const min = now.getMinutes();
  const sec = now.getSeconds();

  //hands
  ctx.save()
  ctx.beginPath();
  deg = (360 / 12) * hr;
  ctx.rotate(deg * Math.PI / 180) 
  ctx.moveTo(-5, 0);
  ctx.lineTo(90, 0);
  ctx.lineWidth = 10;
  ctx.strokeStyle = clockStyle.lgHandsColor;
  ctx.stroke();
  ctx.restore();

  ctx.save()
  ctx.beginPath();
  deg = (360 / 60) * min;
  ctx.rotate(deg * Math.PI / 180) 
  ctx.moveTo(-10, 0);
  ctx.lineTo(110, 0);
  ctx.lineWidth = 8;
  ctx.strokeStyle = clockStyle.lgHandsColor;
  ctx.stroke();
  ctx.restore();

  ctx.save()
  ctx.beginPath();
  deg = (360 / 60) * sec;
  ctx.rotate(deg * Math.PI / 180) 
  ctx.moveTo(-15, 0);
  ctx.lineTo(130, 0);
  ctx.lineWidth = 6;
  ctx.strokeStyle = clockStyle.secHandColor;
  ctx.stroke();
  ctx.restore();


  ctx.restore();
  requestAnimationFrame(cloak);
}
requestAnimationFrame(cloak);

function saveAsImage(){
  const link = document.createElement('a');
  link.download = 'download.png';
  link.href = document.querySelector('canvas').toDataURL();
  link.click();
  link.delete;
}

document.querySelector('#save-btn').addEventListener('click', saveAsImage)
