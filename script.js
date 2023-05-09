function cloak(){
  const now = new Date;
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  ctx.save();
  //ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); //put 0, 0 coord in ceneter
  ctx.rotate(-Math.PI / 2); // rotate - 90deg

  ctx.strokeStyle = 'black';
  ctx.fillStyle = '#c29976';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  //face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth =14;
  ctx.strokeStyle = '#800000';
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
  ctx.strokeStyle = '#800000';
  ctx.stroke();
  ctx.restore();

  ctx.save()
  ctx.beginPath();
  deg = (360 / 60) * min;
  ctx.rotate(deg * Math.PI / 180) 
  ctx.moveTo(-10, 0);
  ctx.lineTo(110, 0);
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#800000';
  ctx.stroke();
  ctx.restore();

  ctx.save()
  ctx.beginPath();
  deg = (360 / 60) * sec;
  ctx.rotate(deg * Math.PI / 180) 
  ctx.moveTo(-15, 0);
  ctx.lineTo(130, 0);
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'white';
  ctx.stroke();
  ctx.restore();


  ctx.restore();
  requestAnimationFrame(cloak);
}
requestAnimationFrame(cloak);