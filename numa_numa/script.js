const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const video = document.getElementById("video");
const canvasHandler = document.getElementById("canvasHandler");
const colArray = [
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 
  'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 
  'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 
  'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 
  'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 
  'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 
  'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 
  'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 
  'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 
  'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 
  'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue', 
  'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 
  'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 
  'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 
  'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 
  'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 
  'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 
  'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seashell', 'sienna', 
  'silver', 'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 
  'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 
  'yellowgreen'
];

const bps = 60/130;
const offset = -0.053;

function chooseRandomColor(lastColor)
{
  let newColor;
  do {
    newColor = colArray[Math.floor(Math.random() * (colArray.length-1))];
  } while (
    newColor == lastColor
  );
  return newColor;
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
let _lastCol = "white";
let lyrics = generateLyrics();
setInterval(function()
{
  if (!video.paused)
  {
    let beat = ((video.currentTime + offset) / bps).toFixed(3);
    if (lastBeat != Math.floor(beat))
    {
      lastBeat = Math.floor(beat);
      if (lastBeat >= 35 && lastBeat < 59)
      {
        _lastCol = chooseRandomColor(_lastCol);
        document.body.style.background = _lastCol;
      }
      
      if (lastBeat >= 0 && lastBeat <= 5)
      {
        _lastCol = 'white';
        document.body.style.background = '';
        document.body.style.scale = 1;
        document.body.style.transform = "";
        document.title = "???";
        if (lyrics.length == 0)
          lyrics = generateLyrics();
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
      let ok = 1+easeBounce(beat%1)*0.5;
      let rot = Math.sin(beat * Math.PI)*15;
      let rotX = -Math.sin(beat * Math.PI) * 25;
      let x = Math.sin(beat * Math.PI) * 100;
      document.body.style.transform = `rotate(${rot}deg) rotate3d(1,1,0,${rotX}deg) translateX(${x}px) scale(${ok})`;
    }

    if ((beat >= 60 && beat < 62) || (beat >= 62 && beat < 64))
    {
      let ok = 1+easeOutExpo(beat/2%1)*0.5;
      document.body.style.transform = `scale(${ok})`;
    }
  }
}, 1)

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

document.onkeydown = function(e)
{
  if (video.paused && e.key == " ") {
    video.play();
  }
}

// GLSL 셰이더 코드
const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0, 1);
    v_texCoord = a_texCoord;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_texture;

  #define threshold 0.55
  #define padding 0.05

  // https://www.shadertoy.com/view/XsfGzn
  void main() {
    vec2 uv = v_texCoord;
    
    vec4 greenScreen = vec4(0.,1.,0.,1.);
    vec4 color = texture2D(u_texture, uv);

    vec3 diff = color.xyz - greenScreen.xyz;
    float fac = smoothstep(threshold-padding,threshold+padding, dot(diff,diff));

    gl_FragColor = mix(color, vec4(0.0, 0.0, 0.0, 0.0), 1.-fac);
  }
`;

// 셰이더 생성 함수
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// 프로그램 생성 함수
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// 셰이더 및 프로그램 초기화
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

// 정점 데이터 설정
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1, -1,
   1, -1,
  -1,  1,
   1,  1,
]), gl.STATIC_DRAW);

const texCoordBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  0, 1,
  1, 1,
  0, 0,
  1, 0,
]), gl.STATIC_DRAW);

// 텍스처 초기화
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

// 애니메이션 루프
let hasRendered = false;
function render() {
  if (true) {
    hasRendered = true;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  requestAnimationFrame(render);
}

video.addEventListener("play", () => {
  render();
});
