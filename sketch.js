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
var b1, b2, b3, b4;
// let offset =    
let flying = 0;
function setup()
{
    var a1 = createP("Max-depth");
    depthSlider = createSlider(-200, 0, -100, 1);
       

    var a2 = createP("Max-height");
    heightSlider = createSlider(0, 200, 0, 1);
    
    var a3 = createP("X-noise");
    xSlider = createSlider(0, 1, 0.1, 0.05);
    
    var a4 = createP("Y-noise");
    ySlider = createSlider(0, 1, 0.1, 0.05);
    
    

    createCanvas(600, 600, WEBGL);
    
    a1.position(width+30,0); depthSlider.position(width+130,12);
    a2.position(width+30,40);heightSlider.position(width+130,40+12);
    a3.position(width+30,80);xSlider.position(width+130,80+12);
    a4.position(width+30,120);ySlider.position(width+130,120+12);
    
    rows = w/scale;
    cols = h/scale;
    grid = new Array(cols);

} 


function draw()
{
    background(0);
    peak = heightSlider.value(); // b2.value = heightSlider.value();

    depth = depthSlider.value();// b1.value = depthSlider.value();
    xinc = xSlider.value(); //b3.value = xSlider.value();
    yinc = ySlider.value();// b4.value = ySlider.value();
    
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
    // flying -= 0.1 


    rotateX(PI/3);
    
    translate(-w/2, -h/2);
    stroke(255);
    strokeWeight(0.4);
    noFill();

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