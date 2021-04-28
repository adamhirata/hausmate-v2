import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { withOrientation } from "react-navigation";
import CalComponent from "./modules/CalComponent";

export default function CalendarScreen({ navigation }) {
  const nsu = { key: "nsu", color: "red" };
  const inc = { key: "inc", color: "blue" };
  const [data, setData] = useState({
    "2021-03-20": {
      periods: [
        { startingDay: true, endingDay: false, color: nsu.color },
        { startingDay: true, endingDay: true, color: inc.color },
      ],
    },
    "2021-03-21": {
      periods: [{ startingDay: false, endingDay: false, color: nsu.color }],
    },
    "2021-03-22": {
      periods: [{ startingDay: false, endingDay: false, color: nsu.color }],
    },
    "2021-03-23": {
      periods: [{ startingDay: false, endingDay: false, color: nsu.color }],
    },
    "2021-03-24": {
      periods: [{ startingDay: false, endingDay: false, color: nsu.color }],
    },
    "2021-03-25": {
      periods: [{ startingDay: false, endingDay: false, color: nsu.color }],
    },
    "2021-03-26": {
      periods: [{ startingDay: false, endingDay: true, color: nsu.color }],
    },
    "2021-03-27": {
      periods: [{ startingDay: true, endingDay: false, color: nsu.color }],
    },

    "2021-03-28": {
      periods: [{ startingDay: false, endingDay: true, color: nsu.color }],
    },
    "2021-04-28": {
      periods: [{ startingDay: true, endingDay: true, color: inc.color }],
      events: [
        {
          name: "CMSI 402 Final Presentation",
          color: "blue",
          sub: "Adam/Ray",
          allDay: false,
          startTime: "6:00 PM",
          endTime: "11:59 PM",
        },
      ],
    },
    "2021-04-29": {
      periods: [
        { startingDay: true, endingDay: true, color: "green" },
        { startingDay: true, endingDay: true, color: "red" },
        { startingDay: true, endingDay: true, color: "pink" },
      ],
      events: [
        {
          name: "Saito's bday",
          color: "green",
          sub: "Other",
          allDay: true,
        },
        {
          name: "Psych final pres",
          color: "red",
          sub: "Ray",
          allDay: false,
          startTime: "9:30 AM",
          endTime: "10:30 AM",
        },
        {
          name: "Interview call, need it quiet",
          color: "pink",
          sub: "Krys",
          allDay: false,
          startTime: "12:00 PM",
          endTime: "1:00 PM",
        },
      ],
    },
    "2021-05-01": {
      periods: [{ startingDay: true, endingDay: true, color: inc.color }],
      events: [
        {
          name: "INC Call",
          color: "blue",
          sub: "Adam",
          allDay: false,
          startTime: "2:00 PM",
          endTime: "3:30 PM",
        },
      ],
    },
  });
  const [calendar, setCalendar] = useState(
    <View style={styles.panel2}>
      <CalComponent eventObj={data} style={{ width: 1000 }} />
    </View>
  );
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [allDay, setallDay] = useState();
  const [sub, setSub] = useState();
  const [startTime, setStart] = useState();
  const [endTime, setEnd] = useState();

  const addEvent = () => {
    let start;
    let end;
    if (allDay == "y") {
      setallDay(true);
    } else {
      setallDay(false);
    }
    if (start != undefined && end != undefined) {
      start = parseInt(startTime.subString(0, 1));
      end = parseInt(endTime.subString(0, 1));
      if (start < 12) {
        start = startTime + "AM";
      } else if ((start = 12)) {
        start = startTime + " PM";
      } else {
        start =
          startTime.replace(
            startTime.subString(0, 1),
            (start - 12).toString()
          ) + " PM";
      }
      if (end < 12) {
        end = endTime + "AM";
      } else if ((start = 12)) {
        end = endTime + " PM";
      } else {
        start =
          endTime.replace(endTime.subString(0, 1), (end - 12).toString()) +
          " PM";
      }
    }

    const result = {
      name: name,
      color: "blue",
      sub: sub,
      allDay: allDay,
      startTime: start,
      endTime: end,
    };

    let temp = Object.assign({}, data);
    temp[date] = {};
    temp[date].periods = [
      { startingDay: true, endingDay: true, color: inc.color },
    ];
    temp[date].events = [result];
    setData(temp);
  };

  useEffect(() => {
    setCalendar(
      <View style={styles.panel2}>
        <CalComponent eventObj={data} style={{ width: 1000 }} />
      </View>
    );
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.panel1}>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Create new event:
          </Text>
        </View>
        <Text>Name</Text>
        <TextInput onChangeText={setName} style={styles.input} />
        <Text>Date</Text>
        <TextInput
          onChangeText={setDate}
          style={styles.input}
          placeholder={"YYYY-DD-MM"}
        />
        <Text>All Day?</Text>
        <TextInput
          onChangeText={setallDay}
          style={styles.input}
          placeholder={"y or n"}
        />
        <Text>Sub-Calendar</Text>
        <TextInput
          onChangeText={setSub}
          style={styles.input}
          placeholder={"name"}
        />
        <Text>Start Time</Text>
        <TextInput
          onChangeText={setStart}
          style={styles.input}
          placeholder={"00:00"}
        />
        <Text>End Time</Text>
        <TextInput
          onChangeText={setEnd}
          style={styles.input}
          placeholder={"00:00"}
        />
        <TouchableOpacity style={styles.button} onPress={addEvent}>
          <Button title="Create" color="darkorange" onPress={addEvent} />
        </TouchableOpacity>
      </View>
      {calendar}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "orange",
    alignItems: "center",
    //justifyContent: "center",
  },
  input: {
    width: 120,
    margin: 4,
    backgroundColor: "white",
    padding: 3,
    color: "black",
  },
  panel1: {
    borderRightWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    height: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.58,
    shadowRadius: 4.0,
    overflow: "visible",
  },
  panel2: {
    width: "66%",
    height: "100%",
    flex: 1,
    alignItems: "center",
  },
});
