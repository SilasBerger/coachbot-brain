const videos = [
    "https://www.youtube.com/watch?v=9-QcWVPFxGA",
    "https://www.youtube.com/watch?time_continue=19&v=5IuRzJRrRpQ",
    "https://www.youtube.com/watch?time_continue=4&v=4buAI39XTCQ",
    "https://www.youtube.com/watch?v=oUle-4E1qoQ",
    "https://www.youtube.com/watch?v=6l51gjch-1k",
];

const images = [
    "http://bit.ly/2BVY7jw",
    "http://bit.ly/2Enbl6m",
    "http://bit.ly/2Gboi3o",
    "http://bit.ly/2Bqy1E4",
    "http://bit.ly/2Enbl6m",
    "http://bit.ly/2someDg",
    "http://bit.ly/2EWZehf",
];

function randomVideo() {
    return videos[Math.floor(Math.random() * videos.length)];
}

function randomImage() {
   return images[Math.floor(Math.random() * images.length)];
}

function randomElement() {
    var randIndex = Math.floor(Math.random() * 2);
    switch(randIndex){
        case 0:
            return randomVideo();
        case 1:
            return randomImage();

    }
}

module.exports = {
    randomImage,
    randomVideo,
    randomElement
};