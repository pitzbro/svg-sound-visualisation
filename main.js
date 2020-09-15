const svgWidth = 1200
const svgHeight = 600;

const peakNumber = 300;
const frequency = 60;
const noiseWave = 4;
const wavePeaksNum = 3;


var wavePeakHeightSteps = (svgHeight / 2) / (peakNumber / wavePeaksNum);

console.log('wavePeakHeightSteps', wavePeakHeightSteps)
var wavePeakWidthSteps = peakNumber / wavePeaksNum;


const svg = document.querySelector('svg.sound-wave');
const polyogon = document.querySelector('polygon');
const animationEl = document.querySelector('animate');
const stepWidth = svgWidth / (peakNumber - 1);

svg.setAttribute('width', svgWidth);
svg.setAttribute('height', svgHeight);
svg.setAttribute('viewBox', `0,0,${svgWidth},${svgHeight}`);

// Function to generate random number  
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomPeaks(base) {
    const midHeight = svgHeight / 2;
    var peaks = [];

    for (i = 0; i < peakNumber; i++) {


        var pos = i < wavePeakWidthSteps ? i : i % wavePeakWidthSteps;


        // if (pos < 50) peaks.push(randomNumber(midHeight - (i * wavePeakHeightSteps), midHeight))
        peaks.push(randomNumber(midHeight - (pos * wavePeakHeightSteps), midHeight))
        // else peaks.push(randomNumber(0, midHeight))
    }

    const toPeaks = peaks.reduce((string, num, idx) => {
        if (idx === 1) return `0,${midHeight} ${stepWidth},${num} `
        if (idx === peaks.length - 1) return `${string} ${svgWidth},${midHeight} `
        if (base) return `${string}  ${idx * stepWidth},${midHeight} `
        else return `${string} ${idx * stepWidth},${num} `
    })

    const backPeaks = peaks.reverse().reduce((string, num, idx) => {
        if (idx === 1) return `${svgWidth},${midHeight} ${svgWidth - stepWidth},${(midHeight - num) + midHeight} `
        if (idx === peaks.length - 1) return `${string} 0,${midHeight} `
        if (base) return `${string}  ${svgWidth - (idx * stepWidth)},${midHeight} `
        else return `${string} ${svgWidth - (idx * stepWidth)},${(midHeight - num) + midHeight} `
    })

    return toPeaks + backPeaks;

}

polyogon.setAttribute('points', getRandomPeaks());

function updatePolygone() {
    animationEl.setAttribute('to', getRandomPeaks());
    animationEl.setAttribute('dur', randomNumber(1, noiseWave) + 's');
}

setInterval(updatePolygone, frequency)
