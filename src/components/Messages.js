//Test files
//https://files.catbox.moe/v71b50.jpg
//https://files.catbox.moe/d0sb20.mp4

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Messages extends Component {
  
    constructor(props) {
        super(props)
    }

    getStyle = (user) => {
        if( user === "You" ) {
            return {backgroundColor : '#FFDAB9', overflowY: "auto", opacity: .75 }

        } else {
                return {backgroundColor : "#FFD700", overflowY: "auto", opacity: .75 }
            }
        }
    
    determineVisualContent = (content, scroll) => {
        if(typeof content == 'undefined' || typeof content == null) {
            return null;
        } else if (content.length <= 0) {
            return null;
        }
        var splitContent = content.split('/');
        if(splitContent[2] === "files.catbox.moe" || splitContent[2] === "i.imgur.com") {
            splitContent = splitContent[3].split(".");
            if(splitContent[1] == "mp4" || splitContent[1] == "webm" || splitContent[1] == "avi" || splitContent[1] == "ogg" || splitContent[1] == "mpeg") { 
                //ref = {vidRef => {this.vidRef = vidRef }}
                return (
                <div ><br /><video ref = {vidRef => {this.vidRef = vidRef }} onLoadedMetadata = {this.scrollToBottomVideo} controls autoplay> <source src={content} ></source></video> </div>
                )
            } else if(splitContent[1] == "jpg" || splitContent[1] == "jpeg" || splitContent[1] == "png" || splitContent[1] == "gif")  {
                return <div ><br /><img src = {content} alt="User Content" /></div>
            } else {
                return null
            }
        } else if((splitContent[2] === "www.youtube.com" || splitContent[2] === "youtube.com" || splitContent[2] === "youtu.be" || splitContent[2] === "www.youtu.be")) {            
            const regexp = /^.*(watch\?v=)/;
            
            var youtubeURL = "https://youtube.com/embed/" + splitContent[3].replace(regexp, '');
            return (
                
                <div><iframe width="560" height="315" src={youtubeURL} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            )
        } else {
            return null
        }
    }

    componentDidMount() {
        this.scrollToBottom();
        //this.scrollToBottomVideo();
      }
    
    componentDidUpdate() {
        this.scrollToBottom();
        //this.scrollToBottomVideo();
      }

      hoverOn = () => {
          //this.setState({opacity: 1});
          this.chatRef.style.opacity = 1; // this.state.opacity;
      }

      hoverOff = () => {
          //this.setState({opacity: .75});
          this.chatRef.style.opacity = .75; // this.state.opacity;
      }

    scrollToBottom = () =>  
        {  
            this.chatRef.scrollIntoView({behavior: 'smooth', block: "start"}); 
        }
    scrollToBottomVideo = () => 
    {
        this.vidRef.scrollIntoView({behavior: 'smooth', block: "start"})
    }

  render() {    
    return (
        <div onMouseEnter = {this.hoverOn} onMouseLeave = {this.hoverOff} style = {this.getStyle(this.props.chatItems.user)} ref = {chatRef => {this.chatRef = chatRef }}> 
            {this.props.chatItems.user + ": " + this.props.chatItems.message}
            {this.determineVisualContent(this.props.chatItems.message)}
        </div>
        
    )
  };
}

Messages.propTypes = {
    chatItems: PropTypes.object.isRequired,
}


export default Messages;
