var Util = require('./util');
var Layout = require('./layout');
var Depot = require('./depot');

var Carousel = React.createClass({
    getInitialState: function () {
        return {
            all_info: this.props.all_info,
            figures: Layout[this.props.layout].figures(this.props.width, this.props.all_info, 0),
            rotationY: 0
        };
    },
    openimage: function (imagehref) {
        console.log("here", imagehref);
        window.open(imagehref);
    },
    deletearticle: function (url) {

        console.log("deleting", this.props.id);
        console.log("deletingurl", url);
    },
    onhover: function (url) {
        document.getElementById(url).style.display = 'block';
    },
    onmouseout: function (url) {
        document.getElementById(url).style.display = 'none';
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
            if ((d.headline).length > 55) {
                font_size = "2.5vw";
            };
            return (<figure key={i} style={Util.figureStyle(d)}>
                <div className="imagedashdiv" onMouseLeave={parentThis.onmouseout.bind(null,d.url)} onMouseEnter={parentThis.onhover.bind(null,d.url)}>
                    <div className="imagedash">
                        <img className src={d.image} alt={i} height={"100%"} width={"100%"}/>
                    </div>
                    <div className="imagetextdash" id={d.url} style={{display:"none"}}>
                        <p style={{fontSize:font_size}}>"{d.headline}"</p>
                        <div className="openbutton" onClick={parentThis.openimage.bind(null,d.url)}>
                            <button>
                              <span>Open</span>
                            </button>
                        </div>
                        <div className="deletebutton" onClick={parentThis.deletearticle.bind(null,d.url)}>
                            <button>
                              <span>X</span>
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