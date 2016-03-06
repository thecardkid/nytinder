(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {

    'use strict';


    function bounceOut(time, begin, change, duration) {
        if ((time /= duration) < 1 / 2.75) {
            return change * (7.5625 * time * time) + begin;
        } else if (time < 2 / 2.75) {
            return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
        } else if (time < 2.5 / 2.75) {
            return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
        } else {
            return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
        }
    }


    function bounceIn(time, begin, change, duration) {
        return change - bounceOut(duration - time, 0, change, duration) + begin;
    }


    function bounceInOut(time, begin, change, duration) {
        if (time < duration / 2) {
            return bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
        } else {
            return bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
        }
    };

    function circIn(time, begin, change, duration) {
        return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
    };

    function circOut(time, begin, change, duration) {
        return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
    };

    function circInOut(time, begin, change, duration) {
        if ((time = time / (duration / 2)) < 1) {
            return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
        } else {
            return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
        }
    };

    function cubicIn(time, begin, change, duration) {
        return change * (time /= duration) * time * time + begin;
    };

    function cubicOut(time, begin, change, duration) {
        return change * ((time = time / duration - 1) * time * time + 1) + begin;
    };

    function cubicInOut(time, begin, change, duration) {
        if ((time = time / (duration / 2)) < 1) {
            return change / 2 * time * time * time + begin;
        } else {
            return change / 2 * ((time -= 2) * time * time + 2) + begin;
        }
    };

    function expoIn(time, begin, change, duration) {
        if (time === 0) {
            return begin;
        }
        return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
    };

    function expoOut(time, begin, change, duration) {
        if (time === duration) {
            return begin + change;
        }
        return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
    };

    function expoInOut(time, begin, change, duration) {
        if (time === 0) {
            return begin;
        } else if (time === duration) {
            return begin + change;
        } else if ((time = time / (duration / 2)) < 1) {
            return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
        } else {
            return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;
        }
    };

    function linear(time, begin, change, duration) {
        return change * time / duration + begin;
    };

    function quadIn(time, begin, change, duration) {
        return change * (time = time / duration) * time + begin;
    };

    function quadOut(time, begin, change, duration) {
        return -change * (time = time / duration) * (time - 2) + begin;
    };

    function quadInOut(time, begin, change, duration) {
        if ((time = time / (duration / 2)) < 1) {
            return change / 2 * time * time + begin;
        } else {
            return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;
        }
    };

    function quartIn(time, begin, change, duration) {
        return change * (time = time / duration) * time * time * time + begin;
    };

    function quartOut(time, begin, change, duration) {
        return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
    };

    function quartInOut(time, begin, change, duration) {
        if ((time = time / (duration / 2)) < 1) {
            return change / 2 * time * time * time * time + begin;
        } else {
            return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
        }
    };

    function quintIn(time, begin, change, duration) {
        return change * (time = time / duration) * time * time * time * time + begin;
    };

    function quintOut(time, begin, change, duration) {
        return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
    };

    function quintInOut(time, begin, change, duration) {
        if ((time = time / (duration / 2)) < 1) {
            return change / 2 * time * time * time * time * time + begin;
        } else {
            return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
        }
    };

    function sineIn(time, begin, change, duration) {
        return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
    };

    function sineOut(time, begin, change, duration) {
        return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
    };

    function sineInOut(time, begin, change, duration) {
        return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
    };

    var Ease = {
        bounceOut: bounceOut,
        bounceIn: bounceIn,
        bounceInOut: bounceInOut,
        circIn: circIn,
        circOut: circOut,
        circInOut: circInOut,
        cubicIn: cubicIn,
        cubicOut: cubicOut,
        cubicInOut: cubicInOut,
        expoIn: expoIn,
        expoOut: expoOut,
        expoInOut: expoInOut,
        linear: linear,
        quadIn: quadIn,
        quadOut: quadOut,
        quadInOut: quadInOut,
        quartIn: quartIn,
        quartOut: quartOut,
        quartInOut: quartInOut,
        quintIn: quintIn,
        quintOut: quintOut,
        quintInOut: quintInOut,
        sineIn: sineIn,
        sineOut: sineOut,
        sineInOut: sineInOut
    }
    if (typeof exports === 'object') {
        module.exports = Ease;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return Ease;
        });
    } else {
        this.Ease = Ease;
    }

}.call(this));
},{}],2:[function(require,module,exports){
// Top component of app.

var TimeTinderBox = require('./timetinderbox.jsx');

ReactDOM.render(
	React.createElement(TimeTinderBox, null),
  	document.getElementById('content')
);
},{"./timetinderbox.jsx":10}],3:[function(require,module,exports){
var Util = require('./util');
var Layout = require('./layout');
var Depot = require('./depot');

var Carousel = React.createClass({displayName: "Carousel",
    getInitialState: function () {
        return {
            all_info: this.props.all_info,
            figures: Layout[this.props.layout].figures(this.props.width, this.props.all_info, 0),
            rotationY: 0
        };
    },
    openimage: function (imagehref) {
        window.open(imagehref);
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
            return (React.createElement("figure", {key: i, style: Util.figureStyle(d)}, 
                React.createElement("div", {className: "imagedashdiv"}, 
                    React.createElement("div", {className: "imagedash"}, 
                        React.createElement("img", {className: true, src: d.image, onClick: parentThis.openimage.bind(null,d.url), alt: i, height: "100%", width: "100%"})
                    ), 
                    React.createElement("div", {className: "imagetextdash"}, 
                        React.createElement("p", {style: {fontSize:"4vw"}}, "\"", d.headline, "\"")
                    )
                )
            ));
        });
        return (
            React.createElement("section", {className: "react-3d-carousel"}, 
                React.createElement("div", {className: "carousel", 
                     style: {transform: "translateZ("+translateZ+"px)"}}, 
                    figures
                ), 
                React.createElement("div", {className: "prev", onClick: Util.partial(this.onRotate,+angle)}), 
                React.createElement("div", {className: "next", onClick: Util.partial(this.onRotate,-angle)})
            )
        );
    }
});
module.exports = Carousel;
},{"./depot":4,"./layout":5,"./util":6}],4:[function(require,module,exports){
var Ease = require('ease-functions');
var Layout = require('./layout');
var Util = require('./util');

module.exports = function depot(initialState, initialProps,callback) {
    var res = {};
    var state = initialState;
    var props = initialProps;
    var requestID;

    res.onNextProps = function onNextProps(nextProps) {
        if(props.layout != nextProps.layout || props.all_info != nextProps.all_info) {
            props = nextProps;
            var to = Layout[props.layout].figures(props.width, props.all_info, state.rotationY);
            var bounds = transitionFigures(state.figures, to,Ease[props.ease], props.duration);
            var stepper = transit(bounds, to, props.duration);
            playAnimation(state,to,stepper,callback);
        }
        props = nextProps;
    };
    res.onRotate = function(angle){
        var to = Layout[props.layout].figures(props.width,props.all_info,state.rotationY + angle);
        state.rotationY +=angle;
        var bounds = transitionFigures(state.figures,to,Ease[props.ease],props.duration);
        var stepper = transit(bounds, to, props.duration);
        if(requestID) { cancelAnimationFrame(requestID); }
        playAnimation(state,to,stepper,callback);
    };
    function playAnimation(state,to,stepper,callback){
        if(requestID) window.cancelAnimationFrame(requestID);
        function animate(timestamp) {
            requestID = requestAnimationFrame(animate);
            state.figures = stepper(timestamp);
            callback(state);
            if (state.figures == to) {
                cancelAnimationFrame(requestID);
            }
        }
        requestAnimationFrame(animate);
    }
    return res;
};



function transitionFigures(from, to, ease) {
    var keys = Util.uniq(Util.pluck('key', from.concat(to)));
    var fromTo = [];
    keys.forEach(function (key) {
        fromTo.push(transfigure(startFrame(from[key], to[key]),
            endFrame(from[key], to[key]), ease));
    });
    return fromTo;
}

function transit(entries, to, duration) {
    var start,end;
    var withChange = addChange(entries);
    var time = 0;
    return function step(timestamp) {
        if(!start) {
            start =timestamp;
            end =timestamp+duration;
        }
        if (timestamp >= end) {
            return to;
        }
        time = timestamp - start;
        return tally(time, withChange, duration);
    }
}

function transfigure(from, to, ease) {
    var keys = Util.uniq(Object.keys(from || {}).concat(Object.keys(to || {})));
    var res = {};
    keys.forEach(function (key) {
        res[key] = {
            from: from[key],
            to: to[key]
        };
        res[key].ease = isNaN(res[key].from) ? secondArg : ease;
    });
    return res;
}

function addChange(entries) {
    var len = entries.length;
    var res = new Array(len);
    for (var i = 0; i < len; ++i) {
        res[i] = addObjChange(entries[i]);
    }
    return res;
}

function addObjChange(entry) {
    var res = Object.create(null);
    for (var key in entry) {
        res[key] = Util.merge(entry[key], {change: entry[key].to - entry[key].from});
    }
    return res;
}

function tally(time, entries, duration) {
    var len = entries.length;
    var res = new Array(len);
    var entry;
    for (var i = 0; i < len; ++i) {
        entry = entries[i];
        var obj = Object.create(null);
        for (var key in entry) {
            obj[key] = entry[key].ease ?
                entry[key].ease(time, entry[key].from, entry[key].change, duration)
                : entry[key].from;
        }
        res[i] = obj;
    }
    return res;
}

var secondArg = function (x, y) {
    return y;
};

var present = function present(entries) {
    return entries.filter(function (entry) {
        return entry.present;
    });
};

function startFrame(now, then) {
    return now || Util.merge(then, {present: true, opacity: 0});
}

function endFrame(now, then) {
    return now && !then ? Util.merge(now, {present: false, opacity: 0}) // leaves
        : Util.merge(then, {present: true, opacity: 1});
}

},{"./layout":5,"./util":6,"ease-functions":1}],5:[function(require,module,exports){
var Util = require('./util');

var exports = module.exports = {};

exports.prism = {
    distance: function apothem(width, sides) {
        return Math.ceil(width / (2 * Math.tan(Math.PI / sides)));
    },
    figures: function (width, images, urls, initial) {
        var sides = images.length;
        var angle = 2 * Math.PI / sides;
        var acceptable = Math.round(initial / angle) * angle;
        return Util.range(0, sides).map(function (d) {
            return {
                rotateY: d * angle + acceptable,
                translateX: 0,
                translateZ: exports.prism.distance(width, sides),
                opacity: 1,
                present: true,
                key: d,
                image: all_info[d].image_url,
                url: all_info[d].web_url,
                headline: all_info[d].headline
            };
        });
    }
};
exports.classic = {
    distance: function (width, sides) {
        return Math.round(width * Math.log(sides))
    },
    figures: function (width, all_info, initial) {
        var sides = all_info.length;
        var angle = 2 * Math.PI / sides;
        var distance = exports.classic.distance(width, sides);
        var acceptable = Math.round(initial / angle) * angle;
        return Util.range(0, sides).map(function (d) {
            var angleR = d * angle + acceptable;
            return {
                rotateY: 0,
                translateX: distance * Math.sin(angleR),
                translateZ: distance * Math.cos(angleR),
                opacity: 1,
                present: true,
                key: d,
                image: all_info[d].image_url,
                url: all_info[d].web_url,
                headline: all_info[d].headline
            };
        });
    }
};


},{"./util":6}],6:[function(require,module,exports){
var exports = module.exports = {};


exports.figureStyle = function figureStyle(d) {
    var translateX = Object.hasOwnProperty.call(d, 'translateX') ? d.translateX : 0;
    return {
        transform: 'rotateY(' + d.rotateY + 'rad) '
        + ' translateX(' + translateX + 'px)'
        + ' translateZ(' + d.translateZ + 'px)',
        opacity: d.opacity
    };
};

exports.partial = function partial(func){
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){
        return func.apply(this,args.concat(Array.prototype.slice.call(arguments, 0)));
    }
};

exports.range = function range(from,to){
    var res = [];
    for(var i =from; i < to; ++i){
        res.push(i);
    }
    return res;
};

exports.uniq = function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
};

/**
 * Merge defaults with user options
 * @private
 * @param {Object} defaults Default settings
 * @param {Object} options User options
 * @returns {Object} Merged values of defaults and options
 */
exports.merge = function merge(defaults, options ) {
    var extended = {};
    var prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
};

exports.pluck = function pluck(key,entries){
    return entries.map(function(entry){
        return entry[key];
    });
};

exports.mapObj = function mapObj(fn,obj){
    var res= {};
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            res[key] = fn(obj[key]);
        }
    }
    return res;
};
},{}],7:[function(require,module,exports){
var Carousel = require('./carouselstuff/carousel.jsx');
var Ease = require('ease-functions');
var testdata = require('./testdata').data;
var images = require('./images');

var get_image_url = testdata.map(function(obj){
	try {
		return "http://nytimes.com/"+ obj.multimedia[(obj.multimedia).length-1].url
	} catch(err) {
		return "https://www.petfinder.com/wp-content/uploads/2012/11/dog-how-to-select-your-new-best-friend-thinkstock99062463.jpg"
	}
});

var get_urls = testdata.map(function(obj){
	try {
		return obj.web_url
	} catch(err) {
		return "https://www.nytimes.com/"
	}
});

var get_all_necessary_info = testdata.map(function(obj){
	var new_obj = {}

	try {
		new_obj["image_url"] = "http://nytimes.com/"+ obj.multimedia[(obj.multimedia).length-1].url;
	} catch(err) {
		new_obj["image_url"] = "https://www.petfinder.com/wp-content/uploads/2012/11/dog-how-to-select-your-new-best-friend-thinkstock99062463.jpg";		
	}

	var web_url = obj.web_url || "https://www.nytimes.com/";
	var headline = obj.headline.main || "No headline";
	new_obj["web_url"] = web_url;
	new_obj["headline"] = headline;
	return new_obj;
});

console.log(get_all_necessary_info);


var DashboardHistory = React.createClass({displayName: "DashboardHistory",
    getInitialState: function () {
        return {
        	all_info: get_all_necessary_info,
            width: 300,
            layout: 'classic',
            ease: 'linear',
            duration: 400
        };
    },
    componentWillMount: function () {
        this.onSides = function (event) {
            this.setState( {images: get_image_url.slice(0, event.target.value) });
        }.bind(this);
        this.onLayout = function (event) {
            this.setState({layout: event.target.value});
        }.bind(this);
        this.onDuration = function (event) {
            this.setState({duration: parseInt(event.target.value) });
        }.bind(this);
        this.onEase = function (event) {
            this.setState({ease:  event.target.value});
        }.bind(this);
    },
    render: function () {
        return (
            React.createElement("div", {className: "carouselhistory"}, 
            	React.createElement("h1", null, "Saved Articles"), 
                React.createElement(Carousel, {all_info: this.state.all_info, 
                		  width: this.state.width, 
                          ease: this.state.ease, 
                          duration: this.state.duration, 
                          layout: this.state.layout})
            )
        );
    }
});

module.exports = DashboardHistory; 
},{"./carouselstuff/carousel.jsx":3,"./images":8,"./testdata":9,"ease-functions":1}],8:[function(require,module,exports){
module.exports = [
    'http://s7.postimg.org/dbamgegu3/zen8.jpg',
    'http://s21.postimg.org/er8b066p3/zen2.jpg',
    'http://s4.postimg.org/6mbbcgmwd/zen1.jpg',
    'http://s30.postimg.org/x3cgpdtgx/zen3.jpg',
    'http://s21.postimg.org/h1estw95z/zen4.jpg',
    'http://s8.postimg.org/upypfrk8l/zen5.jpg',
    'http://s7.postimg.org/goiv34aez/zen6.jpg',
    'http://s30.postimg.org/n9zuqbgq9/zen7.jpg',
    'http://s12.postimg.org/9kw5b42d9/zen9.jpg',
    'http://s13.postimg.org/vwf92qbl3/zen10.jpg',
    'http://s4.postimg.org/anf2w9rzh/zen11.jpg',
    'http://s17.postimg.org/gpbiwdsu7/zen12.jpg',
    'http://s9.postimg.org/n5uuedw3z/zen13.jpg',
    'http://s9.postimg.org/x6zonp973/zen14.jpg',
    'http://s2.postimg.org/r0vsbv8op/zen15.jpg',
    'http://s21.postimg.org/szu5d0h2f/zen16.jpg',
    'http://s15.postimg.org/xi59nxox7/zen17.jpg',
    'http://s8.postimg.org/zexjdajw5/zen18.jpg',
    'http://s24.postimg.org/st2ukrfz9/zen19.jpg',
    'http://s15.postimg.org/40kb5u63v/zen20.jpg'
];
},{}],9:[function(require,module,exports){
module.exports = {
	"data": [{
		"web_url": "http://www.nytimes.com/2012/01/01/us/politics/republicans-wage-hidden-ground-war-in-iowa.html",
		"snippet": "Far from candidates’ spotlights, hundreds of aides and volunteers are waging an unglamorous ground war unfolding with hidden intensity.",
		"lead_paragraph": "DES MOINES -- A few days before the Iowa caucuses, Newt Gingrich's campaign headquarters just outside the city is a spectacle of pre-computer-age disorder, with volunteers rushing voter updates across the room on yellow Post-it notes. At the offices of Mitt Romney, who has built a ground organization aimed at matching the intensity of his television advertising barrage, aides are methodically analyzing data on each voter to create the perfect pitch: those worried about illegal immigration, for example, are invited to join a conference call with a border county sheriff in Arizona.",
		"abstract": "Hundreds of campaign staff members, aides and volunteers are waging an unglamorous ground war that will largely determine the outcome of the Republican presidential caucuses in Iowa; in the closing hours before the caucuses, the tedious and time-consuming work of identifying voters and persuading them to show up at the caucuses could make the difference among Republican who cannot seem to make up their minds. Photos (L)d",
		"print_page": "1",
		"blog": [ ],
		"source": "The New York Times",
		"multimedia": [
			{
				"url": "images/2012/01/01/us/01ground-span/01ground-span-thumbStandard.jpg",
				"subtype": "thumbnail",
				"legacy": {
					"hasthumbnail": "Y",
					"thumbnailheight": 75,
					"thumbnail": "images/2012/01/01/us/01ground-span/01ground-span-thumbStandard.jpg"
				},
				"type": "image",
				"height": 75
			},
			{
				"width": 600,
				"url": "images/2012/01/01/us/01ground-span/01ground-span-articleLarge.jpg",
				"height": 370,
				"subtype": "xlarge",
				"legacy": {
					"xlargewidth": 600,
					"xlargeheight": 370,
					"xlarge": "images/2012/01/01/us/01ground-span/01ground-span-articleLarge.jpg",
					"hasxlarge": "Y"
				},
				"type": "image"
			}
		],
		"headline": {
			"main": "Over Phones and Greasy Pizza, a Battle for Iowa"
		},
		"keywords": [
			{
				"name": "subject",
				"value": "PRESIDENTIAL ELECTION OF 2012"
			}
		],
		"pub_date": "2012-01-01T00:00:00Z",
		"document_type": "article",
		"news_desk": "National Desk",
		"section_name": "Front Page; U.S.",
		"byline": {
			"person": [
				{
					"firstname": "A.",
					"middlename": "G.",
					"lastname": "SULZBERGER",
					"rank": 1,
					"role": "reported",
					"organization": ""
				},
				{
					"organization": "",
					"role": "reported",
					"firstname": "Michael",
					"rank": 2,
					"lastname": "BARBARO"
				}
			],
			"original": "By A. G. SULZBERGER and MICHAEL BARBARO"
		},
		"word_count": 2365,
		"type_of_material": "News",
		"_id": "4fd2ba9a8eb7c8105d8b0a8b"
	}, {
      "web_url": "http://thecaucus.blogs.nytimes.com/2012/01/01/virginia-attorney-general-backs-off-ballot-proposal/",
      "snippet": "Virginia's attorney general on Sunday backed off of a proposal to loosen the state's ballot access rules to allow more Republican presidential candidates to qualify.",
      "lead_paragraph": "DES MOINES -- Virginia's attorney general on Sunday backed off of a proposal to loosen the state's ballot access rules to allow more Republican presidential candidates to qualify.",
      "abstract": "Virginia's attorney general on Sunday backed off of a proposal to loosen the state's ballot access rules to allow more Republican presidential candidates to qualify.",
      "print_page": null,
      "blog": [ ],
      "source": "The New York Times",
      "multimedia": [ ],
      "headline": {
          "main": "Virginia Attorney General Backs Off Ballot Proposal",
          "kicker": "The Caucus"
      },
      "keywords": [
          {
              "rank": "4",
              "name": "persons",
              "value": "Paul, Ron"
          },
          {
              "rank": "3",
              "name": "persons",
              "value": "Gingrich, Newt"
          },
          {
              "rank": "2",
              "name": "persons",
              "value": "Cuccinelli, Kenneth T II"
          },
          {
              "rank": "5",
              "name": "persons",
              "value": "Perry, Rick"
          },
          {
              "rank": "1",
              "name": "type_of_material",
              "value": "News"
          },
          {
              "rank": "6",
              "name": "persons",
              "value": "Romney, Mitt"
          },
          {
              "rank": "7",
              "name": "subject",
              "value": "Presidential Election of 2012"
          },
          {
              "rank": "8",
              "name": "organizations",
              "value": "Republican Party"
          },
          {
              "rank": "9",
              "name": "glocations",
              "value": "Virginia"
          }
      ],
      "pub_date": "2012-01-01T18:46:02Z",
      "document_type": "blogpost",
      "news_desk": null,
      "section_name": "U.S.",
      "byline": {
          "person": [
              {
                  "organization": "",
                  "role": "reported",
                  "rank": 1
              }
          ],
          "original": "By MICHAEL D. SHEAR"
      },
      "word_count": 185,
      "type_of_material": "Blog",
      "_id": "4fd3a2548eb7c8105d8ea27e"
  	}]
};
},{}],10:[function(require,module,exports){
var DashboardHistory = require('./dashboardhistory.jsx')

var TimeTinderBox = React.createClass({displayName: "TimeTinderBox",
  render: function(){
    return (
      React.createElement("div", {className: "timetinder-box"}, 
        React.createElement(Navbar, null), 
        React.createElement(DashboardHistory, null)
      )
    );
  }
});

// Navigation/header bar on the top of the page. Holds login and search bar
var Navbar = React.createClass({displayName: "Navbar",
  render: function(){
    return (
      React.createElement("div", {className: "Navbar"}, 
          React.createElement("ul", {className: "navbar"}, 
            React.createElement("li", {className: "linav"}, React.createElement("a", {className: "navbar-brand"}, " TimesTinder ")), 
            React.createElement("ul", {className: "navbar", style: {float:"right"}}, 
              React.createElement("li", {className: "linav"}, React.createElement("a", {href: "/logout"}, React.createElement("i", {className: "fa fa-facebook"}, "Logout")))
            )
          )
      )
    );
  }
});

module.exports = TimeTinderBox;
},{"./dashboardhistory.jsx":7}]},{},[2]);
