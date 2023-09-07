import AuthController from "../Controllers/authController";
import ConversationController from "../Controllers/conversationController";

export const dummyMessages = [
  {
    _id: `${Math.floor(Math.random() * 12345678910)}`,
    msg: "haiii",
    senderId: "6364b2c5c989e711ab138826",
    receiverId: "6364b301c989e711ab1394e7",
    time: new Date(),
    messageType: "text",
    status: "sent"
  },
  {
    _id: `${Math.floor(Math.random() * 12345678910)}`,
    msg: "how are you",
    senderId: "6364b2c5c989e711ab138826",
    receiverId: "6364b301c989e711ab1394e7",
    time: new Date(),
    messageType: "text",
    status: "sent"
  },
  {
    _id: `${Math.floor(Math.random() * 12345678910)}`,
    msg: "media",
    senderId: "6364b2c5c989e711ab138826",
    receiverId: "6364b301c989e711ab1394e7",
    time: new Date(),
    messageType: "media",
    files: [
      {
        public_id: "main/uploads/Screenshot 2022-11-02 at 11.26.03 AM.png",
        resource_type: "raw",
        created_at: "2022-11-09T06:23:46Z",
        url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667975026/main/uploads/Screenshot%202022-11-02%20at%2011.26.03%20AM.png",
        filetype: "image/png"
      },
      // {
      //   public_id: "main/uploads/file_example_MP3_700KB.mp3",
      //   resource_type: "raw",
      //   created_at: "2022-11-09T06:21:50Z",
      //   url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667974910/main/uploads/file_example_MP3_700KB.mp3",
      //   filetype: "audio/mpeg"
      // },
      // {
      //   public_id: "main/uploads/sample-mp4-file-small.mp4",
      //   resource_type: "raw",
      //   created_at: "2022-11-09T06:23:23Z",
      //   url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667975003/main/uploads/sample-mp4-file-small.mp4",
      //   filetype: "video/mp4"
      // }
    ],
    status: "sent"
  },
  {
    _id: `${Math.floor(Math.random() * 12345678910)}`,
    msg: "media",
    senderId: "6364b2c5c989e711ab138826",
    receiverId: "6364b301c989e711ab1394e7",
    time: new Date(),
    messageType: "media",
    files: [
      // {
      //   public_id: "main/uploads/Screenshot 2022-11-02 at 11.26.03 AM.png",
      //   resource_type: "raw",
      //   created_at: "2022-11-09T06:23:46Z",
      //   url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667975026/main/uploads/Screenshot%202022-11-02%20at%2011.26.03%20AM.png",
      //   filetype: "image/png"
      // },
      {
        public_id: "main/uploads/file_example_MP3_700KB.mp3",
        resource_type: "raw",
        created_at: "2022-11-09T06:21:50Z",
        url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667974910/main/uploads/file_example_MP3_700KB.mp3",
        filetype: "audio/mpeg"
      },
      // {
      //   public_id: "main/uploads/sample-mp4-file-small.mp4",
      //   resource_type: "raw",
      //   created_at: "2022-11-09T06:23:23Z",
      //   url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667975003/main/uploads/sample-mp4-file-small.mp4",
      //   filetype: "video/mp4"
      // }
    ],
    status: "sent"
  },
  {
    _id: `${Math.floor(Math.random() * 12345678910)}`,
    msg: "media",
    senderId: "6364b2c5c989e711ab138825",
    receiverId: "6364b301c989e711ab1394e7",
    time: new Date(),
    messageType: "media",
    files: [
      // {
      //   public_id: "main/uploads/Screenshot 2022-11-02 at 11.26.03 AM.png",
      //   resource_type: "raw",
      //   created_at: "2022-11-09T06:23:46Z",
      //   url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667975026/main/uploads/Screenshot%202022-11-02%20at%2011.26.03%20AM.png",
      //   filetype: "image/png"
      // },
      {
        public_id: "main/uploads/file_example_MP3_700KB.mp3",
        resource_type: "raw",
        created_at: "2022-11-09T06:21:50Z",
        url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667974910/main/uploads/file_example_MP3_700KB.mp3",
        filetype: "audio/mpeg"
      },
      // {
      //   public_id: "main/uploads/sample-mp4-file-small.mp4",
      //   resource_type: "raw",
      //   created_at: "2022-11-09T06:23:23Z",
      //   url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667975003/main/uploads/sample-mp4-file-small.mp4",
      //   filetype: "video/mp4"
      // }
    ],
    status: "sent"
  },
  {
    _id: `${Math.floor(Math.random() * 12345678910)}`,
    msg: "media",
    senderId: "6364b2c5c989e711ab138825",
    receiverId: "6364b301c989e711ab1394e7",
    time: new Date(),
    messageType: "media",
    files: [
      // {
      //   public_id: "main/uploads/Screenshot 2022-11-02 at 11.26.03 AM.png",
      //   resource_type: "raw",
      //   created_at: "2022-11-09T06:23:46Z",
      //   url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667975026/main/uploads/Screenshot%202022-11-02%20at%2011.26.03%20AM.png",
      //   filetype: "image/png"
      // },
      // {
      //   public_id: "main/uploads/file_example_MP3_700KB.mp3",
      //   resource_type: "raw",
      //   created_at: "2022-11-09T06:21:50Z",
      //   url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667974910/main/uploads/file_example_MP3_700KB.mp3",
      //   filetype: "audio/mpeg"
      // },
      {
        public_id: "main/uploads/sample-mp4-file-small.mp4",
        resource_type: "raw",
        created_at: "2022-11-09T06:23:23Z",
        url: "http://res.cloudinary.com/dt9jeha3v/raw/upload/v1667975003/main/uploads/sample-mp4-file-small.mp4",
        filetype: "video/mp4"
      }
    ],
    status: "sent"
  },
];