const SessionModel = require("../../models/sessionModel");

const API_KEY = process.env.daily_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

const getRoom = async (room) => {
  try {
    const res = await fetch(`https://api.daily.co/v1/rooms/${room}`, {
      method: "GET",
      headers,
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return console.error("error:" + err);
  }
};

const createRoom = async (room) => {
  try {
    const res = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: room,
        properties: {
          enable_screenshare: true,
          enable_chat: true,
          start_video_off: true,
          start_audio_off: false,
          lang: "en",
        },
      }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return { error: err };
  }
};

//to create new room for audio video calls
exports.createRoom = async (req, res) => {
  try {
     const {roomName,consultationId}= req.query;
    //to check if consultation type is video or audio
    const result = await SessionModel.checkConsultation(consultationId);
    if (result.length === 0) {
      res.status(400).json({
        error: "No Consultation for this Id is booked",
      });
    } else if (
      result[0].consultationType !== "Video" &&
      result[0].consultationType !== "Audio"
    ) {
      res.status(400).json({
        error: "Type of Consultation is not video or audio",
      });
    }

    //to create room
    const room = await getRoom(roomName);
    if (room.error) {
      const newRoom = await createRoom(roomName);
      res.status(200).send(newRoom);
    } else {
      res.status(200).send(room);
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
