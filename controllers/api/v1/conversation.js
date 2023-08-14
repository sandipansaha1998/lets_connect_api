let Conversation = require("../../../models/conversation");
let Message = require("../../../models/message");

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
module.exports.createMessage = async function (req, res) {
  try {
    let user = req.user.id;
    let { isRoom, conversation_id, content } = req.body;
    let conversation = await Conversation.findById(conversation_id);
    if (!conversation.participants.includes(req.user.id)) {
      conversation.participants.push(req.user.id);
    }
    let newMessage = await Message.create({
      sender: user,
      content,
      content_type: "text",
    });
    conversation.messages.push(newMessage._id);
    conversation.save();
    console.log(conversation);
    return res.status(200).json({
      message: "Message sent ",
    });
    // Find the conversation,insert participant if not inlcuded,return success
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports.fetchMessages = async function (req, res) {
  try {
    const conversation = await Conversation.findById(
      req.params.conversation_id,
      "messages"
    ).populate({ path: "messages", populate: { path: "sender" } });

    console.log(conversation.messages);
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
