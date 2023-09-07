import winedata from "./winedata.json";
interface alcoholclass {        //Creating alcohol class types for retrieving alcohol data
  [key: string]: any;
}
interface meaninterface {       //Creating meaninterface class types for storing processed data
  [key: string]: any;
}
let alcohol: alcoholclass = {};     //initialization
let winedatajson: Array<any> = winedata;
export function classifyData() {                                        //classifying data into classes to process the data
  for (let i: number = 0; i < winedatajson.length; i++) {
    if (winedatajson[i]["Alcohol"] in alcohol) {
      alcohol[winedatajson[i]["Alcohol"]].push(winedatajson[i]);
    } else {
      alcohol[winedatajson[i]["Alcohol"]] = [winedatajson[i]];
    }
  }
}
function mode(arr: any[]): any {                                  //helper function of extracting mode of the data
  return arr.sort((a, b) =>
      arr.filter(v => v === a).length
      - arr.filter(v => v === b).length
  ).pop();
}
export function falvinoids() {                                          //Process the data for getting mean,mode and median value
  let meanflav: any = {};
  let modeflav: meaninterface = {};
  let medianflav: meaninterface = {};
  for (let alcoholitem in alcohol) {
    for (let item in alcohol[alcoholitem]) {
      if (alcoholitem in meanflav) {
        meanflav[alcoholitem] += parseFloat(alcohol[alcoholitem][item]["Flavanoids"]);
      }
      else{
        meanflav[alcoholitem] = parseFloat(alcohol[alcoholitem][item]["Flavanoids"]);
      }
    }
    meanflav[alcoholitem] = (meanflav[alcoholitem]/parseInt(alcohol[alcoholitem].length)).toFixed(3)
  }
  for (let alcoholitem in alcohol) {
    for (let item in alcohol[alcoholitem]) {
      if (alcoholitem in medianflav) {
        medianflav[alcoholitem].push(parseFloat(alcohol[alcoholitem][item]["Flavanoids"]))
      }
      else{
        medianflav[alcoholitem] = [parseFloat(alcohol[alcoholitem][item]["Flavanoids"])]
      }
    }
    medianflav[alcoholitem].sort()
    modeflav[alcoholitem] = parseFloat(mode(medianflav[alcoholitem])).toFixed(3)
    let medianlength = medianflav[alcoholitem].length
    // console.log(medianflav)
    if (medianlength % 2 != 0){
      medianflav[alcoholitem] = parseFloat(medianflav[alcoholitem][Math.floor(medianlength / 2)]).toFixed(3)
    }
    else{
      medianflav[alcoholitem] = parseFloat(medianflav[alcoholitem][Math.floor(medianlength / 2)] + medianflav[alcoholitem][Math.floor(medianlength / 2) - 1] / 2).toFixed(3)
    }
  }
return [meanflav,medianflav,modeflav]                         //Returning the desired results
}
export function gamma(){                                      //Processing the data to extract gamma value and mean,median and mode
  let meangamma:any = {}
  let modegamma: meaninterface = {};
  let gammamedian: meaninterface = {};
  for (let alcoholitem in alcohol) {
    for (let item in alcohol[alcoholitem]) {
      if (alcoholitem in meangamma) {
        meangamma[alcoholitem] += parseFloat(((alcohol[alcoholitem][item]["Ash"] * alcohol[alcoholitem][item]["Hue"])/alcohol[alcoholitem][item]["Magnesium"]).toString());       //Extracting the gamma value
      }
      else{
        meangamma[alcoholitem] = parseFloat(((alcohol[alcoholitem][item]["Ash"] * alcohol[alcoholitem][item]["Hue"])/alcohol[alcoholitem][item]["Magnesium"]).toString());
      }
    }
    meangamma[alcoholitem] = (meangamma[alcoholitem]/parseInt(alcohol[alcoholitem].length)).toFixed(3)
  }
  for (let alcoholitem in alcohol) {
    for (let item in alcohol[alcoholitem]) {
      if (alcoholitem in gammamedian) {
        gammamedian[alcoholitem].push(parseFloat(((alcohol[alcoholitem][item]["Ash"] * alcohol[alcoholitem][item]["Hue"])/alcohol[alcoholitem][item]["Magnesium"]).toString()))
      }
      else{
        gammamedian[alcoholitem] = [parseFloat(((alcohol[alcoholitem][item]["Ash"] * alcohol[alcoholitem][item]["Hue"])/alcohol[alcoholitem][item]["Magnesium"]).toString())]
      }
    }
    gammamedian[alcoholitem].sort()
    modegamma[alcoholitem] = parseFloat(mode(gammamedian[alcoholitem])).toFixed(3)
    let medianlength = modegamma[alcoholitem].length
    // console.log(medianflav)
    if (medianlength % 2 != 0){
      gammamedian[alcoholitem] = parseFloat(gammamedian[alcoholitem][Math.floor(medianlength / 2)]).toFixed(3)
    }
    else{
      gammamedian[alcoholitem] = parseFloat(gammamedian[alcoholitem][Math.floor(medianlength / 2)] + gammamedian[alcoholitem][Math.floor(medianlength / 2) - 1] / 2).toFixed(3)
    }
  }
  return [meangamma,gammamedian,modegamma]                    //Returnign the desired results
}
