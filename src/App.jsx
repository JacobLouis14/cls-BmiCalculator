import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

function App() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isHeightValidate, setIsHeightValidate] = useState(true);
  const [isWeightValidate, setIsWeightValidate] = useState(true);
  const [bmiValue, setBmiValue] = useState("");
  const [bmiName, setBmiName] = useState("");

  // validate Function
  const validateHandler = (data) => {
    if (data.target.name == "height") {
      if (/^[0-9]*$/.test(data.target.value)) {
        setHeight(data.target.value);
        setIsHeightValidate(true);
      } else {
        setHeight(data.target.value);
        setIsHeightValidate(false);
      }
    }
    if (data.target.name == "weight") {
      if (/^[0-9]*$/.test(data.target.value)) {
        setWeight(data.target.value);
        setIsWeightValidate(true);
      } else {
        setWeight(data.target.value);
        setIsWeightValidate(false);
      }
    }
  };

  // ResetHandler
  const resetHandler = () => {
    setHeight(0);
    setWeight(0);
    setIsHeightValidate(true);
    setIsWeightValidate(true);
    setBmiValue("");
    setBmiName("");
  };

  // Calculate Function
  const calculateHandler = () => {
    let heightInMeter = height / 100;
    let sqHeight = heightInMeter * heightInMeter;
    let bmi = (weight / sqHeight).toFixed(2);
    setBmiValue(bmi);
    switch (true) {
      case bmi < 18.5:
        setBmiName("Underweight");
        break;
      case bmi >= 18.5 && bmi < 25:
        setBmiName("Normal");
        break;
      case bmi >= 25 && bmi < 30:
        setBmiName("Overweight");
        break;
      default:
        setBmiName("Obese");
    }
  };

  return (
    <>
      <div className="mainContainer w-100 d-flex justify-content-center align-items-center">
        <div className="wrapper">
          <ReactSpeedometer
            width={window.innerWidth > 600 ? 500 : undefined}
            value={bmiValue || 0}
            paddingHorizontal={5}
            paddingVertical={10}
            currentValueText={`${bmiValue.toString()} ${
              bmiName || "Body Mass Indicator"
            }`}
            minValue={0}
            maxValue={40}
            segmentColors={["firebrick", "limegreen", "gold", "firebrick"]}
            customSegmentStops={[0, 18.5, 25, 30, 40]}
            customSegmentLabels={[
              {
                text: "<16 - 18.5",
                position: "OUTSIDE",
                color: "#ffffff",
              },

              {
                text: "18.5 - 25",
                position: "OUTSIDE",
                color: "#ffffff",
              },
              {
                text: "25 - 30",
                position: "OUTSIDE",
                color: "#ffffff",
              },
              {
                text: "30 - <40",
                position: "OUTSIDE",
                color: "#ffffff",
              },
            ]}
          />
          {/* Form */}
          <form className="mt-3 mx-5">
            <TextField
              className="w-75 mb-3"
              value={height || ""}
              id="standard-basic"
              name="height"
              label="Height"
              variant="standard"
              helperText={isHeightValidate ? "" : "Input Correct Value"}
              FormHelperTextProps={{ sx: { color: "red" } }}
              InputLabelProps={{ sx: { color: "white" } }}
              InputProps={{
                sx: { borderBottom: "1px solid white", color: "white" },
              }}
              onChange={(e) => validateHandler(e)}
            />
            <TextField
              className="w-75 mb-3"
              id="standard-basic"
              value={weight || ""}
              name="weight"
              label="Weight"
              variant="standard"
              helperText={isWeightValidate ? "" : "Input Correct Value"}
              FormHelperTextProps={{ sx: { color: "red" } }}
              InputLabelProps={{ sx: { color: "white" } }}
              InputProps={{
                sx: { borderBottom: "1px solid white", color: "white" },
              }}
              onChange={(e) => validateHandler(e)}
            />
            <div className="d-flex justify-content-md-end justify-content-sm-center mt-5">
              <Button
                className="me-4"
                variant="contained"
                style={{ backgroundColor: "grey" }}
                onClick={resetHandler}
              >
                Reset
              </Button>
              <Button variant="contained" onClick={calculateHandler}>
                Calculate
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
