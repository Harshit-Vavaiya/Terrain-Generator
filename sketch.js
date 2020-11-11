let w = 1200;
let h = 600;
let rows;
let cols;
let scale = 10;
let grid;
let peak = 100;
let depth = -peak;
let xinc = 0.1;
let yinc = 0.1;
let depthSlider;
let heightSlider;
let xSlider;
let ySlider;
let flying = 0;
let offset = 100;
var fly;
function setup()
{
    var styles = "color:red"
    var a1 = createP("Max-depth");
    depthSlider = createSlider(-200, 0, -100, 1);
    a1.style('font-family','raleway');

    var a2 = createP("Max-height");
    heightSlider = createSlider(0, 200, 0, 1);
    a2.style('font-family','raleway');
    
    var a3 = createP("X-noise");
    xSlider = createSlider(0, 1, 0.1, 0.05);
    a3.style('font-family','raleway');
    
    var a4 = createP("Y-noise");
    ySlider = createSlider(0, 1, 0.1, 0.05);
    a4.style('font-family','raleway');
    
    fly = createCheckbox(': Fly Over Terrain');
    fly.style('font-family','raleway')
    
    var canvas = createCanvas(600, 600, WEBGL);
    
    
    a1.position(offset+width+30,100+0); depthSlider.position(offset+width+130,100+12);
    a2.position(offset+width+30,100+40);heightSlider.position(offset+width+130,40+100+12);
    a3.position(offset+width+30,100+80);xSlider.position(offset+width+130,80+100+12);
    a4.position(offset+width+30,100+120);ySlider.position(offset+width+130,120+100+12);
    fly.position(offset+width+30,100+200);
    
    rows = w/scale;
    cols = h/scale;
    grid = new Array(cols);
} 


function draw()
{
    background(0,200,200); //sky background 
    // background(255); // white background
    peak = heightSlider.value();

    depth = depthSlider.value();
    xinc = xSlider.value();
    yinc = ySlider.value();

 


    
    let joff = flying;
    for(let i=0; i<cols; i++)
    {
        grid[i] = new Array(rows)
        let ioff = 0;
        for(let j=0; j<rows; j++)
        {
            
            grid[i][j] = map(noise(joff, ioff),0,1,depth,peak);
            ioff += xinc;
        }
        joff += yinc;

    }

    
    // to fly over terrain
    if(fly.checked())
    { flying -= 0.1; }


    rotateX(PI/3);
    
    translate(-w/2, -h/2);
    stroke(0);
    // noStroke();
    strokeWeight(0.4);
    fill(50,200,50);

    for(let i=0; i<cols-1; i++)
    {
        beginShape(TRIANGLE_STRIP);
        for(let j=0; j<rows; j++)
        {
            vertex(j*scale,i*scale, grid[i][j]);
            vertex(j*scale,(i+1)*scale , grid[i+1][j]);
        }
        endShape()
    }

}