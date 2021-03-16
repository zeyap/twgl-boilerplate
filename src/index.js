import * as twgl from 'twgl.js';
import fs from './basic.frag';
import vs from './basic.vert';

function resizeCanvas(canvas){
    canvas.style= `width:${window.innerWidth}px; height:${3*window.innerWidth/4}px`;
}

function main(){
    const canvas = document.getElementById("c");
    if(canvas == null){
        return;
    }
    resizeCanvas(canvas);
    window.onresize = ()=>{resizeCanvas(canvas);};
    canvas.style= `width:${window.innerWidth}px; height:${3*window.innerWidth/4}px`;
    
    const gl = canvas.getContext("webgl") || gl.getContext("experimental-webgl");
    if(gl == null){
        console.log('cannot get webgl context');
        return;
    }
    const programInfo = twgl.createProgramInfo(gl, [vs, fs]);
    const arrays = {
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
    requestAnimationFrame(render);

    function render(time) {
        // twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        const uniforms = {
            time: time * 0.001,
            resolution: [gl.canvas.width, gl.canvas.height],
        };

        gl.useProgram(programInfo.program);
        twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
        twgl.setUniforms(programInfo, uniforms);
        twgl.drawBufferInfo(gl, bufferInfo);

        requestAnimationFrame(render);
    }
}

main();