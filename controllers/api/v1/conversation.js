let Conversation = require("../../../models/conversation");
let Message = require("../../../models/message");

// Creates a new Room
module.exports.createRoom = async function (req, res) {
  try {
    let { isRoom, room_name } = req.body;
    let newRoom = await Conversation.create({
      isRoom,
      participants: [req.user.id],
      name: room_name,
    });
    return res.status(200).json({
      data: { newRoom },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// Fetches all the rooms
module.exports.fetchAllRooms = async function (req, res) {
  try {
    let rooms = await Conversation.find({ isRoom: true });
    return res.status(200).json({
      data: { rooms },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// Creates new message
module.exports.createMessage = async function (req, res) {
  try {
    let user = req.user.id;
    let { isRoom, conversation_id, content } = req.body;
    let conversation = await Conversation.findById(conversation_id);
    // adds the sender to the participant list of the conversation
    if (!conversation.participants.includes(req.user.id)) {
      conversation.participants.push(req.user.id);
    }
    let newMessage = await Message.create({
      sender: user,
      content,
      content_type: "text",
    });
    await newMessage.populate("sender");
    conversation.messages.push(newMessage._id);
    conversation.save();
    return res.status(200).json({
      message: "Message sent ",
      data: { conversation_id: conversation_id, message: newMessage },
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// fetches the messages for a particular room
module.exports.fetchMessages = async function (req, res) {
  try {
    const conversation = await Conversation.findById(
      req.params.conversation_id,
      "messages"
    ).populate({ path: "messages", populate: { path: "sender" } });

    conversation.messages = conversation.messages.sort(
      (a, b) => a.createdAt - b.createdAt
    );
    return res.status(200).json({
      data: conversation.messages,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// To be implemented
// module.exports.getPrivateChats = async function (req, res) {
//   console.log("Sender", req.user);
//   console.log("Receiver", req.body.receiver_number);
//  let { isRoom, room_name } = req.body;
//  let newRoom = await Conversation.create({
//    isRoom,
//    participants: [req.user.id],
//    name: room_name,
//  });

//   let conversation = Conversation.create({
//     isRoom:false,
//     participants
//   })
// };
