/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function videoTags() {
    return document.getElementsByTagName("video");
}

function closeFullScreen() {
    try {
        var videos = videoTags()
        for (var i = 0; i < videos.length; i++) {
            videos.item(i).onplaying = function() {
                videos.item(i).webkitExitFullScreen()
            }
        }
    } catch (error) {
        console.log(error);
    }
}

var isFullScreenEnabled = document.fullscreenEnabled ||
                                    document.webkitFullscreenEnabled ||
                                    document.mozFullScreenEnabled ||
                                    document.msFullscreenEnabled ? true : false;

var isFullscreenVideosSupported = HTMLVideoElement.prototype.webkitEnterFullscreen !== undefined;

if (!isFullScreenEnabled && isFullscreenVideosSupported && !/mobile/i.test(navigator.userAgent)) {
    
    HTMLElement.prototype.requestFullscreen = function() {
        if (this.webkitRequestFullscreen !== undefined) {
            this.webkitRequestFullscreen();
            return true;
        }
        
        if (this.webkitEnterFullscreen !== undefined) {
            this.webkitEnterFullscreen();
            return true;
        }
        
        var video = this.querySelector("video")
        if (video !== undefined) {
            video.webkitEnterFullscreen();
            return true;
        }
        return false;
    };
    
    Object.defineProperty(document, 'fullscreenEnabled', {
        get: function() {
            return true;
        }
    });
    
    Object.defineProperty(document.documentElement, 'fullscreenEnabled', {
        get: function() {
            return true;
        }
    });
}

function listenPIPButton() {
    return document.getElementsByTagName('pip-button').outerHTML;
//    document.getElementsByClassName('ytp-pip-button ytp-button')[0].addEventListener("click", function() {
//       runPiPifier()
//      });
}

function runPiPifier(){
    var videoCount = document.getElementsByTagName('video').length;
    //check iFrames
    if (videoCount == 0) {
        var embeddedYT = document.getElementsByClassName('youtube-player');
        if (embeddedYT.length > 0) {
            videoCount = embeddedYT[0].getElementsByTagName('video').length;
        }
    }
  
    var errorMessage = "No compatible video found.\n\nPlease note that if the video is an embedded video (like Youtube player on another site) this will only work on the main page"
    if (videoCount > 0) {
       
        var video;
        if (document.getElementsByTagName('video').length > 0){
            video = document.getElementsByTagName('video')[0];
        }
        //check iframe
        else{
            video = document.getElementsByClassName('youtube-player')[0].getElementsByTagName('video')[0];
        }
        video.webkitSetPresentationMode('picture-in-picture');
        
    } else {
        // If nothing's been returned to us, we'll set the background to
        // blue.
        alert("Pipifier Message: " + errorMessage);
    }
}
