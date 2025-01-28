const bps = 60/130;
const offset = -0.053;
const gif = document.getElementById('mvv');
const song = document.getElementById('song');
const tip = document.getElementById('tip');

function generateRandomNumber(min, max, last)
{
  let _new;
  do {
    _new = min + (Math.random() * (max-min));
  } while (last == _new)
  return _new;
}

function easeOutExpo(t)
{
  return Math.pow(2, -10 * t);
}

function easeBounce(t)
{
  return -Math.pow(t * 2 - 1, 2) + 1;
}

function generateLyrics()
{
  let a = [
    [33, "마"],
    [33.5, '마예'],
    [34, "마예야"],
    [34.5, "마예야히~"],

    [37, "마"],
    [37.5, "마예"],
    [38, "마예야"],
    [38.5, "마예야후~"],

    [41, "마"],
    [41.5, "마예"],
    [42, "마예얏"],
    [42.5, "마예얏하~"],

    [45, "마"],
    [45.5, "마예"],
    [46, "마예얏"],
    [46.5, "마예얏하↗"],
    [47.5, "마예얏하↗ 하↘"]
  ]

  for (let i = 0; i < 17; i++)
    a.push([a[i][0]+16, a[i][1]]);
  return a;
}

let lastBeat = 0;
let _lastCol = 0;
let lyrics = generateLyrics();
setInterval(function()
{
  if (!song.paused)
  {
    let beat = ((song.currentTime + offset) / bps).toFixed(3);
    if (lastBeat != Math.floor(beat))
    {
      lastBeat = Math.floor(beat);
      if (lastBeat >= 35 && lastBeat < 59)
        _lastCol = generateRandomNumber(0, 360, _lastCol);
      
      if (lastBeat >= 0 && lastBeat <= 5)
      {
        _lastCol = 0;
        document.body.style.background = "";
        document.body.style.scale = "";
        document.body.style.transform = "";
        document.title = "???";
        if (lyrics.length == 0)
          lyrics = generateLyrics();
      }

      if (lastBeat == 0)
      {
        gif.src = '';
        gif.src = 'GB.gif';
        gif.style.display = "";
      }
    }

    for (let i = 0; i < lyrics.length; i++)
    {
      if (lyrics[i][0] <= beat)
      {
        document.title = lyrics[i][1];
        if (lyrics.length == 1)
          lyrics = [];
        else
          lyrics = lyrics.filter(item => item !== lyrics[i]);
      }
    }

    if (beat >= 31 && beat < 35)
    {
      let t = (35-beat)/4;
      document.body.style.background = `rgb(${t*255}, ${t*255}, ${t*255})`;
    }

    if (beat >= 35 && beat < 59)
    {
      let ok = 1+easeBounce(beat%1)*0.75;
      let rot = Math.sin(beat * Math.PI)*15;
      let x = Math.sin(beat * Math.PI*2) * 100;
      document.body.style.transform = `rotate(${rot}deg)`;
      if (lastBeat % 2 == 0) {
        document.body.style.transform += ` translateX(${x*2}px) scaleX(${ok}) scaleY(1)`;
      } else {
        document.body.style.transform += ` translateY(${x}px) scaleY(${ok}) scaleX(1)`;
      }
      
      let t = 25+easeOutExpo(beat/2%0.5)*25;
      document.body.style.background = `hsl(${_lastCol}, 100%, ${t}%)`;
    }

    if ((beat >= 60 && beat < 62) || (beat >= 62 && beat < 64))
    {
      let ok = 1+easeOutExpo(beat/2%1)*0.5;
      document.body.style.transform = `scale(${ok})`;
    }
  }
}, 1)

document.onkeydown = function(e)
{
  if (song.paused && e.key == " ") {
    song.play();
    gif.style.display = "";
    tip.style.display = "none";
  }
}