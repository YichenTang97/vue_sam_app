# Self-Assessment Manikin (SAM) for emotional vocalisation

Hosted on firebase at: [https://vue-sam-prosody1.web.app](https://vue-sam-prosody1.web.app)

This vue-based web app presents a [self-assessment manikin (SAM)](https://doi.org/10.1016/0005-7916(94)90063-9) survey on the [Montreal Affective Voices (MAV)](https://doi.org/10.3758/brm.40.2.531) dataset (with five emotions - anger, happiness, neutral, sadness and pleasure). 

A user of this app need to listen to a vocalisation, and rate the speaker's valence and arousal levels (how the speaker felt when making the vocalisation), as well as their own valence and arousal level (how did the user feel), using nine-points SAM scales. The user need to perform the above rating process on 50 vocalisations in total (5 emotions x 10 speakers).

The user need to login to the app using credentials created on the server side. Their ratings will be saved to firebase in the end. 

A user may also perform the SAM under demo mode, where their ratings can be downloaded as a csv file in the end.

Here is a screenshot for the main page of web where a user gives ratings to a vocalisation:

![main_page_screenshot](https://user-images.githubusercontent.com/31422514/209430241-51d4b85e-ae9d-421e-9513-89d15ddd70ea.png)
