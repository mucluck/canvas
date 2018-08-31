class Canvas {
    constructor(id = '', rule = '', data = {}) {
        this._data = data;
        this._canvas = document.getElementById(`${id}`);
        this._context = this._canvas.getContext('2d');
        this._rule = document.getElementById(`${rule}`);
        this.init();
    }

    init() {
        this.getSize();
        this.initRule();
        this.drawAxes();
        this.drawGraphLine();
    }

    initRule() {
        [].concat(...this._rule.getElementsByTagName('a')).map((node) => {
            node.addEventListener('click', (event) => {
                event.preventDefault();
                this._context.clearRect(0, 0, this._width, this._height);
                this.drawAxes();
                switch (event.currentTarget.attributes.href.value) {
                    case 'boxes':
                        this.drawGraphBox();
                        break;
                    case 'lines':
                        this.drawGraphLine();
                        break;
                    case 'curves':
                        this.drawGraphCurve();
                        break;
                }
            });
        })
    }

    getSize() {
        this._canvas.width = this._width = this._data.charts.length * (this._data.coordinates.spacing + this._data.coordinates.width) + this._data.coordinates.spacing;
        this._canvas.height = this._height = this._data.charts.reduce((max, chart) => {
            return max > chart.value ? max : chart.value
        }) + this._data.coordinates.start.y * 2;
    }

    drawAxes() {
        this._context.beginPath();
        this._context.moveTo(this._data.coordinates.start.x, this._height - this._data.coordinates.start.y);
        this._context.lineTo(this._data.coordinates.start.x, this._data.coordinates.start.y);

        this._context.moveTo(this._data.coordinates.start.x, this._height - this._data.coordinates.start.y);
        this._context.lineTo(this._width, this._height - this._data.coordinates.start.y);

        this._context.strokeStyle = this._data.coordinates.color;
        this._context.font = '12px serif';

        this._context.stroke();

        this._context.moveTo(this._data.coordinates.start.x, 0);
        this._context.lineTo(2, this._data.coordinates.start.y);
        this._context.lineTo(this._data.coordinates.start.x * 2 - 2, this._data.coordinates.start.y);
        this._context.fillText(this._data.axis.x, this._data.coordinates.start.x * 2, this._data.coordinates.start.y);

        this._context.moveTo(this._width, this._height - this._data.coordinates.start.y);
        this._context.lineTo(this._width - this._data.coordinates.start.x, this._height - this._data.coordinates.start.y * 2 + 2);
        this._context.lineTo(this._width - this._data.coordinates.start.x, this._height - 2);
        this._context.fillText(this._data.axis.y, this._width - this._data.coordinates.start.x * 5, this._height);

        this._context.fill();
    }

    drawGraphBox() {
        this._data.charts.map((chart, index) => {
            this._context.fillStyle = this._data.coordinates.color;
            this._context.fillRect(this._data.coordinates.spacing + index * (this._data.coordinates.spacing + this._data.coordinates.width), this._height - this._data.coordinates.start.y, this._data.coordinates.width, -chart.value);
            this._context.fillText(this._data.axis.x, this._data.coordinates.start.x * 2, this._data.coordinates.start.y);
        });
    }

    drawGraphLine() {
        this._context.beginPath();
        this._context.moveTo(this._data.coordinates.start.x, this._height - this._data.coordinates.start.y);
        this._data.charts.map((chart, index) => {
            this._context.lineTo(this._data.coordinates.spacing + index * (this._data.coordinates.spacing + this._data.coordinates.width), this._height - chart.value);
        });
        this._context.stroke();
    }

    drawGraphCurve() {
        this._context.beginPath();
        this._context.moveTo(this._data.coordinates.start.x, this._height - this._data.coordinates.start.y);
        this._data.charts.map((chart, index) => {
            this._context.quadraticCurveTo(25, 25, 25, 62.5);
            this._context.lineTo(this._data.coordinates.spacing + index * (this._data.coordinates.spacing + this._data.coordinates.width), this._height - chart.value);
        });
        this._context.stroke();
    }
}

let config = {
    coordinates: {
        start: {
            x: 10,
            y: 10,
        },
        color: '#000',
        spacing: 30,
        width: 40,
    },
    axis: {
        x: "ось X",
        y: "ось Y"
    },
    charts: [{
            name: "показатель 1",
            value: 100
        },
        {
            name: "показатель 2",
            value: 300
        },
        {
            name: "показатель 3",
            value: 290
        },
        {
            name: "показатель 4",
            value: 50
        },
        {
            name: "показатель 5",
            value: 250
        },
        {
            name: "показатель 5",
            value: 200
        },
    ]
}

window.Chart = new Canvas('canvas', 'rule', config);