let butt = document.getElementById('hiButton');
let text = document.getElementById('txt1');
let text2 = document.getElementById('txt2');
let text3 = document.getElementById('txt3');
let spy = document.getElementById('spy');
let txt = document.getElementById('hyperlink');
let colv = document.getElementById("colver");
let audio = document.getElementById("genoMusic");

let notGenocide = true;
let cannotPress = false;
butt.onclick = function()
{
  cannotPress = true;
  butt.remove();
  text2.remove();
  text3.remove();
  text.textContent = "Thanks! '-'";
  text2.style.color = 'rgb(155, 155, 0)';
};

var ohno;
let genoCount = 0;
document.onkeydown = function(event)
{
  switch(event.key.toLowerCase())
  {
    case 'g': // human, i rember your genocides.
      checkGenocide();
      break;
    case 'f12':
      return false;
  }

  // this does not work
  if (event.ctrlKey && event.shiftKey && event.key == 'i') return false;
  if (event.ctrlKey && event.shiftKey && event.key == 'c') return false;
}

function checkGenocide()
{
  if (!cannotPress) {
    notGenocide = false;
    cannotPress = true;
    let obj = [butt, text, text2, text3, spy, txt, colv];
    obj.forEach(function(v)
    {
      if (v == null) return
      v.remove();
    });
    console.log('* Clover, I rember your genocides.');
    document.body.style.background = 'black';
    ohno = new Audio('honest-days-work.mp3');
    ohno.loop = true;
    ohno.volume = 0.9;
    ohno.play();
    document.getElementById('genocide').style.visibility = 'visible';
    document.title = 'ㅤ';
    document.getElementById('icon').href = 'blank.png';
    document.addEventListener('contextmenu', event => event.preventDefault());
  } else {
    if (!notGenocide)
    {
      if (ohno != null)
        ohno.pause();

      close();
    } else {
      alert('* ...');
      cannotPress = false;
      notGenocide = false;
      checkGenocide();
    }
  }
}