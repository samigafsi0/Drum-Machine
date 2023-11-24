import BootstrapSwitchButton from "https://cdn.skypack.dev/bootstrap-switch-button-react@1.2.0";

const DrumKit = [
  {
    keyCode: 81,
    key: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const Keyboard = ({ play, item: { key, url, id, keyCode } }) => {
  const keyPress = (event) => {
    if (event.keyCode === keyCode) {
      play(key, id);
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", keyPress);
  }, []);
  return (
    <button className="drum-pad btn" id={id} onClick={() => play(key, id)}>
      <audio className="clip" id={key} src={url} />
      <strong>{key}</strong>
    </button>
  );
};

const KeyPad = ({ play }) => {
  return DrumKit.map((item) => <Keyboard play={play} item={item} />);
};

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: "",
    };
    this.play = this.play.bind(this);
    this.powerControl = this.powerControl.bind(this);
  }

  powerControl() {
    this.setState((state) => ({
      power: !state.power,
    }));
  }

  play(key, id) {
    if (this.state.power) {
      const audio = document.getElementById(key);
      audio.currentTime = 0;
      audio.play();
      this.setState({
        display: id,
      });
    }
  }

  render() {
    return (
      <div id="host-layer">
        <div id="drum-machine">
          <div id="display">
            <div id="display-text">{this.state.display}</div>
          </div>
          <div id="keys">
            <KeyPad play={this.play} />
          </div>
          <div id="controls">
            <BootstrapSwitchButton
              checked={true}
              width={250}
              height={80}
              offstyle="danger"
              onstyle="success"
              size="lg"
              id="power"
              onChange={this.powerControl}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyApp />, document.getElementById("machine-app"));
