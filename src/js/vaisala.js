function displayStations(json, data) {
    var stationElement = document.getElementById("stations");
    stationElement.innerHTML = "";
    var html = ""
    if(json) {
        for(var i = 0; i < json.length; i++) {
            var station = json[i]
            html += '<p class="vaisala-item"><input type="radio" name="station" onclick="stationSelected(' + station.id + ');" value="' + station.id + '">' + station.name + '</input></p>'
        }
    }
    stationElement.innerHTML = html
}

function stationSelected(id) {
    vaisalaFetch(props.service + "/sensors/station/" + id, "GET", null, displaySensors, null, null)
}

function displaySensors(json, data) {
    var sensorElement = document.getElementById("sensors");
    sensorElement.innerHTML = "";
    var html = ""
    if(json) {
        for(var i = 0; i < json.length; i++) {
            var sensor = json[i]
            html += '<p class="vaisala-item"><input type="radio" name="sensor" onclick="sensorSelected(' + sensor.id + ');" value="' + sensor.id + '">' + sensor.name + '</input></p>'
        }
    }
    sensorElement.innerHTML = html
}

function sensorSelected(id) {
    vaisalaFetch(props.service + "/observations/sensor/" + id, "GET", null, displayObservations, null, null)
}

function addStationOptions(json, data) {
    var selectElement = document.getElementById("station")
    var html = ""
    if(json && selectElement) {
        for(var i = 0; i < json.length; i++) {
            var station = json[i]
            html += '<option value="' + station.id + '">' + station.name + ' - ' + station.location + '</option>'
        }
        selectElement.innerHTML = html
    }
}

function addSensorOptions(json, data) {
    var sensorElement = document.getElementById("sensor")
    var html = ""
    if(json && sensorElement) {
        for(var i = 0; i < json.length; i++) {
            var sensor = json[i]
            html += '<option value="' + sensor.id + '">' + sensor.name + ' - ' + sensor.type + '</option>'
        }
        sensorElement.innerHTML = html
    }
}

function submitSensorForm() {
    const sensorForm = window.document.forms.sensorForm
    if(typeof sensorForm.reportValidity == 'function') {
        if(sensorForm.reportValidity() === false) {
            return false;
        }
    }

    sensorForm.elements.sensorFieldset.disabled = true;

    const name = sensorForm.elements.name.value;
    const type = sensorForm.elements.type.value;
    const station = sensorForm.elements.station.value;
    if(!name || !location || !station) {
        return false;
    } else {
        const body = {name: name, type: type, station_id: station}
        vaisalaFetch(props.service + "/sensor", "PUT", body, addSensorResponse, addSensorError, sensorForm);
    }
}

function addSensorResponse(json, sensorForm) {
    sensorForm.elements.sensorFieldset.disabled = false;
    console.log(json);
    if(json.success === true) {
        window.location.replace(props.root_dir + "/index")
    } else {
        console.log("Failed to add the sensor");
    }
}

function addSensorError(error, sensorForm) {
    sensorForm.elements.sensorFieldset.disabled = false;
}

function displayObservations(json, data) {
    var observationElement = document.getElementById("observations");
    observationElement.innerHTML = "";
    var html = ""
    if(json) {
        for(var i = 0; i < json.length; i++) {
            var observation = json[i]
            html += '<p class="vaisala-item">' + observation.value + ' - ' + observation.observed_timestamp + ' - ' + observation.quality + '</p>'
        }
    }
    observationElement.innerHTML = html
}

function submitObservationForm() {
    const observationForm = window.document.forms.observationForm
    if(typeof observationForm.reportValidity == 'function') {
        if(observationForm.reportValidity() === false) {
            return false;
        }
    }

    observationForm.elements.observationFieldset.disabled = true;

    const observed = observationForm.elements.observed.value;
    const received = observationForm.elements.received.value;
    const value = observationForm.elements.value.value;
    const sensor = observationForm.elements.sensor.value;
    const quality = observationForm.elements.quality.value;
    if(!observed || !received || !value || !sensor || !quality) {
        return false;
    } else {
        const body = {observed_timestamp: observed, received_timestamp: received, value: value, sensor_id: sensor, quality_code: quality}
        vaisalaFetch(props.service + "/observation", "PUT", body, addObservationResponse, addObservationError, observationForm);
    }
}

function addObservationResponse(json, observationForm) {
    observationForm.elements.observationFieldset.disabled = false;
    console.log(json);
    if(json.success === true) {
        window.location.replace(props.root_dir + "/index")
    } else {
        console.log("Failed to add the observation");
    }
}

function addObservationError(error, observationForm) {
    observationForm.elements.observationFieldset.disabled = false;
}

function submitStationForm() {
    const stationForm = window.document.forms.stationForm;
    if(typeof stationForm.reportValidity == 'function') {
        if(stationForm.reportValidity() === false) {
            return false;
        }
    }

    stationForm.elements.stationFieldset.disabled = true;

    const name = stationForm.elements.name.value;
    const location = stationForm.elements.location.value;
    if(!name || !location) {
        return false;
    } else {
        const body = {name: name, location: location}
        vaisalaFetch(props.service + "/station", "PUT", body, addStationResponse, addStationError, stationForm);
    }
}

function addStationResponse(json, stationForm) {
    stationForm.elements.stationFieldset.disabled = false;
    console.log(json);
    if(json.success === true) {
        window.location.replace(props.root_dir + "/index")
    } else {
        console.log("Failed to add the station");
    }
}

function addStationError(error, stationForm) {
    stationForm.elements.stationFieldset.disabled = false;
}

function vaisalaFetch(url, method, body, callback, errorCallback, callbackData) {
    const params = {
        headers: new Headers( {"Content-Type" : "application/json", "Accept" : "application/json" } ),
        method: method,
        mode: "cors",
    }
    if(body) {
        params.body = JSON.stringify(body)
    }
    window.fetch(url, params).then(function(resp) {
        if(resp.ok) {
            return resp.json();
        } else {
            throw Error("We are unable to complete the request at this time");
        }
    }).then(function(json) {
        callback(json, callbackData)
    }).catch(function(error) {
        console.error("call to " + url + " failed: " + error.message);
        if(errorCallback) errorCallback(error, callbackData)
    });
}
