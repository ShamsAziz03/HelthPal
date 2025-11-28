const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const { deleteGroup } = require("../controllers/supportGroupController");

class Chat {
  static async sendGroupMsg(data) {
    const { senderId, groupId, message } = data;
    const chatId = uuidv4();

    //ensure that group and user exist
    const qry1 = "SELECT * FROM supportgroup WHERE groupId = ?;";
    const [groupRows] = await db.query(qry1, [groupId]);
    if (groupRows.length === 0) return { error: "support group not found" };

    const qry2 = "SELECT * FROM user WHERE userId = ?;";
    const [userRows] = await db.query(qry2, [senderId]);
    if (userRows.length === 0) return { error: "user not found" };

    //check if sender is a member of the group
    const qry3 =
      "SELECT * FROM group_members WHERE groupId = ? AND userId = ?;";
    const [memberRows] = await db.query(qry3, [groupId, senderId]);
    if (memberRows.length === 0)
      return { error: "sender is not a member of the group" };

    const sql =
      "INSERT INTO chatting (chatId, senderId, groupId, message) VALUES (?, ?, ?, ?);";
    const [result] = await db.query(sql, [chatId, senderId, groupId, message]);

    return { chatId, senderId, groupId, message };
  }

  static async getGroupMsgs(groupId) {
    const qry1 = "SELECT * FROM supportgroup WHERE groupId = ?;";
    const [groupRows] = await db.query(qry1, [groupId]);
    if (groupRows.length === 0) return { error: "support group not found" };

    const qry2 = `SELECT c.chatId, c.senderId, u.fullName AS senderName, c.message, c.messageTime, c.groupId
                    FROM chatting c
                    INNER JOIN user u ON c.senderId = u.userId
                    WHERE c.groupId = ?
                    ORDER BY c.messageTime ASC;`;
    const [rows] = await db.query(qry2, [groupId]);
    if (rows.length === 0) return { error: "no messages found for this group" };
    return rows;
  }

  static async deleteGroupMsgs(groupId) {
    const qry1 = "SELECT * FROM supportgroup WHERE groupId = ?;";
    const [groupRows] = await db.query(qry1, [groupId]);
    if (groupRows.length === 0) return { error: "support group not found" };

    const qry2 = "SELECT * FROM chatting WHERE groupId = ?;";
    const [chatRows] = await db.query(qry2, [groupId]);
    if (chatRows.length === 0)
      return { error: "no messages found for this group" };

    const sql = "DELETE FROM chatting WHERE groupId = ?;";
    const [result] = await db.query(sql, [groupId]);
    return result;
  }

  static async sendTherpystMsg(data) {
    const { senderId, receivers, message } = data;
    const therapistId = receivers[0];
    const checkQry =
      "SELECT u.userId, p.patientId FROM user u INNER JOIN patient p ON u.userId = p.userId WHERE u.userId = ?;";
    const [rows] = await db.query(checkQry, [senderId]);
    if (rows.length === 0) {
      return { error: "sender is not a patient" };
    }
    const checkTherapistQry =
      "SELECT t.therapistId, u.userId, d.doctorId FROM therapySession as t INNER JOIN doctor as d ON d.doctorId = t.therapistId INNER JOIN User as u ON u.userId = d.userId WHERE u.userId = ?;";
    const [therapistRows] = await db.query(checkTherapistQry, [therapistId]);
    if (therapistRows.length === 0) {
      return { error: "therapist not found" };
    }
    const chatId = uuidv4();
    const sql =
      "INSERT INTO chatting (chatId, senderId, receivers, message) VALUES (?, ?, ?, ?);";
    const [result] = await db.query(sql, [
      chatId,
      senderId,
      JSON.stringify(receivers),
      message,
    ]);
    return result;
  }

    static async getTherapistMsgs(therapistId, patientId) {

        const checkQry = "SELECT t.therapistId, u.userId, d.doctorId FROM therapySession as t INNER JOIN doctor as d ON d.doctorId = t.therapistId INNER JOIN User as u ON u.userId = d.userId WHERE u.userId = ?;";
        const [therapistRows] = await db.query(checkQry, [therapistId]);
        if (therapistRows.length === 0) {
            return { error: "therapist not found" };
        }

        const checkQry2 = "SELECT u.userId, p.patientId FROM user u INNER JOIN patient p ON u.userId = p.userId WHERE u.userId = ?;";
        const [pateintRows] = await db.query(checkQry2, [patientId]);
        if (pateintRows.length === 0) {
            return { error: "patient not found" };
        }

        const sql = `SELECT c.chatId, c.senderId,
        CASE 
            WHEN p.isAnonymous = 1 THEN 'Anonymous'
            ELSE u.fullName END AS senderName,
        c.message, c.messageTime, c.receivers, p.isAnonymous
        FROM chatting c
        INNER JOIN user u ON c.senderId = u.userId
        INNER JOIN patient p ON p.userId = u.userId
        WHERE 
        ( JSON_CONTAINS(c.receivers, JSON_ARRAY( ? )) OR JSON_CONTAINS(c.receivers, JSON_ARRAY(?)))
        AND 
        ( c.senderId = ? OR c.senderId = ?)
        ORDER BY c.messageTime ASC;`;
        
        const [rows] = await db.query(sql, [therapistId, patientId, therapistId, patientId]);
        if (rows.length === 0)
            return { error: "no messages found between therapist and patient" };
        return rows;
    }


    //to send msgs between dr and patient for consultation
    static async sendConsultationChatMsg(senderId,receiverId,message,consultationId){
      let receivers=[];
      //first to check if sender and reciver is valid users
      const [isSenderExist]= await db.execute(`select * from user where userId = ?`,[senderId]);
      const [isReceiverExist]= await db.execute(`select * from user where userId = ?`,[receiverId]);
      if(isSenderExist.length===0)return {error:"Sender Is Not Valid User"};
      if(isReceiverExist.length===0)return {error:"Receiver Is Not Valid User"};
      //to check if sender and reciver is valid roles - patient or doctor only
      if(isSenderExist[0].role!=="Doctor"&&isSenderExist[0].role!=="Patient")return {error:"Sender Is Not Doctor or Patient"};
      if(isReceiverExist[0].role!=="Doctor"&&isReceiverExist[0].role!=="Patient")return {error:"Receiver Is Not Doctor or Patient"};

      //to check if consultation id exist 
      const [isConsultationExist]= await db.execute(`select * from consultation where consultationId = ?`,[consultationId]);
      if(isConsultationExist.length===0)return {error:"Consultation Is Not Exist"};
      if(isConsultationExist[0].consultationType!=="Chat")return {error:"Type of Consultation is not Chat!"};


      //to check if patient and doctor is from the consultation
      const [data2]= await db.execute(`SELECT d.userId AS doctorUserId, p.userId as UserIdPatient
  FROM consultation c
  JOIN bookrequests b ON c.bookRequestId=b.id
  Join doctoravailability da on b.availability_id=da.availabilityId
  join doctor d on d.doctorId=da.doctorId
  join patient p on b.patient_id=p.patientId
  WHERE c.consultationId = ? `,[consultationId]);
      if(data2.length===0)return {error:"the patient or doctor is not envolved in the consultation, choose correct sender and recevier ids"};
      if(data2[0].doctorUserId!==senderId.toString()&&data2[0].UserIdPatient!==senderId.toString())return {error:"The Sender is not envolved in this consultation"};
      if(data2[0].doctorUserId!==receiverId.toString()&&data2[0].UserIdPatient!==receiverId.toString())return {error:"The Recevier is not envolved in this consultation"};



      receivers.push(receiverId.toString());

      //to add the PK
      const [data] = await db.execute(
      `SELECT MAX(chatId)+1 AS next_id FROM chatting ;` );
      const nextId = data[0].next_id;


      const insertQuery=`INSERT INTO chatting (chatId, senderId, receivers,messageTime, message,consultationId) VALUES (?, ?, ?, ?, ?, ?);`;
      const [result]=await db.execute(insertQuery,[nextId,senderId,JSON.stringify(receivers),new Date().toISOString().slice(0, 19).replace('T', ' '),message||"new message",consultationId]);
      if(result.affectedRows===0){return {error:` Can't Send Msg from senderId ${senderId} to reciverId ${receiverId}`}}
      return {result:` Send Msg from senderId ${senderId} to reciverId ${receiverId}: ${message} --- is success`}
    }
  
}

module.exports = Chat;
