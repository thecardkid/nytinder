/* Carousel Component with opening imaging functionality, deleting image from user's list of saved images
and onhover display different things*/

var Util = require('./util');
var Layout = require('./layout');
var Depot = require('./depot');

var Carousel = React.createClass({
    propTypes: {
        all_info: React.PropTypes.array.isRequired,
        width: React.PropTypes.number.isRequired,
        ease: React.PropTypes.string.isRequired,
        duration: React.PropTypes.number.isRequired,
        layout: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        deleteUserArticle: React.PropTypes.func.isRequired,
    },

    getInitialState: function () {
        return {
            all_info: this.props.all_info,
            figures: Layout[this.props.layout].figures(this.props.width, this.props.all_info, 0),
            rotationY: 0
        };
    },

    openImage: function (imagehref) {
        //open imagehref
        console.log("here", imagehref);
        window.open(imagehref);
    },

    deleteArticle: function (articleId) {
        //call deleteUserarticle with articleid and userid
        this.props.deleteUserArticle(this.props.id,articleId);
    },

    onHover: function (articleId) {
        //display all of the text div on hover
        document.getElementById(articleId).style.display = 'block';
    },

    onMouseOut: function (articleId) {
        //hide all of the text div on hover
        document.getElementById(articleId).style.display = 'none';
    },

    componentWillMount: function () {
        this.depot = Depot(this.getInitialState(), this.props, this.setState.bind(this));
        this.onRotate = this.depot.onRotate.bind(this);
    },

    componentWillReceiveProps: function (nextProps) {
        this.depot.onNextProps(nextProps);
    },
    
    render: function () {
        var angle = (2 * Math.PI) / this.state.figures.length;
        var translateZ = -Layout[this.props.layout].distance(this.props.width,
            this.state.figures.length);
        var parentThis = this;
        var figures = this.state.figures.map(function (d, i) {
            var font_size = "3.5vw";
            if ((d.all_info.headline).length > 55) {
                font_size = "2.5vw";
            };
            return (<figure key={i} style={Util.figureStyle(d)}>
                <div className="imagedashdiv" onMouseLeave={parentThis.onMouseOut.bind(null,d.all_info.articleId)} onMouseEnter={parentThis.onHover.bind(null,d.all_info.articleId)}>
                    <div className="imagedash">
                        <img className src={d.image} alt={i} height={"100%"} width={"100%"}/>
                    </div>
                    <div className="imagetextdash" id={d.all_info.articleId}>
                        <p className="imageheadline" style={{fontSize:font_size}}>
                            "{d.all_info.headline.replace('&amp;', '&').replace('&#8216;', "'").replace('&#8217;', "'")}"
                        </p>
                        <p className="imageauthor">{d.all_info.byline}</p>
                        <div className="carousel-button" >
                            <button onClick={parentThis.openImage.bind(null,d.all_info.url)}>
                              <img src='img/newtab.png' width='20' height='20'/>
                            </button>
                            <button onClick={parentThis.deleteArticle.bind(null,d.all_info.articleId)}>
                              <img src='img/close.png' width='20' height='20'/>
                            </button>
                        </div>
                    </div>
                </div>
            </figure>);
        });
        
        if ((figures).length > 1) {
            return (
                <section className='react-3d-carousel'>
                    <div className='carousel'
                         style={{transform: "translateZ("+translateZ+"px)"}}>
                        {figures}
                    </div>
                    <div className='prev' onClick={Util.partial(this.onRotate,+angle)}></div>
                    <div className='next' onClick={Util.partial(this.onRotate,-angle)}></div>
                </section>
            );
        } else {

            return (
                <section className='react-3d-carousel'>
                    <div className='carousel'
                         style={{transform: "translateZ("+translateZ+"px)"}}>
                        {figures}
                    </div>
                </section>
            );
        }
    }
});
module.exports = Carousel;