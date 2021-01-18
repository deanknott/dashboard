import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LineChart from 'react-linechart';
import 'react-linechart/dist/styles.css';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

class PatientTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    this.getPatient();
  }

  getPatient = _ => {
    fetch('http://localhost:5000/patients/'+this.props.patient.id)
      .then(response => response.json())
      .then(response => this.setState({questions: response.data}))
      .catch(err => console.log(err))
  }

  render() {
    const { questions }  = this.state;
    const questionId = questions.map(question => {
      return question.question_id;
    });
    const pauses = questions.map(question => {
      return question.pauses;
    });
    const numberWords = questions.map(question => {
      return question.number_words;
    });
    const emptyWords = questions.map(question => {
      return question.empty_words;
    });
    const fillerWords = questions.map(question => {
      return question.fillers;
    });
    const questionLength = questions.map(question => {
      return question.length;
    });

    const pauseData = [
      {
        color: "steelblue",
        points: [{x: questionId[0], y: pauses[0]}, {x: questionId[1], y: pauses[1]}, {x: questionId[2], y: pauses[2]},
                 {x: questionId[3], y: pauses[3]}, {x: questionId[4], y: pauses[4]}, {x: questionId[5], y: pauses[5]},
                 {x: questionId[6], y: pauses[6]}, {x: questionId[7], y: pauses[7]}, {x: questionId[8], y: pauses[8]},
                 {x: questionId[9], y: pauses[9]}, {x: questionId[10], y: pauses[10]}, {x: questionId[11], y: pauses[11]}
        ]
      }
    ];

    const numberWordsData = [
      {
        color: "steelblue",
        points: [{x: questionId[0], y: numberWords[0]}, {x: questionId[1], y: numberWords[1]}, {x: questionId[2], y: numberWords[2]},
                 {x: questionId[3], y: numberWords[3]}, {x: questionId[4], y: numberWords[4]}, {x: questionId[5], y: numberWords[5]},
                 {x: questionId[6], y: numberWords[6]}, {x: questionId[7], y: numberWords[7]}, {x: questionId[8], y: numberWords[8]},
                 {x: questionId[9], y: numberWords[9]}, {x: questionId[10], y: numberWords[10]}, {x: questionId[11], y: numberWords[11]}
        ]
      }
    ];
    const emptyWordsData = [
      {
        color: "steelblue",
        points: [{x: questionId[0], y: emptyWords[0]}, {x: questionId[1], y: emptyWords[1]}, {x: questionId[2], y: emptyWords[2]},
                 {x: questionId[3], y: emptyWords[3]}, {x: questionId[4], y: emptyWords[4]}, {x: questionId[5], y: emptyWords[5]},
                 {x: questionId[6], y: emptyWords[6]}, {x: questionId[7], y: emptyWords[7]}, {x: questionId[8], y: emptyWords[8]},
                 {x: questionId[9], y: emptyWords[9]}, {x: questionId[10], y: emptyWords[10]}, {x: questionId[11], y: emptyWords[11]}
        ]
      }
    ];
    const fillerWordsData = [
      {
        color: "steelblue",
        points: [{x: questionId[0], y: fillerWords[0]}, {x: questionId[1], y: fillerWords[1]}, {x: questionId[2], y: fillerWords[2]},
                 {x: questionId[3], y: fillerWords[3]}, {x: questionId[4], y: fillerWords[4]}, {x: questionId[5], y: fillerWords[5]},
                 {x: questionId[6], y: fillerWords[6]}, {x: questionId[7], y: fillerWords[7]}, {x: questionId[8], y: fillerWords[8]},
                 {x: questionId[9], y: fillerWords[9]}, {x: questionId[10], y: fillerWords[10]}, {x: questionId[11], y: fillerWords[11]}
        ]
      }
    ];
    const lengthData = [
      {
        color: "steelblue",
        points: [{x: questionId[0], y: questionLength[0]}, {x: questionId[1], y: questionLength[1]}, {x: questionId[2], y: questionLength[2]},
                 {x: questionId[3], y: questionLength[3]}, {x: questionId[4], y: questionLength[4]}, {x: questionId[5], y: questionLength[5]},
                 {x: questionId[6], y: questionLength[6]}, {x: questionId[7], y: questionLength[7]}, {x: questionId[8], y: questionLength[8]},
                 {x: questionId[9], y: questionLength[9]}, {x: questionId[10], y: questionLength[10]}, {x: questionId[11], y: questionLength[11]}
        ]
      }
    ];

    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Pauses</Tab>
            <Tab>Number of words</Tab>
            <Tab>Number of empty words</Tab>
            <Tab>Number of filler words</Tab>
            <Tab>Length</Tab>
            <Tab>Video</Tab>
          </TabList>

          <TabPanel>
            <LineChart width={800} height={300} data={pauseData} xLabel="Question number" yLabel="Number of pauses"/>
          </TabPanel>
          <TabPanel>
            <LineChart width={800} height={300} data={numberWordsData} xLabel="Question number" yLabel="Number of words"/>
          </TabPanel>
          <TabPanel>
            <LineChart width={800} height={300} data={emptyWordsData} xLabel="Question number" yLabel="Number of empty words"/>
          </TabPanel>
          <TabPanel>
            <LineChart width={800} height={300} data={fillerWordsData} xLabel="Question number" yLabel="Number of filler words"/>
          </TabPanel>
          <TabPanel>
            <LineChart width={800} height={300} data={lengthData} xLabel="Question number" yLabel="Length of question (seconds)"/>
          </TabPanel>
          <TabPanel>
            <Player>
              <source src="videos/Q1-R0.webm" />
            </Player>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default PatientTabs;
