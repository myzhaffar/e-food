// import React, { useState } from "react";

// export default function Pembayaran() {
//   const warnas = ["kuning", "merah", "ijo", "biru"];
//   const [index, setIndex] = useState(0);

//   const rubahIndex = () => {
//     if (index < 3) {
//       const newIndex = index + 1;
//       setIndex(newIndex);
//     } else {
//       setIndex(0);
//     }
//   };

//   return <div onClick={rubahIndex}>{warnas[index]} </div>;
// }

import React, { Component } from "react";

export default class Pembayaran extends Component {
  state = {
    coba: "coba"
  }
  test  = async() => {
    await this.setState({coba: "test"})
    console.log("coba", this.state.coba)
    // setTimeout(()=> console.log("coba", this.state.coba), 5000)
    console.log(2);
    console.log(3);
  };
  render() {
    return (
      <div>
        <button onClick={this.test}>test</button>
      </div>
    );
  }
}
