"use strict";

var audioElement;
var audioContext;
var audioSource;

var audioAnalyzer;
var rawFrequencyData;
//var freqData_fftSize = 32;
var freqData_fftSize = 128;
//var freqData_fftSize = 512;


var barAudioAnalyzer;
var barFrequencyData;

var mainCanvas;
var g_state;

window.onload = function() {
    setupAudio();
    startAudio();
    
    setupCanvas();
};

function startAudio() {
    audioElement.currentTime = 0;
    audioElement.play();
}

function setupAudio() {
    audioElement = document.getElementById("audioFile");
    audioContext = new AudioContext();
    audioSource = audioContext.createMediaElementSource(audioElement);
    
    audioAnalyzer = audioContext.createAnalyser();
    
    // we have to connect the MediaElementSource with the analyser 
    audioSource.connect(audioAnalyzer);
    
    audioSource.connect(audioContext.destination);
    
//    audioAnalyzer.fftSize = freqData_fftSize;

    // frequencyBinCount tells you how many values you'll receive from the analyser
    rawFrequencyData = new Uint8Array(audioAnalyzer.frequencyBinCount);
    
    
    
    barAudioAnalyzer = audioContext.createAnalyser();
    audioSource.connect(barAudioAnalyzer);
    audioSource.connect(audioContext.destination);
    barAudioAnalyzer.fftSize = freqData_fftSize;
    
    barFrequencyData = new Uint8Array(barAudioAnalyzer.frequencyBinCount);
    
    console.log(audioAnalyzer.frequencyBinCount);
    console.log(barAudioAnalyzer.frequencyBinCount);
}

function getMusicFrequencyData() {
    audioAnalyzer.getByteFrequencyData(rawFrequencyData);
    return rawFrequencyData;
}

function getBarMusicFrequencyData() {
    barAudioAnalyzer.getByteFrequencyData(barFrequencyData);
    return barFrequencyData;
}

function toggleMusicPlay() {
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
}

function getChar(event)
{
    if (event.which == null) {
        return String.fromCharCode(event.keyCode);
    } else if ((event.which != 0) && (event.charCode != 0)) {
        return String.fromCharCode(event.which);
    } else {
        return null;
    }
}

function handleKeyPress(event)
{
    var key = getChar(event);
    switch (key) {
        case 'p':
            toggleMusicPlay();
            break;
    }
}


function setupCanvas() {    
    mainCanvas = new Canvas_Manager("gl-canvas", Color(0, 0, 0, 1)),
        g_state = mainCanvas.shared_scratchpad.graphics_state;
    
    // May want to include or remove this for Phong vs Gouraud shading
//    g_state.gouraud = true;
//    g_state.gouraud = false;
    
    shaders_in_use["Default"] = new Phong_or_Gouraud_Shader(g_state);
    
    
    texture_filenames_to_load.push("nightsky1.png");
    
    for( var i = 0; i < texture_filenames_to_load.length; i++ ) textures_in_use[ texture_filenames_to_load[i] ] = ( new Texture( texture_filenames_to_load[i], false ) );
    
    mainCanvas.register_display_object(new Main_Screen(mainCanvas));
    mainCanvas.register_display_object(new Main_Camera(mainCanvas));
    mainCanvas.render();
    
}

window.requestAnimFrame = ( function()						// Use the correct browser's version of requestAnimationFrame() when queue-ing up re-display events. 
    {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( callback, element) { window.setTimeout(callback, 1000/60);  };
    })();




// helpers


function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    
    return Color(r, g, b);
//    return {
//        r: Math.round(r * 255),
//        g: Math.round(g * 255),
//        b: Math.round(b * 255)
//    };
}